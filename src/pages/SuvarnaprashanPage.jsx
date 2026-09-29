import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, Calendar, Leaf, Sparkles, ChevronRight, ChevronLeft, ArrowRight,
  ShieldCheck, Brain, Flame, Utensils, Baby, Activity, HeartPulse, Smile, TrendingUp,
} from 'lucide-react';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   SUVARNAPRASHAN — mirrors the Nirvikar Ayurveda suvarnprashan
   page (two hero images → intro → 9 benefits → calendar → register),
   rebuilt with Mangla Ayurveda branding & contact.
   The two hero images are intentional placeholders (replace later).
   Pushya-Nakshatra dates are marked in PUSHYA_DATES below — fill
   in the exact dates and they highlight automatically.
   Palette: #1E5B4F / #C9A86A / #FAF8F3 / #DDE8E3.
   ────────────────────────────────────────────────────────────── */

/* ── image placeholder (real <img> when src provided) ── */
const ImagePlaceholder = ({ label = 'Image Placeholder', ratio = '4/3', rounded = 22, accent = false, src }) => {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  return (
    <div
      aria-label={label} role="img"
      style={{
        position: 'relative', aspectRatio: ratio, width: '100%', borderRadius: rounded,
        background: showImage ? '#DDE8E3'
          : accent ? 'linear-gradient(135deg, #DDE8E3 0%, #C9A86A22 50%, #DDE8E3 100%)'
            : 'linear-gradient(135deg, #DDE8E3 0%, #FAF8F3 100%)',
        border: showImage ? '1px solid rgba(30,91,79,0.1)' : '1.5px dashed rgba(30, 91, 79, 0.28)',
        boxShadow: showImage ? '0 18px 40px -22px rgba(30,91,79,.35)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 10, overflow: 'hidden',
      }}
    >
      {showImage ? (
        <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      ) : (
        <>
          <div style={{
            position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(30,91,79,.08)', color: '#1E5B4F',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Leaf size={18} strokeWidth={2} />
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'rgba(30,91,79,.1)', color: '#1E5B4F',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={26} strokeWidth={1.8} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(30,91,79,.7)' }}>
            {label}
          </p>
        </>
      )}
    </div>
  );
};

/* ── the 9 benefits (same points as the reference page) ── */
const BENEFITS = [
  { icon: ShieldCheck, text: 'Boosts immunity and builds resistance against common infections.' },
  { icon: TrendingUp,  text: 'Supports healthy physical growth — height, weight and overall strength.' },
  { icon: Brain,       text: "Sharpens intellect, grasping power, concentration and memory recall." },
  { icon: Flame,       text: 'Kindles the digestive fire and eases digestion-related complaints.' },
  { icon: Utensils,    text: "Improves the child's appetite." },
  { icon: Baby,        text: 'Nurtures and supports early developmental milestones.' },
  { icon: Activity,    text: 'Develops a strong defence mechanism that acts as a protective shield.' },
  { icon: HeartPulse,  text: 'Helps the body recover faster in case of any illness.' },
  { icon: Smile,       text: 'Reduces anxiety, aggressiveness, irritability and attention-seeking behaviour.' },
];

/* ── Pushya-Nakshatra / Suvarnaprashan dates (2026, IST).
   Format: 'YYYY-MM-DD'. Marked dates highlight on the calendar below. ── */
const PUSHYA_DATES = [
  '2026-01-04', '2026-01-05',                  // January 4–5
  '2026-02-01',                                // February 1 (Ravi Pushya)
  '2026-02-28', '2026-03-01',                  // February 28 – March 1
  '2026-03-27', '2026-03-28',                  // March 27–28
  '2026-04-23', '2026-04-24',                  // April 23–24
  '2026-05-21', '2026-05-22',                  // May 21–22
  '2026-06-17', '2026-06-18',                  // June 17–18
  '2026-07-15',                                // July 15
  '2026-08-11', '2026-08-12',                  // August 11–12
  '2026-09-07', '2026-09-08',                  // September 7–8
  '2026-10-05',                                // October 5
  '2026-11-01', '2026-11-02',                  // November 1–2
  '2026-11-28', '2026-11-29',                  // November 28–29
  '2026-12-25', '2026-12-26',                  // December 25–26
];

/* Special Ravi Pushya Yoga days (considered especially auspicious) */
const SPECIAL_DATES = new Set(['2026-01-04', '2026-02-01']);

/* ── simple month calendar with highlighted Pushya dates ── */
const SuvarnaCalendar = () => {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const pushyaSet = new Set(PUSHYA_DATES);

  const year = view.getFullYear();
  const month = view.getMonth();
  const monthName = view.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();          // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const iso = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const isToday = (d) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const shift = (n) => setView(new Date(year, month + n, 1));

  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(30,91,79,.1)', borderRadius: 22,
      padding: 'clamp(20px, 3vw, 32px)', boxShadow: '0 24px 56px -36px rgba(30,91,79,.4)',
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={() => shift(-1)} aria-label="Previous month" style={navBtn}>
          <ChevronLeft size={18} />
        </button>
        <h3 className="sv-display" style={{ fontSize: 24, fontWeight: 700, color: '#1E5B4F' }}>{monthName}</h3>
        <button onClick={() => shift(1)} aria-label="Next month" style={navBtn}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* weekday row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(w => (
          <div key={w} style={{ textAlign: 'center', fontSize: 11.5, fontWeight: 800, color: '#C9A86A', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            {w}
          </div>
        ))}
      </div>

      {/* day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />;
          const key = iso(d);
          const marked = pushyaSet.has(key);
          const special = SPECIAL_DATES.has(key);
          const todayCell = isToday(d);
          return (
            <div
              key={d}
              title={special ? 'Ravi Pushya Yoga — especially auspicious' : marked ? 'Pushya Nakshatra — Suvarnaprashan day' : undefined}
              style={{
                position: 'relative',
                aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10, fontSize: 14, fontWeight: marked ? 800 : 500,
                background: marked ? 'linear-gradient(135deg, #C9A86A, #b8965a)' : todayCell ? '#DDE8E3' : 'transparent',
                color: marked ? '#1E5B4F' : todayCell ? '#1E5B4F' : '#2D2D2D',
                border: special ? '2px solid #1E5B4F' : marked ? '1px solid #b8965a' : '1px solid transparent',
                boxShadow: marked ? '0 8px 18px -8px rgba(201,168,106,.7)' : 'none',
                cursor: 'default',
              }}
            >
              {d}
              {special && (
                <span aria-hidden style={{
                  position: 'absolute', top: 2, right: 4, fontSize: 9, color: '#1E5B4F', fontWeight: 900,
                }}>★</span>
              )}
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div style={{ display: 'flex', gap: 20, marginTop: 22, flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#2D2D2D99' }}>
          <span style={{ width: 16, height: 16, borderRadius: 5, background: 'linear-gradient(135deg, #C9A86A, #b8965a)' }} />
          Pushya Nakshatra (Suvarnaprashan day)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#2D2D2D99' }}>
          <span style={{ width: 16, height: 16, borderRadius: 5, background: '#DDE8E3' }} />
          Today
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#2D2D2D99' }}>
          <span style={{ width: 16, height: 16, borderRadius: 5, border: '2px solid #1E5B4F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#1E5B4F', fontWeight: 900 }}>★</span>
          Ravi Pushya Yoga
        </span>
      </div>

      <p style={{ fontSize: 12.5, color: '#2D2D2D88', marginTop: 14, lineHeight: 1.6 }}>
        Special Ravi Pushya Yoga days in 2026 — 4 January &amp; 1 February — are considered especially
        auspicious for Suvarnaprashan.
      </p>
    </div>
  );
};

const navBtn = {
  width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(30,91,79,.15)',
  background: '#FAF8F3', color: '#1E5B4F', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const SuvarnaprashanPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Suvarnaprashan',
    description: 'Classical Ayurvedic immunisation drops for children aged 0–15 years to boost immunity, reduce recurrent illness, and improve concentration and memory — given on Pushya Nakshatra at Mangla Ayurveda.',
    relevantSpecialty: 'Ayurveda',
  };

  return (
    <div className="sv-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Suvarnaprashan for Children"
        description="Suvarnaprashan at Mangla Ayurveda — Ayurvedic immunity drops for children (0–15 yrs) to boost immunity, growth, memory & concentration. Given on Pushya Nakshatra. Register now."
        schema={schema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .sv-page { font-family: 'Inter', system-ui, sans-serif; }
        .sv-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
        .sv-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F; font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .sv-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .sv-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        .sv-card {
          background: #fff; border: 1px solid rgba(30,91,79,.08); border-radius: 18px;
          padding: 22px; display: flex; gap: 14px; align-items: flex-start;
          transition: all .3s ease;
        }
        .sv-card:hover { border-color: rgba(201,168,106,.45); box-shadow: 0 18px 36px -22px rgba(30,91,79,.4); transform: translateY(-3px); }
        @media (max-width: 900px) {
          .sv-grid-2 { grid-template-columns: 1fr !important; }
          .sv-benefits { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── SECTION 1 — HERO (two images, replace later) ── */}
      <section style={{
        position: 'relative', background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
        padding: '56px 20px 64px', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, opacity: 0.06, color: '#1E5B4F' }}>
          <Leaf size={280} strokeWidth={1} />
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className="sv-display" style={{
            fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 700, lineHeight: 1.05,
            color: '#1E5B4F', letterSpacing: '-1px', marginBottom: 14,
          }}>
            Suvarna<em style={{ color: '#C9A86A', fontStyle: 'italic' }}>prashan</em>
          </h1>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2D2D2D99', marginBottom: 32 }}>
            <Link to="/" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <span>Suvarnaprashan</span>
          </nav>

          <div className="sv-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }}>
              <ImagePlaceholder label="Suvarnaprashan Image 1" ratio="16/10" rounded={24} accent src="/img/suvarnaprashan1.webp" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.12 }}>
              <ImagePlaceholder label="Suvarnaprashan Image 2" ratio="16/10" rounded={24} accent src="/img/suvarnaprashan2.webp" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — INTRODUCTION ── */}
      <section style={{ padding: '64px 20px 32px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div className="sv-eyebrow" style={{ marginBottom: 18 }}>
            <Baby size={13} /> Ayurvedic Immunity for Children
          </div>
          <h2 className="sv-display" style={{
            fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 700, color: '#1E5B4F',
            lineHeight: 1.15, letterSpacing: '-.5px', marginBottom: 18,
          }}>
            What is Suvarnaprashan?
          </h2>
          <p style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 14 }}>
            Suvarnaprashan is a classical Ayurvedic medicine for children aged <strong>0–15 years</strong>,
            given mainly to increase immunity, reduce recurrent illness, and improve concentration and memory.
          </p>
          <p style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8 }}>
            It is administered to children in the morning — daily, or on every <strong>Pushya Nakshatra</strong> —
            and is ideally continued for at least one year for the best results.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — BENEFITS (9) ── */}
      <section style={{ padding: '48px 20px 72px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="sv-eyebrow" style={{ marginBottom: 16 }}>
              <Sparkles size={13} /> Why Suvarnaprashan
            </div>
            <h2 className="sv-display" style={{
              fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 700, color: '#1E5B4F',
              lineHeight: 1.15, letterSpacing: '-.5px',
            }}>
              Benefits of <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Suvarnaprashan</em>
            </h2>
          </motion.div>

          <div className="sv-benefits" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                  className="sv-card"
                >
                  <span style={{
                    width: 46, height: 46, flexShrink: 0, borderRadius: 12,
                    background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)', color: '#1E5B4F',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <div>
                    <span className="sv-display" style={{ display: 'block', fontSize: 18, fontWeight: 700, color: '#C9A86A', marginBottom: 4 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ fontSize: 14.5, color: '#2D2D2DCC', lineHeight: 1.6 }}>{b.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CALENDAR ── */}
      <section style={{ padding: '72px 20px', background: '#DDE8E366' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="sv-eyebrow" style={{ marginBottom: 16 }}>
              <Calendar size={13} /> Upcoming Dates
            </div>
            <h2 className="sv-display" style={{
              fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 700, color: '#1E5B4F',
              lineHeight: 1.15, letterSpacing: '-.5px', marginBottom: 12,
            }}>
              Suvarnaprashan <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Calendar</em>
            </h2>
            <p style={{ fontSize: 15, color: '#2D2D2DAA', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              Suvarnaprashan is given on every Pushya Nakshatra. The highlighted dates below mark our
              upcoming Suvarnaprashan days — plan your child's visit accordingly.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SuvarnaCalendar />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5 — REGISTER CTA ── */}
      <section style={{ padding: '64px 20px 80px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1E5B4F 0%, #144239 50%, #1E5B4F 100%)',
              color: '#FAF8F3', borderRadius: 28, padding: 'clamp(36px, 5vw, 60px)',
              position: 'relative', overflow: 'hidden', textAlign: 'center',
            }}
          >
            <div aria-hidden style={{
              position: 'absolute', top: -80, right: -60, width: 240, height: 240, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,106,.25), transparent 70%)',
            }} />
            <h2 className="sv-display" style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-.6px', marginBottom: 14, position: 'relative',
            }}>
              Give Your Child the Gift of Immunity
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(250,248,243,.8)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 28px', position: 'relative' }}>
              Register your child for Suvarnaprashan at Mangla Ayurveda and start their journey to
              better immunity, growth and memory.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, background: '#C9A86A', color: '#1E5B4F',
                padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 800, textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(201,168,106,.6)',
              }}>
                <ArrowRight size={16} /> Register Now
              </Link>
              <a href="tel:+919992654891" className="sv-btn-primary" style={{ background: 'transparent', border: '1.5px solid rgba(201,168,106,.5)' }}>
                <Phone size={15} /> +91 99926 54891
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuvarnaprashanPage;
