import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, Leaf, Sparkles, ChevronRight, ArrowRight, Clock, Check, Sun, HeartPulse } from 'lucide-react';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   SPA — mirrors the Nirvikar Ayurveda spa pages
   (/spa_ayurveda, /hair-spa, /skin-spa, /body-spa), rebuilt with
   Mangla Ayurveda branding & contact. Same packages, durations
   and prices. Images are intentional placeholders (replace later).
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

/* ── shared CSS injected once per page ── */
const SpaStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
    .sp-page { font-family: 'Inter', system-ui, sans-serif; }
    .sp-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
    .sp-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 16px; border-radius: 100px;
      background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.4);
      color: #1E5B4F; font-size: 11.5px; font-weight: 700;
      letter-spacing: .14em; text-transform: uppercase;
    }
    .sp-btn-primary {
      display: inline-flex; align-items: center; gap: 9px;
      background: linear-gradient(135deg, #1E5B4F, #144239);
      color: #FAF8F3; padding: 14px 28px; border-radius: 100px;
      text-decoration: none; border: none; cursor: pointer;
      font-family: inherit; font-size: 14.5px; font-weight: 700;
      box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
      transition: all .28s cubic-bezier(.4,0,.2,1);
    }
    .sp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
    .sp-btn-outline {
      display: inline-flex; align-items: center; gap: 9px;
      background: transparent; color: #1E5B4F; padding: 13px 26px; border-radius: 100px;
      border: 1.5px solid #C9A86A; text-decoration: none; cursor: pointer;
      font-family: inherit; font-size: 14.5px; font-weight: 700; transition: all .25s ease;
    }
    .sp-btn-outline:hover { background: #C9A86A; color: #FAF8F3; }
    .sp-card {
      background: #fff; border: 1px solid rgba(30,91,79,.08); border-radius: 20px;
      overflow: hidden; transition: all .3s cubic-bezier(.4,0,.2,1);
      display: flex; flex-direction: column;
    }
    .sp-card:hover { transform: translateY(-6px); box-shadow: 0 28px 56px -28px rgba(30,91,79,.45); border-color: rgba(201,168,106,.45); }
    @media (max-width: 900px) { .sp-grid-2 { grid-template-columns: 1fr !important; } }
  `}</style>
);

/* ── page title / breadcrumb banner ── */
const SpaTitle = ({ title, crumb }) => (
  <section style={{
    position: 'relative', background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
    padding: '64px 20px', overflow: 'hidden',
  }}>
    <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, opacity: 0.06, color: '#1E5B4F' }}>
      <Leaf size={280} strokeWidth={1} />
    </div>
    <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <h1 className="sp-display" style={{
        fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 700, lineHeight: 1.05,
        color: '#1E5B4F', letterSpacing: '-1px', marginBottom: 14,
      }}>
        {title}
      </h1>
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2D2D2D99', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
        {crumb.map((c) => (
          <React.Fragment key={c.label}>
            <ChevronRight size={14} />
            {c.path
              ? <Link to={c.path} style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>{c.label}</Link>
              : <span>{c.label}</span>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  </section>
);

/* ── shared "Call or Book" CTA ── */
const SpaCTA = () => (
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
        <h2 className="sp-display" style={{
          fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-.6px', marginBottom: 14, position: 'relative',
        }}>
          Call or Book Appointment Now
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(250,248,243,.8)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 28px', position: 'relative' }}>
          Treat yourself to authentic Ayurvedic spa rituals at Mangla Ayurveda — book your session today.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
          <a href="tel:+919992654891" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, background: '#C9A86A', color: '#1E5B4F',
            padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 800, textDecoration: 'none',
            boxShadow: '0 12px 28px -10px rgba(201,168,106,.6)',
          }}>
            <Phone size={16} /> +91 99926 54891
          </a>
          <Link to="/contact" className="sp-btn-primary" style={{ background: 'transparent', border: '1.5px solid rgba(201,168,106,.5)' }}>
            <Calendar size={15} /> Book Appointment <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── package card (single price OR tiered) ── */
const PackageCard = ({ pkg, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}
    className="sp-card"
  >
    <ImagePlaceholder label={pkg.name} ratio="4/3" rounded={0} src={pkg.img} />
    <div style={{ padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <h3 className="sp-display" style={{ fontSize: 24, fontWeight: 700, color: '#1E5B4F', marginBottom: pkg.tag ? 10 : 8 }}>
        {pkg.name}
      </h3>
      {pkg.tag && (
        <span style={{
          alignSelf: 'flex-start', marginBottom: 14, padding: '5px 12px', borderRadius: 100,
          background: 'rgba(201,168,106,.16)', border: '1px solid rgba(201,168,106,.4)',
          color: '#1E5B4F', fontSize: 11.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
        }}>
          {pkg.tag}
        </span>
      )}

      {/* included treatments */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
        {pkg.includes.map(t => (
          <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#2D2D2DAA', marginBottom: 6, lineHeight: 1.5 }}>
            <Check size={14} style={{ color: '#1E5B4F', flexShrink: 0, marginTop: 3 }} />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(30,91,79,.1)', paddingTop: 16, marginBottom: 18,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2D2D2D88', fontWeight: 600 }}>
            <Clock size={14} /> {pkg.duration}
          </span>
          <span className="sp-display" style={{ fontSize: 30, fontWeight: 700, color: '#1E5B4F' }}>₹{pkg.price}</span>
        </div>

        <Link to="/contact" className="sp-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          <Calendar size={15} /> Book This Spa
        </Link>
      </div>
    </div>
  </motion.article>
);

/* ── reusable package-page (hair / skin / body) ── */
const SpaPackagePage = ({ seoTitle, seoDesc, title, crumb, eyebrow, intro, packages, gridMin = 320 }) => (
  <div className="sp-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
    <SEO title={seoTitle} description={seoDesc} />
    <SpaStyles />
    <SpaTitle title={title} crumb={crumb} />

    {/* intro */}
    <section style={{ padding: '64px 20px 24px', background: '#FAF8F3' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <div className="sp-eyebrow" style={{ marginBottom: 18 }}>
          <Sparkles size={13} /> {eyebrow}
        </div>
        {intro.map((p, i) => (
          <p key={i} style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 14 }}>{p}</p>
        ))}
      </div>
    </section>

    {/* packages */}
    <section style={{ padding: '32px 20px 72px', background: '#FAF8F3' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${gridMin}px, 1fr))`, gap: 24 }}>
          {packages.map((pkg, i) => <PackageCard key={`${pkg.name}-${pkg.tag || i}`} pkg={pkg} i={i} />)}
        </div>
      </div>
    </section>

    <SpaCTA />
  </div>
);

/* ──────────────────────────────────────────────────────────────
   DATA — same packages / prices as the reference site
   ────────────────────────────────────────────────────────────── */

const HAIR_TREATMENTS = ['Shirobhyang', 'Shiroswed', 'Shirolep', 'Shirodhawan'];
const HAIR_TYPES = ['Anti-Dandruff Hair Spa', 'Nourishing Hair Spa', 'Rejuvenating Hair Spa', 'Greying Hair Spa'];
const HAIR_TIERS = [
  { tag: 'Short Hair',  duration: '90 min', price: '800' },
  { tag: 'Medium Hair', duration: '90 min', price: '1200' },
  { tag: 'Long Hair',   duration: '90 min', price: '1400' },
];
const HAIR_COVER = '/img/hair-spa/Anti-Dandruff Hair Spa Long Hair.png';
/* 4 types × 3 hair-length tiers = 12 packages (as on the reference page) */
const HAIR_PACKAGES = HAIR_TYPES.flatMap(name =>
  HAIR_TIERS.map(tier => ({
    name, tag: tier.tag, duration: tier.duration, price: tier.price, includes: HAIR_TREATMENTS, img: HAIR_COVER,
  }))
);

const SKIN_TREATMENTS = ['Cleaning', 'Scrubbing', 'Mukhyabhang', 'Mukhswed', 'Facelep'];
const SKIN_COVER = '/img/skinSPa.png';
const SKIN_PACKAGES = [
  { name: 'Normal Skin Spa',       includes: SKIN_TREATMENTS, duration: '90 min', price: '800',  img: SKIN_COVER },
  { name: 'Anti-Acne Skin Spa',    includes: SKIN_TREATMENTS, duration: '90 min', price: '1000', img: SKIN_COVER },
  { name: 'Dry Skin Spa',          includes: SKIN_TREATMENTS, duration: '90 min', price: '1000', img: SKIN_COVER },
  { name: 'Nourishing Skin Spa',   includes: SKIN_TREATMENTS, duration: '90 min', price: '1000', img: SKIN_COVER },
  { name: 'Rejuvenating Skin Spa', includes: SKIN_TREATMENTS, duration: '90 min', price: '1200', img: SKIN_COVER },
];

const BODY_COVER = '/img/Body-Spa/BodySpa.png';
const BODY_PACKAGES = [
  { name: 'Normal Massage Body Spa', includes: ['Abhyangam', 'Swedana'], duration: '45 min', price: '800',  img: BODY_COVER },
  { name: 'Deep Tissue Massage Spa', includes: ['Abhyangam', 'Swedana'], duration: '45 min', price: '1000', img: BODY_COVER },
  { name: 'Anti-Stress Body Spa',    includes: ['Abhyangam', 'Swedana', 'Shirodhara'], duration: '90 min', price: '1700', img: BODY_COVER },
  { name: 'Rejuvenation Body Spa',   includes: ['Abhyangam', 'Swedana', 'Karnapuran', 'Anjan', 'Nasya', 'Head Massage', 'Face Massage'], duration: '60 min', price: '1600', img: BODY_COVER },
  { name: 'Nourishing Body Spa',     includes: ['Abhyangam', 'Swedana', 'Karnapuran', 'Anjan', 'Shirodhara', 'Nasya', 'Head Massage', 'Face Massage'], duration: '90 min', price: '2500', img: BODY_COVER },
  { name: 'Relaxing Body Spa',       includes: ['Abhyangam', 'Swedana', 'Nasya', 'Dhumpana', 'Anjan', 'Head Massage', 'Face Massage', 'Jacuzzi'], duration: '120 min', price: '3000', img: BODY_COVER },
];

/* ──────────────────────────────────────────────────────────────
   /spa — landing page (three categories)
   ────────────────────────────────────────────────────────────── */
const SPA_CATEGORIES = [
  {
    name: 'Hair Spa', path: '/spa/hair', icon: Sparkles,
    body: 'Ayurvedic hair care uses Shirodhara and herbal scalp packs to nourish the roots and calm the mind. It helps address dandruff, hair-fall and premature greying — leaving hair stronger, softer and healthier.',
  },
  {
    name: 'Skin Spa', path: '/spa/skin', icon: Sun,
    body: 'True beauty in Ayurveda comes from nourished, balanced skin. Our Soundarya Vardhani facials cleanse, scrub and rejuvenate the tissues — restoring a natural, lasting glow without harsh chemicals.',
  },
  {
    name: 'Body Spa (Panchakarma)', path: '/spa/body', icon: HeartPulse,
    body: 'A holistic approach to natural beauty and relaxation. Warm-oil Abhyanga, Swedana and signature therapies relieve stress, ease the muscles and revitalise the whole body and senses.',
  },
];

export const SpaPage = () => (
  <div className="sp-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
    <SEO
      title="Spa & Ayurveda"
      description="Premium Ayurvedic spa rituals at Mangla Ayurveda — hair spa, skin spa and body spa (Panchakarma) treatments. Book your session today."
    />
    <SpaStyles />
    <SpaTitle title="Spa & Ayurveda" crumb={[{ label: 'Spa' }]} />

    {/* intro */}
    <section style={{ padding: '64px 20px 24px', background: '#FAF8F3' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <div className="sp-eyebrow" style={{ marginBottom: 18 }}>
          <Leaf size={13} /> Premium Ayurvedic Spa Rituals
        </div>
        <p style={{ fontSize: 16, color: '#2D2D2DCC', lineHeight: 1.8 }}>
          Experience authentic Ayurvedic beauty and wellness at Mangla Ayurveda. Our spa rituals combine
          classical therapies, herbal preparations and a calm healing environment to care for your hair,
          skin and body — naturally.
        </p>
      </div>
    </section>

    {/* three categories */}
    <section style={{ padding: '32px 20px 72px', background: '#FAF8F3' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {SPA_CATEGORIES.map((cat, i) => {
          const reverse = i % 2 === 1;
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="sp-grid-2"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 44, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}
            >
              <div style={{ direction: 'ltr' }}>
                <ImagePlaceholder label={`${cat.name} Image`} ratio="4/3" rounded={22} accent />
              </div>
              <div style={{ direction: 'ltr' }}>
                <span style={{
                  width: 52, height: 52, borderRadius: 14, marginBottom: 16,
                  background: 'rgba(201,168,106,.18)', color: '#1E5B4F',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h2 className="sp-display" style={{
                  fontSize: 'clamp(26px, 3.4vw, 38px)', fontWeight: 700, color: '#1E5B4F',
                  lineHeight: 1.15, letterSpacing: '-.4px', marginBottom: 14,
                }}>
                  {cat.name}
                </h2>
                <p style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 22 }}>
                  {cat.body}
                </p>
                <Link to={cat.path} className="sp-btn-outline">
                  View {cat.name} Packages <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>

    <SpaCTA />
  </div>
);

export const HairSpaPage = () => (
  <SpaPackagePage
    seoTitle="Hair Spa"
    seoDesc="Ayurvedic hair spa packages at Mangla Ayurveda for dandruff, hair-fall, greying and nourishment — Shirobhyang, Shiroswed, Shirolep & Shirodhawan. Book today."
    title="Hair Spa"
    crumb={[{ label: 'Spa', path: '/spa' }, { label: 'Hair Spa' }]}
    eyebrow="Hair Care & Scalp Therapy"
    intro={[
      'Ayurvedic hair care nourishes the scalp and roots with Shirodhara and herbal packs, helping with dandruff, hair-fall and premature greying.',
      'Each hair spa includes Shirobhyang, Shiroswed, Shirolep and Shirodhawan, with pricing by hair length.',
    ]}
    packages={HAIR_PACKAGES}
    gridMin={300}
  />
);

export const SkinSpaPage = () => (
  <SpaPackagePage
    seoTitle="Skin Spa"
    seoDesc="Ayurvedic skin spa packages at Mangla Ayurveda — Soundarya Vardhani facials for normal, acne-prone, dry, nourishing and rejuvenating skin. Book today."
    title="Skin Spa"
    crumb={[{ label: 'Spa', path: '/spa' }, { label: 'Skin Spa' }]}
    eyebrow="Skin Treatments & Glow Therapy"
    intro={[
      'In Ayurveda, lasting beauty comes from healthy, balanced skin rather than surface cosmetics.',
      'Our Soundarya Vardhani facials nourish the skin tissues — each package includes Cleaning, Scrubbing, Mukhyabhang, Mukhswed and Facelep.',
    ]}
    packages={SKIN_PACKAGES}
    gridMin={300}
  />
);

export const BodySpaPage = () => (
  <SpaPackagePage
    seoTitle="Body Spa"
    seoDesc="Ayurvedic body spa (Panchakarma) packages at Mangla Ayurveda — Abhyangam, Swedana, Shirodhara and relaxation rituals from ₹800. Book your session today."
    title="Body Spa"
    crumb={[{ label: 'Spa', path: '/spa' }, { label: 'Body Spa' }]}
    eyebrow="Body Detox & Relaxation"
    intro={[
      'A holistic approach to relaxation and natural beauty through classical Panchakarma-based body rituals.',
      'From a soothing massage to full rejuvenation with Shirodhara and Jacuzzi — choose the package that suits you.',
    ]}
    packages={BODY_PACKAGES}
    gridMin={320}
  />
);
