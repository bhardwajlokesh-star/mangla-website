import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, Phone, Calendar, Award, Languages,
  GraduationCap, CheckCircle2, Clock, ArrowRight, Sparkles,
} from 'lucide-react';
import { findDoctor, doctors } from './doctorsData';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   DOCTOR PROFILE PAGE — /doctors/:slug
   Detailed credentials, biography, treatments, availability.
   ────────────────────────────────────────────────────────────── */

const DoctorProfilePage = () => {
  const { slug } = useParams();
  const doctor = findDoctor(slug);
  if (!doctor) return <Navigate to="/doctors" replace />;

  const others = doctors.filter(d => d.slug !== slug).slice(0, 2);

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: doctor.specialties,
    hospitalAffiliation: 'Mangla Healthcare',
    yearsOfExperience: doctor.experience,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  };

  return (
    <div style={{ background: '#fcfdfd', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SEO
        title={`${doctor.name} — ${doctor.title}`}
        description={`${doctor.qualifications}. ${doctor.experience} of experience treating ${doctor.treats.slice(0,4).join(', ')} and more at Mangla Healthcare, Jaipur.`}
        schema={physicianSchema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');
        .dp-display { font-family: 'Playfair Display', serif; }
        @media (max-width: 900px) {
          .dp-hero-grid { grid-template-columns: 1fr !important; }
          .dp-body-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg,#07202f 0%,#0a3545 100%)',
        color: '#fff',
        padding: '64px 20px 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(247,243,237,.7)', marginBottom: 22 }}>
            <Link to="/" style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} style={{ opacity: .5 }} />
            <Link to="/doctors" style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>Doctors</Link>
            <ChevronRight size={13} style={{ opacity: .5 }} />
            <span style={{ color: '#c8a96e', fontWeight: 600 }}>{doctor.name}</span>
          </nav>

          <div className="dp-hero-grid" style={{
            display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              style={{
                aspectRatio: '1/1', borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 30px 60px -20px rgba(7,32,47,.6)',
                border: '4px solid rgba(200,169,110,.3)',
              }}
            >
              <img src={doctor.image} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </motion.div>

            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 14px', borderRadius: 100,
                background: 'rgba(200,169,110,.14)',
                border: '1px solid rgba(200,169,110,.32)',
                color: '#c8a96e', fontSize: 12, fontWeight: 700,
                letterSpacing: '.14em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                <Award size={13} /> {doctor.title}
              </div>
              <h1 className="dp-display" style={{ fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-.8px', marginBottom: 12 }}>
                {doctor.name}
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(247,243,237,.8)', lineHeight: 1.6, marginBottom: 22 }}>
                {doctor.qualifications} · {doctor.experience} of clinical practice
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 13.5, color: 'rgba(247,243,237,.85)', marginBottom: 26 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Award size={14} style={{ color: '#c8a96e' }} /> {doctor.registration}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Languages size={14} style={{ color: '#c8a96e' }} /> {doctor.languages.join(' · ')}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg,#B84C2B,#9a3e22)',
                  color: '#fff', padding: '12px 22px', borderRadius: 100,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  <Phone size={14} /> Book Consultation
                </Link>
                <Link to="/health-test" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(200,169,110,.35)',
                  color: '#fff', padding: '12px 22px', borderRadius: 100,
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  <Sparkles size={14} /> Free Health Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 20px 96px' }}>
        <div className="dp-body-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40 }}>

          {/* LEFT — main content */}
          <div>
            {/* Bio */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>About</p>
              <h2 className="dp-display" style={{ fontSize: 28, fontWeight: 700, color: '#0f1e2c', marginBottom: 14, letterSpacing: '-.4px' }}>
                Biography
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                {doctor.bio}
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Education</p>
              <h2 className="dp-display" style={{ fontSize: 24, fontWeight: 700, color: '#0f1e2c', marginBottom: 16, letterSpacing: '-.3px' }}>
                Academic credentials
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {doctor.education.map((e, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14,
                    padding: '16px 18px', borderRadius: 14,
                    background: '#fff', border: '1px solid #eef2f5',
                  }}>
                    <span style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: 'linear-gradient(135deg,#e6f4f2,#f7efde)',
                      color: '#0a6e66',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <GraduationCap size={20} />
                    </span>
                    <div>
                      <h4 style={{ fontSize: 15.5, fontWeight: 700, color: '#0f1e2c', marginBottom: 4 }}>{e.degree}</h4>
                      <p style={{ fontSize: 13.5, color: '#64748b' }}>{e.institute} · {e.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions treated */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Conditions treated</p>
              <h2 className="dp-display" style={{ fontSize: 24, fontWeight: 700, color: '#0f1e2c', marginBottom: 16, letterSpacing: '-.3px' }}>
                Common consultation areas
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {doctor.treats.map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 100,
                    background: '#f0fbf9', border: '1px solid rgba(10,110,102,.18)',
                    color: '#0a6e66', fontSize: 13, fontWeight: 600,
                  }}>
                    <CheckCircle2 size={12} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <aside>
            {/* Specialties */}
            <div style={{
              background: '#fff', border: '1px solid #eef2f5',
              borderRadius: 18, padding: 22, marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0f1e2c', marginBottom: 14, letterSpacing: '.04em', textTransform: 'uppercase' }}>Specialties</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {doctor.specialties.map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14, color: '#475569' }}>
                    <CheckCircle2 size={14} style={{ color: '#0a6e66', flexShrink: 0 }} /> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div style={{
              background: 'linear-gradient(135deg,#07202f,#0a3545)',
              color: '#fff', borderRadius: 18, padding: 22, marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: '#c8a96e', marginBottom: 14, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                <Clock size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Consultation hours
              </h3>
              {doctor.availability.map((a, i) => (
                <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < doctor.availability.length - 1 ? '1px solid rgba(200,169,110,.2)' : 'none' }}>
                  <p style={{ fontSize: 13.5, color: '#c8a96e', fontWeight: 700, marginBottom: 4 }}>{a.day}</p>
                  <p style={{ fontSize: 13, color: 'rgba(247,243,237,.8)' }}>{a.slot}</p>
                </div>
              ))}
              <Link to="/contact" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(135deg,#B84C2B,#9a3e22)', color: '#fff',
                padding: '12px', borderRadius: 100, textDecoration: 'none',
                fontSize: 14, fontWeight: 700, marginTop: 8,
              }}>
                <Calendar size={14} /> Request appointment
              </Link>
            </div>
          </aside>
        </div>

        {/* Other doctors */}
        {others.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#B84C2B', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>Other consultants</p>
            <h2 className="dp-display" style={{ fontSize: 28, fontWeight: 700, color: '#0f1e2c', marginBottom: 22, letterSpacing: '-.4px' }}>
              Meet the rest of the team
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 18 }}>
              {others.map(o => (
                <Link key={o.slug} to={`/doctors/${o.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: '#fff', border: '1px solid #eef2f5',
                    borderRadius: 18, padding: 20, display: 'flex', gap: 14, alignItems: 'center',
                    transition: 'all .25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,110,102,.2)'; e.currentTarget.style.boxShadow = '0 20px 40px -22px rgba(10,110,102,.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#eef2f5'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <img src={o.image} alt={o.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 15.5, fontWeight: 700, color: '#0f1e2c' }}>{o.name}</h4>
                      <p style={{ fontSize: 12.5, color: '#64748b', marginTop: 2 }}>{o.title}</p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#0a6e66', fontWeight: 700, fontSize: 13, marginTop: 8 }}>
                        View profile <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default DoctorProfilePage;
