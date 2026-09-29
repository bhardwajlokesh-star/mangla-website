import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Sparkles, Activity, Microscope, Zap, Droplets, Bone, Leaf,
  ArrowRight, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    :root { --teal:#0d7f78; --teal2:#0a6560; --gold:#c8a96e; --navy:#07202f; --cream:#f7f3ed; }
    .sv-display { font-family:'Cormorant Garamond',serif; }
    .sv-ui      { font-family:'Space Grotesk',sans-serif; }
    .sv-body    { font-family:'DM Sans',sans-serif; }
    .sv-pill    { display:inline-block; font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:6px 16px; border-radius:100px; margin-bottom:14px; }
    .sv-divider { width:56px; height:3px; background:linear-gradient(90deg,#0d7f78,#c8a96e); border-radius:2px; }

    .sv-tab {
      display:flex; align-items:center; gap:10px; padding:12px 20px; border-radius:14px;
      border:none; cursor:pointer; background:transparent;
      font-family:'Space Grotesk',sans-serif; font-size:14px; font-weight:600;
      transition:all .22s; text-align:left; white-space:nowrap;
    }
    .sv-tab:hover { background:#e8f4f3; color:#0d7f78; }
    .sv-tab.active { background:#07202f; color:#fff; box-shadow:0 6px 20px rgba(7,32,47,.2); }

    .sv-item-card {
      padding:30px; border-radius:20px; background:#fff;
      border:1.5px solid #f0f0f0; transition:all .3s;
      cursor:default;
    }
    .sv-item-card:hover { border-color:#0d7f78; box-shadow:0 12px 40px rgba(13,127,120,.12); transform:translateY(-4px); }

    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .sv-shimmer { background:linear-gradient(90deg,#c8a96e,#fff5e0,#c8a96e); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }

    ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f1f1} ::-webkit-scrollbar-thumb{background:#0d7f78;border-radius:3px}

    /* ─── Mobile responsive ─── */
    @media (max-width: 1024px) {
      .sv-feature-grid { grid-template-columns: 1fr !important; }
      .sv-tabs { flex-direction: row !important; overflow-x: auto; padding-bottom: 8px; gap: 6px !important; }
      .sv-layout { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 768px) {
      .sv-cta-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
      .sv-stats-strip { flex-wrap: wrap !important; gap: 12px !important; justify-content: center !important; }
      .sv-stats-strip > div { padding: 12px 14px !important; }
    }
    @media (max-width: 480px) {
      .sv-item-card { padding: 22px !important; border-radius: 16px !important; }
    }
  `}</style>
);

/* ─── Data ─── */
const categories = [
  {
    id: 'general', label: 'General Health', Icon: Stethoscope, color: '#4a6fa5', bg: '#eef2fb',
    heroImg: 'https://images.unsplash.com/photo-1579154236594-c199f346e104?auto=format&fit=crop&w=900&q=80',
    tagline: 'Comprehensive care for everyday health concerns',
    items: [
      { name: 'Fever & Infection', desc: 'Expert diagnosis and treatment for viral, bacterial, and fungal infections with same-day lab results.' },
      { name: 'Weakness & Fatigue', desc: 'Comprehensive assessment of nutritional deficiencies, metabolic, and hormonal health.' },
      { name: 'Digestive Issues', desc: 'Targeted solutions for acidity, bloating, IBS, and chronic stomach disorders.' },
      { name: 'Diabetes Management', desc: 'Modern and Ayurvedic protocols for blood sugar control and lifestyle correction.' },
      { name: 'Respiratory Care', desc: 'Treatment for asthma, allergies, bronchitis, and seasonal infections.' },
      { name: 'Child Health (Paediatrics)', desc: 'Gentle, expert care for infants, toddlers, and children' },
    ]
  },
  {
    id: 'skin', label: 'Skin Care', Icon: Sparkles, color: '#c8a96e', bg: '#fdf6ec',
    heroImg: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80',
    tagline: 'Evidence-based dermatology for clear, healthy skin',
    items: [
      { name: 'Acne & Scars', desc: 'Advanced dermatology treatments combining topical, oral, and Ayurvedic therapies for lasting results.' },
      { name: 'Allergy & Rashes', desc: 'Precise identification and management of contact, seasonal, and chronic skin sensitivities.' },
      { name: 'Fungal Infections', desc: 'Effective antifungal therapies for skin, scalp, and nail infections.' },
      { name: 'Psoriasis & Eczema', desc: 'Long-term management plans for inflammatory skin conditions using integrative medicine.' },
      { name: 'Pigmentation', desc: 'Targeted treatments for dark spots, melasma, and uneven skin tone.' },
      { name: 'Hair & Scalp Issues', desc: 'Comprehensive solutions for hair loss, dandruff, and scalp disorders.' },
    ]
  },
  {
    id: 'sexual', label: 'Sexual Health', Icon: Zap, color: '#7c65d8', bg: '#f0eefb',
    heroImg: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=900&q=80',
    tagline: 'Private, professional care in a discreet environment',
    items: [
      { name: 'Male Vitality', desc: 'Confidential consultation for performance, stamina, and hormonal health concerns.' },
      { name: 'General Weakness', desc: 'Ayurvedic and modern solutions to restore physical energy and mental clarity.' },
      { name: 'Infertility Assessment', desc: 'Preliminary diagnostic workup and specialist referrals for fertility concerns.' },
      { name: 'STI Screening', desc: 'Discreet, accurate, and judgment-free sexual infection testing and treatment.' },
    ]
  },
  {
    id: 'piles', label: 'Piles & Fistula', Icon: Droplets, color: '#e05c5c', bg: '#fdf0f0',
    heroImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    tagline: 'Modern, minimally invasive treatment for complete relief',
    items: [
      { name: 'Haemorrhoid Treatment', desc: 'Modern, pain-minimal techniques for effective management of internal and external piles.' },
      { name: 'Fistula Diagnosis', desc: 'Accurate assessment using digital imaging followed by a structured surgical care plan.' },
      { name: 'Fissure Management', desc: 'Conservative and surgical options for anal fissures with rapid symptom relief.' },
      { name: 'Post-Op Recovery Care', desc: 'Structured recovery plans with Ayurvedic support to prevent recurrence.' },
    ]
  },
  {
    id: 'joint', label: 'Joint & Bone', Icon: Bone, color: '#e0865c', bg: '#fdf3ec',
    heroImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    tagline: 'Restore mobility and live pain-free',
    items: [
      { name: 'Arthritis Management', desc: 'Personalised strategies combining physiotherapy, modern medicine, and Ayurveda for joint inflammation.' },
      { name: 'Back & Neck Pain', desc: 'Targeted therapy and posture correction programs for spinal and musculoskeletal pain.' },
      { name: 'Knee Pain & Injuries', desc: 'Conservative treatment for cartilage wear, ligament strain, and post-injury recovery.' },
      { name: 'Ayurvedic Panchakarma', desc: 'Traditional deep-detox therapy proven effective for chronic joint and muscle disorders.' },
    ]
  },
  {
    id: 'diagnostics', label: 'Diagnostics', Icon: Microscope, color: '#0d7f78', bg: '#e8f4f3',
    heroImg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80',
    tagline: 'State-of-the-art diagnostic services, results the same day',
    items: [
      { name: 'Digital X-Ray', desc: 'High-precision digital imaging with minimal radiation exposure and instant digital reports.' },
      { name: 'Ultrasound Scanning', desc: 'Advanced sonography for abdominal, pelvic, obstetric, and musculoskeletal diagnostics.' },
      { name: 'Complete Blood Panel', desc: 'Full CBC, lipid, thyroid, liver, kidney, and diabetes panels with same-day results.' },
      { name: 'Urine & Stool Tests', desc: 'Accurate urinalysis and stool culture to detect infections and metabolic issues.' },
      { name: 'ECG', desc: 'Quick cardiac screening for arrhythmia detection and pre-operative assessment.' },
      { name: 'Home Sample Collection', desc: 'Certified technicians visit your home for convenient, safe sample collection.' },
    ]
  },
  {
    id: 'ayurveda', label: 'Ayurveda', Icon: Leaf, color: '#3d9c6e', bg: '#edfaf3',
    heroImg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    tagline: 'Time-tested ancient science, modern clinical standards',
    items: [
      { name: 'Panchakarma Detox', desc: 'A comprehensive 5-step detoxification and rejuvenation therapy for chronic conditions.' },
      { name: 'Herbal Medicine', desc: 'Personalised herbal formulations prepared from authentic, quality-tested ingredients.' },
      { name: 'Dietary Correction (Pathya)', desc: 'Ayurvedic diet and lifestyle guidance tailored to your body constitution (Prakriti).' },
      { name: 'Abhyanga Massage', desc: 'Full-body herbal oil massage therapy for deep muscular relaxation and circulation.' },
      { name: 'Shirodhara', desc: 'Warm oil forehead therapy for stress, insomnia, anxiety, and neurological balance.' },
    ]
  },
];

/* ════════════════════════════════════════════════ */
const ServicesPage = () => {
  const [active, setActive] = useState('general');
  const current = categories.find(c => c.id === active);
  const { Icon } = current;

  return (
    <>
      <Styles />
      <div className="sv-body" style={{ background: '#fff' }}>

        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#07202f', minHeight: 440, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1920&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: .14 }} />
          </div>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,12vw,120px) 24px', width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <span className="sv-pill" style={{ background: 'rgba(200,169,110,0.15)', color: '#c8a96e', border: '1px solid rgba(200,169,110,0.3)' }}>What We Do</span>
              <h1 className="sv-display" style={{ color: '#fff', fontSize: 'clamp(2.6rem,6vw,5rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 18 }}>
                Our Medical<br /><em style={{ color: '#c8a96e' }}>Services</em>
              </h1>
              <p style={{ color: 'rgba(247,243,237,.6)', fontSize: 18, maxWidth: 520, lineHeight: 1.7 }}>
                A comprehensive range of healthcare services — from diagnostics and surgery to Ayurveda and chronic care.
              </p>
            </motion.div>
          </div>
          {/* Service count strip */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,.1)' }}>
            <div className="sv-stats-strip" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0 }}>
              {[{ n: '7', l: 'Specialities' }, { n: '35+', l: 'Services' }, { n: '10+', l: 'Expert Doctors' }, { n: '24/7', l: 'Emergency' }].map(({ n, l }, i) => (
                <div key={i} style={{ padding: '20px 40px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,.1)' : 'none' }}>
                  <p className="sv-display sv-shimmer" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{n}</p>
                  <p style={{ color: 'rgba(247,243,237,.5)', fontSize: 12, marginTop: 4, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TABBED SERVICES ══ */}
        <section style={{ padding: '80px 24px', background: '#f7f3ed' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            {/* Tab bar */}
            <div style={{ overflowX: 'auto', paddingBottom: 8, marginBottom: 48 }}>
              <div style={{ display: 'flex', gap: 8, background: '#fff', padding: 8, borderRadius: 20, boxShadow: '0 4px 24px rgba(7,32,47,.07)', width: 'max-content', minWidth: '100%' }}>
                {categories.map(cat => {
                  const CatIcon = cat.Icon;
                  const isActive = active === cat.id;
                  return (
                    <button
                      key={cat.id}
                      className={`sv-tab ${isActive ? 'active' : ''}`}
                      onClick={() => setActive(cat.id)}
                      style={{ color: isActive ? '#fff' : '#475569' }}
                    >
                      <CatIcon size={16} color={isActive ? '#c8a96e' : cat.color} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: .35 }}
              >
                {/* Category header */}
                <div className="sv-feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, background: '#fff', borderRadius: 28, overflow: 'hidden', boxShadow: '0 8px 40px rgba(7,32,47,.08)' }}>
                  <div style={{ padding: 'clamp(32px,5vw,52px)' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 18, background: current.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                      <Icon size={28} color={current.color} />
                    </div>
                    <span className="sv-pill" style={{ background: `${current.color}14`, color: current.color, border: `1px solid ${current.color}30` }}>{current.label}</span>
                    <h2 className="sv-display" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.12, marginBottom: 12 }}>
                      {current.tagline}
                    </h2>
                    <div className="sv-divider" style={{ marginBottom: 20 }} />
                    <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 28 }}>
                      We combine modern clinical evidence with traditional healing practices to deliver results that last. Every treatment is personalised to your condition and lifestyle.
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {[`${current.items.length} Services Available`, 'Same-Day Consultation', 'Affordable Pricing'].map((tag, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f7f3ed', padding: '7px 14px', borderRadius: 100 }}>
                          <Check size={13} color="#0d7f78" />
                          <span className="sv-ui" style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ overflow: 'hidden', minHeight: 320 }}>
                    <img src={current.heroImg} alt={current.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>

                {/* Items grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
                  {current.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="sv-item-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: current.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={17} color={current.color} />
                        </div>
                        <h3 className="sv-ui" style={{ fontSize: 16, fontWeight: 700, color: '#07202f', lineHeight: 1.2 }}>{item.name}</h3>
                      </div>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section style={{ padding: '80px 24px', background: '#07202f', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,127,120,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div className="sv-cta-row" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 28, padding: 'clamp(36px,6vw,60px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 520 }}>
                <p className="sv-ui" style={{ color: '#c8a96e', fontWeight: 700, fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Not Sure Where to Start?</p>
                <h2 className="sv-display" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>
                  Take a Free Health Assessment
                </h2>
                <p style={{ color: 'rgba(247,243,237,.55)', fontSize: 16, lineHeight: 1.65 }}>
                  Answer a few quick questions and our doctors will analyse your symptoms and guide you to the right service.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
                <Link to="/health-test" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg,#c8a96e,#a8893e)', color: '#fff',
                  padding: '16px 32px', borderRadius: 100, textDecoration: 'none',
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16,
                  boxShadow: '0 8px 28px rgba(200,169,110,.4)', transition: 'transform .2s, box-shadow .2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(200,169,110,.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,169,110,.4)'; }}
                >
                  <Activity size={18} /> Start Free Test
                </Link>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center',
                  background: 'transparent', color: 'rgba(247,243,237,.65)',
                  padding: '14px 24px', borderRadius: 100, textDecoration: 'none',
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15,
                  border: '1px solid rgba(255,255,255,.2)', transition: 'all .2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(247,243,237,.65)'; }}
                >
                  Book Appointment <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ServicesPage;