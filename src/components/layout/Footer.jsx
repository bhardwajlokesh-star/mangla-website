import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSheetSubmit } from '../../utils/useSheetSubmit';
import {
  Phone, Mail, MapPin, Clock, ChevronRight, ShieldCheck, Award,
  HeartPulse, Send
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   MANGLA HEALTHCARE — PROFESSIONAL FOOTER
   ────────────────────────────────────────────────────────────── */

const IconWA = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.9-.4-1.7-.9-2.4-1.6-.6-.6-1.2-1.3-1.6-2.1-.2-.4 0-.5.2-.7l.5-.6c.1-.2.2-.4.3-.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.7 5.9 5.2 2.9 1.2 3.5 1 4.1.9.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.3 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);
const IconFB = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9v-2c0-.9.3-1.5 1.5-1.5h1.5V4.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v3h2.6V21h2.9z"/>
  </svg>
);
const IconIG = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconYT = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...p}>
    <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5 3-5 3z"/>
  </svg>
);

const QUICK_LINKS = [
  { label: 'Home',              path: '/' },
  { label: 'About Us',          path: '/about' },
  { label: 'Ayurveda Hospital', path: '/hospital' },
  { label: 'Doctor Portal',     path: '/portal/login' },
  { label: 'Free Health Test',  path: '/health-test' },
  { label: 'Contact Us',        path: '/contact' },
];

const TREATMENTS = [
  { label: 'Panchkarma',      path: '/panchkarma' },
  { label: 'Pain Management', path: '/pain-management' },
  { label: 'Skin OPD',        path: '/services/skin-opd' },
  { label: 'Sexual Health',   path: '/services/sexual-health' },
  { label: 'Joint Pain',      path: '/services/joint-pain' },
  { label: 'Garbh Sanskar',   path: '/garbh-sanskar' },
];

const DIAGNOSTIC_LINKS = [
  { label: 'Blood Test',      path: '/diagnostics/blood-test' },
  { label: 'Digital X-Ray',   path: '/diagnostics/x-ray' },
  { label: 'Ultrasound',      path: '/diagnostics/ultrasound' },
  { label: 'Lab Services',    path: '/diagnostics/lab' },
  { label: 'Health Checkup',  path: '/services/opd' },
  { label: 'Suvarnaprashan',  path: '/suvarnaprashan' },
];

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const newsletter = useSheetSubmit('newsletter', 'Footer newsletter');

  const subscribe = async (e) => {
    e.preventDefault();
    if (await newsletter.submit({ email: newsletterEmail })) setNewsletterEmail('');
  };

  return (
    <footer style={{
      position: 'relative',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#e2e8f0',
      background:
        'radial-gradient(1200px 480px at 85% -10%, rgba(200,169,110,.12), transparent 60%),' +
        'radial-gradient(900px 400px at -10% 110%, rgba(10,110,102,.22), transparent 60%),' +
        'linear-gradient(180deg, #07202f 0%, #051621 100%)',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        .ft-display { font-family: 'Playfair Display', serif; }
        .ft-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(226,232,240,.72); text-decoration: none;
          font-size: 14px; padding: 5px 0;
          transition: all .2s ease;
        }
        .ft-link:hover { color: #c8a96e; transform: translateX(3px); }
        .ft-link .arr { opacity: 0; transition: opacity .2s ease; }
        .ft-link:hover .arr { opacity: 1; }
        .ft-social {
          width: 36px; height: 36px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(200,169,110,.22);
          color: rgba(247,243,237,.85);
          text-decoration: none;
          transition: all .25s ease;
        }
        .ft-social:hover { transform: translateY(-2px); color: #fff; }
        .ft-social.wa:hover { background: #25D366; border-color: #25D366; }
        .ft-social.fb:hover { background: #1877F2; border-color: #1877F2; }
        .ft-social.ig:hover { background: linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf); border-color: #d62976; }
        .ft-social.yt:hover { background: #FF0000; border-color: #FF0000; }

        .ft-main-grid {
          display: grid;
          grid-template-columns: minmax(260px, 1.4fr) repeat(3, minmax(140px,1fr)) minmax(260px, 1.2fr);
          gap: 40px;
        }
        @media (max-width: 1024px) {
          .ft-main-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
        }
        @media (max-width: 640px) {
          .ft-main-grid { grid-template-columns: 1fr; gap: 28px; padding-left: 46px !important; }
        }
        @media (max-width: 360px) {
          .ft-main-grid { padding-left: 42px !important; }
        }
      `}</style>

      {/* subtle dotted texture overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(200,169,110,.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: .55, pointerEvents: 'none',
      }} />

      {/* ===== TRUST RIBBON ===== */}
      <div style={{ position: 'relative', zIndex: 1, borderBottom: '1px solid rgba(200,169,110,.18)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '28px 20px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: 24,
        }}>
          {[
            { Icon: ShieldCheck, title: 'Quality Protocols', desc: 'Audited care standards' },
            { Icon: Award,       title: '15+ Years Legacy', desc: 'Trusted by 25,000+ families' },
            { Icon: HeartPulse,  title: 'Integrated Care',  desc: 'Allopathy + Ayurveda' },
            { Icon: Clock,       title: 'Open Mon–Sat',     desc: '9:00 AM – 8:00 PM' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(200,169,110,.14)',
                border: '1px solid rgba(200,169,110,.28)',
                color: '#c8a96e',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} strokeWidth={2.1} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{title}</p>
                <p style={{ fontSize: 12.5, color: 'rgba(226,232,240,.65)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="ft-main-grid" style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1280, margin: '0 auto',
        padding: '56px 20px 36px',
      }}>
        {/* ── BRAND ── */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
            <div style={{
              background: '#fff', borderRadius: 12, padding: '8px 12px',
              display: 'inline-flex', alignItems: 'center',
              boxShadow: '0 10px 22px -6px rgba(0,0,0,.4)',
            }}>
              <img src="/img/logo/rogjeet.webp" alt="Rogjeet Ayurveda" style={{ height: 38, width: 'auto', display: 'block' }} />
            </div>
            <div>
              <div className="ft-display" style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>
                Rogjeet <span style={{ color: '#c8a96e' }}>Ayurveda</span>
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(200,169,110,.85)', letterSpacing: '.05em', marginTop: 4 }}>
                A Unit of Mangla Healthcare
              </div>
            </div>
          </Link>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(226,232,240,.7)', marginBottom: 20 }}>
            A premium ecosystem of Ayurveda, modern diagnostics and compassionate hospital care —
            rooted in 15+ years of clinical excellence, audited care protocols and personalised treatment plans.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://wa.me/918222001891" target="_blank" rel="noreferrer" aria-label="WhatsApp"  className="ft-social wa"><IconWA/></a>
            <a href="https://facebook.com"  target="_blank" rel="noreferrer" aria-label="Facebook"  className="ft-social fb"><IconFB/></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="ft-social ig"><IconIG/></a>
            <a href="https://youtube.com"   target="_blank" rel="noreferrer" aria-label="YouTube"   className="ft-social yt"><IconYT/></a>
          </div>
        </div>

        {/* ── QUICK LINKS ── */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 800, color: '#c8a96e', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {QUICK_LINKS.map(l => (
              <Link key={l.path} to={l.path} className="ft-link">
                <ChevronRight size={12} className="arr" style={{ color: '#c8a96e' }} />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── TREATMENTS ── */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 800, color: '#c8a96e', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
            Treatments
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TREATMENTS.map(l => (
              <Link key={l.path} to={l.path} className="ft-link">
                <ChevronRight size={12} className="arr" style={{ color: '#c8a96e' }} />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── DIAGNOSTICS ── */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 800, color: '#c8a96e', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
            Diagnostics
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {DIAGNOSTIC_LINKS.map(l => (
              <Link key={l.path} to={l.path} className="ft-link">
                <ChevronRight size={12} className="arr" style={{ color: '#c8a96e' }} />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 800, color: '#c8a96e', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
            <a href="tel:+919992654891" style={{ display: 'flex', gap: 12, color: 'rgba(226,232,240,.85)', textDecoration: 'none' }}>
              <Phone size={16} style={{ color: '#c8a96e', marginTop: 2 }} />
              <span>
                <div style={{ fontSize: 13, color: 'rgba(226,232,240,.55)', marginBottom: 2 }}>Call Anytime</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>+91 99926 54891</div>
              </span>
            </a>
            <a href="mailto:care@manglahealthcare.com" style={{ display: 'flex', gap: 12, color: 'rgba(226,232,240,.85)', textDecoration: 'none' }}>
              <Mail size={16} style={{ color: '#c8a96e', marginTop: 2 }} />
              <span>
                <div style={{ fontSize: 13, color: 'rgba(226,232,240,.55)', marginBottom: 2 }}>Email</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>care@manglahealthcare.com</div>
              </span>
            </a>
            <div style={{ display: 'flex', gap: 12 }}>
              <MapPin size={16} style={{ color: '#c8a96e', marginTop: 2, flexShrink: 0 }} />
              <span>
                <div style={{ fontSize: 13, color: 'rgba(226,232,240,.55)', marginBottom: 2 }}>Address</div>
                <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.5 }}>
                  Medical Square,<br/>Jaipur, Rajasthan 302001
                </div>
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <form
            onSubmit={subscribe}
            noValidate
            style={{
              position: 'relative',
              display: 'flex',
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(200,169,110,.22)',
              borderRadius: 100, overflow: 'hidden',
              padding: 4,
            }}
          >
            <input {...newsletter.honeypotProps} />
            <input
              type="email"
              aria-label="Email for health tips"
              value={newsletterEmail}
              onChange={e => { setNewsletterEmail(e.target.value); if (newsletter.status !== 'sending') newsletter.reset(); }}
              placeholder={newsletter.sent ? 'Subscribed — thank you!' : 'Email for health tips'}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                padding: '8px 14px', fontSize: 13, color: '#fff',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              aria-label="Subscribe"
              disabled={newsletter.sending}
              style={{
                background: 'linear-gradient(135deg,#c8a96e,#a8884a)',
                border: 'none', borderRadius: 100,
                padding: '8px 12px', cursor: 'pointer',
                color: '#07202f',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Send size={14} strokeWidth={2.5} />
            </button>
          </form>
          {(newsletter.error || newsletter.sent) && (
            <p role={newsletter.error ? 'alert' : 'status'} style={{ marginTop: 8, fontSize: 12.5, color: newsletter.error ? '#fca5a5' : '#c8a96e' }}>
              {newsletter.error || 'Thanks! You are subscribed to our health tips.'}
            </p>
          )}
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(200,169,110,.18)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14, flexWrap: 'wrap',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(226,232,240,.6)' }}>
            © {new Date().getFullYear()} Mangla Healthcare. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <Link to="/privacy"  style={{ fontSize: 13, color: 'rgba(226,232,240,.7)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms"    style={{ fontSize: 13, color: 'rgba(226,232,240,.7)', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/sitemap"  style={{ fontSize: 13, color: 'rgba(226,232,240,.7)', textDecoration: 'none' }}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
