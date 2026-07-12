import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Phone, MapPin, Activity,
    Stethoscope, Sparkles, Star, CheckCircle2, Heart, Award,
    Users, Leaf, ChevronDown, Play, Calendar, ChevronUp, Video,
    Building2, Droplets, Baby, Flower2, Pill, ClipboardCheck, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/layout/LanguageContext';
import SEO, { organizationSchema } from '../components/SEO';
import AccreditationStrip from '../components/AccreditationStrip';

/* ════════════════════════════════════════════════════════════
   ROGJEET AYURVEDA — HOMEPAGE
   NOTE: Site-wide navigation lives in <Navbar />, not here.
   This file contains only homepage sections.
   ════════════════════════════════════════════════════════════ */

/* ── Fonts & Styles ── */
const Styles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    :root {
      --teal:#0d7f78; --teal2:#0a6560; --gold:#c8a96e; --navy:#07202f;
      --cream:#f7f3ed; --rust:#B84C2B; --rust-light:#FAECE7; --rust-dark:#7A3018;
    }
    .rj-display { font-family: 'Playfair Display', serif; }
    .rj-body { font-family: 'DM Sans', sans-serif; }

    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .marquee-track { animation: marquee 28s linear infinite; display: flex; width: max-content; }

    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .shimmer-gold {
      background: linear-gradient(90deg,#c8a96e,#fff5e0,#c8a96e,#a8893e);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-el { animation: float 5s ease-in-out infinite; }

    .disease-card { transition: all .3s cubic-bezier(.25,.8,.25,1); cursor: pointer; }
    .disease-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(13,127,120,.15) !important; }
    .doctor-card { transition: all .35s; overflow: hidden; }
    .doctor-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(13,127,120,.18) !important; }
    .therapy-card { transition: all .3s; cursor: pointer; }
    .therapy-card:hover { transform: translateY(-4px); }
    .therapy-card:hover .therapy-img { transform: scale(1.08); }
    .therapy-img { transition: transform .5s; }

    .test-card { transition: all .3s; }
    .test-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(13,127,120,.12) !important; }

    .faq-item { border-bottom: 1px solid #e2e8f0; }

    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    }
    .facility-card { transition: all .3s cubic-bezier(.25,.8,.25,1); }
    .facility-card:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(13,127,120,.16) !important; border-color: rgba(13,127,120,.3) !important; }
    .facility-card:hover .facility-icon { background: linear-gradient(135deg,#0a6e66,#0d7f78) !important; color: #fff !important; transform: scale(1.06); }
    .facility-icon { transition: all .3s; }
    .facility-card:hover .facility-btn { background: #B84C2B !important; color: #fff !important; }

    .treat-card { transition: transform .3s; }
    .treat-card:hover { transform: translateY(-5px); }
    .treat-card:hover .treat-img { transform: scale(1.06); box-shadow: 0 14px 36px rgba(13,127,120,.22) !important; }
    .treat-img { transition: all .4s; }

    @media (max-width: 768px) {
      .treat-grid    { grid-template-columns: repeat(2,1fr) !important; }
      .disease-grid { grid-template-columns: repeat(3,1fr) !important; }
      .facility-grid { grid-template-columns: repeat(2,1fr) !important; }
      .doctor-grid  { grid-template-columns: repeat(2,1fr) !important; }
      .therapy-grid { grid-template-columns: repeat(3,1fr) !important; }
      .stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
      .steps-grid   { grid-template-columns: repeat(2,1fr) !important; }
      .why-grid     { grid-template-columns: repeat(2,1fr) !important; }
      /* tighter side padding on small viewports */
      section { padding-left: 16px !important; padding-right: 16px !important; }
    }
    @media (max-width: 480px) {
      .disease-grid { grid-template-columns: repeat(2,1fr) !important; }
      .facility-grid { grid-template-columns: 1fr !important; }
      .treat-grid    { grid-template-columns: repeat(2,1fr) !important; }
      .therapy-grid { grid-template-columns: repeat(2,1fr) !important; }
      .doctor-grid  { grid-template-columns: 1fr !important; }
      .why-grid     { grid-template-columns: 1fr !important; }
      .steps-grid   { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 360px) {
      .stats-grid   { grid-template-columns: 1fr !important; }
      .disease-grid { grid-template-columns: repeat(2,1fr) !important; }
    }
  `}</style>
);

/* ── Animated Counter ── */
const Counter = ({ to, suffix = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = to / 60;
        const timer = setInterval(() => {
            start += step;
            if (start >= to) { setVal(to); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 25);
        return () => clearInterval(timer);
    }, [inView, to]);
    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ── FAQ ── */
const FaqItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="faq-item" style={{ padding: '18px 0' }}>
            <button onClick={() => setOpen(!open)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 600, color: '#07202f' }}>{q}</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: open ? '#B84C2B' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                    {open ? <ChevronUp size={16} color="#fff" /> : <ChevronDown size={16} color="#64748b" />}
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#64748b', lineHeight: 1.7, marginTop: 12, paddingRight: 48 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ── Data ── */
const slides = [
    { img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=85', tag: 'Evidence-Based Ayurvedic Care' },
    { img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85', tag: 'Holistic Panchakarma Healing' },
    { img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1920&q=85', tag: 'Expert Specialist Consultations' },
];

const facilities = [
    { label: 'Ayurveda Hospital',     Icon: Building2,      path: '/hospital' },
    { label: 'Panchakarma',           Icon: Droplets,       path: '/panchkarma' },
    { label: 'Super Speciality OPD',  Icon: Stethoscope,    path: '/super-speciality' },
    { label: 'Insta Pain Management', Icon: Activity,       path: '/pain-management' },
    { label: 'Spa Ayurveda',          Icon: Sparkles,       path: '/spa' },
    { label: 'Garbha Sanskar',        Icon: Baby,           path: '/garbh-sanskar' },
    { label: 'Yoga',                  Icon: Flower2,        path: '/yoga' },
    { label: 'Suvarnprashan',         Icon: Pill,           path: '/suvarnaprashan' },
    { label: 'Health Checkup',        Icon: ClipboardCheck, path: '/hospital/health-checkup' },
];

const treatments = [
    { en: 'Ayurved General Medicine', hi: 'आयुर्वेद सर्वोपचार', img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=300&q=80' },
    { en: 'Gynecologist',             hi: 'स्त्रीरोग तज्ञ',      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80' },
    { en: 'Obesity',                  hi: 'लठ्ठपणा',            img: 'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=300&q=80' },
    { en: 'Infertility',              hi: 'वंध्यत्व',           img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=300&q=80' },
    { en: 'Piles & Fistula',          hi: 'मूळव्याध व भगंदर',    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?auto=format&fit=crop&w=300&q=80' },
    { en: 'Thyroid',                  hi: 'थायरॉइड',           img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=300&q=80' },
    { en: 'Heart & Diabetes',         hi: 'हृदयरोग व मधुमेह',    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=300&q=80' },
    { en: 'Skin Diseases',            hi: 'त्वचाविकार',         img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=300&q=80' },
    { en: 'Pediatric',                hi: 'बालरोग',            img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=300&q=80' },
];

const doctors = [
    { name: 'Dr. Devendra Kumar', qual: 'MBBS, MD (Ayurveda)', exp: '20 Years', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dr. Naresh Kumar', qual: 'MBBS, MS (Surgery)', exp: '15 Years', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dr. Priya Sharma', qual: 'BAMS, MD (Dravyaguna)', exp: '12 Years', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dr. Amit Verma', qual: 'BAMS, Panchakarma Expert', exp: '10 Years', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80' },
];

const testimonials = [
    { name: 'Rajesh Kumar', age: 45, condition: 'Chronic Joint Pain', rating: 5, text: 'Suffered for 10 years with knee pain. After Panchakarma treatment, I can now climb stairs pain-free. The doctors here are truly caring!', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Priya Singh', age: 38, condition: 'Skin Allergies', rating: 5, text: 'My eczema was unbearable, and no dermatologist helped. Within 2 months of treatment here, my skin is completely clear. Highly recommended!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { name: 'Amit Patel', age: 52, condition: 'Diabetes Management', rating: 5, text: 'Managing diabetes naturally now. No more insulin dependency. The lifestyle guidance combined with Ayurvedic herbs changed my life!', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { name: 'Neha Gupta', age: 29, condition: 'Fertility Issues', rating: 5, text: 'After 5 years of struggling, I\'m now pregnant! The holistic approach here addressed the root cause. Thank you!', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
];

const faqs = [
    { q: 'What conditions are treated at Mangla Healthcare?', a: 'We treat over 100 conditions including joint pain, digestive disorders, skin diseases, diabetes, thyroid, PCOD, piles & fistula, respiratory issues, sexual health, stress & sleep disorders, and more through personalised Ayurvedic protocols.' },
    { q: 'How long does Ayurvedic treatment take to show results?', a: "It depends on the condition's severity. Acute conditions may improve in 1–2 weeks, while chronic ones typically show significant improvement in 1–3 months with consistent treatment and lifestyle changes." },
    { q: 'Can Ayurveda be used alongside conventional medicine?', a: 'Yes, we follow an integrative approach. Our doctors are trained in both systems and ensure there are no adverse interactions, creating a balanced treatment plan that is safe and effective for each patient.' },
    { q: 'Is online / video consultation available?', a: 'Yes, we offer video consultations for patients who cannot visit in person. Book an appointment online and our team will schedule a teleconsultation at your convenience.' },
    { q: 'Are the Ayurvedic medicines safe and authentic?', a: 'Absolutely. All our herbal formulations use authenticated, quality-tested ingredients sourced from certified suppliers. Our medicines are prepared under strict GMP quality controls with no harmful additives or heavy metals.' },
    { q: 'What payment options do you accept?', a: 'We accept cash, credit/debit cards, UPI, online transfers, and most health insurance plans. Installment plans are available for comprehensive treatment packages.' },
];

/* ════════════ HOMEPAGE ════════════ */
const HomePage = () => {
    const [slide, setSlide] = useState(0);
    const [bookingForm, setBookingForm] = useState({ name: '', phone: '', consultation: '' });
    const [bookingSent, setBookingSent] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const { t } = useLanguage();

    useEffect(() => {
        const timer = setInterval(() => setSlide(p => (p + 1) % slides.length), 6000);
        return () => clearInterval(timer);
    }, []);

    const handleBook = (e) => {
        e.preventDefault();
        setBookingSent(true);
        setTimeout(() => setBookingSent(false), 4000);
        setBookingForm({ name: '', phone: '', consultation: '' });
    };

    return (
        <>
            <SEO
              title="Ayurveda Hospital, Panchkarma & Diagnostics in Jaipur"
              description="Mangla Healthcare combines multispeciality hospital care with Ayurveda, Panchkarma, modern diagnostics and personalised treatment plans. Serving Jaipur since 2015."
              schema={organizationSchema}
            />
            <Styles />
            <div className="rj-body" style={{ background: '#fff', overflowX: 'hidden', fontFamily: "'DM Sans',sans-serif" }}>

                {/* ══ HERO ══ */}
                <section ref={heroRef} style={{ minHeight: '88vh', position: 'relative', overflow: 'hidden', background: '#f7f3ed', display: 'flex', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={slide} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} style={{ position: 'absolute', inset: 0 }}>
                            <motion.div style={{ y: heroY, position: 'absolute', inset: 0 }}>
                                <img src={slides[slide].img} alt="" style={{ width: '100%', height: '115%', objectFit: 'cover' }} />
                            </motion.div>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(7,32,47,0.95) 0%, rgba(7,32,47,0.75) 50%, rgba(13,127,120,0.18) 100%)' }} />
                        </motion.div>
                    </AnimatePresence>

                    <div style={{ position: 'absolute', right: '5%', top: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, width: '100%' }}>
                        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(60px,7vw,90px) 20px 60px' }}>
                            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 56, alignItems: 'center' }}>

                                {/* LEFT */}
                                <div>
                                    <motion.div key={`tag-${slide}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.35)', borderRadius: 100, padding: '6px 18px', marginBottom: 22 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a96e' }} />
                                        <span style={{ color: '#c8a96e', fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{slides[slide].tag}</span>
                                    </motion.div>

                                    <motion.h1 key={`h1-${slide}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                        className="rj-display" style={{ color: '#fff', fontSize: 'clamp(2.4rem,5vw,4.4rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 18 }}>
                                        Evidence-Backed<br />
                                        <span style={{ color: '#c8a96e' }}>Ayurveda</span><br />
                                        For Chronic & Lifestyle<br />Health Problems
                                    </motion.h1>

                                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                                        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
                                        {[['1', 'Multispeciality Hospital'], ['10+', 'Doctors & Therapists'], ['1,25,000+', 'Consultations']].map(([n, l]) => (
                                            <div key={l} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '16px 22px', textAlign: 'center', minWidth: 100 }}>
                                                <p className="rj-display shimmer-gold" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{n}</p>
                                                <p style={{ color: 'rgba(247,243,237,.6)', fontSize: 11, fontWeight: 500, marginTop: 4 }}>{l}</p>
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                                        style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                                        {['Clinic & online consultations', 'Root-cause diagnosis & therapy', 'Support for 50+ conditions', 'Trusted care since 2015'].map(item => (
                                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <CheckCircle2 size={16} color="#c8a96e" />
                                                <span style={{ color: 'rgba(247,243,237,.85)', fontSize: 15, fontWeight: 400 }}>{item}</span>
                                            </div>
                                        ))}
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                                        style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#B84C2B', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(184,76,43,.4)' }}>
                                            <Calendar size={16} /> Book Free Consultation
                                        </Link>
                                        <Link to="/doctors" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '14px 26px', borderRadius: 100, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                                            <Users size={16} /> Our Doctors
                                        </Link>
                                        <Link to="/locate" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '14px 26px', borderRadius: 100, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                                            <MapPin size={16} /> Locate Clinic
                                        </Link>
                                        <Link to="/services/video-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '14px 26px', borderRadius: 100, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
                                            <Video size={16} /> Video Consultation
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* RIGHT: Booking Widget */}
                                <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                                    style={{ background: '#fff', borderRadius: 20, padding: '28px 26px', boxShadow: '0 32px 80px rgba(7,32,47,.3)' }}>
                                    <div style={{ background: '#B84C2B', borderRadius: 12, padding: '14px 18px', marginBottom: 20, textAlign: 'center' }}>
                                        <p style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>Consult India's Trusted Doctors</p>
                                        <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 12, marginTop: 4 }}>Get a call from our health coach in 5–10 mins</p>
                                    </div>

                                    {bookingSent ? (
                                        <div style={{ textAlign: 'center', padding: '28px 0' }}>
                                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#e8f4f3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                                                <CheckCircle2 size={30} color="#0d7f78" />
                                            </div>
                                            <p style={{ fontSize: 17, fontWeight: 700, color: '#07202f', marginBottom: 4 }}>Thank you!</p>
                                            <p style={{ fontSize: 13, color: '#64748b' }}>Our health coach will call you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            <input required value={bookingForm.name} onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                                                placeholder="Patient Name"
                                                style={{ padding: '13px 16px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none' }} />
                                            <div style={{ display: 'flex', gap: 0 }}>
                                                <span style={{ padding: '13px 14px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px', fontSize: 14, fontWeight: 700, color: '#475569' }}>+91</span>
                                                <input required value={bookingForm.phone} onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                                    placeholder="Mobile Number" type="tel"
                                                    style={{ flex: 1, padding: '13px 16px', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none' }} />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 12px', background: '#fafafa', borderRadius: 10, border: '1px solid #f0f0f0' }}>
                                                {['Book your consultation', 'Speak with a health coach', 'Get Your Personalised Treatment Plan'].map((s, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#B84C2B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                                        <span style={{ fontSize: 13, color: '#475569' }}>{s}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button type="submit" style={{ padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#B84C2B', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", boxShadow: '0 6px 20px rgba(184,76,43,.35)' }}>
                                                Book Now
                                            </button>
                                        </form>
                                    )}
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Slide Controls */}
                    <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 20 }}>
                        {slides.map((_, i) => (
                            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 28 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', background: i === slide ? '#c8a96e' : 'rgba(255,255,255,.35)', transition: 'all .4s' }} />
                        ))}
                    </div>
                    {[{ Icon: ChevronLeft, fn: () => setSlide(p => p === 0 ? slides.length - 1 : p - 1), side: { left: 16 } },
                    { Icon: ChevronRight, fn: () => setSlide(p => (p + 1) % slides.length), side: { right: 16 } }].map(({ Icon, fn, side }, i) => (
                        <button key={i} onClick={fn} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...side, zIndex: 20, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={20} />
                        </button>
                    ))}
                </section>

                {/* ══ ACCREDITATIONS ══ */}
                <AccreditationStrip />

                {/* ══ OUR FACILITY ══ */}
                <section style={{ padding: '72px 20px', background: 'linear-gradient(180deg,#f7efde 0%,#fcfaf5 100%)' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 44 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>What We Offer</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#07202f', fontWeight: 700 }}>
                                Our Facility
                            </h2>
                        </motion.div>
                        <div className="facility-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                            {facilities.map(({ label, Icon, path }, i) => (
                                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    className="facility-card"
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '36px 24px', background: '#fff', border: '1.5px solid #f0e9da', borderRadius: 20, boxShadow: '0 4px 18px rgba(7,32,47,.06)' }}>
                                    <div className="facility-icon" style={{ width: 88, height: 88, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#e6f4f2,#f7efde)', color: '#0a6e66', marginBottom: 20 }}>
                                        <Icon size={38} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="rj-display" style={{ fontSize: 20, fontWeight: 700, color: '#07202f', marginBottom: 18 }}>{label}</h3>
                                    <Link to={path} className="facility-btn" style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 24px', borderRadius: 100, background: '#0a6e66', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all .3s' }}>
                                        Know More <ArrowRight size={15} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ OUR TREATMENTS ══ */}
                <section style={{ padding: '72px 20px', background: '#fff' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 44 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Conditions We Care For</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#07202f', fontWeight: 700 }}>
                                Our Treatments
                            </h2>
                        </motion.div>
                        <div className="treat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px 24px' }}>
                            {treatments.map(({ en, hi, img }, i) => (
                                <motion.div key={en} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    className="treat-card"
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div className="treat-img" style={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 8px 24px rgba(7,32,47,.12)', marginBottom: 18 }}>
                                        <img src={img} alt={en} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <h3 className="rj-display" style={{ fontSize: 18, fontWeight: 700, color: '#07202f', lineHeight: 1.35 }}>
                                        {en} <span style={{ color: '#0a6e66', fontWeight: 600 }}>({hi})</span>
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 44 }}>
                            <Link to="/diseases" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 34px', borderRadius: 100, background: '#B84C2B', color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 20px rgba(184,76,43,.35)' }}>
                                Click Here For All Treatments <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══ DOCTORS ══ */}
                <section style={{ padding: '80px 20px', background: '#fff' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 36 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Our Specialists</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#07202f', fontWeight: 700 }}>
                                Consult Top Ayurveda Doctors
                            </h2>
                        </motion.div>

                        <div className="doctor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24, maxWidth: 720, margin: '0 auto' }}>
                            {doctors.slice(0, 2).map((doc, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="doctor-card"
                                    style={{ borderRadius: 18, border: '1.5px solid #f0f0f0', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(7,32,47,.06)' }}>
                                    <div style={{ position: 'relative', height: 240, background: '#B84C2B', overflow: 'hidden' }}>
                                        <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.95 }} />
                                    </div>
                                    <div style={{ padding: '16px 18px 18px' }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#07202f', marginBottom: 2 }}>{doc.name}</h3>
                                        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{doc.qual}</p>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: '#B84C2B', marginBottom: 12 }}>{doc.exp} Experience</p>
                                        <Link to="/contact" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: 8, background: '#B84C2B', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                                            BOOK APPOINTMENT
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ HOW IT WORKS ══ */}
                <section style={{ padding: '72px 20px', background: '#07202f' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 52 }}>
                            <p style={{ color: '#c8a96e', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>Our Process</p>
                            <h2 className="rj-display" style={{ color: '#fff', fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 700 }}>
                                Your Healing Journey in 5 Simple Steps
                            </h2>
                        </motion.div>
                        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2 }}>
                            {[
                                { icon: '📞', n: '01', t: 'Book Consultation', s: 'Choose clinic or online slot via phone or website' },
                                { icon: '🧬', n: '02', t: 'Prakriti Analysis', s: 'Deep Ayurvedic diagnosis of your body constitution' },
                                { icon: '👨‍⚕️', n: '03', t: 'Doctor Consultation', s: 'Expert evaluation by our certified Vaidyas' },
                                { icon: '📋', n: '04', t: 'Personalised Plan', s: 'Custom herbal protocol, diet & lifestyle guidance' },
                                { icon: '💊', n: '05', t: 'Treatment & Follow-up', s: 'Ongoing care with regular progress tracking' },
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', padding: '36px 18px', textAlign: 'center', position: 'relative' }}>
                                    <p style={{ fontSize: 42, marginBottom: 10 }}>{s.icon}</p>
                                    <p style={{ color: 'rgba(200,169,110,.4)', fontSize: 34, fontWeight: 800, position: 'absolute', top: 10, left: 14, lineHeight: 1 }}>{s.n}</p>
                                    <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.t}</h3>
                                    <p style={{ color: 'rgba(247,243,237,.45)', fontSize: 13, lineHeight: 1.6 }}>{s.s}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ WHY CHOOSE US ══ */}
                <section style={{ padding: '72px 20px', background: '#f7f3ed' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Why Choose Us</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#07202f', fontWeight: 700 }}>Rogjeet Ayurveda Difference</h2>
                        </motion.div>
                        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
                            {[
                                { t: 'Root-Cause Healing', d: 'We address the underlying imbalances, not just symptoms, for lasting recovery.', icon: '🎯' },
                                { t: 'Expert Vaidyas', d: 'Qualified BAMS & MD Ayurveda doctors with decades of specialised experience.', icon: '👨‍⚕️' },
                                { t: 'Personalised Plans', d: 'Every patient receives a unique herbal, dietary, and lifestyle protocol.', icon: '📋' },
                                { t: 'Authentic Protocols', d: 'Classical Ayurvedic methods combined with evidence-based modern diagnostics.', icon: '🔬' },
                                { t: 'Affordable Care', d: 'Transparent pricing with no hidden charges. Quality care for every budget.', icon: '💚' },
                            ].map(({ t, d, icon }, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    style={{ background: '#fff', borderRadius: 20, padding: '28px 20px', boxShadow: '0 2px 12px rgba(7,32,47,.06)', transition: 'all .3s', cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#07202f'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(13,127,120,.15)'; e.currentTarget.querySelector('.why-title').style.color = '#fff'; e.currentTarget.querySelector('.why-desc').style.color = 'rgba(247,243,237,.65)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(7,32,47,.06)'; e.currentTarget.querySelector('.why-title').style.color = '#07202f'; e.currentTarget.querySelector('.why-desc').style.color = '#64748b'; }}>
                                    <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
                                    <h3 className="why-title" style={{ fontSize: 15, fontWeight: 700, color: '#07202f', marginBottom: 8, transition: 'color .3s' }}>{t}</h3>
                                    <p className="why-desc" style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, transition: 'color .3s' }}>{d}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ TESTIMONIALS ══ */}
                <section style={{ padding: '72px 20px', background: 'linear-gradient(135deg,#f7f3ed 0%,#e8f4f3 100%)' }}>
                    <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Healing Stories</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#07202f', fontWeight: 700, marginBottom: 14 }}>
                                Real Patients, Real Results
                            </h2>
                            <p style={{ color: '#64748b', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                                Thousands of patients have transformed their health through our evidence-based Ayurvedic care. Here are their stories.
                            </p>
                        </motion.div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
                            {testimonials.map((t, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 4px 20px rgba(7,32,47,.06)', border: '1px solid rgba(200,169,110,.08)', transition: 'all .3s', cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(13,127,120,.15)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(7,32,47,.06)'; }}>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                                        <img src={t.img} alt={t.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
                                        <div>
                                            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#07202f', marginBottom: 2 }}>{t.name}</h4>
                                            <p style={{ fontSize: 12, color: '#B84C2B', fontWeight: 600 }}>{t.condition}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                                        {Array(t.rating).fill().map((_, j) => (
                                            <span key={j} style={{ fontSize: 16 }}>⭐</span>
                                        ))}
                                    </div>
                                    <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ FAQ ══ */}
                <section style={{ padding: '72px 20px', background: '#fff' }}>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 44 }}>
                            <p style={{ color: '#B84C2B', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>FAQ</p>
                            <h2 className="rj-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#07202f', fontWeight: 700 }}>Frequently Asked Questions</h2>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
                        </motion.div>
                    </div>
                </section>

                {/* ══ CTA ══ */}
                <section style={{ padding: '64px 20px', background: '#f7f3ed' }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            style={{ background: 'linear-gradient(135deg,#07202f 0%,#0b3545 40%,#0d7f78 100%)', borderRadius: 24, padding: 'clamp(40px,6vw,68px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                            <div style={{ position: 'absolute', top: -50, right: -50, width: 240, height: 240, borderRadius: '50%', background: 'rgba(200,169,110,0.1)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(13,127,120,0.14)', pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <p style={{ color: '#c8a96e', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>Start Your Healing Journey</p>
                                <h2 className="rj-display" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4.5vw,3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 14 }}>
                                    Take the First Step Towards<br />Lasting Health
                                </h2>
                                <p style={{ color: 'rgba(247,243,237,.6)', fontSize: 16, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.65 }}>
                                    Consult our expert Vaidyas and receive a personalised Ayurvedic treatment plan tailored to your unique constitution and health goals.
                                </p>
                                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Link to="/health-test" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#B84C2B', color: '#fff', padding: '14px 30px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 28px rgba(184,76,43,.4)' }}>
                                        <Activity size={16} /> Take Free Health Test
                                    </Link>
                                    <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                                        <Phone size={16} /> Contact Us
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ══ STICKY MOBILE BOTTOM BAR ══ */}
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60, display: 'flex', background: 'transparent', pointerEvents: 'none' }}>
                    <Link to="/contact" style={{ flex: 1, padding: '16px', background: '#B84C2B', color: '#fff', fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none', pointerEvents: 'all', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Calendar size={16} /> Book Free Consultation
                    </Link>
                    <a href="tel:+919992654891" style={{ flex: 1, padding: '16px', background: '#0d7f78', color: '#fff', fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none', pointerEvents: 'all', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Phone size={16} /> Call Us
                    </a>
                </div>

                <div style={{ height: 60 }} />

            </div>
        </>
    );
};

export default HomePage;