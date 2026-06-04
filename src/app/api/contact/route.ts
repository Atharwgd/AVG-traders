import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";

// ─── Google Sheets via direct REST (avoids googleapis/jwa OpenSSL 3 issue) ───

function normalizeKey(raw: string): string {
  return raw
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function createJWT(clientEmail: string, privateKey: string): string {
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

  // crypto.sign works correctly with OpenSSL 3 (Node 20/22)
  const signature = crypto.sign(
    "SHA256",
    Buffer.from(signingInput),
    { key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }
  );

  return `${signingInput}.${signature.toString("base64url")}`;
}

async function getAccessToken(
  clientEmail: string,
  privateKey: string
): Promise<string> {
  const jwt = createJWT(clientEmail, privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json() as { access_token?: string; error?: string };
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

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:G:append?valueInputOption=USER_ENTERED`,
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
