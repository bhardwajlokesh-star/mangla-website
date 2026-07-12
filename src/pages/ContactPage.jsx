import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle2, ChevronDown, MessageSquare, User, Loader } from 'lucide-react';

/* ─── Styles ─── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    :root { --teal:#0d7f78; --teal2:#0a6560; --gold:#c8a96e; --navy:#07202f; --cream:#f7f3ed; }
    .ct-display { font-family:'Cormorant Garamond',serif; }
    .ct-ui      { font-family:'Space Grotesk',sans-serif; }
    .ct-body    { font-family:'DM Sans',sans-serif; }
    .ct-pill    { display:inline-block; background:rgba(200,169,110,0.15); color:#c8a96e; font-family:'Space Grotesk',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:6px 16px; border-radius:100px; margin-bottom:14px; border:1px solid rgba(200,169,110,0.3); }
    .ct-divider { width:56px; height:3px; background:linear-gradient(90deg,#0d7f78,#c8a96e); border-radius:2px; margin-bottom:24px; }

    .ct-field-wrap { position:relative; }
    .ct-field {
      width:100%; padding:18px 20px; background:#f8fafc; border:2px solid #e2e8f0;
      border-radius:16px; font-family:'DM Sans',sans-serif; font-size:15px; color:#07202f;
      outline:none; transition:border-color .2s, box-shadow .2s, background .2s;
      box-sizing:border-box;
    }
    .ct-field::placeholder { color:#94a3b8; }
    .ct-field:focus { border-color:#0d7f78; background:#fff; box-shadow:0 0 0 4px rgba(13,127,120,.1); }
    .ct-field-icon { position:absolute; left:18px; top:50%; transform:translateY(-50%); color:#94a3b8; pointer-events:none; }
    .ct-field.with-icon { padding-left:50px; }
    .ct-textarea { resize:none; min-height:150px; line-height:1.6; }
    .ct-select { appearance:none; cursor:pointer; }

    .ct-submit {
      width:100%; padding:18px 24px; border:none; border-radius:16px; cursor:pointer;
      background:linear-gradient(135deg,#0d7f78,#0a6560); color:#fff;
      font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:700;
      display:flex; align-items:center; justify-content:center; gap:10px;
      box-shadow:0 6px 28px rgba(13,127,120,.38); transition:transform .2s, box-shadow .2s;
    }
    .ct-submit:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(13,127,120,.48); }
    .ct-submit:disabled { opacity:.7; cursor:not-allowed; transform:none; }

    .ct-info-card {
      display:flex; align-items:flex-start; gap:16px; padding:22px 24px;
      background:#fff; border-radius:18px; border:1.5px solid #f0f0f0;
      transition:border-color .25s, box-shadow .25s;
    }
    .ct-info-card:hover { border-color:#0d7f78; box-shadow:0 8px 32px rgba(13,127,120,.1); }

    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .ct-shimmer { background:linear-gradient(90deg,#c8a96e,#fff5e0,#c8a96e); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite; }

    /* ─── Mobile responsive ─── */
    @media (max-width: 1024px) {
      .ct-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
    }
    @media (max-width: 640px) {
      .ct-field-pair { grid-template-columns: 1fr !important; gap: 14px !important; }
      .ct-info-card { padding: 18px !important; gap: 14px !important; }
      .ct-footer-row { flex-direction: column !important; align-items: flex-start !important; }
    }

    @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .ct-success { animation:slideUp .4s ease forwards; }
  `}</style>
);

const reasons = [
  { label: 'Book Appointment' },
  { label: 'General Inquiry' },
  { label: 'Test Results' },
  { label: 'Emergency Assistance' },
  { label: 'Feedback / Complaint' },
  { label: 'Other' },
];

const infoItems = [
  { Icon: Phone, bg: '#e8f4f3', ic: '#0d7f78', label: 'Call Us Directly', val: '+91 99926 54891', sub: 'Available Mon – Sat, 9am – 8pm' },
  { Icon: Mail, bg: '#fdf6ec', ic: '#c8a96e', label: 'Email Us', val: 'info@manglahealthcare.com', sub: 'We reply within 24 hours' },
  { Icon: MapPin, bg: '#eef2fb', ic: '#4a6fa5', label: 'Visit Our Clinic', val: '123 Medical Square, Healthcare City', sub: 'Near City General Hospital' },
  { Icon: Clock, bg: '#f0f0ff', ic: '#7c65d8', label: 'Working Hours', val: 'Mon – Sat: 9:00 AM – 8:00 PM', sub: 'Emergency: 24 × 7' },
];

/* ════════════════════════════════════════════════ */
const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', reason: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number required';
    if (!form.message.trim()) e.message = 'Please write a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  return (
    <>
      <Styles />
      <div className="ct-body" style={{ background: '#fff' }}>

        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: '#07202f', minHeight: 440, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1920&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: .14 }} />
          </div>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,12vw,120px) 24px', width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <span className="ct-pill">Get In Touch</span>
              <h1 className="ct-display" style={{ color: '#fff', fontSize: 'clamp(2.6rem,6vw,5rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 18 }}>
                We're Here<br /><em style={{ color: '#c8a96e' }}>to Help You.</em>
              </h1>
              <p style={{ color: 'rgba(247,243,237,.6)', fontSize: 18, maxWidth: 500, lineHeight: 1.7 }}>
                Whether it's booking an appointment or a general inquiry — reach out and we'll respond promptly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ══ */}
        <section style={{ padding: '100px 24px', background: '#f7f3ed' }}>
          <div className="ct-layout" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>

            {/* ── LEFT: Info + Map ── */}
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span style={{ display: 'inline-block', background: 'rgba(13,127,120,.1)', color: '#0d7f78', fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 100, marginBottom: 14 }}>Contact Info</span>
                <h2 className="ct-display" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#07202f', fontWeight: 700, lineHeight: 1.12, marginBottom: 8 }}>
                  Find Us, Call Us,<br />Visit Us.
                </h2>
                <div className="ct-divider" />
              </div>

              {infoItems.map(({ Icon, bg, ic, label, val, sub }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  className="ct-info-card"
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color={ic} />
                  </div>
                  <div>
                    <p className="ct-ui" style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 2 }}>{label}</p>
                    <p className="ct-ui" style={{ fontSize: 15, fontWeight: 600, color: '#07202f', marginBottom: 2 }}>{val}</p>
                    <p style={{ fontSize: 13, color: '#94a3b8' }}>{sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 240, boxShadow: '0 8px 32px rgba(7,32,47,.1)', border: '1.5px solid #e2e8f0', marginTop: 8 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9759529321356!2d75.8677!3d22.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEyLjAiTiA3NcKwNTInMDMuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0, display: 'block' }}
                  allowFullScreen="" loading="lazy" title="Mangla Healthcare"
                />
              </div>
            </motion.div>

            {/* ── RIGHT: Form ── */}
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(32px,5vw,52px)', boxShadow: '0 16px 60px rgba(7,32,47,.08)' }}>

                <AnimatePresence mode="wait">
                  {sent ? (
                    /* ── Success ── */
                    <motion.div key="success" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                      <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#0d7f78,#0a6560)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                        <CheckCircle2 size={44} color="#fff" />
                      </div>
                      <h3 className="ct-display" style={{ fontSize: 32, color: '#07202f', fontWeight: 700, marginBottom: 12 }}>Message Sent!</h3>
                      <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                        Thank you, <strong>{form.name}</strong>. We've received your message and will get back to you on <strong style={{ color: '#0d7f78' }}>{form.phone}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', reason: '', message: '' }); }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f7f3ed', border: 'none', borderRadius: 12, padding: '12px 24px', cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: '#07202f', fontSize: 15, transition: 'background .2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#e8f4f3'}
                        onMouseLeave={e => e.currentTarget.style.background = '#f7f3ed'}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
                      <div>
                        <h3 className="ct-display" style={{ fontSize: 30, color: '#07202f', fontWeight: 700, marginBottom: 6 }}>Send Us a Message</h3>
                        <p style={{ color: '#94a3b8', fontSize: 15 }}>We typically respond within 24 hours.</p>
                      </div>

                      {/* Name */}
                      <div className="ct-field-wrap">
                        <User size={17} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                        <input
                          className="ct-field with-icon"
                          placeholder="Your Full Name"
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                        />
                        {errors.name && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 5, fontFamily: "'DM Sans',sans-serif" }}>{errors.name}</p>}
                      </div>

                      {/* Phone + Email row */}
                      <div className="ct-field-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div className="ct-field-wrap">
                          <Phone size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                          <input
                            className="ct-field with-icon"
                            placeholder="Phone Number"
                            type="tel"
                            value={form.phone}
                            onChange={e => update('phone', e.target.value)}
                            style={{ borderColor: errors.phone ? '#ef4444' : undefined }}
                          />
                          {errors.phone && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 5 }}>{errors.phone}</p>}
                        </div>
                        <div className="ct-field-wrap">
                          <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                          <input
                            className="ct-field with-icon"
                            placeholder="Email (optional)"
                            type="email"
                            value={form.email}
                            onChange={e => update('email', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="ct-field-wrap">
                        <ChevronDown size={16} style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                        <select className="ct-field ct-select" value={form.reason} onChange={e => update('reason', e.target.value)}>
                          <option value="">Reason for Contact</option>
                          {reasons.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="ct-field-wrap">
                        <MessageSquare size={16} style={{ position: 'absolute', left: 18, top: 18, color: '#94a3b8', pointerEvents: 'none' }} />
                        <textarea
                          className="ct-field ct-textarea with-icon"
                          style={{ paddingTop: 18, borderColor: errors.message ? '#ef4444' : undefined }}
                          placeholder="Write your message here…"
                          value={form.message}
                          onChange={e => update('message', e.target.value)}
                        />
                        {errors.message && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 5 }}>{errors.message}</p>}
                      </div>

                      <button type="submit" className="ct-submit" disabled={loading}>
                        {loading ? (
                          <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>

                      <p style={{ fontSize: 12.5, color: '#94a3b8', textAlign: 'center', lineHeight: 1.5 }}>
                        Your data is encrypted and never shared with third parties.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ FAQ STRIP ══ */}
        <section style={{ background: '#07202f', padding: '60px 24px' }}>
          <div className="ct-footer-row" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h3 className="ct-display" style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Need an urgent appointment?</h3>
              <p style={{ color: 'rgba(247,243,237,.55)', fontSize: 16 }}>Call us directly and we'll schedule you immediately.</p>
            </div>
            <a href="tel:+919992654891" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'linear-gradient(135deg,#c8a96e,#a8893e)',
              color: '#fff', padding: '16px 32px', borderRadius: 100,
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17,
              textDecoration: 'none', boxShadow: '0 8px 28px rgba(200,169,110,.4)',
              transition: 'transform .2s, box-shadow .2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(200,169,110,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,169,110,.4)'; }}
            >
              <Phone size={20} /> +91 99926 54891
            </a>
          </div>
        </section>

      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
};

export default ContactPage;