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
  ];

  const range = encodeURIComponent("Sheet1!A:G");
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

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  console.log("[Contact inquiry]", body);

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
