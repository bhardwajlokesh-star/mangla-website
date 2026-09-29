import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../components/seoSchemas';
import {
  ChevronRight, ChevronDown, Phone, ArrowRight, Sparkles,
  CheckCircle2, ShieldCheck, Clock, Users, Award,
  Leaf, Heart, HeartPulse, Stethoscope, Activity, Bone, Brain,
  Apple, Pill, Sun, Moon, Droplet, Flame, Baby, Salad, Utensils,
  Dumbbell, ScanLine, TestTube2, Waves, UserCheck, ClipboardCheck,
  Scissors, Music, FlaskConical, ShoppingBag, Calendar,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   RICH PAGE — premium content template used across every
   service / department / sub-page of Mangla Healthcare.
   Driven entirely by the data block passed in via `content`.
   ────────────────────────────────────────────────────────────── */

const ICON_MAP = {
  leaf: Leaf, heart: Heart, heartPulse: HeartPulse, stethoscope: Stethoscope,
  activity: Activity, bone: Bone, brain: Brain, apple: Apple, pill: Pill,
  sun: Sun, moon: Moon, droplet: Droplet, flame: Flame, baby: Baby,
  salad: Salad, utensils: Utensils, dumbbell: Dumbbell, scan: ScanLine,
  tube: TestTube2, waves: Waves, userCheck: UserCheck, clipboard: ClipboardCheck,
  scissors: Scissors, music: Music, flask: FlaskConical, shop: ShoppingBag,
  shield: ShieldCheck, sparkles: Sparkles, clock: Clock, users: Users,
  award: Award, calendar: Calendar,
};

const resolveIcon = (name) => ICON_MAP[name] || Leaf;

const RichPage = ({ content = {} }) => {
  const location = useLocation();
  const {
    category   = 'Service',
    title      = 'Service',
    subtitle   = '',
    heroBg     = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    intro      = '',
    introHead  = 'About This Service',
    benefits   = [],          // [{ title, desc, icon }]
    process    = [],          // [{ title, desc }]
    indications= [],          // ['string', ...] — "Recommended for"
    related    = [],          // [{ name, desc, path, icon }]
    relatedHead= 'Related Services',
    faq        = [],          // [{ q, a }]
    stats      = [],          // [{ n, l }]
    sessions   = '',          // "Single session / 7-day course"
    duration   = '',          // "45–90 minutes"
    /* ── New interactive content blocks ── */
    imageBlocks = [],         // [{ eyebrow, title, desc, image, alt, points?, reverse? }]
    gallery    = [],          // [{ src, caption, alt }]
    galleryHead = 'Inside our centre',
    gallerySub  = 'A look at the treatment rooms, herbal pharmacy and recovery spaces our patients experience.',
    quote      = null,        // { text, author, role }
    ctaTitle   = 'Take the next step toward better health',
    ctaSub     = 'Book a free consultation with our specialists — we will guide you to the right protocol.',
  } = content;

  /* derive breadcrumb */
  const crumbs = location.pathname.split('/').filter(Boolean).map((seg, i, arr) => ({
    label: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    path: '/' + arr.slice(0, i + 1).join('/'),
  }));

  /* Build SEO meta */
  const seoTitle = title.replace(/\s+—\s+/g, ' - ').trim();
  const seoDesc  = subtitle || intro?.slice(0, 160) || `${category} services at Mangla Healthcare.`;
  const seoSchema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    ...crumbs.map(c => ({ name: c.label, path: c.path })),
  ]);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#fcfdfd', minHeight: '100vh' }}>
      <SEO title={seoTitle} description={seoDesc} schema={seoSchema} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');
        .rp-display { font-family: 'Playfair Display', serif; }

        /* ── Hero ── */
        @keyframes rpFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .rp-float { animation: rpFloat 6s ease-in-out infinite; }

        /* ── Card hover lift ── */
        .rp-card {
          background: #fff;
          border: 1px solid #eef2f5;
          border-radius: 18px;
          padding: 24px;
          transition: all .3s cubic-bezier(.4,0,.2,1);
        }
        .rp-card:hover {
          transform: translateY(-4px);
          border-color: rgba(10,110,102,.18);
          box-shadow: 0 22px 50px -28px rgba(10,110,102,.42);
        }
        .rp-card .ic {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg,#e8f5f3,#f7efde);
          color: #0a6e66;
          display: inline-flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: all .3s ease;
        }
        .rp-card:hover .ic {
          background: linear-gradient(135deg,#0a6e66,#085a53);
          color: #c8a96e; transform: rotate(-4deg);
        }

        /* ── Process step ── */
        .rp-step-num {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg,#0a6e66,#063f3a);
          color: #c8a96e;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 19px; font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 8px 18px -8px rgba(10,110,102,.5);
        }

        /* ── Tag chip ── */
        .rp-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 100px;
          background: #f0fbf9;
          border: 1px solid rgba(10,110,102,.18);
          color: #0a6e66;
          font-size: 13px; font-weight: 600;
        }

        /* ── FAQ ── */
        .rp-faq-item { border-bottom: 1px solid #eef2f5; }
        .rp-faq-q {
          width: 100%; padding: 18px 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px;
          background: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 16px; font-weight: 600;
          color: #0f1e2c; text-align: left;
        }
        .rp-faq-q:hover { color: #0a6e66; }
        .rp-faq-icon {
          width: 32px; height: 32px; border-radius: 50%;
          background: #f1f5f9;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all .2s;
        }
        .rp-faq-item.open .rp-faq-icon {
          background: #0a6e66; color: #c8a96e;
        }

        /* ── Image block (visual breakdown) ── */
        .rp-img-block .rp-img-frame img { transform-origin: center; }

        /* ── Gallery hover lift ── */
        .rp-gallery figure { transition: transform .35s cubic-bezier(.4,0,.2,1); }

        /* mobile */
        @media (max-width: 900px) {
          .rp-img-block {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            direction: ltr !important;
            margin: 48px 0 !important;
          }
          .rp-gallery { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .rp-grid-2 { grid-template-columns: 1fr !important; }
          .rp-grid-3 { grid-template-columns: 1fr !important; }
          .rp-process-grid { grid-template-columns: 1fr !important; }
          .rp-meta-row { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .rp-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═════════════ HERO ═════════════ */}
      <section style={{
        position: 'relative',
        background: '#07202f',
        color: '#fff',
        padding: '88px 20px 96px',
        overflow: 'hidden',
      }}>
        {/* Hero image as actual <img> for proper loading + error fallback */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundColor: '#07202f', overflow: 'hidden',
        }}>
          <img
            src={heroBg}
            alt=""
            loading="eager"
            onError={(e) => {
              // fallback to a known-working Ayurveda image
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85';
              e.currentTarget.onerror = null;
            }}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Gradient overlay for text legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, rgba(7,32,47,.82) 0%, rgba(7,32,47,.4) 50%, rgba(10,110,102,.08) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
        <div className="rp-float" style={{
          position: 'absolute', top: -120, right: -120, zIndex: 0,
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, left: -100, zIndex: 0,
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,110,102,.45), transparent 70%)',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap',
            gap: 6, fontSize: 13, color: 'rgba(247,243,237,.7)',
            marginBottom: 22,
          }}>
            <Link to="/" style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>Home</Link>
            {crumbs.map((c, i) => (
              <React.Fragment key={c.path}>
                <ChevronRight size={13} style={{ opacity: .5 }} />
                {i === crumbs.length - 1
                  ? <span style={{ color: '#c8a96e', fontWeight: 600 }}>{c.label}</span>
                  : <Link to={c.path} style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>{c.label}</Link>}
              </React.Fragment>
            ))}
          </nav>

          {/* Category pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(200,169,110,.14)',
              border: '1px solid rgba(200,169,110,.35)',
              color: '#c8a96e', fontSize: 12, fontWeight: 700,
              letterSpacing: '.14em', textTransform: 'uppercase',
              marginBottom: 18,
            }}>
            <Leaf size={13} /> {category}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
            className="rp-display"
            style={{
              fontSize: 'clamp(34px, 5.4vw, 60px)',
              fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px',
              marginBottom: 16, maxWidth: 860,
            }}>
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }}
              style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.65, color: 'rgba(247,243,237,.8)',
                maxWidth: 720, marginBottom: 28,
              }}>
              {subtitle}
            </motion.p>
          )}

          {/* Meta row */}
          {(duration || sessions) && (
            <div className="rp-meta-row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
              {duration && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock size={16} style={{ color: '#c8a96e' }} />
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(247,243,237,.55)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Session Duration</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{duration}</div>
                  </div>
                </div>
              )}
              {sessions && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={16} style={{ color: '#c8a96e' }} />
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(247,243,237,.55)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Recommended</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{sessions}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg,#B84C2B,#9a3e22)',
              color: '#fff', padding: '13px 24px', borderRadius: 100,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 12px 28px -10px rgba(184,76,43,.5)',
            }}>
              <Phone size={15} /> Book Consultation
            </Link>
            <Link to="/health-test" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,169,110,.35)',
              color: '#fff', padding: '13px 24px', borderRadius: 100,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              <Sparkles size={15} /> Free Health Test
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════ STATS RIBBON ═════════════ */}
      {stats.length > 0 && (
        <section style={{
          background: 'linear-gradient(180deg,#fcfaf5,#f8f0e0)',
          borderBottom: '1px solid #eee5d0',
          padding: '24px 20px',
        }}>
          <div className="rp-meta-row" style={{
            maxWidth: 1280, margin: '0 auto',
            display: 'flex', justifyContent: 'space-around', gap: 20, flexWrap: 'wrap',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="rp-display" style={{
                  fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800,
                  color: '#0a6e66', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═════════════ INTRO ═════════════ */}
      {intro && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px 40px' }}>
          <div style={{ maxWidth: 820 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              {introHead}
            </p>
            <h2 className="rp-display" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 700, color: '#0f1e2c', marginBottom: 18, lineHeight: 1.18, letterSpacing: '-.5px' }}>
              The science behind {title.split('—')[0].trim()}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: '#475569' }}>
              {intro}
            </p>
          </div>
        </section>
      )}

      {/* ═════════════ VISUAL BREAKDOWN (image blocks) ═════════════ */}
      {imageBlocks.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
          {imageBlocks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="rp-img-block"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 48,
                alignItems: 'center',
                margin: i === 0 ? '40px 0' : '72px 0',
                direction: b.reverse ? 'rtl' : 'ltr',
              }}
            >
              <div className="rp-img-frame" style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: 22,
                overflow: 'hidden',
                background: '#0a6e66',
                boxShadow: '0 30px 60px -28px rgba(15,30,44,.25)',
                direction: 'ltr',
              }}>
                <img
                  src={b.image}
                  alt={b.alt || b.title}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform .6s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(7,32,47,.04), rgba(10,110,102,.18))',
                  pointerEvents: 'none',
                }} />
                {/* corner accent */}
                <div style={{
                  position: 'absolute', top: 18, left: 18,
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(200,169,110,.92)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0f1e2c', fontWeight: 800, fontSize: 14,
                  boxShadow: '0 6px 16px -6px rgba(15,30,44,.4)',
                }}>{i + 1}</div>
              </div>

              <div style={{ direction: 'ltr' }}>
                {b.eyebrow && (
                  <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                    {b.eyebrow}
                  </p>
                )}
                <h3 className="rp-display" style={{
                  fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700,
                  color: '#0f1e2c', lineHeight: 1.2, letterSpacing: '-.4px',
                  marginBottom: 14,
                }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.75, marginBottom: b.points?.length ? 18 : 0 }}>
                  {b.desc}
                </p>
                {b.points && b.points.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {b.points.map((pt, j) => (
                      <li key={j} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '8px 0',
                        fontSize: 14.5, color: '#475569',
                      }}>
                        <CheckCircle2 size={16} style={{ color: '#0a6e66', flexShrink: 0, marginTop: 3 }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* ═════════════ BENEFITS ═════════════ */}
      {benefits.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Benefits</p>
            <h2 className="rp-display" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 700, color: '#0f1e2c', letterSpacing: '-.5px' }}>
              What you can expect
            </h2>
          </div>
          <div className="rp-grid-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 18,
          }}>
            {benefits.map((b, i) => {
              const Icon = resolveIcon(b.icon);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="rp-card"
                >
                  <span className="ic"><Icon size={22} strokeWidth={2.1} /></span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1e2c', marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ fontSize: 14.5, color: '#64748b', lineHeight: 1.6 }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═════════════ PROCESS ═════════════ */}
      {process.length > 0 && (
        <section style={{ background: '#f7f8f6' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 20px' }}>
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Our Process</p>
              <h2 className="rp-display" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 700, color: '#0f1e2c', letterSpacing: '-.5px' }}>
                How it works
              </h2>
            </div>
            <div className="rp-process-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(process.length, 4)}, 1fr)`, gap: 20 }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{
                    background: '#fff',
                    border: '1px solid #eef2f5',
                    borderRadius: 18,
                    padding: 26,
                    position: 'relative',
                  }}
                >
                  <div className="rp-step-num">{i + 1}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1e2c', marginTop: 18, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ GALLERY STRIP ═════════════ */}
      {gallery.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 20px 40px' }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
              In our centre
            </p>
            <h2 className="rp-display" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 700, color: '#0f1e2c', letterSpacing: '-.5px', marginBottom: 8 }}>
              {galleryHead}
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, maxWidth: 680 }}>{gallerySub}</p>
          </div>
          <div className="rp-gallery" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(gallery.length, 4)}, 1fr)`,
            gap: 14,
          }}>
            {gallery.map((g, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{
                  margin: 0, position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: 16, overflow: 'hidden',
                  background: '#0a6e66',
                  cursor: 'pointer',
                }}
                whileHover={{ y: -4 }}
              >
                <img
                  src={g.src} alt={g.alt || g.caption} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(7,32,47,.85), transparent 55%)',
                  pointerEvents: 'none',
                }} />
                {g.caption && (
                  <figcaption style={{
                    position: 'absolute', bottom: 14, left: 16, right: 16,
                    color: '#fff', fontSize: 13.5, fontWeight: 600,
                    letterSpacing: '-.1px', lineHeight: 1.35,
                  }}>
                    {g.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* ═════════════ INDICATIONS ═════════════ */}
      {indications.length > 0 && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 20px' }}>
          <div className="rp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 50, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Who is this for</p>
              <h2 className="rp-display" style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#0f1e2c', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-.5px' }}>
                Recommended for
              </h2>
              <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65 }}>
                If any of these resonate, this protocol is likely a good fit. Our doctors will confirm
                during your free consultation and personalise the plan to your body type.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {indications.map((it, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="rp-tag"
                >
                  <CheckCircle2 size={13} /> {it}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ TESTIMONIAL QUOTE ═════════════ */}
      {quote && (
        <section style={{ padding: '40px 20px 60px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <motion.figure
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                margin: 0,
                background: 'linear-gradient(135deg, #fcfaf5 0%, #f7efde 100%)',
                border: '1px solid rgba(200,169,110,.32)',
                borderRadius: 24,
                padding: 'clamp(28px, 4vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* big quotation mark */}
              <span aria-hidden style={{
                position: 'absolute', top: -28, right: 24,
                fontFamily: 'Playfair Display, serif',
                fontSize: 220, lineHeight: 1, fontWeight: 800,
                color: 'rgba(200,169,110,.22)',
                pointerEvents: 'none',
              }}>"</span>

              <blockquote className="rp-display" style={{
                position: 'relative', zIndex: 1, margin: 0,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                lineHeight: 1.5, color: '#0f1e2c',
                fontStyle: 'italic', fontWeight: 600,
                maxWidth: 820,
              }}>
                {quote.text}
              </blockquote>

              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, position: 'relative', zIndex: 1 }}>
                {quote.avatar && (
                  <img
                    src={quote.avatar} alt=""
                    loading="lazy"
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(200,169,110,.45)',
                    }}
                  />
                )}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1e2c' }}>{quote.author}</div>
                  {quote.role && (
                    <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 2 }}>{quote.role}</div>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          </div>
        </section>
      )}

      {/* ═════════════ RELATED ═════════════ */}
      {related.length > 0 && (
        <section style={{ background: 'linear-gradient(180deg,#fcfdfd,#f5f8f7)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 20px' }}>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Explore Further</p>
              <h2 className="rp-display" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 700, color: '#0f1e2c', letterSpacing: '-.5px' }}>
                {relatedHead}
              </h2>
            </div>
            <div className="rp-grid-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: 18,
            }}>
              {related.map((r, i) => {
                const Icon = resolveIcon(r.icon);
                return (
                  <Link key={i} to={r.path} style={{ textDecoration: 'none' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="rp-card"
                      style={{ height: '100%' }}
                    >
                      <span className="ic"><Icon size={22} strokeWidth={2.1} /></span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1e2c', marginBottom: 6 }}>{r.name}</h3>
                      <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.55, marginBottom: 14 }}>{r.desc}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#0a6e66' }}>
                        Learn more <ArrowRight size={13} />
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ FAQ ═════════════ */}
      {faq.length > 0 && (
        <section style={{ maxWidth: 980, margin: '0 auto', padding: '80px 20px' }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Common Questions</p>
            <h2 className="rp-display" style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', fontWeight: 700, color: '#0f1e2c', letterSpacing: '-.5px' }}>
              Frequently asked
            </h2>
          </div>
          <FaqList items={faq} />
        </section>
      )}

      {/* ═════════════ CTA BANNER ═════════════ */}
      <section style={{ padding: '60px 20px 100px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          background: 'linear-gradient(135deg,#07202f,#0a3545)',
          color: '#fff',
          borderRadius: 28,
          padding: 'clamp(36px, 5vw, 60px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -100, right: -100,
            width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
          }} />
          <div className="rp-meta-row" style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: 600 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#c8a96e', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Ready when you are</p>
              <h3 className="rp-display" style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 12 }}>
                {ctaTitle}
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(247,243,237,.72)', lineHeight: 1.6 }}>
                {ctaSub}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(135deg,#B84C2B,#9a3e22)',
                color: '#fff', padding: '14px 26px', borderRadius: 100,
                fontSize: 14.5, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(184,76,43,.5)',
              }}>
                <Phone size={15} /> Book Consultation
              </Link>
              <Link to="/health-test" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(200,169,110,.35)',
                color: '#fff', padding: '13px 26px', borderRadius: 100,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                <Sparkles size={15} /> Free Health Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── FAQ accordion ── */
const FaqList = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`rp-faq-item ${isOpen ? 'open' : ''}`}>
            <button className="rp-faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{f.q}</span>
              <span className="rp-faq-icon">
                <ChevronDown size={16} style={{ transition: 'transform .25s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
              </span>
            </button>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, paddingBottom: 18, paddingRight: 50 }}>{f.a}</p>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RichPage;
