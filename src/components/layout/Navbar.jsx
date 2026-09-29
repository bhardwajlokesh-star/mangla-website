import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X, ChevronDown, Phone, MapPin, Clock, Search, Lock, Stethoscope,
  ClipboardCheck, Sun, Brain, HeartPulse, Leaf, Sparkles, ArrowRight,
  Baby, ShieldCheck, Salad, Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────
   MANGLA HEALTHCARE — MULTI-ROW PROFESSIONAL NAVBAR
   ────────────────────────────────────────────────────────────── */

const PHONE_NUMBER  = '+91 99926 54891';
const PHONE_HREF    = 'tel:+919992654891';
const WHATSAPP_HREF = 'https://wa.me/918222001891';

/* ── inline social svgs (lucide version here lacks brand glyphs) ── */
const IconWA = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.9-.4-1.7-.9-2.4-1.6-.6-.6-1.2-1.3-1.6-2.1-.2-.4 0-.5.2-.7l.5-.6c.1-.2.2-.4.3-.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.7 5.9 5.2 2.9 1.2 3.5 1 4.1.9.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.3 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);
const IconFB = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9v-2c0-.9.3-1.5 1.5-1.5h1.5V4.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v3h2.6V21h2.9z"/>
  </svg>
);
const IconIG = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="3.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconYT = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5 3-5 3z"/>
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   MENU DATA — mirrors the reference site sections
   ────────────────────────────────────────────────────────────── */
const AYURVEDA_HOSPITAL = [
  { name: 'Cafe',            desc: 'Ayurvedic café & wellness food',  icon: Utensils,       path: '/hospital/cafe' },
  { name: 'Mediclaim',       desc: 'Cashless insurance support',      icon: ShieldCheck,    path: '/hospital/mediclaim' },
  { name: 'Event',           desc: 'Workshops, camps & seminars',     icon: Sparkles,       path: '/hospital/event' },
  { name: 'Nature',          desc: 'Healing gardens & green spaces',  icon: Leaf,           path: '/hospital/nature' },
  { name: 'Health Checkup',  desc: 'Comprehensive wellness panels',   icon: ClipboardCheck, path: '/hospital/health-checkup' },
  { name: 'Health Cards',    desc: 'Membership & loyalty benefits',   icon: HeartPulse,     path: '/hospital/health-cards' },
];

const SPA_ITEMS = [
  { name: 'Hair', desc: 'Scalp & hair-fall therapies',  icon: Sparkles, path: '/spa/hair' },
  { name: 'Skin', desc: 'Glow, anti-ageing & Ubtan',    icon: Sun,      path: '/spa/skin' },
  { name: 'Body', desc: 'Detox, slimming & relaxation', icon: HeartPulse,path: '/spa/body' },
];

const YOGA_ITEMS = [
  { name: 'Music', desc: 'Sound & raga therapy sessions',  icon: Brain, path: '/yoga/music' },
  { name: 'Yoga',  desc: 'Guided asana & pranayama',       icon: Leaf,  path: '/yoga/classes' },
];

const PATHYA_ITEMS = [
  { name: 'Pregnancy Pathya', desc: 'Diet plans for expecting mothers', icon: Baby,     path: '/pathya/pregnancy' },
  { name: 'Common Pathya',    desc: 'Everyday Ayurvedic nutrition',     icon: Salad,    path: '/pathya/common' },
  { name: 'Panchakarma',      desc: 'Pre & post-therapy regimens',      icon: Utensils, path: '/pathya/panchkarma-diet' },
];

/* ── two navigation rows — matches reference exactly ── */
const PRIMARY_NAV = [
  { label: 'Home',                path: '/',                   mega: null },
  { label: 'Ayurveda Hospital',   path: '/hospital',           mega: 'hospital' },
  { label: 'Panchkarma',          path: '/panchkarma',         mega: null },
  { label: 'SuperSpeciality OPD', path: '/super-speciality',   mega: null },
  { label: 'Pain Management',     path: '/pain-management',    mega: null },
  { label: 'SPA',                 path: '/spa',                mega: 'spa' },
  { label: 'Yoga',                path: '/yoga',               mega: 'yoga' },
];

const SECONDARY_NAV = [
  { label: 'Shop Ayurveda',  path: '/shop',           mega: null },
  { label: 'Suvarnaprashan', path: '/suvarnaprashan', mega: null },
  { label: 'Pathya',         path: '/pathya',         mega: 'pathya' },
  { label: 'Garbh Sanskar',  path: '/garbh-sanskar',  mega: null },
  { label: 'About Us',       path: '/about',          mega: null },
  { label: 'Contact Us',     path: '/contact',        mega: null },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [openMega, setOpenMega]   = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub]   = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close any open menus when the route changes.
  const [lastLocationKey, setLastLocationKey] = useState(location.key);
  if (lastLocationKey !== location.key) {
    setLastLocationKey(location.key);
    setOpenMega(null);
    setMobileOpen(false);
    setMobileSub(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMega(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpenMega(null); setSearchOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const megaData = {
    hospital: { eyebrow: 'Ayurveda Hospital', title: 'Complete in-hospital care',     items: AYURVEDA_HOSPITAL, cols: 3 },
    spa:      { eyebrow: 'Spa',               title: 'Premium Ayurvedic spa rituals', items: SPA_ITEMS,         cols: 3 },
    yoga:     { eyebrow: 'Yoga & Music',      title: 'Mind, breath & movement',       items: YOGA_ITEMS,        cols: 2 },
    pathya:   { eyebrow: 'Pathya',            title: 'Therapeutic diet regimens',     items: PATHYA_ITEMS,      cols: 3 },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

        .mh-nav { font-family: 'Inter', system-ui, sans-serif; }
        .mh-display { font-family: 'Playfair Display', serif; }

        /* ===== TOP BAR ===== */
        .tb-link {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; font-weight: 500;
          color: rgba(247,243,237,.88); text-decoration: none;
          transition: color .18s ease;
        }
        .tb-link:hover { color: #c8a96e; }
        .tb-divider {
          width: 1px; height: 14px;
          background: linear-gradient(180deg, transparent, rgba(200,169,110,.45), transparent);
        }
        .social-pill {
          width: 30px; height: 30px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(200,169,110,.18);
          color: rgba(247,243,237,.85);
          transition: all .25s ease; text-decoration: none;
        }
        .social-pill:hover { transform: translateY(-1px); color:#fff; }
        .social-pill.wa:hover { background: #25D366; border-color: #25D366; }
        .social-pill.fb:hover { background: #1877F2; border-color: #1877F2; }
        .social-pill.ig:hover { background: linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf); border-color: #d62976; }
        .social-pill.yt:hover { background: #FF0000; border-color: #FF0000; }

        /* ===== PRIMARY NAV LINK ===== */
        .nav-pill {
          position: relative; padding: 10px 16px;
          font-size: 14.5px; font-weight: 600;
          color: #0f1e2c; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          border-radius: 10px; white-space: nowrap;
          transition: color .2s ease;
        }
        .nav-pill::after {
          content: ''; position: absolute;
          left: 16px; right: 16px; bottom: 4px;
          height: 2px; border-radius: 2px;
          background: linear-gradient(90deg,#0a6e66,#c8a96e);
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(.4,0,.2,1);
        }
        .nav-pill:hover { color: #0a6e66; }
        .nav-pill:hover::after, .nav-pill.active::after { transform: scaleX(1); }
        .nav-pill.active { color: #0a6e66; }

        /* ===== SECONDARY (lighter) NAV LINK ===== */
        .nav-sub {
          position: relative; padding: 10px 14px;
          font-size: 13.5px; font-weight: 600;
          color: #475569; text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          border-radius: 8px; white-space: nowrap;
          transition: color .2s ease;
        }
        .nav-sub::after {
          content: ''; position: absolute;
          left: 14px; right: 14px; bottom: 4px;
          height: 2px; border-radius: 2px;
          background: #c8a96e;
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(.4,0,.2,1);
        }
        .nav-sub:hover { color: #0a6e66; }
        .nav-sub:hover::after, .nav-sub.active::after { transform: scaleX(1); }
        .nav-sub.active { color: #0a6e66; }

        /* ===== MEGA PANEL ===== */
        .mega-shell {
          position: absolute; left: 0; right: 0; top: 100%;
          z-index: 95; padding: 0 20px;
        }
        .mega-card {
          max-width: 1280px; margin: 12px auto 0;
          background: #ffffff;
          border-radius: 22px;
          border: 1px solid #eef2f5;
          box-shadow:
            0 30px 70px -20px rgba(7,32,47,.22),
            0 8px 18px -8px rgba(7,32,47,.08);
          overflow: hidden;
        }
        .mega-tile {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px; border-radius: 14px;
          text-decoration: none;
          transition: all .25s cubic-bezier(.4,0,.2,1);
          border: 1px solid transparent;
        }
        .mega-tile:hover {
          background: linear-gradient(135deg,#f0fbf9 0%,#fdfaf2 100%);
          border-color: rgba(10,110,102,.12);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -16px rgba(10,110,102,.35);
        }
        .mega-tile .icon-wrap {
          width: 44px; height: 44px; flex-shrink: 0; border-radius: 12px;
          background: linear-gradient(135deg,#e8f5f3 0%,#f7efde 100%);
          color: #0a6e66;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all .3s ease;
        }
        .mega-tile:hover .icon-wrap {
          background: linear-gradient(135deg,#0a6e66 0%,#085a53 100%);
          color: #c8a96e;
          transform: rotate(-4deg) scale(1.05);
        }
        .mega-tile .name { font-size: 14.5px; font-weight: 700; color: #0f1e2c; margin-bottom: 3px; }
        .mega-tile .desc { font-size: 12.5px; color: #64748b; line-height: 1.45; }

        /* ===== HIGHLIGHTED HEALTH-TEST PILL ===== */
        @keyframes mhPulse {
          0%,100% { box-shadow: 0 6px 18px rgba(184,76,43,.30), 0 0 0 0 rgba(184,76,43,.45); }
          50%     { box-shadow: 0 8px 22px rgba(184,76,43,.40), 0 0 0 8px rgba(184,76,43,0); }
        }
        .health-test-cta {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg,#B84C2B 0%,#9a3e22 100%);
          color: #fff !important; padding: 8px 16px; border-radius: 100px;
          font-size: 12.8px; font-weight: 700; text-decoration: none;
          white-space: nowrap;
          animation: mhPulse 2.4s ease-in-out infinite;
          transition: transform .2s ease;
        }
        .health-test-cta:hover { transform: translateY(-1px); }
        .health-test-cta::after { display: none !important; }

        /* ===== DOCTOR PORTAL GLASS BUTTON ===== */
        .portal-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 20px; border-radius: 100px;
          background: linear-gradient(135deg, rgba(10,110,102,.92) 0%, rgba(8,90,83,.92) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(200,169,110,.35);
          color: #fff; text-decoration: none;
          font-size: 13.5px; font-weight: 700;
          box-shadow: 0 8px 22px -8px rgba(10,110,102,.55), inset 0 1px 0 rgba(255,255,255,.18);
          transition: all .3s ease;
        }
        .portal-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(200,169,110,.35), transparent 60%);
          opacity: 0; transition: opacity .3s ease;
        }
        .portal-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 32px -8px rgba(10,110,102,.65), inset 0 1px 0 rgba(255,255,255,.25);
          border-color: rgba(200,169,110,.6);
        }
        .portal-cta:hover::before { opacity: 1; }
        .portal-cta .lock-wrap {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(200,169,110,.22);
          display: inline-flex; align-items: center; justify-content: center;
        }

        /* ===== SEARCH BUTTON ===== */
        .search-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: #f1f5f9; border: none; cursor: pointer;
          color: #475569; display: inline-flex; align-items: center; justify-content: center;
          transition: all .2s ease;
        }
        .search-btn:hover { background: #e6f4f2; color: #0a6e66; transform: scale(1.06); }

        /* ===== MOBILE ===== */
        .mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-radius: 12px;
          font-size: 15.5px; font-weight: 600; color: #0f1e2c;
          text-decoration: none; transition: all .15s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: linear-gradient(135deg,#e6f4f2,#fdfaf2);
          color: #0a6e66;
        }
        .mobile-sub-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          font-size: 14px; font-weight: 500; color: #475569;
          text-decoration: none;
        }
        .mobile-sub-link:hover { background: #f0fbf9; color: #0a6e66; }

        /* ===== BREAKPOINTS ===== */
        @media (max-width: 1280px) { .desktop-only { display: none !important; } }
        @media (min-width: 1281px) { .mobile-only  { display: none !important; } }

        /* top-bar contact text hides under 720, socials stay */
        @media (max-width: 720px) {
          .tb-contact-extras { display: none !important; }
          .tb-center-logo { display: none !important; }
          .tb-wrap { grid-template-columns: 1fr auto !important; gap: 10px !important; padding: 8px 14px !important; }
        }
        /* mobile main row gets less padding */
        @media (max-width: 480px) {
          .nav-wrap-inner { padding: 0 14px !important; }
          .brand-tagline { display: none !important; }
          .brand-title { font-size: 17px !important; letter-spacing: -.3px !important; }
          .brand-mark { width: 40px !important; height: 40px !important; }
          .nav-logo-img { height: 40px !important; }
        }
        @media (max-width: 360px) {
          .brand-title { font-size: 15px !important; }
          .brand-mark { width: 36px !important; height: 36px !important; }
          .nav-logo-img { height: 34px !important; }
          .search-btn { width: 36px !important; height: 36px !important; }
        }

        .mh-stack { position: sticky; top: 0; z-index: 90; }

        /* hamburger animation */
        .ham { width: 22px; height: 18px; position: relative; display: inline-block; }
        .ham span {
          position: absolute; left: 0; width: 100%; height: 2px;
          background: #0f1e2c; border-radius: 2px;
          transition: all .35s cubic-bezier(.4,0,.2,1);
        }
        .ham span:nth-child(1) { top: 0; }
        .ham span:nth-child(2) { top: 50%; transform: translateY(-50%); }
        .ham span:nth-child(3) { bottom: 0; }
        .ham.open span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
        .ham.open span:nth-child(2) { opacity: 0; }
        .ham.open span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }
      `}</style>

      <div className="mh-nav mh-stack" ref={wrapRef}>

        {/* ═════════════ TOP HEADER BAR ═════════════ */}
        <div style={{
          background: 'linear-gradient(90deg,#07202f 0%,#0a2f3f 50%,#07202f 100%)',
          color: '#c8a96e',
          borderBottom: '1px solid rgba(200,169,110,.14)',
        }}>
          <div className="tb-wrap" style={{
            maxWidth: 1320, margin: '0 auto',
            padding: '10px 20px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center', gap: 18,
          }}>
            {/* LEFT — phone + address */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <a href={PHONE_HREF} className="tb-link">
                <Phone size={13} style={{ color: '#c8a96e' }} />
                <strong style={{ color: '#fff', fontWeight: 600 }}>{PHONE_NUMBER}</strong>
              </a>
              <span className="tb-divider desktop-only tb-contact-extras" />
              <span className="tb-link desktop-only tb-contact-extras">
                <MapPin size={13} style={{ color: '#c8a96e' }} />
                Medical Square, Jaipur · Rajasthan
              </span>
            </div>

            {/* CENTER — small logo lockup */}
            <Link to="/" className="desktop-only tb-center-logo" style={{
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
              justifyContent: 'center',
            }}>
              <div style={{
                background: '#fff', borderRadius: 7, padding: '3px 8px',
                display: 'inline-flex', alignItems: 'center',
                boxShadow: '0 4px 10px -2px rgba(0,0,0,.25)',
              }}>
                <img src="/img/logo/rogjeet.webp" alt="Rogjeet Ayurveda" style={{ height: 18, width: 'auto', display: 'block' }} />
              </div>
              <span className="mh-display" style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(247,243,237,.85)', letterSpacing: '.02em' }}>
                A Unit of <span style={{ color: '#c8a96e', fontWeight: 700 }}>Mangla Healthcare</span>
              </span>
            </Link>

            {/* RIGHT — opening hours */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <span className="tb-link">
                <Clock size={13} style={{ color: '#c8a96e' }} />
                <strong style={{ color: '#fff', fontWeight: 600 }}>Open Hours:</strong>
                <span className="tb-contact-extras">Mon – Sat · 9:00 AM – 8:00 PM · Sun Closed</span>
              </span>
            </div>
          </div>
        </div>

        {/* ═════════════ MAIN NAVBAR (logo + primary nav + actions) ═════════════ */}
        <nav style={{
          width: '100%',
          background: scrolled ? 'rgba(255,255,255,.92)' : '#ffffff',
          backdropFilter: scrolled ? 'saturate(180%) blur(18px)' : 'none',
          borderBottom: '1px solid #f1f5f9',
          boxShadow: scrolled ? '0 10px 30px -12px rgba(7,32,47,.12)' : 'none',
          transition: 'all .28s cubic-bezier(.4,0,.2,1)',
        }}>
          <div className="nav-wrap-inner" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 18,
              height: scrolled ? 70 : 86,
              transition: 'height .28s cubic-bezier(.4,0,.2,1)',
            }}>

              {/* LOGO */}
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 13, flexShrink: 0, minWidth: 0 }}>
                <img
                  src="/img/logo/rogjeet.webp"
                  alt="Rogjeet Ayurveda"
                  className="nav-logo-img"
                  style={{ height: scrolled ? 46 : 54, width: 'auto', flexShrink: 0, objectFit: 'contain', transition: 'height .28s' }}
                />
                <div className="brand-tagline" style={{ lineHeight: 1.25, minWidth: 0, borderLeft: '2px solid #e8edf2', paddingLeft: 13 }}>
                  <div className="mh-display" style={{ fontSize: 15, fontWeight: 700, color: '#0a6e66', letterSpacing: '.01em', whiteSpace: 'nowrap' }}>
                    Ayurveda
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: '#64748b', letterSpacing: '.03em', marginTop: 3, whiteSpace: 'nowrap' }}>
                    A Unit of Mangla Healthcare
                  </div>
                </div>
              </Link>

              {/* PRIMARY NAV (center) */}
              <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {PRIMARY_NAV.map(item => (
                  <NavLink key={item.path} item={item} openMega={openMega} setOpenMega={setOpenMega} isActive={isActive} variant="pill" />
                ))}
              </div>

              {/* RIGHT ACTIONS */}
              <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button className="search-btn" onClick={() => setSearchOpen(s => !s)} aria-label="Search">
                  <Search size={17} />
                </button>
                <Link
                  to="/portal/login"
                  className="portal-cta"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                  }}
                >
                  <span className="lock-wrap"><Lock size={11} /></span>
                  Doctor Portal
                </Link>
              </div>

              {/* MOBILE ACTIONS */}
              <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button className="search-btn" onClick={() => setSearchOpen(s => !s)} aria-label="Search">
                  <Search size={17} />
                </button>
                <a href={PHONE_HREF} aria-label="Call" style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#0a6e66,#085a53)',
                  color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', boxShadow: '0 6px 14px -4px rgba(10,110,102,.55)',
                }}>
                  <Phone size={16} />
                </a>
                <button
                  onClick={() => setMobileOpen(o => !o)}
                  aria-label="Open menu"
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: '#f1f5f9', border: 'none', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span className={`ham ${mobileOpen ? 'open' : ''}`}><span/><span/><span/></span>
                </button>
              </div>
            </div>
          </div>

          {/* ═════════════ SECONDARY NAV ROW ═════════════ */}
          <div className="desktop-only" style={{
            background: 'linear-gradient(180deg,#fcfaf5 0%,#f6f8f8 100%)',
            borderTop: '1px solid #eef2f5',
            borderBottom: '1px solid #eef2f5',
          }}>
            <div style={{
              maxWidth: 1320, margin: '0 auto', padding: '0 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
              minHeight: 48,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {SECONDARY_NAV.map(item => (
                  <NavLink key={item.path} item={item} openMega={openMega} setOpenMega={setOpenMega} isActive={isActive} variant="sub" />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link to="/health-test" className="health-test-cta">
                  <Sparkles size={13} /> Free Health Test
                </Link>
              </div>
            </div>
          </div>

          {/* ═════════════ MEGA MENU ═════════════ */}
          <AnimatePresence>
            {openMega && megaData[openMega] && (
              <motion.div
                key={openMega}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                onMouseEnter={() => setOpenMega(openMega)}
                onMouseLeave={() => setOpenMega(null)}
                className="mega-shell"
              >
                <div className="mega-card">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px' }}>
                    <div style={{ padding: '28px 24px' }}>
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                          {megaData[openMega].eyebrow}
                        </p>
                        <h3 className="mh-display" style={{ fontSize: 22, fontWeight: 700, color: '#0f1e2c', marginTop: 4 }}>
                          {megaData[openMega].title}
                        </h3>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${megaData[openMega].cols}, 1fr)`,
                        gap: 6,
                      }}>
                        {megaData[openMega].items.map(item => {
                          const Icon = item.icon;
                          return (
                            <Link key={item.path} to={item.path} className="mega-tile">
                              <span className="icon-wrap"><Icon size={20} strokeWidth={2.1} /></span>
                              <div>
                                <div className="name">{item.name}</div>
                                <div className="desc">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <FeaturePanel
                      eyebrow="Quality Care"
                      title="Trusted by 25,000+ families"
                      desc="Integrated allopathy + Ayurveda care under one premium roof."
                      cta="Book a Visit"
                      ctaPath="/contact"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═════════════ SEARCH OVERLAY ═════════════ */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 94,
                  background: 'rgba(255,255,255,.98)',
                  backdropFilter: 'blur(14px)',
                  borderBottom: '1px solid #e2e8f0',
                  padding: '22px 0',
                  boxShadow: '0 16px 32px -16px rgba(7,32,47,.18)',
                }}
              >
                <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: '#f8fafc', borderRadius: 14,
                    padding: '14px 18px', border: '1.5px solid #e2e8f0',
                  }}>
                    <Search size={20} color="#64748b" />
                    <input
                      autoFocus
                      placeholder="Search treatments, diagnostics, doctors..."
                      style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 16, fontFamily: 'inherit', color: '#0f1e2c' }}
                    />
                    <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#94a3b8' }}>
                      <X size={18} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', alignSelf: 'center', letterSpacing: '.1em' }}>POPULAR:</span>
                    {['Panchkarma', 'Knee Pain', 'Diabetes', 'Garbh Sanskar', 'Suvarnaprashan'].map(s => (
                      <span key={s} style={{
                        padding: '6px 14px', borderRadius: 100,
                        border: '1px solid #e2e8f0', background: '#fff',
                        fontSize: 12.5, fontWeight: 500, color: '#475569',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* ═════════════ MOBILE DRAWER ═════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(7,32,47,.55)', backdropFilter: 'blur(4px)', zIndex: 110 }}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              className="mh-nav"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(380px, 92vw)', background: '#fff',
                zIndex: 111, display: 'flex', flexDirection: 'column',
                boxShadow: '-16px 0 50px rgba(7,32,47,.2)',
              }}
            >
              <div style={{
                padding: '18px 20px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg,#07202f 0%,#0a3545 100%)',
                color: '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    background: '#fff', borderRadius: 9, padding: '5px 9px',
                    display: 'inline-flex', alignItems: 'center',
                  }}>
                    <img src="/img/logo/rogjeet.webp" alt="Rogjeet Ayurveda" style={{ height: 26, width: 'auto', display: 'block' }} />
                  </div>
                  <div>
                    <div className="mh-display" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1 }}>
                      Rogjeet <span style={{ color: '#c8a96e' }}>Ayurveda</span>
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(247,243,237,.7)', marginTop: 3 }}>
                      A Unit of Mangla Healthcare
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(255,255,255,.12)', border: 'none', cursor: 'pointer',
                    color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px 140px' }}>
                {[...PRIMARY_NAV, ...SECONDARY_NAV].map(item => (
                  <MobileItem key={item.path} item={item} mobileSub={mobileSub} setMobileSub={setMobileSub} isActive={isActive} closeMenu={() => setMobileOpen(false)} megaData={megaData} />
                ))}

                <Link to="/health-test" className="mobile-link" style={{
                  background: 'linear-gradient(135deg,#fff5f0,#fdf3e7)',
                  color: '#B84C2B', marginTop: 10,
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Sparkles size={16} /> Free Health Test
                  </span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/portal/login" className="mobile-link" style={{
                  background: 'linear-gradient(135deg,#e6f4f2,#dff0ee)',
                  color: '#0a6e66', marginTop: 6,
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Lock size={15} /> Doctor Portal
                  </span>
                  <ArrowRight size={15} />
                </Link>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '20px 12px 8px' }}>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="social-pill wa" style={{ background: '#f1f5f9', borderColor: '#e2e8f0', color: '#475569' }}><IconWA/></a>
                  <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="social-pill fb" style={{ background: '#f1f5f9', borderColor: '#e2e8f0', color: '#475569' }}><IconFB/></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill ig" style={{ background: '#f1f5f9', borderColor: '#e2e8f0', color: '#475569' }}><IconIG/></a>
                  <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="social-pill yt" style={{ background: '#f1f5f9', borderColor: '#e2e8f0', color: '#475569' }}><IconYT/></a>
                </div>
              </div>

              {/* sticky mobile bottom CTAs */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: 14, background: '#fff',
                borderTop: '1px solid #f1f5f9',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
                boxShadow: '0 -10px 24px -10px rgba(7,32,47,.1)',
              }}>
                <a href={PHONE_HREF} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg,#0a6e66,#085a53)',
                  color: '#fff', padding: '13px', borderRadius: 12,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  <Phone size={15} /> Call Now
                </a>
                <Link to="/health-test" onClick={() => setMobileOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg,#B84C2B,#9a3e22)',
                  color: '#fff', padding: '13px', borderRadius: 12,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  <Sparkles size={15} /> Free Test
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ──────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────────────────────────── */

const NavLink = ({ item, openMega, setOpenMega, isActive, variant }) => {
  const cls = variant === 'sub' ? 'nav-sub' : 'nav-pill';
  return (
    <div
      onMouseEnter={() => item.mega && setOpenMega(item.mega)}
      onMouseLeave={() => item.mega && setOpenMega(null)}
    >
      <Link to={item.path} className={`${cls} ${isActive(item.path) ? 'active' : ''}`}>
        {item.label}
        {item.mega && (
          <ChevronDown size={12} style={{
            transition: 'transform .25s ease',
            transform: openMega === item.mega ? 'rotate(180deg)' : 'none',
          }} />
        )}
      </Link>
    </div>
  );
};

const FeaturePanel = ({ eyebrow, title, desc, cta, ctaPath }) => (
  <div style={{
    padding: 28,
    background: 'linear-gradient(135deg,#07202f 0%,#0a3545 100%)',
    color: '#fff', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: -60, right: -60,
      width: 200, height: 200, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
    }} />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'rgba(200,169,110,.18)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
      }}>
        <Stethoscope size={20} color="#c8a96e" />
      </div>
      <p style={{ fontSize: 10.5, fontWeight: 800, color: '#c8a96e', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 6 }}>
        {eyebrow}
      </p>
      <h4 className="mh-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>{title}</h4>
      <p style={{ fontSize: 13, color: 'rgba(247,243,237,.72)', lineHeight: 1.55, marginBottom: 18 }}>{desc}</p>
      <Link to={ctaPath} style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: '#B84C2B', color: '#fff',
        padding: '10px 18px', borderRadius: 100,
        fontSize: 13, fontWeight: 700, textDecoration: 'none',
      }}>
        {cta} <ArrowRight size={13} />
      </Link>
    </div>
  </div>
);

const MobileItem = ({ item, mobileSub, setMobileSub, isActive, closeMenu, megaData }) => {
  if (!item.mega) {
    return (
      <Link to={item.path} className={`mobile-link ${isActive(item.path) ? 'active' : ''}`} onClick={closeMenu}>
        <span>{item.label}</span>
        <ArrowRight size={15} style={{ opacity: .35 }} />
      </Link>
    );
  }
  const open = mobileSub === item.mega;
  return (
    <>
      <button
        onClick={() => setMobileSub(open ? null : item.mega)}
        className={`mobile-link ${isActive(item.path) ? 'active' : ''}`}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
      >
        <span>{item.label}</span>
        <ChevronDown size={16} style={{
          transition: 'transform .25s',
          transform: open ? 'rotate(180deg)' : 'none',
        }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '4px 0 8px 14px', marginLeft: 18, borderLeft: '2px solid #e6f4f2' }}>
              {megaData[item.mega].items.map(it => {
                const Icon = it.icon;
                return (
                  <Link key={it.path} to={it.path} onClick={closeMenu} className="mobile-sub-link">
                    <Icon size={15} style={{ color: '#0a6e66', flexShrink: 0 }} />
                    <span>{it.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
