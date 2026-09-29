/**
 * Mangla Healthcare — Free Health Test → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet,
 * then run setup() once. Full instructions: APPS_SCRIPT_SETUP.md
 *
 * What it builds:
 *   • "Submissions" tab — one row per assessment, newest at the bottom,
 *     with a Status dropdown and Staff Notes column for the front desk.
 *   • "Dashboard" tab — live counts by status and by health concern.
 *   • A private Google Drive folder holding uploaded photos, linked
 *     from each row.
 */

// ── Settings ─────────────────────────────────────────────────────
// Optional. If set, must equal VITE_HEALTH_TEST_TOKEN in the website .env.
const SHARED_TOKEN = '';

// Optional. Comma-separated emails that get an alert for every submission.
const ALERT_EMAILS = '';

const TIMEZONE = 'Asia/Kolkata';
const PHOTO_FOLDER_NAME = 'Mangla Health Test Photos';
const MAX_PER_PHONE_PER_HOUR = 3;

const SUBMISSIONS = 'Submissions';
const DASHBOARD = 'Dashboard';

const STATUSES = ['New', 'Contacted', 'Appointment Booked', 'Closed', 'Spam'];
const STATUS_COLOURS = {
  'New':                '#FEF3C7',
  'Contacted':          '#DBEAFE',
  'Appointment Booked': '#D1FAE5',
  'Closed':             '#E5E7EB',
  'Spam':               '#FEE2E2',
};

// Column order of the Submissions tab. width = pixels.
const COLUMNS = [
  { key: 'referenceId',   title: 'Reference ID',     width: 130 },
  { key: 'submittedAt',   title: 'Submitted (IST)',  width: 150 },
  { key: 'status',        title: 'Status',           width: 150 },
  { key: 'staffNotes',    title: 'Staff Notes',      width: 220 },
  { key: 'name',          title: 'Name',             width: 160 },
  { key: 'age',           title: 'Age',              width: 55  },
  { key: 'gender',        title: 'Gender',           width: 80  },
  { key: 'phone',         title: 'Phone',            width: 115 },
  { key: 'email',         title: 'Email',            width: 190 },
  { key: 'problem',       title: 'Primary Concern',  width: 140 },
  { key: 'symptoms',      title: 'Symptoms',         width: 220 },
  { key: 'lifestyle',     title: 'Lifestyle',        width: 200 },
  { key: 'lifestyleNote', title: 'Lifestyle Notes',  width: 220 },
  { key: 'notes',         title: 'Patient Notes',    width: 260 },
  { key: 'photo',         title: 'Photo',            width: 95  },
  { key: 'consent',       title: 'Consent',          width: 75  },
  { key: 'source',        title: 'Page',             width: 160 },
  { key: 'userAgent',     title: 'Device',           width: 160 },
];
const col = (key) => COLUMNS.findIndex(c => c.key === key) + 1;

// ── Web app entry point ──────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Bots fill the hidden "website" field; pretend success and drop it.
    if (data.website) return json_({ ok: true });
    if (SHARED_TOKEN && data.token !== SHARED_TOKEN) return json_({ ok: false, error: 'bad-token' });

    const name = clean_(data.name, 100);
    const phone = String(data.phone || '').replace(/\D/g, '').slice(-10);
    const referenceId = clean_(data.referenceId, 40) || 'HT-' + Date.now();
    if (name.length < 2 || phone.length !== 10) return json_({ ok: false, error: 'invalid' });

    const cache = CacheService.getScriptCache();
    // The website may resend the same submission if it couldn't read our reply.
    if (cache.get('ref:' + referenceId)) return json_({ ok: true, referenceId, duplicate: true });

    const rateKey = 'phone:' + phone;
    const count = Number(cache.get(rateKey) || 0);
    if (count >= MAX_PER_PHONE_PER_HOUR) return json_({ ok: false, error: 'rate-limited' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (cache.get('ref:' + referenceId)) return json_({ ok: true, referenceId, duplicate: true });

      const sheet = ensureSetup_();
      const photoUrl = savePhoto_(data, referenceId, name);

      const values = {
        referenceId,
        submittedAt:   new Date(),
        status:        'New',
        staffNotes:    '',
        name,
        age:           clean_(data.age, 3),
        gender:        clean_(data.gender, 20),
        phone,
        email:         clean_(data.email, 120),
        problem:       clean_(data.problem, 60),
        symptoms:      clean_(data.symptoms, 500),
        lifestyle:     clean_(data.lifestyle, 500),
        lifestyleNote: clean_(data.lifestyleNote, 2000),
        notes:         clean_(data.notes, 4000),
        photo:         '',
        consent:       data.consent === 'Yes' ? 'Yes' : 'No',
        source:        clean_(data.source, 300),
        userAgent:     clean_(data.userAgent, 300),
      };

      const row = sheet.getLastRow() + 1;
      sheet.getRange(row, 1, 1, COLUMNS.length).setValues([COLUMNS.map(c => values[c.key])]);
      if (photoUrl) {
        sheet.getRange(row, col('photo')).setFormula('=HYPERLINK("' + photoUrl + '","View photo")');
      }

      cache.put('ref:' + referenceId, '1', 21600);        // 6 hours
      cache.put(rateKey, String(count + 1), 3600);        // 1 hour window
    } finally {
      lock.releaseLock();
    }

    if (ALERT_EMAILS) sendAlert_(data, referenceId, name, phone);
    return json_({ ok: true, referenceId });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server-error' });
  }
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json_({ ok: true, service: 'Mangla Health Test sink' });
}

// ── One-time setup (run from the editor: select "setup" → Run) ───
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  ensureSetup_();
  buildDashboard_(ss);
  getPhotoFolder_();
  // Touch MailApp so the permission prompt covers email alerts too.
  if (ALERT_EMAILS) MailApp.getRemainingDailyQuota();
  ss.setActiveSheet(ss.getSheetByName(SUBMISSIONS));
  SpreadsheetApp.getUi().alert('Setup complete. Now deploy the script as a Web app (see APPS_SCRIPT_SETUP.md).');
}

function ensureSetup_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SUBMISSIONS);
  if (sheet && sheet.getLastRow() > 0) return sheet;

  ss.setSpreadsheetTimeZone(TIMEZONE);
  if (!sheet) {
    // Reuse the default empty "Sheet1" if it's there, otherwise add a tab.
    const first = ss.getSheets()[0];
    sheet = (first.getLastRow() === 0 && ss.getSheets().length === 1)
      ? first.setName(SUBMISSIONS)
      : ss.insertSheet(SUBMISSIONS, 0);
  }

  const header = sheet.getRange(1, 1, 1, COLUMNS.length);
  header.setValues([COLUMNS.map(c => c.title)])
    .setFontWeight('bold')
    .setFontColor('#FFFFFF')
    .setBackground('#0A6E66')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(col('name'));   // keep ID, date, status, notes, name visible while scrolling
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));

  const maxRows = sheet.getMaxRows();
  const body = (key) => sheet.getRange(2, col(key), maxRows - 1, 1);

  body('submittedAt').setNumberFormat('dd mmm yyyy, hh:mm am/pm');
  body('phone').setNumberFormat('@');          // keep as text, never a number/formula
  body('age').setNumberFormat('@');
  ['symptoms', 'lifestyle', 'lifestyleNote', 'notes', 'staffNotes'].forEach(k => body(k).setWrap(true));
  sheet.getRange(2, 1, maxRows - 1, COLUMNS.length).setVerticalAlignment('top');

  body('status').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
  );

  // Colour each row by its Status.
  const statusColLetter = columnLetter_(col('status'));
  const rowRange = sheet.getRange(2, 1, maxRows - 1, COLUMNS.length);
  sheet.setConditionalFormatRules(STATUSES.map(s =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$' + statusColLetter + '2="' + s + '"')
      .setBackground(STATUS_COLOURS[s])
      .setRanges([rowRange])
      .build()
  ));

  // Staff-only columns get a subtle highlight in the header.
  sheet.getRange(1, col('status'), 1, 2).setBackground('#B84C2B');

  if (!sheet.getFilter()) sheet.getRange(1, 1, maxRows, COLUMNS.length).createFilter();
  return sheet;
}

function buildDashboard_(ss) {
  let dash = ss.getSheetByName(DASHBOARD);
  if (!dash) dash = ss.insertSheet(DASHBOARD);
  dash.clear();

  const S = "'" + SUBMISSIONS + "'!";
  const statusCol = S + columnLetter_(col('status')) + '2:' + columnLetter_(col('status'));
  const dateCol = S + columnLetter_(col('submittedAt')) + '2:' + columnLetter_(col('submittedAt'));
  const concernCol = S + columnLetter_(col('problem')) + '2:' + columnLetter_(col('problem'));

  dash.getRange('A1').setValue('Health Test Dashboard').setFontSize(16).setFontWeight('bold').setFontColor('#0A6E66');
  dash.getRange('A2').setValue('Updates automatically from the Submissions tab.').setFontColor('#64748B');

  const summary = [
    ['Total submissions', '=COUNTA(' + dateCol + ')'],
    ['Today',             '=COUNTIFS(' + dateCol + ',">="&TODAY())'],
    ['Last 7 days',       '=COUNTIFS(' + dateCol + ',">="&TODAY()-6)'],
    ['This month',        '=COUNTIFS(' + dateCol + ',">="&EOMONTH(TODAY(),-1)+1)'],
    ['Waiting for a call (New)', '=COUNTIF(' + statusCol + ',"New")'],
  ];
  dash.getRange(4, 1, 1, 2).setValues([['Overview', 'Count']]);
  dash.getRange(5, 1, summary.length, 2).setValues(summary);

  const statusStart = 5 + summary.length + 1;
  dash.getRange(statusStart, 1, 1, 2).setValues([['By status', 'Count']]);
  dash.getRange(statusStart + 1, 1, STATUSES.length, 2)
    .setValues(STATUSES.map(s => [s, '=COUNTIF(' + statusCol + ',"' + s + '")']));

  const concernStart = statusStart + STATUSES.length + 2;
  dash.getRange(concernStart, 1, 1, 2).setValues([['By primary concern', 'Count']]);
  dash.getRange(concernStart + 1, 1).setFormula(
    '=IFERROR(QUERY({' + concernCol + '},"select Col1, count(Col1) where Col1 is not null group by Col1 order by count(Col1) desc label count(Col1) \'\'",0),"No data yet")'
  );

  [4, statusStart, concernStart].forEach(r =>
    dash.getRange(r, 1, 1, 2).setFontWeight('bold').setBackground('#0A6E66').setFontColor('#FFFFFF'));
  dash.setColumnWidth(1, 240);
  dash.setColumnWidth(2, 90);
  dash.setFrozenRows(2);
}

// ── Photos ───────────────────────────────────────────────────────
function getPhotoFolder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('PHOTO_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* deleted — recreate */ }
  }
  const folder = DriveApp.createFolder(PHOTO_FOLDER_NAME);
  props.setProperty('PHOTO_FOLDER_ID', folder.getId());
  return folder;
}

function savePhoto_(data, referenceId, name) {
  if (!data.imageBase64) return '';
  const mime = /^image\/[\w.+-]+$/.test(data.imageMimeType || '') ? data.imageMimeType : 'application/octet-stream';
  const ext = mime === 'image/jpeg' ? 'jpg' : (mime.split('/')[1] || 'bin');
  const safeName = name.replace(/[^\wऀ-ॿ]+/g, '_').slice(0, 40);
  const blob = Utilities.newBlob(Utilities.base64Decode(data.imageBase64), mime, referenceId + '_' + safeName + '.' + ext);
  // Files stay private: only you and people you share the folder with can open them.
  return getPhotoFolder_().createFile(blob).getUrl();
}

// ── Helpers ──────────────────────────────────────────────────────
function clean_(value, maxLen) {
  let s = String(value == null ? '' : value).trim().slice(0, maxLen);
  // Stop text like "=IMPORTXML(...)" being run as a formula in the sheet.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function columnLetter_(n) {
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

function sendAlert_(data, referenceId, name, phone) {
  try {
    MailApp.sendEmail({
      to: ALERT_EMAILS,
      subject: 'New Health Test — ' + name + ' (' + referenceId + ')',
      body:
        'Reference: ' + referenceId +
        '\nName: ' + name +
        '\nPhone: ' + phone +
        '\nEmail: ' + (data.email || '—') +
        '\nConcern: ' + (data.problem || '—') +
        '\nSymptoms: ' + (data.symptoms || '—') +
        '\nPhoto attached: ' + (data.imageBase64 ? 'Yes' : 'No') +
        '\n\nOpen the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  } catch (err) {
    console.error('Alert email failed', err);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
