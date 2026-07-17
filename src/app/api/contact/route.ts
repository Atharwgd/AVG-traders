import { NextRequest, NextResponse } from "next/server";

// ─── Google Sheets via Web Crypto API (works with OpenSSL 3 / Node 22) ────────
// Uses globalThis.crypto.subtle (Web Crypto) instead of node:crypto,
// which avoids the DECODER routines::unsupported error on Node 22.

function normalizeKey(raw: string): string {
  return raw
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

async function createJWT(clientEmail: string, privateKeyPem: string): Promise<string> {
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  ).toString("base64url");

  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");

  const signingInput = `${header}.${payload}`;

  // Strip PEM headers and decode base64 to get raw DER bytes
  const keyBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const keyBuffer = Buffer.from(keyBody, "base64");

  // Web Crypto importKey — fully compatible with OpenSSL 3 on Node 22
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await globalThis.crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  return `${signingInput}.${Buffer.from(signature).toString("base64url")}`;
}

async function getAccessToken(
  clientEmail: string,
  privateKey: string
): Promise<string> {
  const jwt = await createJWT(clientEmail, privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = (await res.json()) as { access_token?: string; error?: string };
  if (!res.ok) throw new Error(`Google auth failed: ${JSON.stringify(data)}`);
  return data.access_token!;
}

async function appendToSheet(data: Record<string, string>) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;
  const privateKey = normalizeKey(process.env.GOOGLE_PRIVATE_KEY ?? "");
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  const accessToken = await getAccessToken(clientEmail, privateKey);

  const row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.name ?? "",
    data.company ?? "",
    data.country ?? "",
    data.product ?? "",
    data.quantity ?? "",
    data.message ?? "",
    data.email ?? "",
    data.phone ?? "",
  ];

  const range = encodeURIComponent("Sheet1!A:I");
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets API error: ${err}`);
  }
}

// ─── Validation & rate limiting ───────────────────────────────────────────────

// Max lengths per field — anything longer is truncated, unknown fields dropped
const FIELD_LIMITS: Record<string, number> = {
  name: 100,
  company: 100,
  email: 150,
  phone: 30,
  country: 60,
  product: 60,
  quantity: 100,
  message: 2000,
};

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes.
// Resets on server restart, which is acceptable for a contact form.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Prevent unbounded growth
  if (hits.size > 5000) hits.clear();
  return false;
}

function sanitize(body: Record<string, unknown>): Record<string, string> | null {
  const clean: Record<string, string> = {};
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    const raw = body[field];
    if (raw !== undefined && typeof raw !== "string") return null;
    clean[field] = ((raw as string) ?? "").trim().slice(0, max);
  }
  if (!clean.name || !clean.country || !clean.product) return null;
  // Email is required and must at least look like an address
  if (!clean.email || !/^\S+@\S+\.\S+$/.test(clean.email)) return null;
  return clean;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let raw: Record<string, unknown> = {};
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  // Honeypot — hidden field real users never fill. Pretend success for bots.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const body = sanitize(raw);
  if (!body) {
    return NextResponse.json({ ok: false, reason: "invalid_fields" }, { status: 400 });
  }

  console.log("[Contact inquiry] received from", body.country);

  if (
    process.env.GOOGLE_SHEET_ID &&
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  ) {
    try {
      await appendToSheet(body);
      console.log("[Sheets] Row appended successfully");
    } catch (err) {
      console.error("[Sheets] Failed to append row:", err);
    }
  } else {
    console.warn("[Sheets] Env vars not set — skipping sheet write");
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
