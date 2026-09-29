/* ──────────────────────────────────────────────────────────────
   Shared client for the Google Apps Script web app that stores
   every website form in the clinic's Google Sheet
   (see /google-apps-script/Code.gs and /APPS_SCRIPT_SETUP.md).

   Configure via .env:
     VITE_HEALTH_TEST_ENDPOINT = the /exec Web App URL (used by all forms)
     VITE_HEALTH_TEST_TOKEN    = optional shared value (must match
                                 SHARED_TOKEN in Code.gs). It ships in
                                 the public JavaScript, so it only
                                 filters out casual junk, not attackers.
   ────────────────────────────────────────────────────────────── */

import { clinic } from '../config/clinic';

const SHEET_ENDPOINT = import.meta.env.VITE_HEALTH_TEST_ENDPOINT || '';
const SHEET_TOKEN = import.meta.env.VITE_HEALTH_TEST_TOKEN || '';

/* Short, human-friendly reference like HT-260930-4K7Q. The Apps Script
   also uses it to ignore accidental duplicate submissions. */
export function makeReferenceId(prefix = 'HT', date = new Date()) {
  const ist = new Date(date.getTime() + 5.5 * 3600 * 1000);
  const ymd = ist.toISOString().slice(2, 10).replace(/-/g, '');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (const b of crypto.getRandomValues(new Uint8Array(4))) rand += alphabet[b % alphabet.length];
  return `${prefix}-${ymd}-${rand}`;
}

// Accepts 10-digit Indian mobile numbers, with or without +91 / 0 and spaces.
export const normalisePhone = (raw) => {
  const digits = String(raw || '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

export const isValidEmail = (raw) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(raw || '').trim());

/* Patient-facing wording for each failure reason. */
export const SUBMIT_ERRORS = {
  'not-configured': `Online requests are not available right now. Please call us on ${clinic.phone}.`,
  'rate-limited': 'We have already received several requests from you. Our team will contact you shortly.',
  'image-too-large': 'That photo is too large to send. Please choose a smaller image, or remove it and submit.',
  default: `Could not send right now. Please try again, or call us on ${clinic.phone}.`,
};

/**
 * Sends one form submission to the Sheet.
 * @returns {Promise<{ok: true} | {ok: false, reason: string}>}
 */
export async function postToSheet(payload) {
  if (!SHEET_ENDPOINT) {
    console.error('[sheetClient] VITE_HEALTH_TEST_ENDPOINT is not set.');
    return { ok: false, reason: 'not-configured' };
  }

  const body = JSON.stringify({
    token:     SHEET_TOKEN,
    source:    typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    ...payload,
  });

  // Apps Script replies with CORS headers for "simple" text/plain POSTs, so we
  // can normally read its { ok } answer.
  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
    });
    const data = await res.json();
    if (data && data.ok) return { ok: true };
    console.error('[sheetClient] rejected:', data && data.error);
    return { ok: false, reason: data && data.error === 'rate-limited' ? 'rate-limited' : 'rejected' };
  } catch (err) {
    // The response couldn't be read (some browsers/extensions block it).
    // Resend without reading the reply; the script ignores a repeated
    // referenceId, so this can never create a duplicate row.
    console.warn('[sheetClient] response unreadable, retrying blind:', err);
    try {
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      });
      return { ok: true };
    } catch (err2) {
      console.error('[sheetClient] failed:', err2);
      return { ok: false, reason: 'network' };
    }
  }
}
