import React from 'react';
import { useLocation } from 'react-router-dom';

/* ──────────────────────────────────────────────────────────────
   MANGLA HEALTHCARE — Floating social dock (fixed, left edge)
   Always visible, gentle hover lift, brand-coloured on hover.
   Hidden on routes inside the portal and on phones (<640px).
   ────────────────────────────────────────────────────────────── */

const IconWA = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.9-.4-1.7-.9-2.4-1.6-.6-.6-1.2-1.3-1.6-2.1-.2-.4 0-.5.2-.7l.5-.6c.1-.2.2-.4.3-.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.7 5.9 5.2 2.9 1.2 3.5 1 4.1.9.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.3 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);
const IconFB = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9v-2c0-.9.3-1.5 1.5-1.5h1.5V4.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v3h2.6V21h2.9z"/>
  </svg>
);
const IconIG = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconYT = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5 3-5 3z"/>
  </svg>
);
const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ITEMS = [
  { href: 'tel:+919992654891',           label: 'Call',      Icon: IconPhone, cls: 'fl-call' },
  { href: 'https://wa.me/918222001891',  label: 'WhatsApp',  Icon: IconWA,    cls: 'fl-wa', external: true },
  { href: 'https://facebook.com',        label: 'Facebook',  Icon: IconFB,    cls: 'fl-fb', external: true },
  { href: 'https://instagram.com',       label: 'Instagram', Icon: IconIG,    cls: 'fl-ig', external: true },
  { href: 'https://youtube.com',         label: 'YouTube',   Icon: IconYT,    cls: 'fl-yt', external: true },
];

const FloatingSocials = () => {
  const location = useLocation();
  // Hide on portal routes — they have their own chrome
  if (location.pathname.startsWith('/portal')) return null;

  return (
    <div className="fl-dock" aria-label="Connect with us">
      <style>{`
        .fl-dock {
          position: fixed;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 70;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 6px;
          background: rgba(255,255,255,.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(10,110,102,.18);
          border-left: none;
          border-top-right-radius: 14px;
          border-bottom-right-radius: 14px;
          box-shadow: 6px 8px 24px -10px rgba(7,32,47,.25);
        }
        .fl-link {
          position: relative;
          width: 40px; height: 40px; border-radius: 10px;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg,#0a6e66,#085a53);
          box-shadow: 0 6px 14px -6px rgba(10,110,102,.55), inset 0 1px 0 rgba(255,255,255,.18);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .fl-link::after {
          /* label that slides out on hover */
          content: attr(data-label);
          position: absolute;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px; font-weight: 600;
          background: #0f1e2c; color: #c8a96e;
          white-space: nowrap;
          opacity: 0; pointer-events: none;
          transition: opacity .25s ease, transform .25s ease;
          box-shadow: 0 8px 20px -8px rgba(7,32,47,.5);
        }
        .fl-link::before {
          /* arrow on the label tooltip */
          content: '';
          position: absolute;
          left: calc(100% + 4px);
          top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border: 5px solid transparent;
          border-right-color: #0f1e2c;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .fl-link:hover { transform: translateX(4px) scale(1.05); }
        .fl-link:hover::after { opacity: 1; transform: translateY(-50%) translateX(2px); }
        .fl-link:hover::before { opacity: 1; }

        /* per-icon hover colour overrides */
        .fl-link.fl-call:hover { background: linear-gradient(135deg,#0a6e66,#063f3a); }
        .fl-link.fl-wa:hover   { background: linear-gradient(135deg,#25D366,#1da851); }
        .fl-link.fl-fb:hover   { background: linear-gradient(135deg,#1877F2,#0c5dc7); }
        .fl-link.fl-ig:hover   { background: linear-gradient(135deg,#feda75,#fa7e1e 35%,#d62976 65%,#962fbf); }
        .fl-link.fl-yt:hover   { background: linear-gradient(135deg,#FF0000,#c00000); }

        @keyframes flBreathe {
          0%,100% { box-shadow: 0 6px 14px -6px rgba(10,110,102,.55), inset 0 1px 0 rgba(255,255,255,.18), 0 0 0 0 rgba(37,211,102,.5); }
          70%     { box-shadow: 0 6px 14px -6px rgba(10,110,102,.55), inset 0 1px 0 rgba(255,255,255,.18), 0 0 0 8px rgba(37,211,102,0); }
        }
        .fl-link.fl-wa { animation: flBreathe 2.4s ease-in-out infinite; background: linear-gradient(135deg,#25D366,#1da851); }

        /* mobile: stay on the left edge, just shrink for compact footprint */
        @media (max-width: 640px) {
          .fl-dock {
            gap: 4px;
            padding: 4px;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
          }
          .fl-link { width: 34px; height: 34px; border-radius: 9px; }
          .fl-link svg { width: 14px; height: 14px; }
          /* hide the tooltip on touch — no hover state on phones */
          .fl-link::after, .fl-link::before { display: none; }
          .fl-link:hover { transform: none; }
        }
        @media (max-width: 360px) {
          .fl-link { width: 30px; height: 30px; }
          .fl-link svg { width: 13px; height: 13px; }
        }
      `}</style>

      {ITEMS.map(({ href, label, Icon, cls, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          aria-label={label}
          data-label={label}
          className={`fl-link ${cls}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
