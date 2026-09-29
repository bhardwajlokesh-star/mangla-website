import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, Leaf, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   PAIN MANAGEMENT — mirrors the Nirvikar Ayurveda pain-management
   page structure (title → intro → 4 treatment methods → CTA),
   rebuilt with Mangla Ayurveda branding & contact details.
   Every image is an intentional placeholder — replace later.
   Palette: #1E5B4F / #C9A86A / #FAF8F3 / #DDE8E3.
   ────────────────────────────────────────────────────────────── */

/* ── image placeholder (real <img> when src provided, dashed box otherwise) ── */
const ImagePlaceholder = ({ label = 'Image Placeholder', ratio = '4/3', rounded = 22, accent = false, src }) => {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      aria-label={label}
      role="img"
      style={{
        position: 'relative',
        aspectRatio: ratio,
        width: '100%',
        borderRadius: rounded,
        background: showImage
          ? '#DDE8E3'
          : accent
            ? 'linear-gradient(135deg, #DDE8E3 0%, #C9A86A22 50%, #DDE8E3 100%)'
            : 'linear-gradient(135deg, #DDE8E3 0%, #FAF8F3 100%)',
        border: showImage ? '1px solid rgba(30,91,79,0.1)' : '1.5px dashed rgba(30, 91, 79, 0.28)',
        boxShadow: showImage ? '0 18px 40px -22px rgba(30,91,79,.35)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 10, overflow: 'hidden',
      }}
    >
      {showImage ? (
        <img
          src={src} alt={label} loading="lazy" onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
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

/* ── the 4 treatment methods, as on the reference page ── */
const METHODS = [
  {
    name: 'Snehan & Swedan',
    img: '/img/painManagement/Snehan and Swedan.webp',
    body: 'Snehan is the application of warm medicated oil to the affected area, followed by Swedan — sudation using steam or localised heat. Together they pacify Vata, loosen stiffness and relieve sprains, back ache and muscular injuries. For abdominal pain and lumbar discomfort, Basti (medicated enema) is added as a focused Vata treatment.',
  },
  {
    name: 'Agnikarma',
    img: '/img/painManagement/Agnikarma.webp',
    body: 'Agnikarma is a precise heat (thermal cautery) therapy performed in two ways — direct heat and indirect heat. We use the gentler indirect method, applying a metal rod with a blunt, rounded tip heated over a flame to the painful point. It often gives quick relief in joint pain, cervical and lumbar spondylosis, and sciatica.',
  },
  {
    name: 'Blood Letting (Raktamokshana)',
    img: '/img/painManagement/Blood Letting (Raktamokshana).webp',
    body: 'Raktamokshana removes vitiated blood and is performed in more than one way. Leech therapy (Jalaukavacharana) uses medicinal leeches that draw only the impure blood, helping conditions such as painful heels and certain headaches. Controlled venesection is used in selected cases where removing a small amount of blood supports the treatment.',
  },
  {
    name: 'Lepa',
    img: '/img/painManagement/Lepa.webp',
    body: 'Lepa is the application of a herbal paste over the affected area, left in place to dry and act locally. It is especially useful for swelling, injury and sprains — reducing inflammation and pain directly at the site.',
  },
];

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const PainManagementPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Mangla Healthcare — Ayurvedic Pain Management',
    url: 'https://www.manglahealthcare.com/pain-management',
    description: 'Expert Ayurvedic pain management for chronic pain, joint disorders, spine conditions and musculoskeletal problems at Mangla Healthcare, Jaipur.',
    telephone: '+91-99926-54891',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Medical Square', addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan', postalCode: '302001', addressCountry: 'IN',
    },
    medicalSpecialty: 'PhysicalMedicine',
  };

  return (
    <div className="pm-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Pain Management Treatment"
        description="Expert Ayurvedic pain management treatments for arthritis, back pain, sciatica, joint disorders, and chronic pain. Book your consultation today."
        schema={schema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .pm-page { font-family: 'Inter', system-ui, sans-serif; }
        .pm-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
        .pm-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F; font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .pm-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .pm-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        @media (max-width: 900px) {
          .pm-grid-2 { grid-template-columns: 1fr !important; }
          .pm-method { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── SECTION 1 — PAGE TITLE / BREADCRUMB ── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
        padding: '64px 20px', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: -40, right: -40, width: 280, height: 280, opacity: 0.06, color: '#1E5B4F',
        }}>
          <Leaf size={280} strokeWidth={1} />
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className="pm-display" style={{
            fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 700, lineHeight: 1.05,
            color: '#1E5B4F', letterSpacing: '-1px', marginBottom: 14,
          }}>
            Pain <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Management</em>
          </h1>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2D2D2D99' }}>
            <Link to="/" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <span>Pain Management</span>
          </nav>
        </div>
      </section>

      {/* ── SECTION 2 — INTRODUCTION ── */}
      <section style={{ padding: '72px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pm-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="pm-eyebrow" style={{ marginBottom: 18 }}>
                <Leaf size={13} /> Advanced Ayurvedic Pain Management
              </div>
              <h2 className="pm-display" style={{
                fontSize: 'clamp(28px, 3.6vw, 40px)', fontWeight: 700, color: '#1E5B4F',
                lineHeight: 1.15, letterSpacing: '-.5px', marginBottom: 18,
              }}>
                A Natural Approach to Pain
              </h2>
              <p style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 16 }}>
                Pain is the physical discomfort caused by illness or injury that interferes with everyday
                life. In Ayurveda, almost every form of pain is linked to aggravated <strong>Vata dosha</strong> —
                so when the vitiated Vata is brought back into balance, the pain settles on its own.
              </p>
              <p style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8 }}>
                It is a common misconception that Ayurvedic treatment works only slowly. With the right
                therapies, acute and chronic pain alike can be relieved quickly and safely — without
                dependency on painkillers. At Mangla Ayurveda we combine the following classical methods,
                chosen to suit your condition.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ImagePlaceholder label="Pain Management" ratio="4/3" rounded={24} accent />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — TREATMENT METHODS ── */}
      <section style={{ padding: '32px 20px 72px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {METHODS.map((m, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  key={m.name}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="pm-method"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 44, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}
                >
                  <div style={{ direction: 'ltr' }}>
                    <ImagePlaceholder label={`${m.name} Image`} ratio="4/3" rounded={22} src={m.img} />
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: '#C9A86A', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                      Method {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="pm-display" style={{
                      fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#1E5B4F',
                      lineHeight: 1.15, letterSpacing: '-.4px', marginBottom: 14,
                    }}>
                      {m.name}
                    </h3>
                    <p style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.8 }}>
                      {m.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CALL / BOOK CTA ── */}
      <section style={{ padding: '20px 20px 80px', background: '#FAF8F3' }}>
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
            <h2 className="pm-display" style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-.6px', marginBottom: 14, position: 'relative',
            }}>
              Call or Book Appointment Now
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(250,248,243,.8)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 28px', position: 'relative' }}>
              Don't let pain control your life — start your healing journey with expert Ayurvedic
              pain management at Mangla Ayurveda.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
              <a href="tel:+919992654891" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, background: '#C9A86A', color: '#1E5B4F',
                padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 800, textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(201,168,106,.6)',
              }}>
                <Phone size={16} /> +91 99926 54891
              </a>
              <Link to="/contact" className="pm-btn-primary" style={{ background: 'transparent', border: '1.5px solid rgba(201,168,106,.5)' }}>
                <Calendar size={15} /> Book Appointment <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PainManagementPage;
