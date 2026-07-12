# Free Health Test → Google Sheets

This guide wires the Free Health Test form on the Mangla Healthcare site to a
Google Sheet you control. No backend, no paid services — just a Google account.

The data flow:

```
React form  →  fetch (no-cors POST)  →  Google Apps Script Web App  →  Google Sheet row
```

---

## 1. Create the Google Sheet

1. Go to https://sheets.new — a new blank sheet opens.
2. Rename it to **Mangla – Health Test Submissions**.
3. In **Row 1**, paste this header row (one cell each, in order). It's already
   tab-separated, so pasting fills one column per heading:

```
date	timestamp	name	age	gender	phone	email	problem	symptoms	lifestyle	hasImage	imageName	imageSize	notes	source	userAgent
```

   The order must match the `appendRow([...])` in the script below.
   (`date` = readable IST date/time; `timestamp` = machine-sortable ISO.)

---

## 2. Add the Apps Script

1. In the sheet, click **Extensions → Apps Script**. A new editor opens.
2. Delete everything in `Code.gs` and paste the script below.
3. Click the disk icon to save. Give the project a name like `ManglaHealthTest`.

```javascript
// Code.gs — Rogjeet Ayurveda Free Health Test sink
const SHEET_NAME = 'Sheet1'; // change if you renamed the tab

// MUST be identical to VITE_HEALTH_TEST_TOKEN in the website's .env file.
const SECRET = 'change-this-to-a-long-random-string';

// Optional: get an email on every submission. Leave '' to disable.
const EMAIL_TO = '';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1) Reject bots: honeypot field must be empty.
    if (data.website) return ok_();          // silently drop

    // 2) Reject anything without the shared secret.
    if (SECRET && data.token !== SECRET) return deny_('bad token');

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Server-side date as a fallback if the client didn't send one.
    const dateIST = data.date || Utilities.formatDate(
      new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a'
    );

    // Order MUST match the header row.
    sheet.appendRow([
      dateIST,
      data.timestamp || new Date().toISOString(),
      data.name      || '',
      data.age       || '',
      data.gender    || '',
      data.phone     || '',
      data.email     || '',
      data.problem   || '',
      data.symptoms  || '',
      data.lifestyle || '',
      data.hasImage  || '',
      data.imageName || '',
      data.imageSize || '',
      data.notes     || '',
      data.source    || '',
      data.userAgent || '',
    ]);

    if (EMAIL_TO) {
      MailApp.sendEmail(EMAIL_TO, 'New Health Test — ' + (data.name || 'Unknown'),
        'Name: '  + data.name +
        '\nPhone: ' + data.phone +
        '\nEmail: ' + data.email +
        '\nConcern: ' + data.problem +
        '\nWhen: ' + dateIST);
    }

    return ok_();
  } catch (err) {
    return deny_(err.toString());
  }
}

function ok_()      { return json_({ ok: true }); }
function deny_(msg) { return json_({ ok: false, error: msg }); }
function json_(o)   {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> **Set `SECRET`** to a long random string and put the **same** value in the
> website's `.env` as `VITE_HEALTH_TEST_TOKEN`. The two must match or every
> submission is rejected.

---

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → choose **Web app**.
3. Fill in:
   - **Description:** `Health Test sink v1`
   - **Execute as:** *Me (your@gmail.com)*
   - **Who has access:** **Anyone** (this is required so the public form can post)
4. Click **Deploy**. Google will ask for permission — review and **Allow**.
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfycb.../exec`

> Every time you change the script you must click **Deploy → Manage deployments
> → ✏️ Edit → New version → Deploy** to publish the change. Keep the same URL
> by editing the existing deployment rather than creating a new one.

---

## 4. Wire it into the site

You have two options.

### Option A — environment variable (recommended)

Create a `.env` file in the project root:

```
VITE_HEALTH_TEST_ENDPOINT=https://script.google.com/macros/s/REPLACE_ID/exec
```

Restart `npm run dev`. The URL is now picked up automatically.

For production (Vercel, Netlify, etc.), set the same variable in the host's
environment-variables panel.

### Option B — hard-code

Open `src/utils/submitHealthTest.js` and replace the placeholder in
`SHEET_ENDPOINT`.

---

## 5. Test it

1. Run `npm run dev`.
2. Open the site, go to **Free Health Test**, fill the form, click **Submit
   Assessment**.
3. Switch to the Google Sheet — a new row should appear within a second.

If it doesn't:

- Open the browser **DevTools → Network** tab and look at the request to
  `/exec`. Because we use `mode: 'no-cors'`, the response is opaque; that's
  expected and **not** an error.
- In the Apps Script editor, open **Executions** (left sidebar, clock icon) and
  look for the most recent `doPost` run. Any thrown error shows up there.
- The most common mistake is **redeploying as a new deployment** instead of a
  new version of the existing one — that gives you a new URL and the old one
  silently stops being updated.

---

## 6. Recommended hardening (optional)

### 6.1 Send an email alert on every submission

In the script, uncomment the `EMAIL_TO` constant and the `MailApp.sendEmail`
line inside `notify_`. Then call `notify_(data)` from inside `doPost`, right
after `appendRow`.

### 6.2 Spam protection

Add a simple honeypot field to the React form — a hidden input that bots fill
but humans don't. In the Apps Script, reject any row where the honeypot field
isn't empty:

```javascript
if (data.website) return;  // honeypot
```

### 6.3 Rate-limit by IP

Apps Script doesn't see the client IP, so use the `userAgent` + `timestamp`
columns and add a conditional-format rule in Sheets to flag duplicates within
60 seconds.

### 6.4 Store uploaded images

The current form only sends the image **filename** and size, not the binary
data (that would balloon the request and exceed Apps Script limits). If you
need the actual images, switch to a direct **Google Drive upload** flow:

1. In the script, accept a base64-encoded image string.
2. `DriveApp.createFile(...)` writes it to a folder you specify.
3. Store the resulting file's URL in the sheet.

A 5 MB image base64-encoded becomes ~7 MB — workable for occasional submissions
but slow on mobile networks. For higher volume, use a dedicated service like
Cloudinary or S3.

---

## What's stored

| Column | Source |
| --- | --- |
| `timestamp` | ISO timestamp generated client-side |
| `name`, `age`, `gender`, `phone`, `email` | Step 1 of the form |
| `problem` | Step 2 — primary concern |
| `symptoms` | Step 3 — comma-joined |
| `lifestyle` | Step 4 — comma-joined |
| `hasImage`, `imageName`, `imageSize` | Step 5 metadata |
| `notes` | Step 6 free text |
| `source` | The page URL that submitted (e.g. `/health-test`) |
| `userAgent` | Browser string — useful for spotting bots |

No personal data is stored anywhere else. The sheet itself is governed by your
own Google account's access controls — share it only with people who need to
see patient submissions.
