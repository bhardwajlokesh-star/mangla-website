import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ChevronDown, Leaf, Droplet, Flame, Wind,
  Heart, ShieldCheck, Activity, Brain, Sun, Moon, Sparkles, Check,
  ArrowRight, Quote, ClipboardCheck, Stethoscope, FlaskConical,
  HeartPulse, Eye, Ear, Bone, Star, Calendar, Send
} from 'lucide-react';
import SEO from '../components/SEO';
import { useSheetSubmit } from '../utils/useSheetSubmit';

/* ──────────────────────────────────────────────────────────────
   PANCHAKARMA — PREMIUM DEDICATED PAGE
   12 sections. Image placeholders are intentional (replace later).
   Palette: Deep Forest Green / Ayurvedic Gold / Warm Ivory.
   ────────────────────────────────────────────────────────────── */

/* ── shared image (real <img> when src provided, dashed placeholder otherwise) ── */
const ImagePlaceholder = ({ label = 'Image Placeholder', ratio = '4/3', rounded = 22, accent = false, height, src }) => {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      aria-label={label}
      style={{
        position: 'relative',
        aspectRatio: height ? undefined : ratio,
        height: height || 'auto',
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
        flexDirection: 'column',
        gap: 10, overflow: 'hidden',
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      ) : (
        <>
          {/* leaf decoration */}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(30,91,79,.08)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#1E5B4F',
          }}>
            <Leaf size={18} strokeWidth={2} />
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'rgba(30,91,79,.1)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#1E5B4F',
          }}>
            <Sparkles size={26} strokeWidth={1.8} />
          </div>
          <p style={{
            fontSize: 12,
            fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase',
            color: 'rgba(30,91,79,.7)',
          }}>{label}</p>
        </>
      )}
    </div>
  );
};

/* ── image paths matched to public/img/ filenames ──
   File names preserved exactly as saved (browser handles space encoding) */
const IMG = (file) => `/img/${file}`;

/* ── animated counter ── */
const Counter = ({ to, suffix = '', label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, to / 50);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 28);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className="pk-display" style={{
        fontSize: 'clamp(28px, 3.5vw, 40px)',
        fontWeight: 800, color: '#1E5B4F', lineHeight: 1,
      }}>
        {val.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 12.5, color: '#2D2D2D99', marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  );
};

/* ── FAQ accordion item ── */
const FaqItem = ({ q, a, isOpen, onClick }) => (
  <div style={{
    borderBottom: '1px solid rgba(30,91,79,.14)',
    transition: 'background .25s ease',
    background: isOpen ? 'rgba(221,232,227,.4)' : 'transparent',
    borderRadius: isOpen ? 14 : 0,
    padding: isOpen ? '6px 18px' : '6px 0',
  }}>
    <button onClick={onClick} style={{
      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 0', fontFamily: 'inherit', textAlign: 'left', gap: 18,
    }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: '#2D2D2D' }}>{q}</span>
      <span style={{
        width: 32, height: 32, borderRadius: '50%',
        background: isOpen ? '#1E5B4F' : '#DDE8E3',
        color: isOpen ? '#C9A86A' : '#1E5B4F',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all .25s',
      }}>
        <ChevronDown size={16} style={{ transition: 'transform .25s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            fontSize: 15, color: '#2D2D2DAA', lineHeight: 1.75,
            paddingBottom: 22, paddingRight: 50,
          }}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */

const THERAPIES = [
  { name: 'Snehan Therapy',   desc: 'Therapeutic internal and external oleation with medicated ghee and oils.',  icon: Droplet,      img: IMG('snehan_therapy.webp') },
  { name: 'Svedan Therapy',   desc: 'Steam and sudation therapy to mobilise toxins from the deep tissues.',      icon: Wind,         img: IMG('svedan_therapy.webp') },
  { name: 'Vaman Therapy',    desc: 'Doctor-supervised therapeutic emesis for chronic Kapha disorders.',          icon: Flame,        img: IMG('Vaman Therapy.webp') },
  { name: 'Virechan Therapy', desc: 'Cleansing purgation indicated for Pitta imbalance and skin disease.',        icon: FlaskConical, img: IMG('Virechan Therapy.webp') },
  { name: 'Basti Therapy',    desc: 'Medicated enema regarded as the principal treatment for Vata disorders.',    icon: Sparkles,     img: IMG('Basti Therapy.webp') },
  { name: 'Nasya Therapy',    desc: 'Nasal administration of medicated oils for the head and neck region.',       icon: Brain,        img: IMG('Nasya Therapy.webp') },
  { name: 'Raktamokshana',    desc: 'Selective blood purification for specific clinically reviewed cases.',       icon: Activity,     img: IMG('Raktamokshana.webp') },
  { name: 'Shirodhara',       desc: 'Continuous medicated oil stream over the forehead for deep mind reset.',     icon: Heart,        img: IMG('Shirodhara.webp') },
  { name: 'Hruday Basti',     desc: 'Warm oil pool over the heart region for stress and cardiac vitality.',       icon: HeartPulse,   img: IMG('Hruday Basti.webp') },
  { name: 'Karna Puram',      desc: 'Warm medicated oil filled in the ears for hearing and nervous system care.', icon: Ear,          img: IMG('Karna Puram.webp') },
  { name: 'Thalam',           desc: 'Medicated paste retained on the crown for sleep, focus and migraine.',       icon: Brain,        img: IMG('Thalam.webp') },
  { name: 'Kati Basti',       desc: 'Warm oil retention over the lumbar spine for chronic lower back issues.',    icon: Bone,         img: IMG('Kati basti.webp') },
  { name: 'Manya Basti',      desc: 'Warm oil pool over the cervical spine for neck stiffness and cervicalgia.',  icon: Bone,         img: IMG('Manya Basti.webp') },
  { name: 'Uttar Basti',      desc: 'Specialised therapeutic procedure for reproductive and urinary health.',     icon: ShieldCheck,  img: IMG('Uttar Basti.webp') },
  { name: 'Janu Basti',       desc: 'Warm oil retention over the knees for osteoarthritis and joint pain.',       icon: Bone,         img: IMG('Janu Basti.webp') },
  { name: 'Netra Tarpan',     desc: 'Medicated ghee retained over the eyes for vision care and ocular health.',   icon: Eye,          img: IMG('Netra Tarpan.webp') },
];

const DETAILED_THERAPIES = [
  {
    name: 'Snehan Therapy',
    tagline: 'Oleation & internal lubrication',
    description: 'Snehan is the foundational preparatory therapy where medicated ghee or oil is administered internally and externally in graduated doses. It softens accumulated doshas, lubricates tissues, and prepares the body for the main cleansing therapies that follow.',
    benefits: ['Lubricates joints and tissues', 'Calms Vata dosha', 'Prepares body for detox', 'Improves agni (digestive fire)'],
    conditions: ['Dryness', 'Constipation', 'Joint stiffness', 'Pre-Panchkarma preparation'],
    img: IMG('snehan_therapy.webp'),
  },
  {
    name: 'Svedan Therapy',
    tagline: 'Therapeutic sudation',
    description: 'Following oleation, Svedan applies controlled steam and heat to open the channels (srotas), liquefy ama (toxins), and prepare them for elimination. Different forms — bashpa sweda, nadi sweda, pinda sweda — are chosen based on the patient.',
    benefits: ['Opens body channels', 'Mobilises toxins', 'Improves circulation', 'Relieves stiffness'],
    conditions: ['Body stiffness', 'Cold extremities', 'Post-oleation phase', 'Musculoskeletal tension'],
    img: IMG('svedan_therapy.webp'),
  },
  {
    name: 'Vaman Therapy',
    tagline: 'Therapeutic emesis for Kapha clearance',
    description: 'Vaman is a doctor-supervised emesis therapy that clears excess Kapha from the upper respiratory and gastrointestinal tract. After a structured preparation phase, the procedure is performed in a calm clinical setting with continuous monitoring.',
    benefits: ['Clears excess Kapha', 'Improves respiratory health', 'Detoxifies upper digestive tract', 'Eases chronic congestion'],
    conditions: ['Asthma', 'Chronic allergies', 'Recurrent congestion', 'Skin disorders linked to Kapha'],
    img: IMG('Vaman Therapy.webp'),
  },
  {
    name: 'Virechan Therapy',
    tagline: 'Cleansing purgation for Pitta',
    description: 'Virechan is a planned therapeutic purgation that flushes excess Pitta and accumulated ama through the bowels. It is indicated for skin disease, liver disorders, hyperacidity, and metabolic imbalances with Pitta predominance.',
    benefits: ['Eliminates excess Pitta', 'Improves liver and metabolism', 'Clears skin disorders', 'Reduces hyperacidity'],
    conditions: ['Skin conditions', 'Hyperacidity', 'Liver disorders', 'Migraine of Pitta origin'],
    img: IMG('Virechan Therapy.webp'),
  },
  {
    name: 'Basti Therapy',
    tagline: 'The principal Vata treatment',
    description: 'Basti is the administration of medicated decoctions or oils through the rectum. Classical Ayurveda considers Basti the foremost treatment for Vata disorders — particularly chronic pain, neurological complaints, and degenerative conditions.',
    benefits: ['Pacifies Vata dosha', 'Eases chronic pain', 'Supports nervous system', 'Improves joint mobility'],
    conditions: ['Sciatica', 'Arthritis', 'Constipation', 'Lumbar and cervical pain'],
    img: IMG('Basti Therapy.webp'),
  },
  {
    name: 'Nasya Therapy',
    tagline: 'Nasal administration for the head and neck',
    description: 'Nasya delivers medicated oils through the nostrils to clear and nourish the structures of the head, neck, and sense organs. It is particularly effective for sinus issues, headaches, hair fall, and stress-related complaints.',
    benefits: ['Clears sinuses', 'Improves clarity and focus', 'Strengthens senses', 'Supports hair health'],
    conditions: ['Sinusitis', 'Migraine', 'Hair fall', 'Cervical spondylosis'],
    img: IMG('Nasya Therapy.webp'),
  },
  {
    name: 'Shirodhara',
    tagline: 'The signature stream over the forehead',
    description: 'A warm, continuous stream of medicated oil flows over the forehead — specifically the ajna marma — for 30 to 45 minutes. Few therapies in classical Ayurveda have such profound effect on the nervous system and mental equilibrium.',
    benefits: ['Reduces stress and anxiety', 'Deep nervous-system reset', 'Improves sleep quality', 'Supports memory and clarity'],
    conditions: ['Insomnia', 'Stress and anxiety', 'Hair fall', 'Headaches'],
    img: IMG('Shirodhara.webp'),
  },
];

const BENEFITS = [
  { n: 95, suffix: '%', label: 'Toxin elimination',   icon: Droplet },
  { n: 88, suffix: '%', label: 'Better digestion',    icon: Flame },
  { n: 92, suffix: '%', label: 'Stronger immunity',   icon: ShieldCheck },
  { n: 85, suffix: '%', label: 'Energy & vitality',   icon: Sparkles },
  { n: 90, suffix: '%', label: 'Improved sleep',      icon: Moon },
  { n: 87, suffix: '%', label: 'Mental clarity',      icon: Brain },
  { n: 83, suffix: '%', label: 'Healthy ageing',      icon: Sun },
  { n: 94, suffix: '%', label: 'Stress reduction',    icon: Heart },
];

const WHO = [
  'Chronic stress',  'Digestive disorders', 'Lifestyle imbalance', 'Persistent fatigue',
  'Poor immunity',   'Skin disorders',      'Joint problems',      'Detoxification needs',
];

const JOURNEY = [
  { title: 'Consultation',                desc: 'In-depth discussion of your concerns, history, and goals with our senior physician.', icon: Stethoscope },
  { title: 'Diagnosis & Dosha Analysis',  desc: 'Comprehensive prakriti, vikriti, and pulse assessment combined with modern investigation where needed.', icon: ClipboardCheck },
  { title: 'Personalised Treatment Plan', desc: 'A bespoke programme is created — therapy sequence, duration, diet, and home routine.', icon: Leaf },
  { title: 'Therapy Sessions',            desc: 'Doctor-supervised classical Panchakarma therapies in calm, hygienic treatment suites.', icon: Sparkles },
  { title: 'Post-Treatment Guidance',     desc: 'Structured aftercare, diet plan, rasayana support, and follow-up reviews.', icon: HeartPulse },
];

const FAQS = [
  { q: 'What is Panchakarma?', a: 'Panchakarma is a classical Ayurvedic system of five purification therapies designed to remove accumulated toxins, restore dosha balance, and rejuvenate the body. The five core procedures — Vaman, Virechan, Basti, Nasya, and Raktamokshana — are supported by preparatory and rejuvenative protocols, all administered under doctor supervision.' },
  { q: 'How long does treatment take?', a: 'A complete Panchakarma course typically ranges from 7 to 28 days depending on the patient\'s condition, age, strength, and clinical goals. Shorter wellness courses (3–5 days) are available for preventive care. The duration is finalised after a detailed consultation and dosha analysis.' },
  { q: 'Is Panchakarma safe?', a: 'When administered by trained Ayurvedic doctors with proper screening, preparation, and aftercare, Panchakarma is very safe. We screen every patient for contraindications, monitor vitals throughout, and follow classical protocols. Patients with certain conditions — including pregnancy, weak digestion, or specific cardiac issues — are screened out or offered modified care.' },
  { q: 'Who should avoid Panchakarma?', a: 'Pregnancy, very young children, frail elderly patients, and individuals with severe cardiac, renal, or psychiatric conditions are generally not candidates for full Panchakarma. Modified, gentler protocols may still be offered after detailed assessment. Our team will tell you transparently if you are or are not suited for any procedure.' },
  { q: 'What preparations are needed?', a: 'A typical Panchakarma course begins with 3–7 days of internal oleation (snehan), a light warm diet (typically khichdi), reduced sleep disturbance, and minimised physical and digital exertion. We provide a personalised pre-therapy checklist after your initial consultation.' },
  { q: 'How often should Panchakarma be done?', a: 'For most healthy individuals, a seasonal mini-cleanse once a year and a full Panchakarma course once every two to three years is appropriate. For patients managing chronic conditions, the frequency is decided by the treating doctor — usually annually with maintenance therapies in between.' },
  { q: 'Can Panchakarma help with chronic diseases?', a: 'Yes — Panchakarma is widely used as a supportive system in chronic disease management. It is most established for arthritis and joint disorders, skin diseases, digestive disorders, neurological complaints, women\'s health concerns, and stress-related conditions. It works best alongside, not instead of, appropriate modern medical care.' },
  { q: 'What diet should be followed after treatment?', a: 'Immediately after Panchakarma we follow samsarjana krama — a stepped recovery diet beginning with rice water and gradually returning to regular food over 3–7 days. This is the most under-appreciated part of the protocol. Long-term, we recommend a constitution-appropriate diet, regular sleep, mindful eating, and avoiding processed and incompatible foods.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',     loc: 'Jaipur',  text: 'After years of chronic back pain and digestive issues, the personalised Panchakarma course at Mangla transformed how I feel every day. The team is genuinely caring.', avatar: 'PS' },
  { name: 'Rajesh Kumar',     loc: 'Delhi',   text: 'The depth of expertise and authenticity of the therapies here is unmatched. Three weeks into the programme and I am sleeping better than I have in a decade.',         avatar: 'RK' },
  { name: 'Anita Mehta',      loc: 'Mumbai',  text: 'I came in burnt-out and skeptical. The structured preparation phase, the actual therapies, and the post-care plan — every part felt thoughtful and classical.',          avatar: 'AM' },
  { name: 'Dr. Sandeep Verma',loc: 'Lucknow', text: 'As a physician myself, I appreciated the rigour. Vitals were tracked, classical preparation was honoured, and the recovery diet was actually followed properly.',         avatar: 'SV' },
  { name: 'Meera Iyer',       loc: 'Chennai', text: 'The Shirodhara sessions during my 14-day stay were transformative. The peace and clarity I felt afterwards has carried into my work and relationships.',                  avatar: 'MI' },
  { name: 'Karan Aggarwal',   loc: 'Pune',    text: 'A truly authentic Ayurveda hospital. No upselling, no rushed appointments — just careful classical care delivered by people who clearly love what they do.',             avatar: 'KA' },
];

const PROCESS_TIMELINE = [
  { step: '01', title: 'Snehan Therapy',         desc: 'Internal & external oleation prepares your body for deep cleansing.',  icon: Droplet },
  { step: '02', title: 'Svedan Therapy',         desc: 'Steam and sudation open the channels and mobilise toxins.',            icon: Wind },
  { step: '03', title: 'Main Cleansing',         desc: 'Personalised Vaman, Virechan, Basti, Nasya or Raktamokshana protocol.', icon: Sparkles },
  { step: '04', title: 'Recovery & Rejuvenation',desc: 'Stepped recovery diet, rasayana support and lifestyle guidance.',     icon: Leaf },
];

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const PanchkarmaPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
  const enquiry = useSheetSubmit('enquiry', 'Panchkarma — Appointment');
  const formSent = enquiry.sent;

  /* auto-advance testimonials */
  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(t => (t + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await enquiry.submit({ name: form.name, phone: form.phone, email: form.email, interest: form.interest, message: form.message });
    if (!ok) return;
    setForm({ name: '', phone: '', email: '', interest: '', message: '' });
    setTimeout(enquiry.reset, 6000);
  };

  const medicalSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Panchakarma Therapy',
    description: 'Authentic Ayurvedic five-fold purification therapy comprising Vaman, Virechan, Basti, Nasya and Raktamokshana — administered under classical protocols at Mangla Healthcare.',
    procedureType: 'TherapeuticProcedure',
    bodyLocation: 'Whole body',
    howPerformed: 'Doctor-supervised classical Ayurveda protocol with preparation, main therapy, and structured recovery.',
    preparation: 'Internal oleation, dietary discipline, and sudation over 3–7 days.',
    followup: 'Stepped samsarjana krama recovery diet over 3–7 days plus lifestyle guidance.',
  };

  return (
    <div className="pk-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Panchakarma Therapy — Authentic Ayurvedic Detoxification"
        description="Doctor-supervised Panchakarma therapies at Mangla Healthcare — classical detoxification, rejuvenation, and dosha balancing in a calm, premium clinical setting."
        schema={medicalSchema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .pk-page { font-family: 'Inter', system-ui, sans-serif; }
        .pk-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }

        .pk-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14);
          border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .pk-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px;
          border-radius: 100px; text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .pk-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        .pk-btn-outline {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: #1E5B4F;
          padding: 13px 26px; border-radius: 100px;
          border: 1.5px solid #C9A86A; text-decoration: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          transition: all .25s ease;
        }
        .pk-btn-outline:hover { background: #C9A86A; color: #FAF8F3; }

        /* sticky in-page nav */
        .pk-subnav {
          position: sticky; top: 0; z-index: 30;
          background: rgba(250,248,243,.92);
          backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid rgba(30,91,79,.12);
        }
        .pk-subnav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 12px 20px;
          display: flex; gap: 6px; overflow-x: auto;
          scrollbar-width: none;
        }
        .pk-subnav-inner::-webkit-scrollbar { display: none; }
        .pk-subnav a {
          flex-shrink: 0; padding: 8px 14px; border-radius: 100px;
          font-size: 13px; font-weight: 600; color: #2D2D2D99;
          text-decoration: none; white-space: nowrap;
          transition: all .2s ease;
        }
        .pk-subnav a:hover { background: rgba(30,91,79,.08); color: #1E5B4F; }

        /* therapy card */
        .pk-therapy-card {
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 22px;
          overflow: hidden;
          transition: all .3s cubic-bezier(.4,0,.2,1);
          display: flex; flex-direction: column;
        }
        .pk-therapy-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px -28px rgba(30,91,79,.45);
          border-color: rgba(201,168,106,.45);
        }
        .pk-therapy-card .arrow {
          opacity: 0; transform: translateX(-6px);
          transition: all .25s ease;
        }
        .pk-therapy-card:hover .arrow {
          opacity: 1; transform: translateX(0);
        }

        /* feature card */
        .pk-feature-card {
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 18px;
          padding: 22px;
          display: flex; gap: 14px; align-items: flex-start;
          transition: all .3s ease;
        }
        .pk-feature-card:hover {
          border-color: rgba(201,168,106,.45);
          box-shadow: 0 18px 36px -22px rgba(30,91,79,.4);
        }

        /* timeline */
        .pk-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .pk-timeline::before {
          content: '';
          position: absolute;
          top: 32px; left: 7%; right: 7%;
          height: 2px;
          background: linear-gradient(90deg, rgba(201,168,106,.4), rgba(201,168,106,.8), rgba(201,168,106,.4));
          z-index: 0;
        }
        .pk-timeline-step {
          position: relative; z-index: 1;
          text-align: center;
        }
        .pk-timeline-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #fff;
          border: 2px solid #C9A86A;
          color: #1E5B4F;
          display: inline-flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
          transition: all .3s ease;
          box-shadow: 0 12px 28px -10px rgba(201,168,106,.4);
        }
        .pk-timeline-step:hover .pk-timeline-icon {
          background: #1E5B4F;
          color: #C9A86A;
          transform: scale(1.08);
        }

        /* journey vertical-ish */
        .pk-journey-step {
          display: flex; gap: 20px;
          padding: 24px;
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 18px;
          transition: all .3s ease;
        }
        .pk-journey-step:hover {
          border-color: rgba(201,168,106,.4);
          transform: translateX(6px);
          box-shadow: 0 18px 36px -22px rgba(30,91,79,.4);
        }
        .pk-journey-num {
          width: 52px; height: 52px; flex-shrink: 0; border-radius: 50%;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #C9A86A;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 800;
        }

        /* form */
        .pk-input {
          width: 100%; padding: 14px 16px;
          background: #fff; border: 1.5px solid rgba(30,91,79,.18);
          border-radius: 12px;
          font-family: inherit; font-size: 14.5px; color: #2D2D2D;
          outline: none; transition: all .2s ease;
        }
        .pk-input:focus {
          border-color: #1E5B4F;
          box-shadow: 0 0 0 4px rgba(30,91,79,.12);
        }
        .pk-textarea { resize: none; min-height: 110px; line-height: 1.55; }

        /* mobile */
        @media (max-width: 1024px) {
          .pk-grid-2 { grid-template-columns: 1fr !important; }
          .pk-timeline { grid-template-columns: 1fr 1fr; }
          .pk-timeline::before { display: none; }
        }
        @media (max-width: 640px) {
          .pk-timeline { grid-template-columns: 1fr; }
          .pk-therapy-grid { grid-template-columns: 1fr !important; }
          .pk-features-grid { grid-template-columns: 1fr !important; }
          .pk-benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 380px) {
          .pk-benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
        padding: '72px 20px 96px',
        overflow: 'hidden',
      }}>
        {/* Subtle pattern overlay */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(201,168,106,.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(30,91,79,.1), transparent 45%)',
          pointerEvents: 'none',
        }} />
        {/* Decorative leaf */}
        <div aria-hidden style={{
          position: 'absolute', top: 80, right: -40,
          width: 320, height: 320, opacity: 0.06,
          color: '#1E5B4F',
        }}>
          <Leaf size={320} strokeWidth={1} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="pk-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="pk-eyebrow" style={{ marginBottom: 22 }}>
                <Leaf size={13} /> Authentic Ayurvedic Detoxification
              </div>
              <h1 className="pk-display" style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 700, lineHeight: 1.05,
                color: '#1E5B4F', letterSpacing: '-1.2px',
                marginBottom: 22,
              }}>
                Panchakarma <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Therapy</em>
              </h1>
              <p style={{
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                lineHeight: 1.7, color: '#2D2D2DAA',
                maxWidth: 540, marginBottom: 32,
              }}>
                Experience the ancient science of deep cleansing, rejuvenation, and holistic
                healing through personalised Panchakarma treatments — administered by certified
                Ayurvedic doctors under classical protocols.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#contact" className="pk-btn-primary">
                  <Phone size={15} /> Book Consultation
                </a>
                <a href="#therapies" className="pk-btn-outline">
                  Explore Therapies <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <ImagePlaceholder label="Hero Image" ratio="4/5" rounded={28} accent />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky in-page nav */}
      <nav className="pk-subnav" aria-label="Page sections">
        <div className="pk-subnav-inner">
          <a href="#what-is">What is Panchakarma</a>
          <a href="#process">Process</a>
          <a href="#therapies">Therapies</a>
          <a href="#detailed">In Detail</a>
          <a href="#benefits">Benefits</a>
          <a href="#who">Who Is It For</a>
          <a href="#journey">Treatment Journey</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          SECTION 2 — WHAT IS PANCHAKARMA
          ════════════════════════════════════════════════ */}
      <section id="what-is" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="pk-grid-2" style={{
            display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <ImagePlaceholder label="Section Image" ratio="4/5" rounded={24} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="pk-eyebrow" style={{ marginBottom: 18 }}>
                <Sparkles size={13} /> The Five-Fold Science
              </div>
              <h2 className="pk-display" style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700, color: '#1E5B4F',
                lineHeight: 1.1, letterSpacing: '-.6px',
                marginBottom: 18,
              }}>
                What Is <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Panchakarma</em>?
              </h2>
              <p style={{ fontSize: 16.5, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 32 }}>
                Panchakarma is a classical Ayurvedic five-fold purification system designed
                to eliminate accumulated toxins, restore dosha balance, improve vitality, and
                prepare the body for deeper healing and rejuvenation. Each protocol is
                personalised by trained Ayurvedic physicians based on your constitution,
                current health, and treatment goals.
              </p>

              <div className="pk-features-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
              }}>
                {[
                  { Icon: Droplet,    label: 'Deep Detoxification' },
                  { Icon: Leaf,       label: 'Dosha Balancing' },
                  { Icon: ShieldCheck,label: 'Enhanced Immunity' },
                  { Icon: Sparkles,   label: 'Rejuvenation & Vitality' },
                ].map(({ Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="pk-feature-card"
                  >
                    <span style={{
                      width: 40, height: 40, flexShrink: 0, borderRadius: 12,
                      background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)',
                      color: '#1E5B4F',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <p style={{ fontSize: 14.5, fontWeight: 700, color: '#2D2D2D' }}>{label}</p>
                      <p style={{ fontSize: 12.5, color: '#2D2D2D88', marginTop: 4 }}>Classical protocol</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 3 — THERAPY PROCESS TIMELINE
          ════════════════════════════════════════════════ */}
      <section id="process" style={{ padding: '96px 20px', background: '#DDE8E366' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Calendar size={13} /> The Four-Phase Process
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Therapy <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Timeline</em>
            </h2>
          </motion.div>

          <div className="pk-timeline">
            {PROCESS_TIMELINE.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="pk-timeline-step"
                >
                  <div className="pk-timeline-icon">
                    <Icon size={26} strokeWidth={1.9} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 800, color: '#C9A86A', letterSpacing: '.18em', marginBottom: 6 }}>
                    STEP {p.step}
                  </p>
                  <h3 className="pk-display" style={{ fontSize: 22, fontWeight: 700, color: '#1E5B4F', marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#2D2D2D99', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 4 — THERAPIES GRID
          ════════════════════════════════════════════════ */}
      <section id="therapies" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Leaf size={13} /> 16 Classical Therapies
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
              marginBottom: 14,
            }}>
              Panchakarma <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Therapies</em>
            </h2>
            <p style={{ fontSize: 16, color: '#2D2D2DAA', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
              A complete menu of classical purification and rejuvenation therapies — each
              prescribed and supervised by our doctors.
            </p>
          </motion.div>

          <div className="pk-therapy-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
          }}>
            {THERAPIES.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.article
                  key={t.name}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
                  className="pk-therapy-card"
                >
                  <ImagePlaceholder label={t.name} ratio="4/3" rounded={0} src={t.img} />
                  <div style={{ padding: '22px 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(201,168,106,.18)',
                        color: '#1E5B4F',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <h3 className="pk-display" style={{ fontSize: 22, fontWeight: 700, color: '#1E5B4F' }}>
                        {t.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14, color: '#2D2D2D99', lineHeight: 1.6, marginBottom: 16 }}>
                      {t.desc}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#C9A86A' }}>
                      Learn more <ArrowRight size={14} className="arrow" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 5 — DETAILED THERAPY SECTIONS
          ════════════════════════════════════════════════ */}
      <section id="detailed" style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Stethoscope size={13} /> Closer Look
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              The Therapies <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>in Detail</em>
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {DETAILED_THERAPIES.map((t, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  key={t.name}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="pk-grid-2"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 56, alignItems: 'center',
                    direction: reverse ? 'rtl' : 'ltr',
                  }}
                >
                  <div style={{ direction: 'ltr' }}>
                    <ImagePlaceholder label={`${t.name} Image`} ratio="4/3" rounded={22} src={t.img} />
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: '#C9A86A', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                      Therapy {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="pk-display" style={{
                      fontSize: 'clamp(26px, 3vw, 36px)',
                      fontWeight: 700, color: '#1E5B4F',
                      lineHeight: 1.15, letterSpacing: '-.4px',
                      marginBottom: 6,
                    }}>
                      {t.name}
                    </h3>
                    <p style={{ fontSize: 14, fontStyle: 'italic', color: '#2D2D2D88', marginBottom: 16 }}>
                      {t.tagline}
                    </p>
                    <p style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.75, marginBottom: 22 }}>
                      {t.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                      <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#1E5B4F', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                          Benefits
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {t.benefits.map(b => (
                            <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#2D2D2DAA', marginBottom: 8, lineHeight: 1.5 }}>
                              <Check size={14} style={{ color: '#1E5B4F', flexShrink: 0, marginTop: 3 }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#1E5B4F', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                          Suitable for
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {t.conditions.map(c => (
                            <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#2D2D2DAA', marginBottom: 8, lineHeight: 1.5 }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A86A', flexShrink: 0, marginTop: 8 }} />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 6 — BENEFITS
          ════════════════════════════════════════════════ */}
      <section id="benefits" style={{
        padding: '96px 20px',
        background: 'linear-gradient(135deg, #1E5B4F, #144239)',
        color: '#FAF8F3',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: -100, right: -100,
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,106,.18), transparent 70%)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: -120, left: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,106,.12), transparent 70%)',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(201,168,106,.18)',
              border: '1px solid rgba(201,168,106,.4)',
              color: '#C9A86A',
              fontSize: 11.5, fontWeight: 700,
              letterSpacing: '.14em', textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              <Star size={13} /> Measurable Wellness
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#FAF8F3', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Benefits of <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Panchakarma</em>
            </h2>
          </motion.div>

          <div className="pk-benefits-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 22,
          }}>
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(201,168,106,.2)',
                    borderRadius: 18, padding: 26,
                    textAlign: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'rgba(201,168,106,.18)',
                    color: '#C9A86A',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <div style={{ background: '#FAF8F3', borderRadius: 12, padding: '10px 12px' }}>
                    <Counter to={b.n} suffix={b.suffix} label={b.label} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 7 — WHO SHOULD CONSIDER
          ════════════════════════════════════════════════ */}
      <section id="who" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="pk-grid-2" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImagePlaceholder label="Illustration Placeholder" ratio="1/1" rounded={28} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="pk-eyebrow" style={{ marginBottom: 18 }}>
                <Heart size={13} /> Right Candidates
              </div>
              <h2 className="pk-display" style={{
                fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700,
                color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.5px',
                marginBottom: 16,
              }}>
                Who Should Consider <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Panchakarma</em>
              </h2>
              <p style={{ fontSize: 16, color: '#2D2D2DAA', lineHeight: 1.7, marginBottom: 26 }}>
                Panchakarma is suited to those navigating chronic imbalance, lifestyle stress,
                or wanting a thorough wellness reset. Below are common indicators — a doctor
                consultation confirms whether the protocol is right for you.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {WHO.map((w, i) => (
                  <motion.div
                    key={w}
                    initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '12px 14px', borderRadius: 12,
                      background: '#fff', border: '1px solid rgba(30,91,79,.08)',
                    }}
                  >
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: '#1E5B4F', color: '#C9A86A',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#2D2D2D' }}>{w}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 8 — TREATMENT JOURNEY
          ════════════════════════════════════════════════ */}
      <section id="journey" style={{ padding: '96px 20px', background: '#DDE8E366' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <ClipboardCheck size={13} /> Patient Journey
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Your Treatment <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Journey</em>
            </h2>
          </motion.div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* connector line */}
            <div aria-hidden style={{
              position: 'absolute',
              left: 45, top: 32, bottom: 32, width: 2,
              background: 'linear-gradient(180deg, #C9A86A66, #C9A86A)',
            }} />
            {JOURNEY.map((j, i) => {
              const Icon = j.icon;
              return (
                <motion.div
                  key={j.title}
                  initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="pk-journey-step"
                  style={{ position: 'relative' }}
                >
                  <div className="pk-journey-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Icon size={16} style={{ color: '#1E5B4F' }} />
                      <h3 className="pk-display" style={{ fontSize: 21, fontWeight: 700, color: '#1E5B4F' }}>
                        {j.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14.5, color: '#2D2D2D99', lineHeight: 1.65 }}>
                      {j.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 9 — FAQ
          ════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Sparkles size={13} /> Common Questions
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Frequently <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Asked</em>
            </h2>
          </motion.div>

          <div>
            {FAQS.map((f, i) => (
              <FaqItem
                key={i}
                q={f.q} a={f.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 10 — TESTIMONIALS
          ════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Quote size={13} /> Patient Voices
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Stories of <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Healing</em>
            </h2>
          </motion.div>

          {/* Featured testimonial */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              maxWidth: 800, margin: '0 auto 48px',
              background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
              borderRadius: 24, padding: 'clamp(28px, 4vw, 52px)',
              border: '1px solid rgba(201,168,106,.3)',
              position: 'relative', overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <Quote size={48} style={{ color: '#C9A86A55', marginBottom: 18 }} />
            <p className="pk-display" style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontStyle: 'italic',
              color: '#2D2D2D', lineHeight: 1.6, marginBottom: 28, fontWeight: 500,
            }}>
              "{TESTIMONIALS[activeTestimonial].text}"
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E5B4F, #144239)',
                color: '#C9A86A',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 22, fontWeight: 700,
                border: '2px solid #C9A86A',
              }}>
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: '#1E5B4F', fontSize: 15 }}>
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p style={{ fontSize: 12.5, color: '#2D2D2D88', marginTop: 2 }}>
                  {TESTIMONIALS[activeTestimonial].loc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === activeTestimonial ? 28 : 8,
                  height: 8, borderRadius: 4,
                  background: i === activeTestimonial ? '#1E5B4F' : '#DDE8E3',
                  border: 'none', cursor: 'pointer',
                  transition: 'all .3s ease',
                }}
              />
            ))}
          </div>

          {/* All testimonials grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
          }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(30,91,79,.08)',
                  borderRadius: 18, padding: 22,
                  transition: 'all .3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveTestimonial(i)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,106,.45)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 40px -22px rgba(30,91,79,.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,91,79,.08)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: '#DDE8E3', color: '#1E5B4F',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 17, fontWeight: 700,
                  }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#2D2D2D', fontSize: 13.5 }}>{t.name}</p>
                    <p style={{ fontSize: 11.5, color: '#2D2D2D88' }}>{t.loc}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: '#2D2D2DAA', lineHeight: 1.6 }}>
                  "{t.text.slice(0, 110)}..."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 11 — CTA
          ════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 20px 80px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1E5B4F 0%, #144239 50%, #1E5B4F 100%)',
              color: '#FAF8F3',
              borderRadius: 32, padding: 'clamp(40px, 6vw, 72px)',
              position: 'relative', overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* decorative leaves */}
            <div aria-hidden style={{ position: 'absolute', top: 20, left: 20, opacity: .15, color: '#C9A86A' }}>
              <Leaf size={56} strokeWidth={1.5} />
            </div>
            <div aria-hidden style={{ position: 'absolute', bottom: 20, right: 20, opacity: .15, color: '#C9A86A', transform: 'rotate(180deg)' }}>
              <Leaf size={56} strokeWidth={1.5} />
            </div>
            <div aria-hidden style={{
              position: 'absolute', top: -100, right: -80,
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,106,.25), transparent 70%)',
            }} />

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(201,168,106,.18)',
              border: '1px solid rgba(201,168,106,.4)',
              color: '#C9A86A',
              fontSize: 11.5, fontWeight: 700,
              letterSpacing: '.14em', textTransform: 'uppercase',
              marginBottom: 22, position: 'relative',
            }}>
              <Sparkles size={13} /> Begin Today
            </div>

            <h2 className="pk-display" style={{
              fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-.7px',
              marginBottom: 16, position: 'relative',
            }}>
              Begin Your <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Healing Journey</em> Today
            </h2>
            <p style={{
              fontSize: 17, color: 'rgba(250,248,243,.78)',
              lineHeight: 1.65, maxWidth: 620, margin: '0 auto 32px',
              position: 'relative',
            }}>
              Reconnect with balance, vitality, and wellness through authentic Panchakarma
              therapy — administered by certified Ayurvedic doctors at Mangla Healthcare.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#C9A86A', color: '#1E5B4F',
                padding: '14px 28px', borderRadius: 100,
                fontSize: 14.5, fontWeight: 800, textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(201,168,106,.6)',
                transition: 'transform .25s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <Calendar size={15} /> Book Appointment
              </a>
              <a href="tel:+919992654891" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'transparent', color: '#FAF8F3',
                padding: '13px 26px', borderRadius: 100,
                fontSize: 14.5, fontWeight: 700, textDecoration: 'none',
                border: '1.5px solid rgba(201,168,106,.5)',
              }}>
                <Phone size={15} /> Talk to Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 12 — CONTACT
          ════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="pk-eyebrow" style={{ marginBottom: 16 }}>
              <Phone size={13} /> Reach Us
            </div>
            <h2 className="pk-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Get in <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Touch</em>
            </h2>
          </motion.div>

          <div className="pk-grid-2" style={{
            display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56, alignItems: 'flex-start',
          }}>
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { Icon: Phone,    label: 'Call us',     value: '+91 99926 54891',         href: 'tel:+919992654891' },
                  { Icon: Mail,     label: 'Email us',    value: 'care@manglahealthcare.com', href: 'mailto:care@manglahealthcare.com' },
                  { Icon: MapPin,   label: 'Visit us',    value: 'Medical Square, Jaipur, Rajasthan 302001' },
                  { Icon: Clock,    label: 'Working hours',value: 'Mon – Sat · 9:00 AM – 8:00 PM · Sun Closed' },
                ].map(({ Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span style={{
                        width: 44, height: 44, flexShrink: 0, borderRadius: 12,
                        background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)',
                        color: '#1E5B4F',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <div>
                        <p style={{ fontSize: 11.5, fontWeight: 800, color: '#C9A86A', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 4 }}>
                          {label}
                        </p>
                        <p style={{ fontSize: 15, fontWeight: 600, color: '#2D2D2D', lineHeight: 1.5 }}>
                          {value}
                        </p>
                      </div>
                    </>
                  );
                  return href ? (
                    <a key={label} href={href} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: 16, borderRadius: 14,
                      background: '#FAF8F3', textDecoration: 'none',
                      border: '1px solid rgba(30,91,79,.08)',
                      transition: 'all .25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,106,.45)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,91,79,.08)'; e.currentTarget.style.transform = ''; }}
                    >{content}</a>
                  ) : (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: 16, borderRadius: 14,
                      background: '#FAF8F3',
                      border: '1px solid rgba(30,91,79,.08)',
                    }}>{content}</div>
                  );
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              noValidate
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #FAF8F3, #DDE8E366)',
                border: '1px solid rgba(30,91,79,.08)',
                borderRadius: 22, padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <h3 className="pk-display" style={{
                fontSize: 26, fontWeight: 700, color: '#1E5B4F', marginBottom: 6,
              }}>
                Request an <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Appointment</em>
              </h3>
              <p style={{ fontSize: 14, color: '#2D2D2D99', marginBottom: 24, lineHeight: 1.6 }}>
                Share your details and our team will reach out within 24 hours.
              </p>

              {formSent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px', borderRadius: 12,
                    background: '#DDE8E3', border: '1px solid #1E5B4F44',
                    color: '#1E5B4F', fontWeight: 600, fontSize: 14,
                    marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <Check size={16} /> Thank you — we'll be in touch soon.
                </motion.div>
              )}
              <input {...enquiry.honeypotProps} />
              {enquiry.error && (
                <p role="alert" style={{ padding: '10px 14px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: 13.5, fontWeight: 500, marginBottom: 18 }}>
                  {enquiry.error}
                </p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <input
                  className="pk-input" type="text" placeholder="Full Name *"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className="pk-input" type="tel" placeholder="Phone Number *"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <input
                className="pk-input" type="email" placeholder="Email Address"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ marginBottom: 14 }}
              />
              <select
                className="pk-input" value={form.interest}
                onChange={e => setForm({ ...form, interest: e.target.value })}
                style={{ marginBottom: 14, appearance: 'none', cursor: 'pointer' }}
              >
                <option value="">Treatment Interest</option>
                <option>Full Panchakarma Programme</option>
                <option>Shirodhara</option>
                <option>Basti Therapy</option>
                <option>Nasya / Sinus Care</option>
                <option>Joint Pain Therapy</option>
                <option>Skin & Hair</option>
                <option>Stress / Sleep</option>
                <option>Not sure — please advise</option>
              </select>
              <textarea
                className="pk-input pk-textarea" placeholder="Tell us about your concern (optional)"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ marginBottom: 20 }}
              />
              <button type="submit" className="pk-btn-primary" disabled={enquiry.sending} style={{ width: '100%', justifyContent: 'center', opacity: enquiry.sending ? 0.7 : 1 }}>
                <Send size={15} /> {enquiry.sending ? 'Sending…' : 'Submit Request'}
              </button>
              <p style={{ fontSize: 12, color: '#2D2D2D77', marginTop: 14, textAlign: 'center' }}>
                We respect your privacy. See our <Link to="/privacy" style={{ color: '#1E5B4F', fontWeight: 600 }}>Privacy Policy</Link>.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanchkarmaPage;
