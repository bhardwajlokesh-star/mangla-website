/* ──────────────────────────────────────────────────────────────
   Doctor portal sign-in (static site, no server).

   This only keeps casual visitors out of the portal screens. Anyone
   determined can read the site's JavaScript, so never put real
   patient data behind this login.

   The password is stored as a SHA-256 hash, not in plain text.
   To change it, set these in .env and rebuild:
     VITE_PORTAL_USERNAME=doctor
     VITE_PORTAL_PASSWORD_SHA256=<hash>
   Get the hash with:
     node -e "console.log(require('crypto').createHash('sha256').update('YOUR_PASSWORD').digest('hex'))"
   ────────────────────────────────────────────────────────────── */

const USERNAME = import.meta.env.VITE_PORTAL_USERNAME || 'doctor';
// Default password: admin123 — change it before going live.
const PASSWORD_SHA256 =
  import.meta.env.VITE_PORTAL_PASSWORD_SHA256 ||
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

const SESSION_KEY = 'mangla_portal_session';

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}

export async function signIn(username, password) {
  if (username.trim() !== USERNAME) return false;
  if ((await sha256Hex(password)) !== PASSWORD_SHA256) return false;
  try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }
  return true;
}

export function signOut() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* storage blocked */ }
}

export function isSignedIn() {
  try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
}
