/**
 * Mangla Healthcare — website forms → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script of your Google Sheet,
 * then run setup() once. Full instructions: APPS_SCRIPT_SETUP.md
 *
 * What it builds:
 *   • "Health Tests" tab — one row per Free Health Test.
 *   • "Enquiries" tab — appointment / contact requests from every other
 *     form on the site (home page, Contact, Panchkarma, Super-speciality).
 *   • "Newsletter" tab — emails from the footer sign-up (no duplicates).
 *   • "Dashboard" tab — live counts.
 *   • A private Google Drive folder holding Health Test photos, linked
 *     from each row.
 * Health Tests and Enquiries both have a Status dropdown and a Staff Notes
 * column for the front desk.
 */

// ── Settings ─────────────────────────────────────────────────────
// Optional. If set, must equal VITE_HEALTH_TEST_TOKEN in the website .env.
const SHARED_TOKEN = '';

// Optional. Comma-separated emails that get an alert for every health test
// and enquiry (not for newsletter sign-ups).
const ALERT_EMAILS = '';

const TIMEZONE = 'Asia/Kolkata';
const PHOTO_FOLDER_NAME = 'Mangla Health Test Photos';
const MAX_PER_CONTACT_PER_HOUR = 3;   // per phone number (or email for newsletter)

const DASHBOARD = 'Dashboard';

const STATUSES = ['New', 'Contacted', 'Appointment Booked', 'Closed', 'Spam'];
const STATUS_COLOURS = {
  'New':                '#FEF3C7',
  'Contacted':          '#DBEAFE',
  'Appointment Booked': '#D1FAE5',
  'Closed':             '#E5E7EB',
  'Spam':               '#FEE2E2',
};

// One entry per tab. Columns are in sheet order; width = pixels.
const TABS = {
  'health-test': {
    name: 'Health Tests',
    workflow: true,
    freezeThrough: 'name',
    wrap: ['symptoms', 'lifestyle', 'lifestyleNote', 'notes', 'staffNotes'],
    columns: [
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
    ],
  },
  'enquiry': {
    name: 'Enquiries',
    workflow: true,
    freezeThrough: 'name',
    wrap: ['message', 'staffNotes'],
    columns: [
      { key: 'referenceId',   title: 'Reference ID',     width: 130 },
      { key: 'submittedAt',   title: 'Submitted (IST)',  width: 150 },
      { key: 'status',        title: 'Status',           width: 150 },
      { key: 'staffNotes',    title: 'Staff Notes',      width: 220 },
      { key: 'name',          title: 'Name',             width: 160 },
      { key: 'phone',         title: 'Phone',            width: 115 },
      { key: 'email',         title: 'Email',            width: 190 },
      { key: 'form',          title: 'Form',             width: 170 },
      { key: 'interest',      title: 'Interested In',    width: 200 },
      { key: 'message',       title: 'Message',          width: 320 },
      { key: 'source',        title: 'Page',             width: 160 },
      { key: 'userAgent',     title: 'Device',           width: 160 },
    ],
  },
  'newsletter': {
    name: 'Newsletter',
    workflow: false,
    freezeThrough: null,
    wrap: [],
    columns: [
      { key: 'submittedAt',   title: 'Signed Up (IST)',  width: 150 },
      { key: 'email',         title: 'Email',            width: 260 },
      { key: 'source',        title: 'Page',             width: 220 },
    ],
  },
};

const colOf = (tab, key) => tab.columns.findIndex(c => c.key === key) + 1;

// ── Web app entry point ──────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Bots fill the hidden "website" field; pretend success and drop it.
    if (data.website) return json_({ ok: true });
    if (SHARED_TOKEN && data.token !== SHARED_TOKEN) return json_({ ok: false, error: 'bad-token' });

    const kind = TABS[data.kind] ? data.kind : 'health-test';   // older site builds send no kind
    const tab = TABS[kind];

    const name = clean_(data.name, 100);
    const phone = String(data.phone || '').replace(/\D/g, '').slice(-10);
    const email = clean_(data.email, 120);             // formula-safe value to store
    const plainEmail = email.replace(/^'/, '');
    const referenceId = clean_(data.referenceId, 40) || 'REF-' + Date.now();

    if (kind === 'newsletter') {
      if (!/^[^\s@=+\-][^\s@]*@[^\s@]+\.[^\s@]+$/.test(plainEmail)) return json_({ ok: false, error: 'invalid' });
    } else if (name.length < 2 || phone.length !== 10) {
      return json_({ ok: false, error: 'invalid' });
    }

    const cache = CacheService.getScriptCache();
    // The website may resend the same submission if it couldn't read our reply.
    if (cache.get('ref:' + referenceId)) return json_({ ok: true, referenceId, duplicate: true });

    const rateKey = 'rate:' + kind + ':' + (kind === 'newsletter' ? plainEmail.toLowerCase() : phone);
    const count = Number(cache.get(rateKey) || 0);
    if (count >= MAX_PER_CONTACT_PER_HOUR) return json_({ ok: false, error: 'rate-limited' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (cache.get('ref:' + referenceId)) return json_({ ok: true, referenceId, duplicate: true });
      const sheet = ensureTab_(tab);

      if (kind === 'newsletter' && emailAlreadyListed_(sheet, tab, plainEmail)) {
        cache.put('ref:' + referenceId, '1', 21600);
        return json_({ ok: true, referenceId, duplicate: true });
      }

      const photoUrl = kind === 'health-test' ? savePhoto_(data, referenceId, name) : '';
      const values = {
        referenceId,
        submittedAt:   new Date(),
        status:        'New',
        staffNotes:    '',
        name,
        phone,
        email,
        age:           clean_(data.age, 3),
        gender:        clean_(data.gender, 20),
        problem:       clean_(data.problem, 60),
        symptoms:      clean_(data.symptoms, 500),
        lifestyle:     clean_(data.lifestyle, 500),
        lifestyleNote: clean_(data.lifestyleNote, 2000),
        notes:         clean_(data.notes, 4000),
        photo:         '',
        consent:       data.consent === 'Yes' ? 'Yes' : 'No',
        form:          clean_(data.form, 60),
        interest:      clean_(data.interest, 120),
        message:       clean_(data.message, 4000),
        source:        clean_(data.source, 300),
        userAgent:     clean_(data.userAgent, 300),
      };

      const row = sheet.getLastRow() + 1;
      sheet.getRange(row, 1, 1, tab.columns.length).setValues([tab.columns.map(c => values[c.key])]);
      if (photoUrl) {
        sheet.getRange(row, colOf(tab, 'photo')).setFormula('=HYPERLINK("' + photoUrl + '","View photo")');
      }

      cache.put('ref:' + referenceId, '1', 21600);        // 6 hours
      cache.put(rateKey, String(count + 1), 3600);        // 1 hour window
    } finally {
      lock.releaseLock();
    }

    if (ALERT_EMAILS && kind !== 'newsletter') sendAlert_(kind, data, referenceId, name, phone);
    return json_({ ok: true, referenceId });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server-error' });
  }
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json_({ ok: true, service: 'Mangla website forms' });
}

// ── One-time setup (run from the editor: select "setup" → Run) ───
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  Object.keys(TABS).forEach(k => ensureTab_(TABS[k]));
  buildDashboard_(ss);
  getPhotoFolder_();
  // Touch MailApp so the permission prompt covers email alerts too.
  if (ALERT_EMAILS) MailApp.getRemainingDailyQuota();
  ss.setActiveSheet(ss.getSheetByName(TABS['health-test'].name));
  SpreadsheetApp.getUi().alert('Setup complete. Now deploy the script as a Web app (see APPS_SCRIPT_SETUP.md).');
}

function ensureTab_(tab) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(tab.name);
  if (sheet && sheet.getLastRow() > 0) return sheet;

  ss.setSpreadsheetTimeZone(TIMEZONE);
  if (!sheet) {
    // Reuse the default empty "Sheet1" if it's the only tab, otherwise add one.
    const first = ss.getSheets()[0];
    sheet = (first.getLastRow() === 0 && ss.getSheets().length === 1 && /^Sheet1$/.test(first.getName()))
      ? first.setName(tab.name)
      : ss.insertSheet(tab.name);
  }

  const n = tab.columns.length;
  sheet.getRange(1, 1, 1, n).setValues([tab.columns.map(c => c.title)])
    .setFontWeight('bold')
    .setFontColor('#FFFFFF')
    .setBackground('#0A6E66')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);
  if (tab.freezeThrough) sheet.setFrozenColumns(colOf(tab, tab.freezeThrough));
  tab.columns.forEach((c, i) => sheet.setColumnWidth(i + 1, c.width));

  const maxRows = sheet.getMaxRows();
  const body = (key) => sheet.getRange(2, colOf(tab, key), maxRows - 1, 1);
  const has = (key) => colOf(tab, key) > 0;

  body('submittedAt').setNumberFormat('dd mmm yyyy, hh:mm am/pm');
  ['phone', 'age'].filter(has).forEach(k => body(k).setNumberFormat('@'));   // keep as text
  tab.wrap.forEach(k => body(k).setWrap(true));
  sheet.getRange(2, 1, maxRows - 1, n).setVerticalAlignment('top');

  if (tab.workflow) {
    body('status').setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
    );
    // Colour each row by its Status.
    const statusLetter = columnLetter_(colOf(tab, 'status'));
    const rowRange = sheet.getRange(2, 1, maxRows - 1, n);
    sheet.setConditionalFormatRules(STATUSES.map(s =>
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=$' + statusLetter + '2="' + s + '"')
        .setBackground(STATUS_COLOURS[s])
        .setRanges([rowRange])
        .build()
    ));
    // Staff-only columns get a different header colour.
    sheet.getRange(1, colOf(tab, 'status'), 1, 2).setBackground('#B84C2B');
  }

  if (!sheet.getFilter()) sheet.getRange(1, 1, maxRows, n).createFilter();
  return sheet;
}

function emailAlreadyListed_(sheet, tab, email) {
  if (sheet.getLastRow() < 2) return false;
  const col = colOf(tab, 'email');
  return !!sheet.getRange(2, col, sheet.getLastRow() - 1, 1)
    .createTextFinder(email).matchEntireCell(true).matchCase(false).findNext();
}

function buildDashboard_(ss) {
  let dash = ss.getSheetByName(DASHBOARD);
  if (!dash) dash = ss.insertSheet(DASHBOARD);
  dash.clear();

  const ref = (tab, key) => {
    const letter = columnLetter_(colOf(tab, key));
    return "'" + tab.name + "'!" + letter + '2:' + letter;
  };
  const HT = TABS['health-test'], EQ = TABS['enquiry'], NL = TABS['newsletter'];

  dash.getRange('A1').setValue('Website Forms Dashboard').setFontSize(16).setFontWeight('bold').setFontColor('#0A6E66');
  dash.getRange('A2').setValue('Updates automatically from the other tabs.').setFontColor('#64748B');

  let r = 4;
  const section = (title, rows) => {
    dash.getRange(r, 1, 1, 2).setValues([[title, 'Count']])
      .setFontWeight('bold').setBackground('#0A6E66').setFontColor('#FFFFFF');
    if (rows.length) dash.getRange(r + 1, 1, rows.length, 2).setValues(rows);
    r += rows.length + 2;
  };
  const periodRows = (tab) => {
    const d = ref(tab, 'submittedAt');
    return [
      ['Total',        '=COUNTA(' + d + ')'],
      ['Today',        '=COUNTIFS(' + d + ',">="&TODAY())'],
      ['Last 7 days',  '=COUNTIFS(' + d + ',">="&TODAY()-6)'],
      ['This month',   '=COUNTIFS(' + d + ',">="&EOMONTH(TODAY(),-1)+1)'],
    ];
  };
  const statusRows = (tab) => STATUSES.map(s => [s, '=COUNTIF(' + ref(tab, 'status') + ',"' + s + '")']);
  const groupBy = (tab, key) =>
    '=IFERROR(QUERY({' + ref(tab, key) + '},"select Col1, count(Col1) where Col1 is not null group by Col1 order by count(Col1) desc label count(Col1) \'\'",0),"No data yet")';

  section('Health Tests', periodRows(HT));
  section('Health Tests by status', statusRows(HT));
  section('Health Tests by concern', []);
  dash.getRange(r - 1, 1).setFormula(groupBy(HT, 'problem'));
  r += 8;

  section('Enquiries', periodRows(EQ));
  section('Enquiries by status', statusRows(EQ));
  section('Enquiries by form', []);
  dash.getRange(r - 1, 1).setFormula(groupBy(EQ, 'form'));
  r += 6;

  section('Newsletter', [['Subscribers', '=COUNTA(' + ref(NL, 'email') + ')']]);

  dash.setColumnWidth(1, 260);
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

function sendAlert_(kind, data, referenceId, name, phone) {
  try {
    const lines = kind === 'health-test'
      ? ['Concern: ' + (data.problem || '—'), 'Symptoms: ' + (data.symptoms || '—'), 'Photo attached: ' + (data.imageBase64 ? 'Yes' : 'No')]
      : ['Form: ' + (data.form || '—'), 'Interested in: ' + (data.interest || '—'), 'Message: ' + (data.message || '—')];
    MailApp.sendEmail({
      to: ALERT_EMAILS,
      subject: (kind === 'health-test' ? 'New Health Test' : 'New Enquiry') + ' — ' + name + ' (' + referenceId + ')',
      body: ['Reference: ' + referenceId, 'Name: ' + name, 'Phone: ' + phone, 'Email: ' + (data.email || '—')]
        .concat(lines)
        .concat(['', 'Open the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()])
        .join('\n'),
    });
  } catch (err) {
    console.error('Alert email failed', err);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
