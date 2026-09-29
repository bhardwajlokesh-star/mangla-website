import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ChevronDown, Leaf, Heart, HeartPulse,
  Brain, Bone, Wind, Droplet, Activity, Sparkles, Sun, Apple, Baby,
  ShieldCheck, Stethoscope, ClipboardCheck, FlaskConical, Check,
  ArrowRight, Quote, Calendar, Send, Star, Award, UserCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import { useSheetSubmit } from '../utils/useSheetSubmit';

/* ──────────────────────────────────────────────────────────────
   SUPER SPECIALITY OPD — premium dedicated page
   11 sections · 18 specialities · image placeholders only
   Reuses the Panchakarma palette (deep green / gold / ivory).
   ────────────────────────────────────────────────────────────── */

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
        flexDirection: 'column', gap: 10, overflow: 'hidden',
      }}
    >
      {showImage ? (
        <img
          src={src} alt={label} loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .6s cubic-bezier(.4,0,.2,1)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      ) : (
        <>
          <div style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(30,91,79,.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1E5B4F' }}>
            <Leaf size={18} strokeWidth={2} />
          </div>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(30,91,79,.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1E5B4F' }}>
            <Sparkles size={26} strokeWidth={1.8} />
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(30,91,79,.7)', textAlign: 'center', padding: '0 16px' }}>{label}</p>
        </>
      )}
    </div>
  );
};

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
      <div className="ss-display" style={{ fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 800, color: '#FAF8F3', lineHeight: 1 }}>
        {val.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 12.5, color: 'rgba(250,248,243,.65)', marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  );
};

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
      <span style={{ width: 32, height: 32, borderRadius: '50%', background: isOpen ? '#1E5B4F' : '#DDE8E3', color: isOpen ? '#C9A86A' : '#1E5B4F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .25s' }}>
        <ChevronDown size={16} style={{ transition: 'transform .25s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
          <p style={{ fontSize: 15, color: '#2D2D2DAA', lineHeight: 1.75, paddingBottom: 22, paddingRight: 50 }}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   18 SPECIALITIES — full data
   ────────────────────────────────────────────────────────────── */
const SPECIALITIES = [
  {
    slug: 'orthopedic',
    name: 'Orthopedic Disorders',
    short: 'Comprehensive Ayurvedic care for joints, bones and musculoskeletal conditions through classical Panchakarma and herbal medicine.',
    icon: Bone,
    description: 'Our Orthopedic OPD treats musculoskeletal disorders using a layered approach — classical Panchakarma therapies, internal herbal medicines, targeted diet, and lifestyle correction. Each plan is tailored to the patient\'s constitution, age, and disease stage, with measurable goals around pain, mobility and inflammation.',
    conditions: ['Osteoarthritis', 'Rheumatoid Arthritis', 'Joint Pain', 'Back Pain', 'Frozen Shoulder', 'Ligament Injuries'],
    benefits: ['Sustained pain relief', 'Improved mobility', 'Reduced inflammation', 'Enhanced joint function'],
    methods: ['Panchakarma', 'Basti therapy', 'Abhyanga', 'Herbal medicines', 'Physiotherapy support'],
  },
  {
    slug: 'neurological',
    name: 'Neurological Disorders',
    short: 'Ayurvedic management of nervous-system conditions with classical Vata-pacifying protocols, Basti, Shirodhara and rasayana.',
    icon: Brain,
    description: 'Neurological complaints in classical Ayurveda are seen primarily through the lens of Vata imbalance. Our protocols combine Panchakarma — particularly Basti and Shirodhara — with herbal rasayanas, lifestyle correction, and supportive physiotherapy. Modern investigation is integrated where useful.',
    conditions: ['Paralysis & post-stroke recovery', 'Facial palsy', 'Sciatica', 'Cervical spondylosis', 'Migraine', 'Parkinson\'s support'],
    benefits: ['Nervous system support', 'Improved muscle tone', 'Reduced neurological pain', 'Better daily function'],
    methods: ['Basti karma', 'Shirodhara', 'Nasya', 'Abhyanga & swedana', 'Classical rasayana'],
  },
  {
    slug: 'skin',
    name: 'Skin Disorders',
    short: 'Root-cause Ayurvedic care for chronic skin conditions through detoxification, blood purification and targeted external care.',
    icon: Sun,
    description: 'Persistent skin disease often reflects deeper imbalance in digestion, blood and dosha. Our Skin OPD combines Panchakarma detoxification (especially Virechana), blood-purifying herbs, dietary correction, and gentle external applications. Treatment plans are built around long-term remission, not symptomatic suppression.',
    conditions: ['Psoriasis', 'Eczema', 'Acne & pigmentation', 'Vitiligo', 'Urticaria', 'Fungal infections'],
    benefits: ['Reduced flare-ups', 'Clearer skin tone', 'Long-term remission focus', 'Holistic immunity support'],
    methods: ['Virechana', 'Raktamokshana', 'Herbal medicines', 'Lepa & ubtan', 'Diet & lifestyle plan'],
  },
  {
    slug: 'gastrointestinal',
    name: 'Gastrointestinal Disorders',
    short: 'Ayurvedic digestive care to restore agni, repair gut lining and treat chronic GI conditions naturally.',
    icon: Apple,
    description: 'Digestive disorders are central to Ayurvedic practice — agni (digestive fire) is considered the root of nearly every chronic disease. We treat GI complaints through classical herbs, panchakarma where indicated, structured pathya (therapeutic diet), and lifestyle modification.',
    conditions: ['Acidity & GERD', 'IBS', 'Constipation', 'Ulcerative colitis', 'Fatty liver', 'Indigestion'],
    benefits: ['Restored digestive fire', 'Long-term symptom relief', 'Gut microbiome support', 'Energy and appetite balance'],
    methods: ['Virechana', 'Classical churnas', 'Pathya diet plan', 'Stress correction', 'Lifestyle counselling'],
  },
  {
    slug: 'respiratory',
    name: 'Respiratory Disorders',
    short: 'Ayurvedic management of chronic respiratory conditions through Kapha-clearing therapies and immunity rasayana.',
    icon: Wind,
    description: 'Chronic respiratory issues — recurring bronchitis, asthma, sinusitis — respond well to Kapha-balancing Panchakarma and classical rasayanas. Treatment focuses on clearing the upper respiratory tract, building lung capacity, and reducing seasonal flares.',
    conditions: ['Asthma', 'Bronchitis', 'Chronic sinusitis', 'Allergic rhinitis', 'COPD support', 'Recurrent cold & cough'],
    benefits: ['Improved breathing', 'Reduced flare-ups', 'Lung capacity support', 'Allergy resilience'],
    methods: ['Vamana', 'Nasya', 'Steam therapy', 'Chyawanprash rasayana', 'Pranayama guidance'],
  },
  {
    slug: 'kidney',
    name: 'Kidney Disorders',
    short: 'Supportive Ayurvedic care for kidney health — alongside nephrology — focused on slowing progression and improving quality of life.',
    icon: Droplet,
    description: 'Ayurvedic kidney care is offered as supportive integrative therapy alongside conventional nephrology. Our protocols use specific Mutrala herbs, dietary modification, and stress management to support function and reduce symptoms. We coordinate with treating nephrologists.',
    conditions: ['Chronic kidney disease support', 'Recurrent UTIs', 'Kidney stones', 'Nephrotic syndrome support', 'Creatinine elevation'],
    benefits: ['Symptomatic relief', 'Slowed progression in early stages', 'Better appetite & energy', 'Reduced infections'],
    methods: ['Mutrala herbs', 'Renal-friendly pathya', 'Basti (selective)', 'Lifestyle correction', 'Co-management with nephrology'],
  },
  {
    slug: 'liver',
    name: 'Liver Disorders',
    short: 'Targeted Ayurvedic treatment for liver health using classical hepatoprotective herbs and detoxification.',
    icon: FlaskConical,
    description: 'Liver disorders respond well to Ayurvedic hepatoprotective protocols. Our treatment uses classical Yakrit herbs (Bhumi Amalaki, Kutki, Punarnava), structured Virechana when indicated, and a strict liver-friendly diet alongside conventional investigation.',
    conditions: ['Fatty liver (NAFLD)', 'Hepatitis support', 'Elevated liver enzymes', 'Cirrhosis support', 'Alcohol-related damage'],
    benefits: ['Liver function support', 'Reduced enzyme levels', 'Better digestion', 'Improved energy'],
    methods: ['Virechana', 'Hepatoprotective herbs', 'Strict pathya', 'Detox panchakarma', 'Lifestyle modification'],
  },
  {
    slug: 'diabetes',
    name: 'Diabetes Management',
    short: 'Integrated Ayurveda for prameha (diabetes) — managing blood sugar through herbs, diet, exercise and Panchakarma.',
    icon: Activity,
    description: 'Diabetes is treated in classical Ayurveda as "prameha" — a metabolic disorder rooted in Kapha and lifestyle. Our integrated programme combines classical herbs (Gudmar, Vijaysar, Methi), pancha-karma where appropriate, structured diet, and supervised exercise.',
    conditions: ['Type 2 diabetes', 'Pre-diabetes', 'Insulin resistance', 'Diabetic neuropathy', 'Metabolic syndrome'],
    benefits: ['Better glycaemic control', 'Reduced complication risk', 'Sustained energy', 'Weight normalisation'],
    methods: ['Classical antidiabetic herbs', 'Udvartana', 'Pathya plan', 'Yoga & exercise', 'Regular HbA1c monitoring'],
  },
  {
    slug: 'thyroid',
    name: 'Thyroid Disorders',
    short: 'Ayurvedic management of thyroid imbalances with classical herbs, Panchakarma and lifestyle correction.',
    icon: ShieldCheck,
    description: 'Thyroid disorders — hypothyroidism, hyperthyroidism, autoimmune thyroiditis — are managed through targeted Ayurvedic herbs (Kanchanara, Brahmi, Ashwagandha), Panchakarma when indicated, and structured lifestyle change. We co-manage with endocrinology where required.',
    conditions: ['Hypothyroidism', 'Hyperthyroidism', 'Hashimoto\'s thyroiditis', 'Goitre', 'Subclinical thyroid issues'],
    benefits: ['Balanced thyroid function', 'Reduced fatigue', 'Weight management', 'Better mood and clarity'],
    methods: ['Kanchanara guggulu', 'Nasya', 'Stress management', 'Iodine-aware diet', 'Yoga for thyroid'],
  },
  {
    slug: 'obesity',
    name: 'Obesity Management',
    short: 'Holistic Ayurvedic weight management combining detoxification, herbal medicines, exercise and dietary discipline.',
    icon: HeartPulse,
    description: 'Sustainable weight management requires more than calorie counting. Our programme treats obesity through Kapha-pacifying Panchakarma (especially Udvartana and Lekhana basti), classical herbs, structured diet, supervised exercise, and behavioural support.',
    conditions: ['Adult obesity', 'Childhood obesity', 'Metabolic syndrome', 'Post-pregnancy weight', 'PCOS-related weight gain'],
    benefits: ['Sustainable weight loss', 'Improved metabolism', 'Better body composition', 'Reduced inflammation'],
    methods: ['Udvartana', 'Lekhana basti', 'Triphala & medohara herbs', 'Structured pathya', 'Yoga & exercise'],
  },
  {
    slug: 'gynecological',
    name: 'Gynecological Disorders',
    short: 'Specialised Ayurvedic care for women\'s health through every life stage — adolescence, reproductive years, and menopause.',
    icon: Heart,
    description: 'Our Gynecology OPD treats hormonal, menstrual, and reproductive concerns through classical Stree-roga protocols. Treatment combines internal medicines, Uttar basti where appropriate, dietary correction, and lifestyle guidance. Confidentiality and comfort are central to every consultation.',
    conditions: ['PCOS/PCOD', 'Menstrual irregularities', 'Endometriosis support', 'Fibroids', 'Menopausal symptoms', 'Vaginal infections'],
    benefits: ['Hormonal balance', 'Regular cycles', 'Better fertility outlook', 'Reduced PMS and pain'],
    methods: ['Uttar basti', 'Classical Stree-roga herbs', 'Yoga therapy', 'Dietary correction', 'Stress management'],
  },
  {
    slug: 'infertility',
    name: 'Infertility Management',
    short: 'Compassionate Ayurvedic fertility care for couples — supporting both reproductive health and emotional wellbeing.',
    icon: Baby,
    description: 'Infertility is approached classically as a Beej, Kshetra, Ritu, Ambu imbalance. We treat both partners through Panchkarma purification, classical Vajikarana and Stree-roga herbs, fertility-focused diet, and stress management. Coordination with reproductive endocrinology is offered when indicated.',
    conditions: ['Primary infertility', 'Secondary infertility', 'Low sperm count/motility', 'Ovulation issues', 'Recurrent miscarriage support'],
    benefits: ['Improved reproductive health', 'Better sperm/egg quality', 'Hormonal balance', 'Emotional support'],
    methods: ['Panchakarma preparation', 'Vajikarana rasayana', 'Stree-roga therapy', 'Stress and sleep correction', 'Garbh Sanskar guidance'],
  },
  {
    slug: 'pediatric',
    name: 'Pediatric Care',
    short: 'Gentle Ayurvedic care for children — immunity, digestion, developmental support and seasonal wellness.',
    icon: Baby,
    description: 'Our Pediatric OPD offers classical Kaumarbhritya care for children. Focus areas include immunity (via Suvarnaprashan), digestion, recurrent infections, allergies, and developmental support. Care is gentle, child-friendly, and always supplements rather than replaces vaccinations.',
    conditions: ['Recurrent infections', 'Poor appetite', 'Allergies & asthma', 'Developmental concerns', 'Skin conditions', 'Bedwetting'],
    benefits: ['Improved immunity', 'Better digestion', 'Reduced sick days', 'Healthy growth support'],
    methods: ['Suvarnaprashan', 'Gentle herbal medicines', 'Pediatric pathya', 'Massage therapy', 'Parent counselling'],
  },
  {
    slug: 'cardiac',
    name: 'Cardiac Care',
    short: 'Supportive Ayurvedic cardiac care — preventive heart health and post-cardiac rehabilitation under medical supervision.',
    icon: HeartPulse,
    description: 'Cardiac care in our OPD focuses on prevention, lifestyle correction, and rehabilitation alongside cardiology. Classical Hridya herbs (Arjuna, Pushkarmool), Hruday Basti, structured diet, and stress management form the core. We coordinate closely with treating cardiologists.',
    conditions: ['Hypertension', 'High cholesterol', 'Post-cardiac rehabilitation', 'Angina support', 'Cardiac risk reduction'],
    benefits: ['Blood pressure support', 'Cholesterol management', 'Reduced cardiac stress', 'Better exercise tolerance'],
    methods: ['Arjuna rasayana', 'Hruday Basti', 'DASH-style pathya', 'Stress correction', 'Co-management with cardiology'],
  },
  {
    slug: 'mental-health',
    name: 'Mental Health & Stress Disorders',
    short: 'Ayurvedic mental wellness through medhya rasayanas, Shirodhara, breathwork and counselling support.',
    icon: Brain,
    description: 'Mental health is approached through Ayurveda\'s Sattvavajaya framework — medhya rasayanas, classical herbs (Brahmi, Mandukparni, Jatamansi), Shirodhara, structured routine, and breathwork. For clinical psychiatric conditions, we work alongside, not instead of, treating psychiatrists.',
    conditions: ['Anxiety', 'Depression support', 'Stress & burnout', 'Insomnia', 'ADHD support', 'Post-traumatic stress support'],
    benefits: ['Calmer mind', 'Better sleep', 'Improved focus', 'Emotional resilience'],
    methods: ['Shirodhara', 'Medhya rasayana', 'Pranayama', 'Yoga therapy', 'Lifestyle correction'],
  },
  {
    slug: 'joint-arthritis',
    name: 'Joint & Arthritis Care',
    short: 'Specialised Ayurvedic protocols for arthritic and degenerative joint conditions — classical Basti, Janu Basti, and rasayana.',
    icon: Bone,
    description: 'Joint and arthritis care combines classical Vata-pacifying therapies — Janu Basti, Kati Basti, Patra Pinda Sweda — with internal herbs, dietary correction, and supervised movement. Goals include pain reduction, improved range of motion, and slowing degenerative progression.',
    conditions: ['Osteoarthritis (knee/hip/shoulder)', 'Rheumatoid arthritis', 'Gouty arthritis', 'Cervical arthritis', 'Joint stiffness'],
    benefits: ['Pain relief', 'Joint flexibility', 'Slowed degeneration', 'Better mobility'],
    methods: ['Janu Basti', 'Kati Basti', 'Patra Pinda Sweda', 'Yograj Guggulu', 'Therapeutic yoga'],
  },
  {
    slug: 'spine-back',
    name: 'Spine & Back Pain Disorders',
    short: 'Targeted Ayurvedic spine care for chronic back, neck and disc-related conditions through Basti, traction and herbs.',
    icon: Bone,
    description: 'Chronic spine and back pain often have a Vata-vyana imbalance at root. Our spine OPD uses Kati Basti, Manya Basti, classical Vata-pacifying Basti karma, internal medicines, and supervised yoga therapy — alongside modern investigation and selective physiotherapy.',
    conditions: ['Slipped disc / disc bulge', 'Cervical spondylosis', 'Lumbar spondylosis', 'Sciatica', 'Chronic low back pain', 'Postural pain'],
    benefits: ['Pain reduction', 'Improved spine mobility', 'Reduced nerve irritation', 'Better posture'],
    methods: ['Kati Basti', 'Manya Basti', 'Basti karma', 'Spinal yoga', 'Postural rehabilitation'],
  },
  {
    slug: 'hair-scalp',
    name: 'Hair & Scalp Disorders',
    short: 'Ayurvedic treatment for hair fall, premature greying, dandruff and scalp disease through Nasya, herbal oils and rasayana.',
    icon: Sparkles,
    description: 'Hair and scalp problems usually reflect deeper Pitta-Vata imbalance, stress, and digestion. Our hair OPD combines Shiro Abhyanga, Nasya, classical hair rasayanas, scalp-targeted external care, and dietary correction. Realistic outcome goals are set at the consultation.',
    conditions: ['Hair fall (alopecia)', 'Premature greying', 'Dandruff', 'Scalp psoriasis', 'Female pattern hair loss', 'Postpartum hair loss'],
    benefits: ['Reduced hair fall', 'Better scalp health', 'Slower greying', 'Improved hair texture'],
    methods: ['Shiro Abhyanga', 'Nasya', 'Classical hair oils', 'Bhringraj rasayana', 'Diet & stress plan'],
  },
];

const WHY_CHOOSE = [
  { Icon: Stethoscope, title: 'Experienced Ayurvedic Doctors', desc: 'Senior physicians with 15+ years of clinical experience across multiple Ayurvedic specialities.' },
  { Icon: Sparkles,    title: 'Authentic Panchakarma Therapies', desc: 'Classical protocols, authenticated herbs and oils, trained therapists — not commercial wellness.' },
  { Icon: UserCheck,   title: 'Personalised Treatment Plans', desc: 'Each plan is built around your prakriti, vikriti, lifestyle and goals — never a one-size template.' },
  { Icon: Leaf,        title: 'Natural Healing Approach', desc: 'Treatments rooted in classical Ayurveda, minimising side effects and supporting long-term wellness.' },
  { Icon: ClipboardCheck, title: 'Modern Diagnostic Support', desc: 'On-site lab, imaging and report review — Ayurveda strengthened by modern investigation.' },
  { Icon: Heart,       title: 'Patient-Centered Care', desc: 'Unhurried consultations, transparent pricing, and follow-through after every therapy.' },
];

const PROCESS = [
  { num: '01', title: 'Consultation',                  desc: 'Detailed initial conversation about your symptoms, history, goals and concerns.', Icon: Stethoscope },
  { num: '02', title: 'Detailed Assessment',           desc: 'Clinical examination, vitals, and review of any existing reports or imaging.',     Icon: ClipboardCheck },
  { num: '03', title: 'Diagnosis & Dosha Analysis',    desc: 'Prakriti, vikriti, nadi pariksha, and integrative diagnosis.',                     Icon: Activity },
  { num: '04', title: 'Personalised Treatment Plan',   desc: 'A written plan covering therapy, herbs, diet, lifestyle and follow-up.',           Icon: Leaf },
  { num: '05', title: 'Therapy & Medication',          desc: 'Doctor-supervised therapy sessions and prescribed classical medicines.',           Icon: Sparkles },
  { num: '06', title: 'Follow-Up & Recovery',          desc: 'Structured reviews, samsarjana krama where applicable, and long-term support.',    Icon: HeartPulse },
];

const METRICS = [
  { n: 25000, suffix: '+', label: 'Patients Treated' },
  { n: 15,    suffix: '+', label: 'Years of Experience' },
  { n: 18,    suffix: '',  label: 'Treatment Programs' },
  { n: 18,    suffix: '',  label: 'Speciality Departments' },
  { n: 96,    suffix: '%', label: 'Recovery Success Rate' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',       loc: 'Jaipur',  condition: 'Rheumatoid Arthritis', rating: 5, text: 'After two years of medication side-effects, the Ortho OPD here genuinely changed how I live. The Janu Basti sessions and herbal protocol have given me my mornings back.', avatar: 'PS' },
  { name: 'Rajesh Kumar',       loc: 'Delhi',   condition: 'Slipped Disc',         rating: 5, text: 'I came in unable to sit for more than ten minutes. Six weeks of Kati Basti and structured therapy and I am back at work, walking daily, and on no painkillers.',          avatar: 'RK' },
  { name: 'Anita Mehta',        loc: 'Mumbai',  condition: 'PCOS',                 rating: 5, text: 'The depth of consultation and the warmth of the team is what I remember most. The PCOS protocol has regulated my cycles and improved my energy noticeably.',                 avatar: 'AM' },
  { name: 'Dr. Sandeep Verma',  loc: 'Lucknow', condition: 'Type 2 Diabetes',      rating: 5, text: 'As a physician myself, I appreciated the rigour. Real classical Ayurveda, properly delivered, with sensible co-management of my conventional therapy.',                       avatar: 'SV' },
  { name: 'Meera Iyer',         loc: 'Chennai', condition: 'Chronic Migraine',     rating: 5, text: 'Shirodhara, Nasya, and a six-week herbal protocol later — my migraine frequency dropped from weekly to occasional. The clarity afterwards has carried into everything.',     avatar: 'MI' },
  { name: 'Karan Aggarwal',     loc: 'Pune',    condition: 'Hair Fall',            rating: 5, text: 'A truly authentic Ayurveda hospital. The hair protocol was patient, methodical, and worked when nothing else had over the past three years.',                                  avatar: 'KA' },
];

const FAQS = [
  { q: 'What is a Super Speciality OPD?', a: 'A Super Speciality OPD brings together expert physicians focused on specific systems and disease categories — orthopedic, neurological, gastrointestinal, gynecological and more — rather than general OPD care. At Mangla, each specialty is led by a senior Ayurvedic physician with focused experience and supported by modern diagnostics.' },
  { q: 'How is Ayurvedic treatment different from conventional medicine?', a: 'Conventional medicine typically targets symptoms and pathology through pharmaceuticals and procedures. Classical Ayurveda treats the imbalance underneath — dosha disturbance, weak digestion, lifestyle factors — through Panchakarma, herbal medicines, diet, and routine. The two systems work very well together for chronic conditions and we integrate them whenever appropriate.' },
  { q: 'Do I need to bring prior medical reports?', a: 'Yes, please bring any existing test reports, prescriptions, imaging and discharge summaries — even older ones. This helps our physicians make a complete assessment without duplicating tests, and lets us coordinate with your treating doctors where useful.' },
  { q: 'How many sessions are typically required?', a: 'It varies substantially by condition. Acute issues may resolve in 1-2 weeks. Chronic conditions usually need 3-6 weeks of intensive care followed by 3-6 months of maintenance. Your physician will share a realistic timeline and milestone plan at the first consultation.' },
  { q: 'Are Ayurvedic treatments safe?', a: 'Yes, when administered by trained physicians using authenticated herbs and classical protocols. We screen every patient, monitor responses, and adjust as needed. Side effects are uncommon and usually mild. We always discuss safety transparently — including conditions where Ayurvedic treatment may not be appropriate.' },
  { q: 'Can chronic diseases really be managed through Ayurveda?', a: 'Yes — chronic disease management is one of Ayurveda\'s clear strengths. Arthritis, diabetes, skin disease, digestive disorders, PCOS, and stress-related conditions respond particularly well. For active acute disease or surgical conditions, we coordinate with appropriate modern medicine.' },
  { q: 'Do you provide online or video consultations?', a: 'Yes — video consultations are available for follow-up reviews and for patients who cannot visit in person. For Panchakarma and other in-person therapies, an initial physical consultation is preferred for accurate assessment.' },
  { q: 'What therapies do you offer at the Super Speciality OPD?', a: 'Full Panchakarma (Vamana, Virechana, Basti, Nasya, Raktamokshana), classical external therapies (Shirodhara, Kati Basti, Janu Basti, Hruday Basti, Patra Pinda Sweda), authenticated internal herbal medicines, structured pathya (therapeutic diet), and lifestyle and yoga guidance — all under doctor supervision.' },
];

const SPECIALITY_IMAGES = {
  'Orthopedic Disorders': '/img/super/Orthopedic Disorders.webp',
  'Neurological Disorders': '/img/super/Neurological Disorders.webp',
  'Skin Disorders': '/img/super/Skin Disorders.webp',
  'Gastrointestinal Disorders': '/img/super/Gastrointestinal Disorders.webp',
  'Respiratory Disorders': '/img/super/Respiratory Disorders.webp',
  'Kidney Disorders': '/img/super/Kidney Disorders.webp',
  'Liver Disorders': '/img/super/Liver Disorders.webp',
  'Diabetes Management': '/img/super/Diabetes Management.webp',
  'Thyroid Disorders': '/img/super/Thyroid Disorders.webp',
  'Obesity Management': '/img/super/Obesity Management.webp',
  'Gynecological Disorders': '/img/super/Gynecological Disorders.webp',
  'Infertility Management': '/img/super/Infertility Management.webp',
  'Pediatric Care': '/img/super/Pediatric Care.webp',
  'Cardiac Care': '/img/super/Cardiac Care.webp',
  'Mental Health & Stress Disorders': '/img/super/Mental Health & Stress Disorders.webp',
  'Joint & Arthritis Care': '/img/super/Joint & Arthritis Care.webp',
  'Spine & Back Pain Disorders': '/img/super/Spine & Back Pain Disorders.webp',
  'Hair & Scalp Disorders': '/img/super/Hair & Scalp Disorders.webp',
};

const specialityImageSrc = (name) => SPECIALITY_IMAGES[name];

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const SuperSpecialityPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', speciality: '', message: '' });
  const enquiry = useSheetSubmit('enquiry', 'Super-speciality — Appointment');
  const formSent = enquiry.sent;

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(t => (t + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await enquiry.submit({ name: form.name, phone: form.phone, email: form.email, interest: form.speciality, message: form.message });
    if (!ok) return;
    setForm({ name: '', phone: '', email: '', speciality: '', message: '' });
    setTimeout(enquiry.reset, 6000);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Mangla Healthcare — Super Speciality OPD',
    description: 'Super Speciality Ayurvedic OPD offering specialised consultation across orthopedic, neurological, skin, gastrointestinal, respiratory, kidney, liver, diabetes, thyroid, obesity, gynecological, infertility, pediatric, cardiac, mental health, joint, spine and hair disorders.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Medical Square',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302001',
      addressCountry: 'IN',
    },
    telephone: '+91-99926-54891',
    medicalSpecialty: SPECIALITIES.map(s => s.name),
  };

  return (
    <div className="ss-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Super Speciality OPD — Specialised Ayurvedic Care"
        description="Mangla Healthcare Super Speciality OPD offers expert Ayurvedic consultation across 18 specialities — orthopedic, neurological, skin, GI, respiratory, kidney, liver, diabetes, thyroid, gynecological, pediatric, cardiac, mental health, joint, spine and hair care."
        schema={schema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .ss-page { font-family: 'Inter', system-ui, sans-serif; }
        .ss-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }

        .ss-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14);
          border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .ss-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px;
          border-radius: 100px; text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .ss-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        .ss-btn-outline {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: #1E5B4F;
          padding: 13px 26px; border-radius: 100px;
          border: 1.5px solid #C9A86A; text-decoration: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          transition: all .25s ease;
        }
        .ss-btn-outline:hover { background: #C9A86A; color: #FAF8F3; }

        .ss-subnav {
          position: sticky; top: 0; z-index: 30;
          background: rgba(250,248,243,.92);
          backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid rgba(30,91,79,.12);
        }
        .ss-subnav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 12px 20px;
          display: flex; gap: 6px; overflow-x: auto;
          scrollbar-width: none;
        }
        .ss-subnav-inner::-webkit-scrollbar { display: none; }
        .ss-subnav a {
          flex-shrink: 0; padding: 8px 14px; border-radius: 100px;
          font-size: 13px; font-weight: 600; color: #2D2D2D99;
          text-decoration: none; white-space: nowrap;
          transition: all .2s ease;
        }
        .ss-subnav a:hover { background: rgba(30,91,79,.08); color: #1E5B4F; }

        .ss-spec-card {
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 22px;
          overflow: hidden;
          transition: all .3s cubic-bezier(.4,0,.2,1);
          display: flex; flex-direction: column;
          height: 100%;
        }
        .ss-spec-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px -28px rgba(30,91,79,.45);
          border-color: rgba(201,168,106,.45);
        }
        .ss-spec-card .arrow {
          opacity: 0; transform: translateX(-6px);
          transition: all .25s ease;
        }
        .ss-spec-card:hover .arrow {
          opacity: 1; transform: translateX(0);
        }

        .ss-feature-card {
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 18px;
          padding: 26px;
          transition: all .3s ease;
        }
        .ss-feature-card:hover {
          border-color: rgba(201,168,106,.45);
          box-shadow: 0 22px 44px -22px rgba(30,91,79,.4);
          transform: translateY(-4px);
        }

        .ss-process-step {
          display: flex; gap: 20px;
          padding: 22px;
          background: #fff;
          border: 1px solid rgba(30,91,79,.08);
          border-radius: 18px;
          transition: all .3s ease;
          position: relative;
        }
        .ss-process-step:hover {
          border-color: rgba(201,168,106,.4);
          transform: translateX(6px);
          box-shadow: 0 18px 36px -22px rgba(30,91,79,.4);
        }
        .ss-process-num {
          width: 52px; height: 52px; flex-shrink: 0; border-radius: 50%;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #C9A86A;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 800;
        }

        .ss-input {
          width: 100%; padding: 14px 16px;
          background: #fff; border: 1.5px solid rgba(30,91,79,.18);
          border-radius: 12px;
          font-family: inherit; font-size: 14.5px; color: #2D2D2D;
          outline: none; transition: all .2s ease;
        }
        .ss-input:focus {
          border-color: #1E5B4F;
          box-shadow: 0 0 0 4px rgba(30,91,79,.12);
        }
        .ss-textarea { resize: none; min-height: 110px; line-height: 1.55; }

        @media (max-width: 1024px) {
          .ss-grid-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .ss-spec-grid { grid-template-columns: 1fr !important; }
          .ss-features-grid { grid-template-columns: 1fr !important; }
          .ss-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ss-detail-conditions, .ss-detail-benefits, .ss-detail-methods {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 380px) {
          .ss-metrics-grid { grid-template-columns: 1fr !important; }
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
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(201,168,106,.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(30,91,79,.1), transparent 45%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: 80, right: -40,
          width: 320, height: 320, opacity: 0.06, color: '#1E5B4F',
        }}>
          <Stethoscope size={320} strokeWidth={1} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="ss-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="ss-eyebrow" style={{ marginBottom: 22 }}>
                <Stethoscope size={13} /> Advanced Ayurvedic Super Speciality Care
              </div>
              <h1 className="ss-display" style={{
                fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700,
                lineHeight: 1.05, color: '#1E5B4F', letterSpacing: '-1.2px', marginBottom: 22,
              }}>
                Super Speciality <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>OPD</em>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.7, color: '#2D2D2DAA', maxWidth: 540, marginBottom: 32 }}>
                Expert Ayurvedic consultation and personalised treatment plans for chronic,
                lifestyle, and complex health conditions — across 18 dedicated specialities
                under one roof.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#contact" className="ss-btn-primary">
                  <Calendar size={15} /> Book Appointment
                </a>
                <a href="tel:+919992654891" className="ss-btn-outline">
                  <Phone size={15} /> Talk to Expert
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <ImagePlaceholder label="Super Speciality OPD Hero" ratio="4/5" rounded={28} accent src={SPECIALITY_IMAGES['Respiratory Disorders']} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <nav className="ss-subnav" aria-label="Page sections">
        <div className="ss-subnav-inner">
          <a href="#intro">Introduction</a>
          <a href="#specialities">Specialities</a>
          <a href="#detailed">In Detail</a>
          <a href="#why">Why Mangla</a>
          <a href="#process">Process</a>
          <a href="#metrics">Success</a>
          <a href="#testimonials">Stories</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          SECTION 2 — INTRODUCTION
          ════════════════════════════════════════════════ */}
      <section id="intro" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ss-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ImagePlaceholder label="Specialized Ayurvedic Healthcare" ratio="4/5" rounded={24} src={SPECIALITY_IMAGES['Cardiac Care']} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="ss-eyebrow" style={{ marginBottom: 18 }}>
                <Award size={13} /> Integrated Speciality Care
              </div>
              <h2 className="ss-display" style={{
                fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
                color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px', marginBottom: 18,
              }}>
                Specialised Ayurvedic Healthcare <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Under One Roof</em>
              </h2>
              <p style={{ fontSize: 16.5, color: '#2D2D2DCC', lineHeight: 1.8, marginBottom: 28 }}>
                Mangla Healthcare brings together 18 dedicated Ayurvedic specialities under
                one roof — each led by senior physicians with focused experience in their
                area. We combine the depth of classical Ayurveda with modern diagnostic
                support, building each treatment plan around the individual patient rather
                than around the textbook.
              </p>

              <div className="ss-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { Icon: Stethoscope, label: 'Experienced Doctors' },
                  { Icon: UserCheck,   label: 'Personalised Care' },
                  { Icon: Leaf,        label: 'Natural Healing' },
                  { Icon: HeartPulse,  label: 'Long-Term Wellness' },
                ].map(({ Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '16px 18px', borderRadius: 14,
                      background: '#fff', border: '1px solid rgba(30,91,79,.08)',
                      transition: 'all .25s ease',
                    }}
                    whileHover={{ y: -3 }}
                  >
                    <span style={{
                      width: 40, height: 40, flexShrink: 0, borderRadius: 12,
                      background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)',
                      color: '#1E5B4F',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#2D2D2D' }}>{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 3 — SPECIALITIES GRID
          ════════════════════════════════════════════════ */}
      <section id="specialities" style={{ padding: '96px 20px', background: '#DDE8E366' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <Sparkles size={13} /> 18 Speciality Departments
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px', marginBottom: 14,
            }}>
              Our <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Specialities</em>
            </h2>
            <p style={{ fontSize: 16, color: '#2D2D2DAA', maxWidth: 640, margin: '0 auto', lineHeight: 1.65 }}>
              Dedicated departments for the conditions Ayurveda treats best — each led by
              experienced senior physicians.
            </p>
          </motion.div>

          <div className="ss-spec-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
          }}>
            {SPECIALITIES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.slug}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
                  className="ss-spec-card"
                >
                  <ImagePlaceholder label={s.name} ratio="4/3" rounded={0} src={specialityImageSrc(s.name)} />
                  <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(201,168,106,.18)', color: '#1E5B4F',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <h3 className="ss-display" style={{ fontSize: 20, fontWeight: 700, color: '#1E5B4F', lineHeight: 1.2 }}>
                        {s.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: 13.5, color: '#2D2D2D99', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                      {s.short}
                    </p>
                    <a
                      href={`#spec-${s.slug}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 700, color: '#C9A86A',
                        textDecoration: 'none', marginTop: 'auto',
                      }}
                    >
                      Learn more <ArrowRight size={14} className="arrow" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 4 — DETAILED SPECIALITY SECTIONS
          ════════════════════════════════════════════════ */}
      <section id="detailed" style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <ClipboardCheck size={13} /> Closer Look
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Each Speciality <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>In Detail</em>
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {SPECIALITIES.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  id={`spec-${s.slug}`}
                  key={s.slug}
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="ss-grid-2"
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1.1fr',
                    gap: 56, alignItems: 'center',
                    direction: reverse ? 'rtl' : 'ltr',
                    scrollMarginTop: 100,
                  }}
                >
                  <div style={{ direction: 'ltr' }}>
                    <ImagePlaceholder label={`${s.name} Image`} ratio="4/3" rounded={22} src={specialityImageSrc(s.name)} />
                  </div>
                  <div style={{ direction: 'ltr' }}>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: '#C9A86A', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                      Speciality {String(i + 1).padStart(2, '0')}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <span style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)',
                        color: '#1E5B4F',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <h3 className="ss-display" style={{
                        fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 700,
                        color: '#1E5B4F', lineHeight: 1.15, letterSpacing: '-.4px',
                      }}>
                        {s.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.75, marginBottom: 24 }}>
                      {s.description}
                    </p>

                    <div className="ss-detail-conditions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 24 }}>
                      <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#1E5B4F', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                          Conditions Treated
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {s.conditions.map(c => (
                            <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#2D2D2DAA', marginBottom: 8, lineHeight: 1.5 }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A86A', flexShrink: 0, marginTop: 8 }} />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: '#1E5B4F', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                          Benefits
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {s.benefits.map(b => (
                            <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, color: '#2D2D2DAA', marginBottom: 8, lineHeight: 1.5 }}>
                              <Check size={14} style={{ color: '#1E5B4F', flexShrink: 0, marginTop: 3 }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="ss-detail-methods" style={{ marginBottom: 24 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 800, color: '#1E5B4F', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                        Treatment Methods
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {s.methods.map(m => (
                          <span key={m} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '6px 12px', borderRadius: 100,
                            background: '#DDE8E366', border: '1px solid rgba(30,91,79,.18)',
                            color: '#1E5B4F', fontSize: 12.5, fontWeight: 600,
                          }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a href="#contact" className="ss-btn-primary" style={{ fontSize: 13.5, padding: '12px 22px' }}>
                      <Calendar size={14} /> Book Consultation
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 5 — WHY CHOOSE MANGLA
          ════════════════════════════════════════════════ */}
      <section id="why" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <Award size={13} /> Why Patients Trust Us
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Why Choose <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Mangla Ayurveda</em>
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
          }}>
            {WHY_CHOOSE.map((w, i) => {
              const { Icon, title, desc } = w;
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
                  className="ss-feature-card"
                >
                  <span style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'linear-gradient(135deg, #DDE8E3, #C9A86A22)',
                    color: '#1E5B4F',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                  }}>
                    <Icon size={24} strokeWidth={2} />
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#2D2D2D', marginBottom: 8 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#2D2D2D99', lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 6 — TREATMENT PROCESS
          ════════════════════════════════════════════════ */}
      <section id="process" style={{ padding: '96px 20px', background: '#DDE8E366' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <ClipboardCheck size={13} /> Six-Step Process
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Treatment <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Process</em>
            </h2>
          </motion.div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div aria-hidden style={{
              position: 'absolute',
              left: 45, top: 32, bottom: 32, width: 2,
              background: 'linear-gradient(180deg, #C9A86A66, #C9A86A)',
            }} />
            {PROCESS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="ss-process-step"
                >
                  <div className="ss-process-num">{p.num}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Icon size={16} style={{ color: '#1E5B4F' }} />
                      <h3 className="ss-display" style={{ fontSize: 21, fontWeight: 700, color: '#1E5B4F' }}>
                        {p.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14.5, color: '#2D2D2D99', lineHeight: 1.65 }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 7 — SUCCESS METRICS
          ════════════════════════════════════════════════ */}
      <section id="metrics" style={{
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
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(201,168,106,.18)',
              border: '1px solid rgba(201,168,106,.4)',
              color: '#C9A86A',
              fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              <Star size={13} /> Two Decades of Care
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#FAF8F3', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Success <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Metrics</em>
            </h2>
          </motion.div>

          <div className="ss-metrics-grid" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${METRICS.length}, 1fr)`,
            gap: 24,
          }}>
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(201,168,106,.2)',
                  borderRadius: 18, padding: 28,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Counter to={m.n} suffix={m.suffix} label={m.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 8 — TESTIMONIALS
          ════════════════════════════════════════════════ */}
      <section id="testimonials" style={{ padding: '96px 20px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <Quote size={13} /> Patient Voices
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Stories of <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Healing</em>
            </h2>
          </motion.div>

          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              maxWidth: 820, margin: '0 auto 40px',
              background: 'linear-gradient(135deg, #fff 0%, #DDE8E3 100%)',
              borderRadius: 24, padding: 'clamp(28px, 4vw, 48px)',
              border: '1px solid rgba(201,168,106,.3)',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={18} fill="#C9A86A" color="#C9A86A" />
              ))}
            </div>
            <Quote size={36} style={{ color: '#C9A86A55', marginBottom: 14 }} />
            <p className="ss-display" style={{
              fontSize: 'clamp(18px, 2vw, 24px)', fontStyle: 'italic',
              color: '#2D2D2D', lineHeight: 1.6, marginBottom: 26, fontWeight: 500,
            }}>
              "{TESTIMONIALS[activeTestimonial].text}"
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E5B4F, #144239)', color: '#C9A86A',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700,
                border: '2px solid #C9A86A',
              }}>
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, color: '#1E5B4F', fontSize: 15 }}>
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p style={{ fontSize: 12.5, color: '#2D2D2D88', marginTop: 2 }}>
                  {TESTIMONIALS[activeTestimonial].condition} · {TESTIMONIALS[activeTestimonial].loc}
                </p>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i} onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === activeTestimonial ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === activeTestimonial ? '#1E5B4F' : '#DDE8E3',
                  border: 'none', cursor: 'pointer', transition: 'all .3s ease',
                }}
              />
            ))}
          </div>

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
                  background: '#fff', border: '1px solid rgba(30,91,79,.08)',
                  borderRadius: 18, padding: 22, cursor: 'pointer',
                  transition: 'all .3s ease',
                }}
                onClick={() => setActiveTestimonial(i)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,106,.45)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,91,79,.08)'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: '#DDE8E3', color: '#1E5B4F',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 700,
                  }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#2D2D2D', fontSize: 13.5 }}>{t.name}</p>
                    <p style={{ fontSize: 11.5, color: '#2D2D2D88' }}>{t.condition}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} fill="#C9A86A" color="#C9A86A" />
                  ))}
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
          SECTION 9 — FAQ
          ════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <Sparkles size={13} /> Common Questions
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Frequently <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Asked</em>
            </h2>
          </motion.div>

          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 10 — APPOINTMENT CTA
          ════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 20px 80px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1E5B4F 0%, #144239 50%, #1E5B4F 100%)',
              color: '#FAF8F3',
              borderRadius: 32, padding: 'clamp(40px, 6vw, 72px)',
              position: 'relative', overflow: 'hidden', textAlign: 'center',
            }}
          >
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
              fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
              marginBottom: 22, position: 'relative',
            }}>
              <Sparkles size={13} /> Start Today
            </div>

            <h2 className="ss-display" style={{
              fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-.7px',
              marginBottom: 16, position: 'relative',
            }}>
              Start Your <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Healing Journey</em> Today
            </h2>
            <p style={{
              fontSize: 17, color: 'rgba(250,248,243,.78)',
              lineHeight: 1.65, maxWidth: 620, margin: '0 auto 32px',
              position: 'relative',
            }}>
              Get expert guidance from our Ayurvedic specialists — across all 18 dedicated
              speciality departments.
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
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 11 — CONTACT
          ════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: '96px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="ss-eyebrow" style={{ marginBottom: 16 }}>
              <Phone size={13} /> Reach Us
            </div>
            <h2 className="ss-display" style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700,
              color: '#1E5B4F', lineHeight: 1.1, letterSpacing: '-.6px',
            }}>
              Get in <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Touch</em>
            </h2>
          </motion.div>

          <div className="ss-grid-2" style={{
            display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56, alignItems: 'flex-start',
          }}>
            <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { Icon: Phone,  label: 'Call us',       value: '+91 99926 54891',           href: 'tel:+919992654891' },
                  { Icon: Mail,   label: 'Email us',      value: 'care@manglahealthcare.com', href: 'mailto:care@manglahealthcare.com' },
                  { Icon: MapPin, label: 'Visit us',      value: 'Medical Square, Jaipur, Rajasthan 302001' },
                  { Icon: Clock,  label: 'Working hours', value: 'Mon – Sat · 9:00 AM – 8:00 PM · Sun Closed' },
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
                      border: '1px solid rgba(30,91,79,.08)', transition: 'all .25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,106,.45)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,91,79,.08)'; e.currentTarget.style.transform = ''; }}
                    >{content}</a>
                  ) : (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: 16, borderRadius: 14,
                      background: '#FAF8F3', border: '1px solid rgba(30,91,79,.08)',
                    }}>{content}</div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div style={{
                marginTop: 22,
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: '1px solid rgba(30,91,79,.12)',
                boxShadow: '0 18px 40px -28px rgba(30,91,79,.35)',
                background: '#DDE8E3',
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9759529321356!2d75.8677!3d22.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEyLjAiTiA3NcKwNTInMDMuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mangla Healthcare location"
                />
              </div>
            </motion.div>

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
              <h3 className="ss-display" style={{
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
                <input className="ss-input" type="text" placeholder="Full Name *"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="ss-input" type="tel" placeholder="Phone Number *"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <input className="ss-input" type="email" placeholder="Email Address"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ marginBottom: 14 }} />
              <select
                className="ss-input" value={form.speciality}
                onChange={e => setForm({ ...form, speciality: e.target.value })}
                style={{ marginBottom: 14, appearance: 'none', cursor: 'pointer' }}
              >
                <option value="">Speciality Interested In</option>
                {SPECIALITIES.map(s => (
                  <option key={s.slug} value={s.name}>{s.name}</option>
                ))}
                <option>Not sure — please advise</option>
              </select>
              <textarea className="ss-input ss-textarea" placeholder="Tell us about your concern (optional)"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ marginBottom: 20 }} />
              <button type="submit" className="ss-btn-primary" disabled={enquiry.sending} style={{ width: '100%', justifyContent: 'center', opacity: enquiry.sending ? 0.7 : 1 }}>
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

export default SuperSpecialityPage;
