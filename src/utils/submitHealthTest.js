/* ──────────────────────────────────────────────────────────────
   Submit Free Health Test data to a Google Sheet via a
   Google Apps Script Web App.

   Setup: see /APPS_SCRIPT_SETUP.md (root of project).

   Configure via .env (recommended):
     VITE_HEALTH_TEST_ENDPOINT = the /exec Web App URL
     VITE_HEALTH_TEST_TOKEN    = a shared secret (must match the script)
   ────────────────────────────────────────────────────────────── */

const SHEET_ENDPOINT =
  import.meta.env.VITE_HEALTH_TEST_ENDPOINT ||
  'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec';

const SHEET_TOKEN = import.meta.env.VITE_HEALTH_TEST_TOKEN || '';

export async function submitHealthTest(formData) {
  const now = new Date();

  // Human-readable date + time in India Standard Time for the sheet.
  const dateIST = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  // Flatten arrays so Sheets stays human-readable
  const payload = {
    token:     SHEET_TOKEN,                 // verified server-side
    website:   formData.website || '',      // honeypot — humans leave this empty
    timestamp: now.toISOString(),           // machine-sortable
    date:      dateIST,                     // readable date/time (IST)
    name:      formData.name      || '',
    age:       formData.age       || '',
    gender:    formData.gender    || '',
    phone:     formData.phone     || '',
    email:     formData.email     || '',
    problem:   formData.problem   || '',
    symptoms:  Array.isArray(formData.symptoms)  ? formData.symptoms.join(', ')  : '',
    lifestyle: Array.isArray(formData.lifestyle) ? formData.lifestyle.join(', ') : '',
    hasImage:  formData.image ? 'Yes' : 'No',
    imageName: formData.imageName || '',
    imageSize: formData.imageSize || '',
    notes:     formData.notes || '',
    source:    typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };

  // Apps Script Web Apps don't return CORS headers for fetch responses,
  // so we use mode:'no-cors' and treat a non-throwing call as success.
  try {
    await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch (err) {
    console.error('[submitHealthTest] failed:', err);
    return { ok: false, error: err };
  }
}
