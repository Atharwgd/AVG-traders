import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// ── Google Sheets config ──────────────────────────────────────────────────────
// Set these in .env.local (never commit that file).
// GOOGLE_SHEET_ID   — the long ID from your sheet's URL
// GOOGLE_CLIENT_EMAIL — service account email from the JSON key file
// GOOGLE_PRIVATE_KEY  — private_key field from the JSON key file (keep the \n chars)
// ─────────────────────────────────────────────────────────────────────────────

async function appendToSheet(data: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // Timestamp (IST)
    data.name ?? "",
    data.company ?? "",
    data.country ?? "",
    data.product ?? "",
    data.quantity ?? "",
    data.message ?? "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[Contact inquiry]", body);

    // Check env vars are set before attempting Sheets write
    if (
      process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
    ) {
      await appendToSheet(body);
      console.log("[Sheets] Row appended successfully");
    } else {
      console.warn("[Sheets] Env vars not set — skipping sheet write");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
