import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   COOKIE CONSENT BANNER (GA4 consent-mode aware)
   - Shows on first visit
   - Stores choice in localStorage
   - Updates GA4 consent state when accepted
   - Sends a page_view on every route change once accepted
   ────────────────────────────────────────────────────────────── */

const STORAGE_KEY = 'mh_cookie_consent';

const readChoice = () => {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

const applyConsent = (accepted) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage:        accepted ? 'granted' : 'denied',
    analytics_storage: accepted ? 'granted' : 'denied',
  });
};

const CookieConsent = () => {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(readChoice);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (choice) applyConsent(choice === 'accept');
  }, [choice]);

  useEffect(() => {
    if (choice === 'accept' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname, page_location: window.location.href });
    }
  }, [choice, pathname]);

  const handle = (accepted) => {
    const value = accepted ? 'accept' : 'reject';
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* storage blocked */ }
    setChoice(value);
  };

  if (choice) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 16, left: 16, right: 16,
        maxWidth: 560, margin: '0 auto',
        zIndex: 200,
        background: '#fff',
        borderRadius: 18,
        border: '1px solid #eef2f5',
        boxShadow: '0 24px 60px -20px rgba(15,30,44,.32)',
        padding: 20,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg,#e6f4f2,#f7efde)',
          color: '#0a6e66',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ShieldCheck size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f1e2c', marginBottom: 6 }}>
            We respect your privacy
          </h3>
          <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.55 }}>
            We use a minimal set of cookies for the site to work, and{' '}
            <button
              onClick={() => setShowDetails(s => !s)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                color: '#0a6e66', fontWeight: 600, textDecoration: 'underline',
                fontFamily: 'inherit', fontSize: 'inherit',
              }}
            >
              optional analytics
            </button>{' '}
            to understand what's working. See our{' '}
            <Link to="/privacy" style={{ color: '#0a6e66', fontWeight: 600 }}>Privacy Policy</Link>.
          </p>

          {showDetails && (
            <div style={{
              marginTop: 12, padding: 12,
              background: '#f8fafc', borderRadius: 10,
              fontSize: 12.5, color: '#475569', lineHeight: 1.55,
            }}>
              <p style={{ marginBottom: 6 }}>
                <strong style={{ color: '#0f1e2c' }}>Essential:</strong> remembering your consent choice (always on).
              </p>
              <p>
                <strong style={{ color: '#0f1e2c' }}>Analytics:</strong> anonymised page views via Google Analytics 4 — only if you accept.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => handle(true)}
              style={{
                background: 'linear-gradient(135deg,#0a6e66,#085a53)',
                color: '#fff', border: 'none',
                padding: '10px 18px', borderRadius: 100,
                fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 8px 18px -8px rgba(10,110,102,.55)',
              }}
            >
              Accept all
            </button>
            <button
              onClick={() => handle(false)}
              style={{
                background: '#f1f5f9', color: '#475569', border: 'none',
                padding: '10px 18px', borderRadius: 100,
                fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Essential only
            </button>
          </div>
        </div>
        <button
          onClick={() => handle(false)}
          aria-label="Dismiss"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', padding: 4, marginTop: -4,
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
