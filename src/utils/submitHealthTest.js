/* ──────────────────────────────────────────────────────────────
   Submit Free Health Test data to a Google Sheet via a
   Google Apps Script Web App (see /google-apps-script/Code.gs).

   Setup: see /APPS_SCRIPT_SETUP.md (root of project).

   Configure via .env:
     VITE_HEALTH_TEST_ENDPOINT = the /exec Web App URL
     VITE_HEALTH_TEST_TOKEN    = optional shared value (must match
                                 SHARED_TOKEN in Code.gs). It ships in
                                 the public JavaScript, so it only
                                 filters out casual junk, not attackers.
   ────────────────────────────────────────────────────────────── */

const SHEET_ENDPOINT = import.meta.env.VITE_HEALTH_TEST_ENDPOINT || '';
const SHEET_TOKEN = import.meta.env.VITE_HEALTH_TEST_TOKEN || '';

const MAX_IMAGE_DIMENSION = 1600;   // px, longest side after resizing
const MAX_RAW_IMAGE_BYTES = 8 * 1024 * 1024; // fallback when the browser can't resize (e.g. HEIC)

/* Short, human-friendly reference like HT-260930-4K7Q. Also used by the
   Apps Script to ignore accidental duplicate submissions. */
export function makeReferenceId(date = new Date()) {
  const ist = new Date(date.getTime() + 5.5 * 3600 * 1000);
  const ymd = ist.toISOString().slice(2, 10).replace(/-/g, '');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  for (const b of bytes) rand += alphabet[b % alphabet.length];
  return `HT-${ymd}-${rand}`;
}

/* Downscale a photo to a JPEG so uploads stay small on mobile data.
   Returns { base64, mimeType } or null if the browser can't decode it. */
async function compressImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
    return { base64: dataUrl.split(',')[1], mimeType: 'image/jpeg' };
  } catch {
    return null;
  }
}

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function prepareImage(file) {
  if (!file) return { imageBase64: '', imageMimeType: '' };
  const compressed = await compressImage(file);
  if (compressed) return { imageBase64: compressed.base64, imageMimeType: compressed.mimeType };
  // Browser can't decode this format (e.g. HEIC on Chrome): send as-is if it's not huge.
  if (file.size > MAX_RAW_IMAGE_BYTES) {
    throw new Error('IMAGE_TOO_LARGE');
  }
  return { imageBase64: await readAsBase64(file), imageMimeType: file.type || 'application/octet-stream' };
}

/**
 * @returns {Promise<{ok: true, referenceId: string} | {ok: false, reason: string}>}
 */
export async function submitHealthTest(formData) {
  if (!SHEET_ENDPOINT) {
    console.error('[submitHealthTest] VITE_HEALTH_TEST_ENDPOINT is not set.');
    return { ok: false, reason: 'not-configured' };
  }

  const now = new Date();
  const referenceId = formData.referenceId || makeReferenceId(now);

  let image;
  try {
    image = await prepareImage(formData.imageFile);
  } catch {
    return { ok: false, reason: 'image-too-large' };
  }

  const payload = {
    token:         SHEET_TOKEN,
    website:       formData.website || '',   // honeypot — humans leave this empty
    referenceId,
    timestamp:     now.toISOString(),
    name:          (formData.name || '').trim(),
    age:           formData.age || '',
    gender:        formData.gender || '',
    phone:         (formData.phone || '').trim(),
    email:         (formData.email || '').trim(),
    problem:       formData.problem || '',
    symptoms:      Array.isArray(formData.symptoms) ? formData.symptoms.join(', ') : '',
    lifestyle:     Array.isArray(formData.lifestyle) ? formData.lifestyle.join(', ') : '',
    lifestyleNote: formData.lifestyleNote || '',
    notes:         formData.notes || '',
    consent:       formData.consent ? 'Yes' : 'No',
    imageName:     formData.imageName || '',
    ...image,
    source:        typeof window !== 'undefined' ? window.location.href : '',
    userAgent:     typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };
  const body = JSON.stringify(payload);

  // Apps Script replies with CORS headers for "simple" text/plain POSTs, so we
  // can normally read its { ok } answer.
  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
    const data = await res.json();
    if (data && data.ok) return { ok: true, referenceId };
    console.error('[submitHealthTest] rejected:', data && data.error);
    return { ok: false, reason: data && data.error === 'rate-limited' ? 'rate-limited' : 'rejected' };
  } catch (err) {
    // The response couldn't be read (some browsers/extensions block it).
    // Resend without reading the reply; the script ignores a repeated
    // referenceId, so this can never create a duplicate row.
    console.warn('[submitHealthTest] response unreadable, retrying blind:', err);
    try {
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      });
      return { ok: true, referenceId };
    } catch (err2) {
      console.error('[submitHealthTest] failed:', err2);
      return { ok: false, reason: 'network' };
    }
  }
}
