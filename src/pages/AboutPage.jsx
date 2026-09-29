import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Target, Eye, Award, Heart, ShieldCheck, Stethoscope, CheckCircle2, Users, Star, Leaf } from 'lucide-react';

/* ─── Shared Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    :root { --teal:#0d7f78; --teal2:#0a6560; --gold:#c8a96e; --navy:#07202f; --navy2:#0b2d40; --cream:#f7f3ed; }
    .ab-display { font-family:'Cormorant Garamond',serif; }
    .ab-ui      { font-family:'Space Grotesk',sans-serif; }
    .ab-body    { font-family:'DM Sans',sans-serif; }
    .ab-card { background:#fff; border-radius:24px; transition:all .35s cubic-bezier(.25,.8,.25,1); }
    .ab-card:hover { transform:translateY(-8px); box-shadow:0 24px 64px rgba(13,127,120,.14); }
    .ab-pill { display:inline-block; background:rgba(13,127,120,0.1); color:#0d7f78; font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:6px 16px; border-radius:100px; margin-bottom:14px; }
    .ab-divider { width:56px; height:3px; background:linear-gradient(90deg,#0d7f78,#c8a96e); border-radius:2px; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    .ab-float { animation:float 5s ease-in-out infinite; }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .ab-shimmer { background:linear-gradient(90deg,#c8a96e,#fff5e0,#c8a96e,#a8893e); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }
    ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f1f1} ::-webkit-scrollbar-thumb{background:#0d7f78;border-radius:3px}

    /* ─── Mobile responsive ─── */
    @media (max-width: 1024px) {
      .ab-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    }
    @media (max-width: 768px) {
      .ab-section { padding-left: 18px !important; padding-right: 18px !important; }
      .ab-hero-title { font-size: clamp(2.2rem, 8vw, 3.2rem) !important; }
      .ab-stats-row { flex-wrap: wrap !important; gap: 20px !important; justify-content: center !important; }
    }
    @media (max-width: 480px) {
      .ab-doctor-grid { grid-template-columns: 1fr !important; }
      .ab-values-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const doctors = [
  {
    name: "Dr. Devendra Kumar", qualification: "MBBS, MD", experience: "20+ Years",
    specialization: "General Physician & Ayurveda Specialist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=85",
    approach: "Focuses on careful history, practical treatment planning, diet correction, and long-term lifestyle change for chronic and recurring health concerns.",
    achievements: ["Integrated chronic disease care", "Preventive health counselling", "Ayurveda-led lifestyle management"],
  },
  {
    name: "Dr. Naresh Kumar", qualification: "MBBS, MS", experience: "15+ Years",
    specialization: "Surgeon & Diagnostic Expert",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=85",
    approach: "Prioritises clear diagnosis, patient comfort, safe minor procedures, report-based decision making, and transparent follow-up advice.",
    achievements: ["Minor surgery and wound care", "Diagnostic report interpretation", "Patient monitoring protocols"],
  },
];

const brands = [
  {
    name: "Mangla Nursing Home", Icon: Heart, color: "#e05c8a", bg: "#fdf0f5",
    desc: "Our flagship facility providing round-the-clock nursing care, minor surgeries, and general consultations in a hygienic, caring environment.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nirogpeeth Ayurveda", Icon: Leaf, color: "#0d7f78", bg: "#e8f4f3",
    desc: "Dedicated to the ancient science of healing — specialising in natural treatments for chronic pains, digestive issues, and lifestyle disorders.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Durgadevi Ultrasound", Icon: ShieldCheck, color: "#4a6fa5", bg: "#eef2fb",
    desc: "State-of-the-art diagnostic imaging technology for accurate, timely ultrasound scans and digital reports delivered same day.",
    img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
  },
];

const values = [
  { Icon: Heart, label: "Compassion", desc: "Every patient is treated with dignity, empathy, and genuine care." },
  { Icon: ShieldCheck, label: "Integrity", desc: "Transparent, honest medicine — no unnecessary tests or procedures." },
  { Icon: Star, label: "Excellence", desc: "Clinical standards that meet and exceed national benchmarks." },
  { Icon: Users, label: "Community", desc: "Rooted in the neighbourhood we serve for over two decades." },
];

/* ════════════════════════════════════════════════ */
const AboutPage = () => {
  return (
    <>
      <Styles />
      <SEO
        title="About Us"
        description="Mangla Healthcare and Rogjeet Ayurveda: an integrated Ayurveda hospital in Jaipur combining classical Panchkarma with modern diagnostics and experienced doctors."
      />
      <div className="ab-body" style={{ background: '#fff' }}>

        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#07202f', minHeight: 520, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1579154236594-c199f346e104?auto=format&fit=crop&w=1920&q=80"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.18 }}
            />
          </div>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,127,120,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,12vw,120px) 24px', width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <span className="ab-pill" style={{ background: 'rgba(200,169,110,0.15)', color: '#c8a96e', border: '1px solid rgba(200,169,110,0.3)' }}>Our Story</span>
              <h1 className="ab-display" style={{ color: '#fff', fontSize: 'clamp(2.6rem,6vw,5rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 20 }}>
                About Mangla<br /><em style={{ color: '#c8a96e' }}>Healthcare</em>
              </h1>
              <p style={{ color: 'rgba(247,243,237,.65)', fontSize: 18, maxWidth: 560, lineHeight: 1.7 }}>
                A legacy of trust, compassionate care, and holistic healing — serving our community for over two decades.
              </p>
            </motion.div>
          </div>

          {/* Stat strip */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="ab-stats-row" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-around' }}>
              {[{ n: '20+', l: 'Years Active' }, { n: '3', l: 'Speciality Brands' }, { n: '25k+', l: 'Patients Treated' }, { n: '98%', l: 'Satisfaction Rate' }].map(({ n, l }, i) => (
                <div key={i} style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <p className="ab-display ab-shimmer" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{n}</p>
                  <p style={{ color: 'rgba(247,243,237,.5)', fontSize: 12, marginTop: 4, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, letterSpacing: '.05em' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BRANDS ══ */}
        <section style={{ padding: '100px 24px', background: '#f7f3ed' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60 }}>
              <span className="ab-pill">Our Brands</span>
              <h2 className="ab-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.12 }}>
                Three Pillars of Care
              </h2>
              <div className="ab-divider" style={{ marginTop: 16 }} />
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 24 }}>
              {brands.map(({ name, Icon, color, bg, desc, img }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="ab-card"
                  style={{ overflow: 'hidden', boxShadow: '0 4px 24px rgba(7,32,47,.07)' }}
                >
                  <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,32,47,.5), transparent)' }} />
                  </div>
                  <div style={{ padding: '28px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} color={color} />
                      </div>
                      <h3 className="ab-ui" style={{ fontSize: 18, fontWeight: 700, color: '#07202f' }}>{name}</h3>
                    </div>
                    <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DOCTORS ══ */}
        <section style={{ padding: '100px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60, textAlign: 'center' }}>
              <span className="ab-pill">Our Specialists</span>
              <h2 className="ab-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.12 }}>
                Meet Our Expert Doctors
              </h2>
              <div className="ab-divider" style={{ margin: '16px auto 0' }} />
            </motion.div>

            <div className="ab-doctor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 32, maxWidth: 920, margin: '0 auto' }}>
              {doctors.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  style={{ borderRadius: 28, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 40px rgba(7,32,47,.09)', transition: 'all .35s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(13,127,120,.16)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 40px rgba(7,32,47,.09)'; }}
                >
                  {/* Photo */}
                  <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                    <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,32,47,.85) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', bottom: 24, left: 28, right: 28 }}>
                      <h3 className="ab-ui" style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{doc.name}</h3>
                      <span style={{ background: 'rgba(200,169,110,0.9)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '4px 12px', borderRadius: 100, fontFamily: "'Space Grotesk',sans-serif" }}>
                        {doc.qualification}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '28px 32px' }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f4f3', padding: '8px 14px', borderRadius: 100 }}>
                        <Award size={14} color="#0d7f78" />
                        <span className="ab-ui" style={{ fontSize: 13, color: '#0d7f78', fontWeight: 600 }}>{doc.experience}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f7f3ed', padding: '8px 14px', borderRadius: 100 }}>
                        <Stethoscope size={14} color="#c8a96e" />
                        <span className="ab-ui" style={{ fontSize: 13, color: '#8b6a3a', fontWeight: 600 }}>{doc.specialization}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ background: '#f8fafc', border: '1px solid #eef2f5', borderRadius: 16, padding: '14px 16px', marginBottom: 4 }}>
                        <p className="ab-ui" style={{ fontSize: 12, fontWeight: 700, color: '#0d7f78', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Consultation Approach</p>
                        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>{doc.approach}</p>
                      </div>
                      {doc.achievements.map((a, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <CheckCircle2 size={15} color="#0d7f78" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: '#475569' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MISSION & VISION ══ */}
        <section style={{ padding: '100px 24px', background: '#f7f3ed', overflow: 'hidden' }}>
          <div className="ab-story-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -24, left: -24, width: 240, height: 240, borderRadius: '30% 70% 70% 30%/30% 30% 70% 70%', background: 'rgba(13,127,120,0.1)', zIndex: 0 }} />
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85"
                alt="Our Mission"
                style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 28, display: 'block', position: 'relative', zIndex: 1 }}
              />
              {/* Floating card */}
              <motion.div className="ab-float" style={{ position: 'absolute', bottom: -24, right: -24, zIndex: 10, background: '#07202f', borderRadius: 20, padding: '22px 28px', boxShadow: '0 20px 60px rgba(7,32,47,.28)' }}>
                <p className="ab-display ab-shimmer" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>2015</p>
                <p className="ab-ui" style={{ fontSize: 12, color: 'rgba(247,243,237,.55)', fontWeight: 500, marginTop: 4 }}>Founded & Serving</p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="ab-pill">Why We Exist</span>
              <h2 className="ab-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.12, marginBottom: 48 }}>
                Mission &amp; Vision
              </h2>

              {[
                { Icon: Target, bg: '#e8f4f3', ic: '#0d7f78', title: 'Our Mission', body: 'To provide accessible, affordable, high-quality healthcare that combines modern clinical excellence with traditional wellness practices — ensuring the best outcomes for every patient.' },
                { Icon: Eye, bg: '#07202f', ic: '#c8a96e', title: 'Our Vision', body: 'To be the leading healthcare provider in the region, recognised for our holistic approach, innovative diagnostics, and unwavering commitment to patient-first care.' },
              ].map(({ Icon, bg, ic, title, body }, i) => (
                <div key={i} style={{ display: 'flex', gap: 22, marginBottom: i === 0 ? 40 : 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={26} color={ic} />
                  </div>
                  <div>
                    <h3 className="ab-ui" style={{ fontSize: 20, fontWeight: 700, color: '#07202f', marginBottom: 10 }}>{title}</h3>
                    <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.75 }}>{body}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section style={{ padding: '100px 24px', background: '#07202f', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="ab-pill" style={{ background: 'rgba(200,169,110,0.15)', color: '#c8a96e', border: '1px solid rgba(200,169,110,0.25)' }}>What Drives Us</span>
              <h2 className="ab-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', fontWeight: 700 }}>Our Core Values</h2>
            </motion.div>
            <div className="ab-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 20 }}>
              {values.map(({ Icon, label, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ padding: '36px 28px', borderRadius: 22, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.04)', transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,169,110,.35)'; e.currentTarget.style.background = 'rgba(255,255,255,.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
                >
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(200,169,110,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={22} color="#c8a96e" />
                  </div>
                  <h3 className="ab-ui" style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{label}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(247,243,237,.55)', lineHeight: 1.65 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
