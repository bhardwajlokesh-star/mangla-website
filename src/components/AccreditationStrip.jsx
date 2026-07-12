import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Leaf, Stethoscope, HeartPulse, Star } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   ACCREDITATION STRIP — trust badges for HomePage / About
   Sits in the brand theme (cream + navy + gold).
   ────────────────────────────────────────────────────────────── */

const BADGES = [
  { Icon: Leaf,        label: 'AYUSH Registered',   sub: 'Ayurveda authority' },
  { Icon: Stethoscope, label: 'MCI Doctors',        sub: 'Modern medicine' },
  { Icon: Award,       label: '15+ Years',          sub: 'Trusted since 2015' },
  { Icon: HeartPulse,  label: '25,000+ Families',   sub: 'Treated successfully' },
  { Icon: Star,        label: '4.8 / 5 Rating',     sub: 'Google + patient reviews' },
];

const AccreditationStrip = ({ compact = false, variant = 'light' }) => {
  const isDark = variant === 'dark';
  return (
    <section
      aria-label="Accreditations and trust signals"
      style={{
        padding: compact ? '36px 20px' : '56px 20px',
        background: isDark
          ? 'linear-gradient(180deg,#07202f,#051621)'
          : 'linear-gradient(180deg,#fcfaf5,#f7efde)',
        borderTop: '1px solid ' + (isDark ? 'rgba(200,169,110,.18)' : 'rgba(200,169,110,.32)'),
        borderBottom: '1px solid ' + (isDark ? 'rgba(200,169,110,.18)' : 'rgba(200,169,110,.32)'),
      }}
    >
      <style>{`
        .acc-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .acc-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .acc-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
      <div className="acc-grid">
        {BADGES.map((b, i) => {
          const { Icon, label, sub } = b;
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: isDark ? 'rgba(255,255,255,.04)' : '#fff',
                border: '1px solid ' + (isDark ? 'rgba(200,169,110,.15)' : 'rgba(10,110,102,.1)'),
                borderRadius: 14,
                transition: 'all .3s ease',
              }}
            >
              <div style={{
                width: 42, height: 42, flexShrink: 0, borderRadius: 12,
                background: isDark
                  ? 'rgba(200,169,110,.14)'
                  : 'linear-gradient(135deg,#e6f4f2,#f7efde)',
                color: isDark ? '#c8a96e' : '#0a6e66',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} strokeWidth={2.1} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontSize: 13.5, fontWeight: 800,
                  color: isDark ? '#fff' : '#0f1e2c',
                  letterSpacing: '-.2px', lineHeight: 1.2,
                }}>{label}</p>
                <p style={{
                  fontSize: 11.5,
                  color: isDark ? 'rgba(247,243,237,.6)' : '#64748b',
                  marginTop: 2,
                }}>{sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AccreditationStrip;
