# Contact form setup (static site → Google Sheet)

The site is now a **static export** (no server). The contact form posts directly
to a **Google Apps Script Web App** that appends each inquiry to your existing
Google Sheet — free, no server, same sheet as before.

You do this **once**. ~5 minutes.

---

## Step 1 — Open the Apps Script editor

1. Open your inquiries **Google Sheet**.
2. Menu: **Extensions → Apps Script**.
3. Delete whatever code is there and paste the script below.

## Step 2 — Paste this script

```javascript
// AVG Traders — contact form receiver.
// Appends each submission as a new row on Sheet1.
// Columns: Timestamp | Name | Company | Country | Product | Quantity | Message | Email | Phone

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Ignore bot submissions (honeypot field)
    if (data.website && String(data.website).length > 0) {
      return ContentService.createTextOutput("ok");
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.company || "",
      data.country || "",
      data.product || "",
      data.quantity || "",
      data.message || "",
      data.email || "",
      data.phone || ""
    ]);

    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}
```

> If your sheet tab is not named `Sheet1`, change `"Sheet1"` above to its exact name.

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `AVG contact form`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy**. Approve the permissions prompt (it's your own script).
5. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfy..../exec`

## Step 4 — Give me the URL

Paste that URL back to me. I'll wire it into the site as the form endpoint
(env var `NEXT_PUBLIC_FORM_ENDPOINT`) and it also needs to be added to your
Hostinger **build environment variables** with the same name.

---

## Notes

- The old server route and the `GOOGLE_*` build env vars on Hostinger are no
  longer used — you can remove those env vars later (harmless if left).
- To change the form later (new fields), the script's `appendRow([...])` order
  must match the fields.
