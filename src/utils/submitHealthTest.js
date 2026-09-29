/* ──────────────────────────────────────────────────────────────
   Free Health Test → "Health Tests" tab of the clinic's Google Sheet.
   Transport, retries and configuration live in ./sheetClient.js.
   ────────────────────────────────────────────────────────────── */

import { postToSheet, makeReferenceId } from './sheetClient';

export { makeReferenceId };

const MAX_IMAGE_DIMENSION = 1600;   // px, longest side after resizing
const MAX_RAW_IMAGE_BYTES = 8 * 1024 * 1024; // fallback when the browser can't resize (e.g. HEIC)

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
  const now = new Date();
  const referenceId = formData.referenceId || makeReferenceId('HT', now);

  let image;
  try {
    image = await prepareImage(formData.imageFile);
  } catch {
    return { ok: false, reason: 'image-too-large' };
  }

  const res = await postToSheet({
    kind:          'health-test',
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
  });
  return res.ok ? { ok: true, referenceId } : res;
}
