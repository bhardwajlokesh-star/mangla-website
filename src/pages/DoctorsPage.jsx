import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Languages, Stethoscope } from 'lucide-react';
import { doctors } from './doctorsData';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   DOCTORS PAGE — listing of consultants with credentials
   ────────────────────────────────────────────────────────────── */

const DoctorsPage = () => (
  <div style={{ background: '#fcfdfd', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
    <SEO
      title="Our Doctors"
      description="Meet the consultant doctors of Mangla Healthcare — MBBS, MD, BAMS specialists with decades of integrated Ayurveda and modern medicine experience."
    />

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');
      .dr-display { font-family: 'Playfair Display', serif; }
      .dr-card {
        background: #fff;
        border: 1px solid #eef2f5;
        border-radius: 22px;
        overflow: hidden;
        transition: all .3s cubic-bezier(.4,0,.2,1);
      }
      .dr-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 24px 56px -28px rgba(10,110,102,.4);
        border-color: rgba(10,110,102,.18);
      }
      .dr-photo { transition: transform .5s; }
      .dr-card:hover .dr-photo { transform: scale(1.04); }
      .dr-chip {
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 11.5px; font-weight: 600;
        padding: 5px 10px; border-radius: 100px;
        background: #f0fbf9; color: #0a6e66;
      }
      @media (max-width: 768px) {
        .dr-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>

    {/* Hero */}
    <section style={{
      background: 'linear-gradient(135deg,#07202f 0%,#0a3545 100%)',
      color: '#fff',
      padding: '72px 20px 84px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
      }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(247,243,237,.7)', marginBottom: 22 }}>
          <Link to="/" style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} style={{ opacity: .5 }} />
          <span style={{ color: '#c8a96e', fontWeight: 600 }}>Doctors</span>
        </nav>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 14px', borderRadius: 100,
          background: 'rgba(200,169,110,.14)',
          border: '1px solid rgba(200,169,110,.32)',
          color: '#c8a96e', fontSize: 12, fontWeight: 700,
          letterSpacing: '.14em', textTransform: 'uppercase',
          marginBottom: 18,
        }}>
          <Stethoscope size={13} /> Our Specialists
        </div>
        <h1 className="dr-display" style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.8px', marginBottom: 14 }}>
          Meet our consultant doctors
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(247,243,237,.78)', lineHeight: 1.65, maxWidth: 720 }}>
          The Mangla Healthcare team brings together modern medicine, classical Ayurveda, and diagnostic
          rigour. Each consultant treats patients with their full medical history in view, not just
          today's complaint.
        </p>
      </div>
    </section>

    {/* Grid */}
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 20px 96px' }}>
      <div className="dr-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {doctors.map((d, i) => (
          <motion.div
            key={d.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="dr-card"
          >
            <Link to={`/doctors/${d.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#0a6e66' }}>
                <img src={d.image} alt={d.name} className="dr-photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,32,47,.85), transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 18, left: 22, right: 22 }}>
                  <h2 className="dr-display" style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{d.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13.5, fontWeight: 500 }}>{d.title}</p>
                </div>
              </div>
              <div style={{ padding: 22 }}>
                <p style={{ fontSize: 13, color: '#475569', marginBottom: 14, lineHeight: 1.6 }}>
                  <strong style={{ color: '#0f1e2c' }}>{d.qualifications}</strong> · {d.experience}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {d.specialties.slice(0, 3).map(s => (
                    <span key={s} className="dr-chip">{s}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <Languages size={12} /> {d.languages.join(', ')}
                  </span>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0a6e66', fontWeight: 700, fontSize: 13.5 }}>
                  View profile <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default DoctorsPage;
