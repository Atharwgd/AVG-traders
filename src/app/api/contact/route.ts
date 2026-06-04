import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

async function appendToSheet(data: Record<string, string>) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      // Normalize key: handle literal \n, Windows \r\n, and double newlines
      private_key: (process.env.GOOGLE_PRIVATE_KEY ?? "")
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .replace(/\n{2,}/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
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
  let body: Record<string, string> = {};

  // Step 1 — parse body. If this fails, return 400.
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  console.log("[Contact inquiry]", body);

  // Step 2 — write to Sheets. Fail silently so the user always gets a success.
  if (
    process.env.GOOGLE_SHEET_ID &&
    process.env.GOOGLE_CLIENT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  ) {
    try {
      await appendToSheet(body);
      console.log("[Sheets] Row appended successfully");
    } catch (sheetErr) {
      // Log the error but don't fail the request — inquiry is not lost (logged above)
      console.error("[Sheets] Failed to append row:", sheetErr);
    }
  } else {
    console.warn("[Sheets] Env vars not set — skipping sheet write");
  }

  // Always return success to the user
  return NextResponse.json({ ok: true }, { status: 200 });
}
