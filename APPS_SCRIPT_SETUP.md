# Free Health Test → Google Sheet

Every Free Health Test submitted on the website becomes one row in a Google
Sheet that the clinic owns. Photos go to a private Google Drive folder and
are linked from the row. No server or paid service is needed, only a Google
account.

```
Website form  →  Google Apps Script web app  →  Google Sheet row (+ photo in Drive)
```

Setup takes about 10 minutes. Use the Google account the clinic will keep
long-term, because the Sheet and photos live in that account's Drive.

---

## What the Sheet looks like

**Submissions tab** (one row per assessment):

| Column | Filled by | Notes |
| --- | --- | --- |
| Reference ID | Website | e.g. `HT-260930-4K7Q`. The patient sees it on screen and can quote it when calling. |
| Submitted (IST) | Script | Real date/time, so you can sort and filter by it. |
| **Status** | Staff | Dropdown: New → Contacted → Appointment Booked → Closed / Spam. The whole row changes colour. |
| **Staff Notes** | Staff | Free text for call notes. |
| Name, Age, Gender, Phone, Email | Patient | Phone is stored as plain 10 digits. |
| Primary Concern, Symptoms, Lifestyle, Lifestyle Notes, Patient Notes | Patient | |
| Photo | Script | "View photo" link. Only people with access to the photo folder can open it. |
| Consent | Patient | Always "Yes", because the form can't be sent without it. |
| Page, Device | Script | Which page they submitted from, and their browser. Useful for spotting spam. |

The header row and the first five columns stay visible while you scroll.
Filters are switched on, so staff can show only `New` rows, for example.

**Dashboard tab:** totals for today, the last 7 days and this month, plus
counts by status and by primary concern. It updates on its own.

---

## 1. Create the Sheet and add the script

1. Go to <https://sheets.new> and name the sheet **Mangla – Health Test Submissions**.
2. Click **Extensions → Apps Script**.
3. Delete everything in `Code.gs`, then paste in the full contents of
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) from this project.
4. Optional settings at the top of the file:
   - `ALERT_EMAILS`: e.g. `'reception@manglahealthcare.com'` to get an email for each submission.
   - `SHARED_TOKEN`: see section 4.
5. Click 💾 **Save**.

## 2. Run setup once

1. In the toolbar's function dropdown, pick **`setup`**, then click **▶ Run**.
2. Google asks for permission. Choose your account, then **Advanced → Go to (project) → Allow**.
   The script needs Sheets (write rows), Drive (save photos) and, if you set
   `ALERT_EMAILS`, Gmail (send alerts).
3. Go back to the Sheet. You should now see the **Submissions** and
   **Dashboard** tabs, and a Drive folder called **Mangla Health Test Photos**.

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the ⚙️ icon and choose **Web app**.
3. Fill in:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone* (needed so the public form can post)
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. Optional check: open that URL in a browser. You should see
   `{"ok":true,"service":"Mangla Health Test sink"}`.

> **When you change the script later**, use **Deploy → Manage deployments →
> ✏️ Edit → Version: New version → Deploy**. That keeps the same URL.
> Choosing "New deployment" gives you a new URL, and the website would keep
> posting to the old one.

## 4. Connect the website

In the project root, create `.env.local` (or set these in your hosting
provider's environment settings), then rebuild and redeploy the site:

```
VITE_HEALTH_TEST_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
# Optional: must match SHARED_TOKEN in Code.gs
VITE_HEALTH_TEST_TOKEN=
```

About the token: anything that starts with `VITE_` is copied into the
public website code, so the token is not a real secret. It only filters
out casual junk. The real protections are in the script: the hidden
honeypot field, required name and a valid 10-digit phone, at most 3
submissions per phone per hour, and duplicate-submission detection.

If `VITE_HEALTH_TEST_ENDPOINT` is missing, the form won't pretend to work.
It tells the patient to call the clinic instead.

## 5. Test it

1. Open the website's **Free Health Test**, fill it in, attach a photo and submit.
2. The success screen shows a reference ID.
3. Within a few seconds, a row with that ID appears in **Submissions**, with
   Status **New** and a working **View photo** link.

If nothing appears:

- In the Apps Script editor, open **Executions** (clock icon). Any error shows there.
- Check that the website's `VITE_HEALTH_TEST_ENDPOINT` is the **current** `/exec` URL.
- Check that **Who has access** is set to **Anyone**.

---

## Daily use for staff

- Filter **Status = New** to see who still needs a call.
- After calling, change **Status** and add a line in **Staff Notes**.
- Share the Sheet (and the photos folder) only with staff who need it: **Share → add their Google account**.
  Don't use "Anyone with the link".

## Privacy

The Sheet and photos stay in the clinic's own Google account. Nothing is
stored on the website. Patients must tick a consent checkbox before they
can submit. Delete rows and photos you no longer need, and keep sharing
limited to clinical staff.
