import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Leaf, Sparkles, ChevronRight, Check } from 'lucide-react';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   GARBH SANSKAR — mirrors the Nirvikar Ayurveda garbh-sanskar page
   (hero image → "Garbhasanskar" two-column overview → Call Now),
   rebuilt with Mangla Ayurveda branding & contact.
   Hero uses /img/garbh sanskar.png; the secondary image is an
   intentional placeholder (replace later).
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

/* ── what the program covers (same points as the reference page) ── */
const COVERS = [
  'Preconception counselling.',
  'Weekly or once-a-month counselling regarding Garbh Sanskar.',
  'Detailed monthly guidance on the physical and mental changes in the mother.',
  'Physical and mental changes in the baby in that particular month.',
  'Diet — month-wise.',
  'Music — month-wise and throughout pregnancy.',
  'Yogasanas according to trimester.',
  'Books according to trimester.',
  'Delivery list preparation.',
  "Do's and don'ts in pregnancy.",
  'Post-delivery care — mother, baby and related medicines.',
  'Gynaecologist and hospital selection criteria for delivery.',
];

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const GarbhSanskarPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: 'Garbh Sanskar',
    description: 'Ayurvedic Garbh Sanskar program at Mangla Ayurveda — preconception counselling, month-by-month diet, yoga, music and lifestyle guidance through pregnancy, delivery preparation and post-natal care.',
    relevantSpecialty: 'Ayurveda',
  };

  return (
    <div className="gs-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Garbh Sanskar Program"
        description="Garbh Sanskar at Mangla Ayurveda — Ayurvedic pregnancy care covering preconception counselling, monthly diet, yoga, music, delivery preparation and post-natal care. Book today."
        schema={schema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .gs-page { font-family: 'Inter', system-ui, sans-serif; }
        .gs-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
        .gs-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F; font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .gs-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .gs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        @media (max-width: 900px) { .gs-grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── SECTION 1 — PAGE TITLE / BREADCRUMB ── */}
      <section style={{
        position: 'relative', background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
        padding: '56px 20px', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, opacity: 0.06, color: '#1E5B4F' }}>
          <Leaf size={280} strokeWidth={1} />
        </div>
        <div style={{
          maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <h1 className="gs-display" style={{
            fontSize: 'clamp(34px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.05,
            color: '#1E5B4F', letterSpacing: '-1px',
          }}>
            Garbh <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Sanskar</em>
          </h1>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2D2D2D99' }}>
            <Link to="/" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <span>Garbh Sanskar</span>
          </nav>
        </div>
      </section>

      {/* ── SECTION 2 — GARBHASANSKAR (image left · content right) ── */}
      <section style={{ padding: '64px 20px 80px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="gs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-start' }}>
            {/* image */}
            <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <ImagePlaceholder label="Garbh Sanskar" ratio="1/1" rounded={24} src="/img/garbh sanskar.webp" />
            </motion.div>

            {/* content */}
            <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <h2 className="gs-display" style={{
                fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: '#1E5B4F',
                lineHeight: 1.1, letterSpacing: '-.6px', marginBottom: 24,
              }}>
                Garbhasanskar
              </h2>

              {/* OPD calendar card */}
              <div style={{
                width: 280, maxWidth: '100%', marginBottom: 28,
                borderRadius: 18, overflow: 'hidden',
                border: '1px solid rgba(30,91,79,.12)',
                boxShadow: '0 20px 44px -26px rgba(30,91,79,.5)',
              }}>
                <div style={{ position: 'relative', background: 'linear-gradient(135deg, #1E5B4F, #144239)', height: 26 }}>
                  <span style={{ position: 'absolute', top: -8, left: 60, width: 12, height: 22, borderRadius: 6, background: '#C9A86A' }} />
                  <span style={{ position: 'absolute', top: -8, right: 60, width: 12, height: 22, borderRadius: 6, background: '#C9A86A' }} />
                </div>
                <div style={{ background: '#DDE8E3', padding: '22px 18px', textAlign: 'center' }}>
                  <p className="gs-display" style={{ fontSize: 24, fontWeight: 800, color: '#1E5B4F', lineHeight: 1.1 }}>
                    Garbh Sanskar <br /> OPD
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#1E5B4F', marginTop: 14 }}>3rd Saturday</p>
                  <p style={{ fontSize: 14, color: '#2D2D2DCC', marginTop: 2 }}>of every month</p>
                  <p style={{ fontSize: 16, color: '#2D2D2DCC', marginTop: 6 }}>10 am to 5 pm</p>
                </div>
                <a href="tel:+919992654891" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #C9A86A, #b8965a)', color: '#1E5B4F',
                  padding: '12px', fontSize: 16, fontWeight: 800, textDecoration: 'none',
                }}>
                  <Phone size={16} /> +91 99926 54891
                </a>
              </div>

              {/* list of points */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COVERS.map((c) => (
                  <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#2D2D2DCC', marginBottom: 12, lineHeight: 1.55 }}>
                    <span style={{
                      width: 22, height: 22, flexShrink: 0, borderRadius: '50%', marginTop: 1,
                      background: '#1E5B4F', color: '#C9A86A',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GarbhSanskarPage;
