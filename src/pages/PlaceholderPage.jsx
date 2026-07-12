import { useLocation } from 'react-router-dom';
import RichPage from './RichPage';
import { subPagesContent } from './content/subPages';

const heroImages = {
  hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=85',
  panchkarma: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
  opd: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1920&q=85',
  pain: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85',
  diagnostics: 'https://images.unsplash.com/photo-1581093458791-9d15482442f6?auto=format&fit=crop&w=1920&q=85',
  wellness: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920&q=85',
  pathya: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1920&q=85',
  garbh: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1920&q=85',
  spa: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1920&q=85',
  yoga: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85',
  shop: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1920&q=85',
};

const commonStats = [
  { n: '20+', l: 'Years of clinical service' },
  { n: '25k+', l: 'Patient consultations' },
  { n: '3', l: 'Integrated care units' },
  { n: '24h', l: 'Care team response' },
];

const commonFaq = [
  {
    q: 'Do I need an appointment before visiting Mangla Healthcare?',
    a: 'Appointments are recommended so our team can allot the right doctor, therapy slot, or diagnostic timing. Walk-ins are supported for urgent OPD needs whenever doctors are available.',
  },
  {
    q: 'Can Ayurveda and modern medicine be combined safely?',
    a: 'Yes. Our clinicians review current medicines, diagnosis, diet, lifestyle, and test reports before recommending any integrated plan, so care remains practical and medically supervised.',
  },
  {
    q: 'Will the treatment plan be personalised?',
    a: 'Every patient receives a plan based on symptoms, medical history, prakriti assessment, lifestyle, examination findings, and relevant diagnostics.',
  },
  {
    q: 'How soon can I expect improvement?',
    a: 'Acute problems may improve quickly, while chronic conditions usually need consistent treatment, diet changes, follow-up, and home care over several weeks.',
  },
];

const baseRelated = [
  { name: 'Panchkarma', desc: 'Classical detoxification and rejuvenation therapies.', path: '/panchkarma', icon: 'leaf' },
  { name: 'Pain Management', desc: 'Ayurvedic and rehabilitative care for chronic pain.', path: '/pain-management', icon: 'bone' },
  { name: 'Diagnostics', desc: 'Blood tests, digital X-ray, ultrasound, and lab support.', path: '/diagnostics', icon: 'scan' },
];

const pathTitle = (path) => path.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || '';

const serviceName = (title, path) => {
  const clean = title.replace(/\s+—\s+/g, ' - ').trim();
  return clean || pathTitle(path);
};

const contentByPath = {
  '/hospital': {
    subtitle: 'A patient-first Ayurveda and healthcare hospital offering OPD consultation, nursing care, preventive care, minor procedures, monitoring, and integrated clinical guidance under one trusted roof.',
    introHead: 'Ayurveda Hospital Overview',
    intro: 'Mangla Healthcare brings together Mangla Nursing Home, Nirogpeeth Ayurveda, and Durgadevi Ultrasound to create a complete care ecosystem. Patients can consult experienced doctors, receive nursing support, access diagnostics, and follow Ayurveda-led recovery plans without fragmented referrals.',
    benefits: [
      { title: 'OPD Consultation', desc: 'Structured doctor consultation for acute illness, chronic disease, preventive care, lifestyle disorders, and Ayurvedic assessment.', icon: 'stethoscope' },
      { title: 'Nursing Care', desc: 'Compassionate monitoring, vitals support, medication assistance, dressing care, and patient education for recovery.', icon: 'heartPulse' },
      { title: 'Minor Surgery', desc: 'Clean, protocol-driven care for selected minor procedures, wound care, dressing, and follow-up review.', icon: 'scissors' },
      { title: 'General Healthcare', desc: 'Common fever, infections, digestive complaints, fatigue, weakness, pain, and routine clinical care.', icon: 'activity' },
      { title: 'Preventive Care', desc: 'Health checkups, risk screening, lifestyle correction, seasonal care, and immunity support.', icon: 'shield' },
      { title: 'Patient Monitoring', desc: 'Follow-up plans, test review, therapy progress tracking, and coordinated communication with the care team.', icon: 'clipboard' },
    ],
    process: [
      { title: 'Registration and history', desc: 'The team records concerns, current medicines, previous reports, and primary health goals.' },
      { title: 'Doctor evaluation', desc: 'Clinical examination and Ayurvedic assessment help identify both immediate symptoms and deeper patterns.' },
      { title: 'Care plan', desc: 'You receive a practical plan covering treatment, diet, lifestyle, diagnostics, therapy, and follow-up.' },
      { title: 'Monitoring', desc: 'Progress is reviewed through visits, reports, therapy response, and patient feedback.' },
    ],
    indications: ['Fever and infections', 'Digestive issues', 'Pain and stiffness', 'Weakness and fatigue', 'Chronic lifestyle disorders', 'Preventive checkups', 'Post-procedure care', 'Family healthcare'],
    related: [
      { name: 'OPD Consultation', desc: 'Doctor-led consultation for general and chronic health issues.', path: '/services/opd', icon: 'stethoscope' },
      { name: 'Nursing Care', desc: 'Supportive patient care, dressing, vitals, and recovery guidance.', path: '/services/nursing-care', icon: 'heartPulse' },
      { name: 'Health Checkup', desc: 'Preventive screening packages with report review.', path: '/hospital/health-checkup', icon: 'clipboard' },
    ],
  },
  '/panchkarma': {
    subtitle: 'Authentic Panchkarma therapies for detoxification, dosha balancing, digestive reset, stress relief, pain care, and deep rejuvenation under doctor supervision.',
    introHead: 'What is Panchkarma?',
    intro: 'Panchkarma is Ayurveda\'s classical purification system. It uses preparation, oleation, sweating, elimination therapies, diet discipline, and rejuvenation to remove accumulated toxins and restore digestive, metabolic, nervous, and immune balance.',
    benefits: [
      { title: 'Vamana', desc: 'Therapeutic emesis used selectively for Kapha-dominant conditions under strict clinical supervision.', icon: 'waves' },
      { title: 'Virechana', desc: 'A cleansing purgation protocol traditionally used for Pitta imbalance, skin issues, acidity, and metabolic overload.', icon: 'flame' },
      { title: 'Basti', desc: 'Medicated oil or decoction therapy regarded as central for Vata disorders, pain, stiffness, and degeneration.', icon: 'droplet' },
      { title: 'Nasya', desc: 'Nasal administration of medicated oils for sinus, headache, sleep, stress, and head-neck concerns.', icon: 'brain' },
      { title: 'Raktamokshana', desc: 'Blood purification procedure advised only after careful case selection and clinical screening.', icon: 'activity' },
      { title: 'Rejuvenation Care', desc: 'Post-therapy diet, rasayana support, sleep correction, and routine guidance to sustain benefits.', icon: 'sparkles' },
    ],
    process: [
      { title: 'Consultation', desc: 'Doctor assesses prakriti, dosha status, age, strength, digestion, and medical suitability.' },
      { title: 'Preparation', desc: 'Snehana, swedana, diet correction, and bowel preparation prime the body for elimination.' },
      { title: 'Therapy course', desc: 'The selected therapy is performed by trained therapists with vitals and comfort monitoring.' },
      { title: 'Aftercare', desc: 'A special diet, rest plan, herbal support, and follow-up help rebuild strength.' },
    ],
    indications: ['Digestive heaviness', 'Chronic fatigue', 'Stress and poor sleep', 'Joint stiffness', 'Skin concerns', 'Metabolic imbalance', 'Seasonal detox', 'Preventive rejuvenation'],
    related: [
      { name: 'Vamana', desc: 'Kapha-focused classical cleansing therapy.', path: '/panchkarma/vamana', icon: 'waves' },
      { name: 'Virechana', desc: 'Pitta-focused cleansing and digestive reset.', path: '/panchkarma/virechana', icon: 'flame' },
      { name: 'Basti', desc: 'Vata-balancing care for pain and stiffness.', path: '/panchkarma/basti', icon: 'droplet' },
      { name: 'Nasya', desc: 'Head, neck, sinus, and nervous system support.', path: '/panchkarma/nasya', icon: 'brain' },
      { name: 'Raktamokshana', desc: 'Selected blood purification protocol.', path: '/panchkarma/raktamokshana', icon: 'activity' },
    ],
    faq: [
      { q: 'Is Panchkarma suitable for everyone?', a: 'No. Suitability depends on age, strength, pregnancy status, medical history, current medicines, digestion, and the condition being treated. A consultation is required first.' },
      { q: 'How many days does Panchkarma take?', a: 'Programs may range from a single supportive therapy to 7, 14, or 21-day courses depending on the therapy and patient goals.' },
      { q: 'Do I need a special diet during Panchkarma?', a: 'Yes. Light, warm, easy-to-digest food is usually advised before and after therapy to support digestion and recovery.' },
      { q: 'Can Panchkarma help pain management?', a: 'Selected therapies such as Basti, Kati Basti, Janu Basti, Abhyanga, and Swedana are commonly used in Ayurvedic pain protocols.' },
    ],
    duration: '45-90 minutes per session',
    sessions: 'Doctor-advised course',
  },
  '/super-speciality': {
    subtitle: 'Focused OPD care for skin, sexual health, joint pain, and general medical concerns with confidential consultation and integrated treatment planning.',
    introHead: 'Specialist OPD Care',
    intro: 'Our SuperSpeciality OPD helps patients access focused clinical evaluation for recurring, sensitive, or chronic concerns. The emphasis is on listening carefully, identifying the root cause, using diagnostics where needed, and building a plan that patients can actually follow.',
    benefits: [
      { title: 'Skin OPD', desc: 'Care for acne, fungal infection, itching, eczema-like symptoms, pigmentation, hair fall, and recurring rashes.', icon: 'sun' },
      { title: 'Sexual Health OPD', desc: 'Confidential consultation for men and women with privacy, sensitivity, and medically grounded advice.', icon: 'heart' },
      { title: 'Joint Pain OPD', desc: 'Evaluation of knee pain, arthritis, stiffness, swelling, cervical pain, back pain, and mobility concerns.', icon: 'bone' },
      { title: 'General OPD', desc: 'Consultation for fever, weakness, digestion, infections, lifestyle disorders, and routine health problems.', icon: 'stethoscope' },
    ],
    process: [
      { title: 'Focused history', desc: 'Symptoms, triggers, duration, previous treatment, medicines, and lifestyle are reviewed.' },
      { title: 'Clinical examination', desc: 'Doctor checks relevant signs and decides whether tests or imaging are needed.' },
      { title: 'Treatment plan', desc: 'You receive medicines, diet guidance, hygiene advice, therapy support, and follow-up timing.' },
      { title: 'Follow-up review', desc: 'Progress, side effects, reports, and changes in symptoms are reviewed systematically.' },
    ],
    indications: ['Acne and itching', 'Hair fall', 'Sexual health concerns', 'Knee pain', 'Arthritis', 'Back pain', 'Fever', 'Digestive complaints'],
    related: [
      { name: 'Skin OPD', desc: 'Dermatology-inspired Ayurveda and general care.', path: '/services/skin-opd', icon: 'sun' },
      { name: 'Sexual Health OPD', desc: 'Private consultation for sensitive concerns.', path: '/services/sexual-health', icon: 'heart' },
      { name: 'Joint Pain OPD', desc: 'Pain, swelling, stiffness, and mobility care.', path: '/services/joint-pain', icon: 'bone' },
      { name: 'General OPD', desc: 'Everyday medical consultation and follow-up.', path: '/services/opd', icon: 'stethoscope' },
    ],
  },
  '/pain-management': {
    subtitle: 'Non-surgical pain care for knee pain, back pain, arthritis, joint stiffness, cervical pain, sciatica, frozen shoulder, and muscle pain.',
    introHead: 'Pain Management Overview',
    intro: 'Mangla Healthcare combines Ayurvedic therapies, medical evaluation, posture guidance, gentle exercise planning, and lifestyle correction to reduce pain recurrence. The focus is mobility, inflammation control, strength, and safer daily movement.',
    benefits: [
      { title: 'Knee Pain', desc: 'Support for osteoarthritis, stiffness, swelling, walking difficulty, and age-related knee degeneration.', icon: 'bone' },
      { title: 'Back Pain', desc: 'Care for lower back strain, posture stress, muscle tightness, disc-related symptoms, and recurring pain.', icon: 'activity' },
      { title: 'Arthritis', desc: 'Ayurvedic support for inflammation, morning stiffness, swelling, and long-term joint protection.', icon: 'heartPulse' },
      { title: 'Joint Stiffness', desc: 'Oil therapies, swedana, mobility drills, and diet guidance to improve flexibility.', icon: 'dumbbell' },
      { title: 'Muscle Pain', desc: 'Therapies and exercise advice for overuse, fatigue, sports strain, and chronic tightness.', icon: 'activity' },
      { title: 'Exercise Guidance', desc: 'Simple home exercises, precautions, heat-cold advice, and posture education.', icon: 'clipboard' },
    ],
    process: [
      { title: 'Pain mapping', desc: 'Location, intensity, triggers, stiffness pattern, swelling, and nerve symptoms are assessed.' },
      { title: 'Report review', desc: 'X-ray, ultrasound, blood tests, and prior prescriptions are reviewed when available.' },
      { title: 'Therapy selection', desc: 'Abhyanga, Swedana, Basti, Kati Basti, Janu Basti, lepa, or exercise support may be advised.' },
      { title: 'Home plan', desc: 'Patients receive activity modification, food guidance, and follow-up instructions.' },
    ],
    indications: ['Knee pain', 'Back pain', 'Arthritis', 'Cervical stiffness', 'Sciatica', 'Frozen shoulder', 'Muscle tightness', 'Reduced mobility'],
    related: [
      { name: 'Knee Pain Treatment', desc: 'Focused care for stiffness, swelling, and walking difficulty.', path: '/pain-management/knee', icon: 'bone' },
      { name: 'Back Pain Care', desc: 'Lower back, posture, and muscle care programs.', path: '/pain-management/back', icon: 'activity' },
      { name: 'Arthritis Care', desc: 'Long-term inflammation and stiffness support.', path: '/pain-management/arthritis', icon: 'heartPulse' },
    ],
  },
  '/diagnostics': {
    subtitle: 'Reliable blood tests, digital X-ray, ultrasound imaging, and lab services that support accurate diagnosis and timely treatment decisions.',
    introHead: 'Diagnostics and Lab Services',
    intro: 'Durgadevi Ultrasound and Mangla Healthcare diagnostics support doctors with dependable reports, clean sample handling, patient-friendly processes, and coordinated report review. Diagnostics are used only when they add clinical value.',
    benefits: [
      { title: 'Blood Test', desc: 'Routine and advanced panels for infection, sugar, thyroid, liver, kidney, vitamin, lipid, and inflammatory markers.', icon: 'tube' },
      { title: 'Digital X-Ray', desc: 'Imaging support for bone, joint, chest, spine, and injury-related evaluation.', icon: 'scan' },
      { title: 'Ultrasound', desc: 'Abdomen, pelvic, pregnancy, soft tissue, and doctor-advised ultrasound imaging.', icon: 'waves' },
      { title: 'Lab Services', desc: 'Clean sample collection, barcode-ready workflow, report coordination, and doctor interpretation support.', icon: 'flask' },
      { title: 'Modern Equipment', desc: 'Patient-friendly diagnostic setup designed for clarity, speed, and safe handling.', icon: 'shield' },
      { title: 'Report Review', desc: 'Doctors explain relevant findings and connect reports with symptoms and treatment plans.', icon: 'clipboard' },
    ],
    process: [
      { title: 'Test recommendation', desc: 'Doctor or patient selects the required investigation based on symptoms and purpose.' },
      { title: 'Sample or imaging', desc: 'The team completes collection or imaging with hygiene and patient comfort protocols.' },
      { title: 'Report generation', desc: 'Reports are prepared and shared through the selected communication channel.' },
      { title: 'Clinical interpretation', desc: 'A doctor reviews abnormal findings and advises next steps where needed.' },
    ],
    indications: ['Routine health checkup', 'Fever evaluation', 'Joint pain workup', 'Pregnancy scan', 'Abdominal symptoms', 'Injury assessment', 'Thyroid or sugar monitoring', 'Preventive screening'],
    related: [
      { name: 'Blood Test', desc: 'Comprehensive pathology and routine panels.', path: '/diagnostics/blood-test', icon: 'tube' },
      { name: 'Digital X-Ray', desc: 'Fast imaging support for clinical decisions.', path: '/diagnostics/x-ray', icon: 'scan' },
      { name: 'Ultrasound', desc: 'Durgadevi Ultrasound imaging services.', path: '/diagnostics/ultrasound', icon: 'waves' },
    ],
  },
  '/wellness': {
    subtitle: 'Lifestyle management, stress care, preventive routines, wellness therapies, diet guidance, and daily health habits rooted in Ayurveda.',
    introHead: 'Wellness Programs',
    intro: 'Our wellness programs are designed for people who want better energy, sleep, digestion, stress resilience, weight balance, and long-term disease prevention. Plans are simple, trackable, and personalised to daily life.',
    benefits: [
      { title: 'Lifestyle Management', desc: 'Daily routine correction for sleep, food timing, activity, hydration, and stress triggers.', icon: 'sun' },
      { title: 'Stress Management', desc: 'Breathing, meditation, sound therapy, counselling-style guidance, and restorative routines.', icon: 'brain' },
      { title: 'Wellness Therapies', desc: 'Abhyanga, Shirodhara, steam, relaxation rituals, and seasonal rejuvenation care.', icon: 'sparkles' },
      { title: 'Health Guidance', desc: 'Doctor-reviewed advice for preventive care, risk reduction, and habit change.', icon: 'stethoscope' },
      { title: 'Daily Routines', desc: 'Dinacharya, Ritucharya, sleep hygiene, meal rhythm, and movement planning.', icon: 'clock' },
      { title: 'Exercise Support', desc: 'Beginner-safe movement plans for flexibility, strength, and pain prevention.', icon: 'dumbbell' },
    ],
    process: [
      { title: 'Goal setting', desc: 'Energy, weight, digestion, sleep, stress, or disease prevention goals are prioritised.' },
      { title: 'Assessment', desc: 'Lifestyle, prakriti, food pattern, work routine, and current symptoms are reviewed.' },
      { title: 'Plan design', desc: 'Diet, movement, therapy, breathing, and routine guidance are combined.' },
      { title: 'Tracking', desc: 'Follow-up helps refine habits and maintain realistic progress.' },
    ],
    indications: ['Stress', 'Poor sleep', 'Low energy', 'Weight imbalance', 'Digestive heaviness', 'Sedentary routine', 'Preventive health', 'Burnout'],
  },
  '/pathya': {
    subtitle: 'Ayurvedic diet guidance for pregnancy, everyday health, Panchkarma preparation, recovery, digestion, immunity, and lifestyle balance.',
    introHead: 'Pathya Diet Guidance',
    intro: 'Pathya means food and routine that supports healing. At Mangla Healthcare, diet advice is practical: what to eat, what to avoid, meal timing, cooking style, digestive strength, season, disease condition, and therapy stage are all considered.',
    benefits: [
      { title: 'Pregnancy Pathya', desc: 'Gentle food guidance for trimester-wise nourishment, digestion, hydration, and emotional comfort.', icon: 'baby' },
      { title: 'Common Pathya', desc: 'Everyday Ayurvedic food routines for digestion, energy, immunity, and weight balance.', icon: 'salad' },
      { title: 'Panchkarma Diet', desc: 'Light, warm, easy-to-digest food before, during, and after therapy to protect agni.', icon: 'utensils' },
      { title: 'Foods to Eat', desc: 'Freshly prepared meals, seasonal vegetables, warm water, simple grains, and doctor-advised herbs.', icon: 'apple' },
      { title: 'Foods to Avoid', desc: 'Heavy, stale, fried, incompatible, overly cold, and excessive packaged foods during healing.', icon: 'shield' },
      { title: 'Daily Routine Tips', desc: 'Meal timing, mindful eating, sleep rhythm, gentle movement, and hydration planning.', icon: 'clock' },
    ],
    process: [
      { title: 'Diet history', desc: 'Current food, appetite, cravings, bowel pattern, allergies, and routine are reviewed.' },
      { title: 'Condition mapping', desc: 'Diet is matched to pregnancy, Panchkarma, pain, digestion, skin, or wellness goals.' },
      { title: 'Meal guidance', desc: 'Patients receive eat/avoid lists, timing advice, and practical substitutions.' },
      { title: 'Adjustment', desc: 'Plans are changed based on digestion, symptoms, season, and treatment progress.' },
    ],
    indications: ['Pregnancy care', 'Panchkarma preparation', 'Acidity', 'Constipation', 'Weight balance', 'Low energy', 'Skin issues', 'Daily wellness'],
    related: [
      { name: 'Pregnancy Pathya', desc: 'Trimester-conscious food and routine guidance.', path: '/pathya/pregnancy', icon: 'baby' },
      { name: 'Common Pathya', desc: 'Everyday Ayurvedic diet and routine.', path: '/pathya/common', icon: 'salad' },
      { name: 'Panchkarma Diet', desc: 'Pre and post detox meal discipline.', path: '/pathya/panchkarma-diet', icon: 'utensils' },
    ],
  },
  '/garbh-sanskar': {
    subtitle: 'Pregnancy wellness program combining Ayurveda pregnancy care, nutrition guidance, meditation, emotional wellness, and family education.',
    introHead: 'Garbh Sanskar Program',
    intro: 'Garbh Sanskar focuses on nurturing the mother and baby through food, routine, calmness, positive emotional health, gentle movement, spiritual practices, and trimester-wise medical awareness. It is supportive care, not a substitute for obstetric supervision.',
    benefits: [
      { title: 'Pregnancy Wellness', desc: 'Trimester-wise guidance for energy, rest, digestion, sleep, and comfort.', icon: 'baby' },
      { title: 'Ayurveda Pregnancy Care', desc: 'Safe routine advice, gentle formulations where appropriate, and doctor-reviewed precautions.', icon: 'leaf' },
      { title: 'Nutrition Guidance', desc: 'Balanced meals, hydration, protein, iron-rich foods, and digestive support.', icon: 'salad' },
      { title: 'Meditation', desc: 'Breathing, mantra, music, and relaxation practices for calm bonding.', icon: 'brain' },
      { title: 'Emotional Wellness', desc: 'Stress reduction, family involvement, sleep hygiene, and positive communication.', icon: 'heart' },
      { title: 'Birth Preparation', desc: 'Awareness of warning signs, hospital readiness, and follow-up planning.', icon: 'clipboard' },
    ],
    process: [
      { title: 'Initial counselling', desc: 'Health history, trimester, reports, symptoms, and goals are reviewed.' },
      { title: 'Nutrition and routine', desc: 'A simple plan is created for meals, rest, hydration, and safe movement.' },
      { title: 'Mind-body practices', desc: 'Meditation, music, breathing, and bonding activities are introduced gradually.' },
      { title: 'Follow-up', desc: 'Symptoms, reports, emotional health, and diet adherence are reviewed.' },
    ],
    indications: ['Pregnancy wellness', 'Stress in pregnancy', 'Nutrition planning', 'Sleep concerns', 'Emotional support', 'Family counselling', 'Trimester routine', 'Birth preparation'],
    duration: '30-60 minute sessions',
    sessions: 'Monthly or trimester-wise',
  },
};

const categoryDefaults = (category, path, title) => {
  const name = serviceName(title, path);

  if (category === 'Panchkarma') {
    return {
      heroBg: heroImages.panchkarma,
      subtitle: `${name} is offered as a doctor-supervised Ayurvedic therapy with careful preparation, trained therapist support, diet guidance, and post-therapy follow-up.`,
      intro: `${name} is part of the classical Panchkarma and allied therapy system. At Mangla Healthcare, therapy selection is based on prakriti, dosha imbalance, age, digestive strength, current disease status, and safety screening.`,
      benefits: [
        { title: 'Classical Ayurveda Protocol', desc: 'Therapy follows a structured sequence with preparation, procedure, rest, and aftercare.', icon: 'leaf' },
        { title: 'Detoxification Support', desc: 'Designed to reduce accumulated imbalance and support natural elimination pathways.', icon: 'droplet' },
        { title: 'Digestive Reset', desc: 'Diet and agni support help the body respond better to treatment.', icon: 'flame' },
        { title: 'Therapist-Led Care', desc: 'Trained therapists perform procedures with comfort, hygiene, and timing discipline.', icon: 'userCheck' },
      ],
      process: [
        { title: 'Doctor consultation', desc: 'Suitability, precautions, therapy duration, and expected response are discussed.' },
        { title: 'Preparation', desc: 'Diet, oleation, or sweating may be advised before the main therapy.' },
        { title: 'Therapy session', desc: 'The procedure is performed in a calm treatment room with monitoring.' },
        { title: 'Recovery guidance', desc: 'Food, rest, hydration, and follow-up instructions are provided.' },
      ],
      indications: ['Detox need', 'Digestive imbalance', 'Stress', 'Stiffness', 'Seasonal cleansing', 'Low energy'],
      related: contentByPath['/panchkarma'].related,
      duration: '45-90 minutes',
      sessions: 'As advised by doctor',
    };
  }

  if (category === 'Pain Management') {
    return {
      heroBg: heroImages.pain,
      subtitle: `${name} at Mangla Healthcare combines clinical evaluation, Ayurveda pain therapies, posture advice, and practical exercise guidance.`,
      intro: `${name} is managed with a root-cause view of pain: inflammation, degeneration, posture, weight, digestion, stress, sleep, and daily activity are all considered before treatment is planned.`,
      benefits: [
        { title: 'Pain Relief Therapies', desc: 'Oil therapy, steam, localized basti, lepa, and selected Panchkarma support may be advised.', icon: 'bone' },
        { title: 'Mobility Support', desc: 'Gentle movements and precautions help reduce stiffness and improve daily function.', icon: 'dumbbell' },
        { title: 'Inflammation Care', desc: 'Diet and medicines are planned to support swelling, heat, and recurring flare-ups.', icon: 'activity' },
        { title: 'Long-Term Prevention', desc: 'Posture, weight, routine, sleep, and follow-up help reduce recurrence.', icon: 'shield' },
      ],
      process: contentByPath['/pain-management'].process,
      indications: ['Pain', 'Stiffness', 'Swelling', 'Reduced movement', 'Posture strain', 'Recurring flare-ups'],
      related: contentByPath['/pain-management'].related,
    };
  }

  if (category === 'Diagnostics') {
    return {
      heroBg: heroImages.diagnostics,
      subtitle: `${name} supports accurate diagnosis, timely treatment decisions, and doctor-reviewed reporting in a clean patient-friendly setting.`,
      intro: `${name} is part of the diagnostic support ecosystem at Mangla Healthcare. The focus is dependable reporting, hygienic handling, patient comfort, and meaningful interpretation by the treating doctor.`,
      benefits: [
        { title: 'Clean Process', desc: 'Sample collection or imaging is handled with hygiene and documentation discipline.', icon: 'shield' },
        { title: 'Doctor-Relevant Reports', desc: 'Reports are connected to symptoms, history, and treatment decisions.', icon: 'clipboard' },
        { title: 'Modern Equipment', desc: 'Technology-led support for routine and condition-specific diagnosis.', icon: 'scan' },
        { title: 'Fast Coordination', desc: 'The care team helps coordinate report sharing and follow-up review.', icon: 'clock' },
      ],
      process: contentByPath['/diagnostics'].process,
      indications: ['Screening', 'Report review', 'Fever', 'Pain evaluation', 'Pregnancy care', 'Preventive checkup'],
      related: contentByPath['/diagnostics'].related,
    };
  }

  if (category === 'Pathya') {
    return {
      heroBg: heroImages.pathya,
      subtitle: `${name} provides practical Ayurvedic meal guidance, foods to eat, foods to avoid, routine tips, and digestion-focused planning.`,
      intro: `${name} is built around the Ayurvedic idea that food should match the person, season, digestive strength, and disease stage. The guidance is simple enough for daily home use.`,
      benefits: [
        { title: 'Foods to Eat', desc: 'Fresh, warm, seasonal, and easy-to-digest meals selected for your condition.', icon: 'apple' },
        { title: 'Foods to Avoid', desc: 'Heavy, cold, stale, incompatible, or symptom-triggering foods are reduced.', icon: 'shield' },
        { title: 'Meal Timing', desc: 'Timing and portion guidance protects digestion and supports therapy response.', icon: 'clock' },
        { title: 'Routine Tips', desc: 'Hydration, sleep, movement, and mindful eating are included.', icon: 'sun' },
      ],
      process: contentByPath['/pathya'].process,
      indications: contentByPath['/pathya'].indications,
      related: contentByPath['/pathya'].related,
    };
  }

  if (category === 'Spa') {
    return {
      heroBg: heroImages.spa,
      subtitle: `${name} blends Ayurvedic oils, relaxation rituals, detox support, and therapist-led care for visible freshness and deep rest.`,
      intro: `${name} is designed as a premium wellness experience, but it remains grounded in Ayurveda principles of dosha balance, circulation, lymphatic movement, skin nourishment, and stress recovery.`,
      benefits: [
        { title: 'Relaxation', desc: 'Calming rituals help reduce stress, fatigue, and nervous system overload.', icon: 'sparkles' },
        { title: 'Skin and Hair Support', desc: 'Herbal oils, ubtan, and scalp care support nourishment and glow.', icon: 'sun' },
        { title: 'Detox Feeling', desc: 'Steam, massage, and routine advice support lightness and circulation.', icon: 'droplet' },
        { title: 'Premium Comfort', desc: 'Clean therapy rooms, trained therapists, and soothing ambience.', icon: 'heart' },
      ],
      process: [
        { title: 'Wellness consultation', desc: 'Therapy is selected according to concern, skin type, stress, and comfort.' },
        { title: 'Preparation', desc: 'The therapist explains oils, duration, and precautions before starting.' },
        { title: 'Therapy ritual', desc: 'Treatment is performed with appropriate pressure, rhythm, and hygiene.' },
        { title: 'Aftercare', desc: 'Hydration, bath timing, and routine advice are shared.' },
      ],
      indications: ['Stress', 'Dry skin', 'Hair fall', 'Fatigue', 'Body heaviness', 'Relaxation', 'Glow care'],
      related: [
        { name: 'Hair Therapy', desc: 'Scalp nourishment and hair fall support.', path: '/spa/hair', icon: 'sparkles' },
        { name: 'Skin Therapy', desc: 'Glow, ubtan, and skin rejuvenation.', path: '/spa/skin', icon: 'sun' },
        { name: 'Body Detox', desc: 'Relaxation, oil therapy, and lightness.', path: '/spa/body', icon: 'heartPulse' },
      ],
    };
  }

  if (category === 'Yoga & Music') {
    return {
      heroBg: heroImages.yoga,
      subtitle: `${name} supports breath, posture, focus, sleep, stress relief, and mind-body balance through guided sessions.`,
      intro: `${name} uses simple, accessible practices rather than performance-focused routines. Sessions may include asana, pranayama, meditation, raga-inspired relaxation, and lifestyle guidance.`,
      benefits: [
        { title: 'Breath Regulation', desc: 'Pranayama helps calm stress response and improve awareness.', icon: 'brain' },
        { title: 'Gentle Movement', desc: 'Safe asanas support flexibility, posture, and pain prevention.', icon: 'dumbbell' },
        { title: 'Sound Relaxation', desc: 'Music and rhythm can support mood, sleep, and emotional steadiness.', icon: 'music' },
        { title: 'Daily Practice', desc: 'Short home routines make wellness sustainable.', icon: 'clock' },
      ],
      process: [
        { title: 'Goal review', desc: 'Stress, pain, flexibility, sleep, or wellness goals are identified.' },
        { title: 'Practice selection', desc: 'Yoga, breathwork, or music relaxation is chosen based on comfort.' },
        { title: 'Guided session', desc: 'Instructor-led practice keeps pace safe and understandable.' },
        { title: 'Home routine', desc: 'A short repeatable routine is shared for daily practice.' },
      ],
      indications: ['Stress', 'Poor sleep', 'Sedentary work', 'Back stiffness', 'Anxiety', 'Low energy', 'Wellness'],
      related: [
        { name: 'Yoga Classes', desc: 'Asana and pranayama for everyday wellness.', path: '/yoga/classes', icon: 'leaf' },
        { name: 'Music Therapy', desc: 'Sound-led relaxation and emotional balance.', path: '/yoga/music', icon: 'music' },
      ],
    };
  }

  if (category === 'Hospital Service' || category === 'SuperSpeciality') {
    return {
      heroBg: heroImages.opd,
      subtitle: `${name} offers focused consultation, symptom review, treatment planning, and follow-up guidance from the Mangla Healthcare team.`,
      intro: `${name} is structured for clarity and comfort. Patients receive proper history taking, relevant examination, privacy, report review, and practical instructions for treatment and follow-up.`,
      benefits: [
        { title: 'Common Conditions', desc: 'Evaluation for recurring symptoms, acute complaints, chronic problems, and follow-up needs.', icon: 'stethoscope' },
        { title: 'Treatment Overview', desc: 'Medicines, diet, investigations, procedures, or therapies are explained clearly.', icon: 'clipboard' },
        { title: 'Symptom Guidance', desc: 'Patients learn warning signs, home precautions, and when to revisit.', icon: 'activity' },
        { title: 'Confidential Care', desc: 'Sensitive concerns are handled with privacy and respect.', icon: 'shield' },
      ],
      process: contentByPath['/super-speciality'].process,
      indications: ['Consultation', 'Report review', 'Recurring symptoms', 'Sensitive health concerns', 'Pain', 'Skin issues', 'General illness'],
      related: contentByPath['/super-speciality'].related,
    };
  }

  if (category === 'Wellness') {
    return contentByPath['/wellness'];
  }

  if (category === 'Garbh Sanskar') {
    return contentByPath['/garbh-sanskar'];
  }

  if (category === 'Shop') {
    return {
      heroBg: heroImages.shop,
      subtitle: 'Doctor-guided Ayurveda products, herbal wellness support, oils, diet aids, and daily health essentials selected for quality and safe use.',
      intro: 'The Ayurveda shop is planned as a responsible extension of clinical care. Products should be selected after understanding body type, condition, current medication, and intended use.',
      benefits: [
        { title: 'Herbal Wellness', desc: 'Classical and daily-use Ayurveda support for digestion, immunity, sleep, skin, and pain care.', icon: 'leaf' },
        { title: 'Therapy Oils', desc: 'Ayurvedic oils for massage, pain relief, scalp support, and relaxation routines.', icon: 'droplet' },
        { title: 'Diet Support', desc: 'Pathya-friendly food aids and wellness guidance for everyday routine.', icon: 'salad' },
        { title: 'Doctor Guidance', desc: 'Patients are encouraged to use products according to clinical advice.', icon: 'stethoscope' },
      ],
      process: [
        { title: 'Need identification', desc: 'Concern, age, medicines, and health goals are reviewed.' },
        { title: 'Product selection', desc: 'The team recommends suitable products and usage instructions.' },
        { title: 'Usage guidance', desc: 'Dose, timing, precautions, and storage are explained.' },
        { title: 'Follow-up', desc: 'Response and suitability are reviewed where needed.' },
      ],
      indications: ['Digestive support', 'Pain oils', 'Skin care', 'Hair care', 'Immunity', 'Daily wellness'],
      related: baseRelated,
    };
  }

  if (category === 'Suvarnaprashan') {
    return {
      heroBg: heroImages.garbh,
      subtitle: 'Ayurvedic child wellness support focused on immunity, digestion, growth, appetite, seasonal resilience, and healthy routines.',
      intro: 'Suvarnaprashan is a traditional Ayurvedic wellness practice for children. At Mangla Healthcare it is approached responsibly, with age-appropriate guidance, parent counselling, and attention to diet, sleep, hygiene, and vaccination continuity.',
      benefits: [
        { title: 'Child Wellness', desc: 'Supportive routine for appetite, digestion, immunity, and seasonal health.', icon: 'baby' },
        { title: 'Parent Guidance', desc: 'Food, sleep, screen time, hygiene, and growth questions are addressed.', icon: 'users' },
        { title: 'Safe Scheduling', desc: 'Timing, age suitability, and precautions are explained clearly.', icon: 'calendar' },
        { title: 'Holistic Growth', desc: 'Focus on daily routine, nutrition, emotional comfort, and preventive care.', icon: 'heart' },
      ],
      process: [
        { title: 'Child assessment', desc: 'Age, appetite, sleep, growth, allergies, and current illness are reviewed.' },
        { title: 'Parent counselling', desc: 'Parents receive diet, routine, and seasonal care guidance.' },
        { title: 'Administration', desc: 'Suvarnaprashan is given according to the clinic schedule and suitability.' },
        { title: 'Follow-up', desc: 'Response, digestion, and recurring concerns are reviewed.' },
      ],
      indications: ['Child immunity', 'Poor appetite', 'Seasonal care', 'Growth support', 'Digestive wellness', 'Preventive care'],
      duration: 'Clinic schedule based',
      sessions: 'Monthly guidance',
    };
  }

  return {
    heroBg: heroImages.hospital,
    subtitle: `${name} is part of Mangla Healthcare's integrated Ayurveda and modern healthcare ecosystem, built for trustworthy, practical, and patient-first care.`,
    intro: `${name} has been structured to give patients clear information, accessible consultation, careful assessment, and a coordinated treatment pathway. The focus is on dependable healthcare guidance rather than generic advice.`,
    benefits: [
      { title: 'Patient-First Care', desc: 'Every plan begins with listening, history, comfort, and clear communication.', icon: 'heart' },
      { title: 'Integrated Approach', desc: 'Ayurveda, diagnostics, nursing, and modern clinical judgement work together.', icon: 'stethoscope' },
      { title: 'Clear Guidance', desc: 'Patients receive simple instructions, precautions, and follow-up advice.', icon: 'clipboard' },
      { title: 'Trusted Team', desc: 'Experienced doctors and trained staff support the complete care journey.', icon: 'users' },
    ],
    process: [
      { title: 'Consultation', desc: 'Health concerns and goals are understood in detail.' },
      { title: 'Assessment', desc: 'Clinical and Ayurvedic evaluation guides the next step.' },
      { title: 'Plan', desc: 'Treatment, diet, therapy, and diagnostics are explained.' },
      { title: 'Follow-up', desc: 'Progress is monitored and plans are refined.' },
    ],
    indications: ['Consultation', 'Preventive care', 'Lifestyle support', 'Chronic symptoms', 'Family healthcare'],
    related: baseRelated,
  };
};

const buildContent = ({ category, title }, path) => {
  // sub-page overrides take precedence over the hub contentByPath
  const specific = subPagesContent[path] || contentByPath[path] || {};
  const defaults = categoryDefaults(category, path, title);
  const isHospitalSub = path.startsWith('/hospital/') && path !== '/hospital/cafe';
  const heroBg =
    specific.heroBg ||
    defaults.heroBg ||
    (category === 'Diagnostics' ? heroImages.diagnostics :
      category === 'Wellness' ? heroImages.wellness :
      category === 'Pathya' ? heroImages.pathya :
      category === 'Garbh Sanskar' ? heroImages.garbh :
      category === 'Pain Management' ? heroImages.pain :
      category === 'Panchkarma' ? heroImages.panchkarma :
      category === 'Spa' ? heroImages.spa :
      category === 'Yoga & Music' ? heroImages.yoga :
      heroImages.hospital);

  const hospitalSubIntro = isHospitalSub
    ? `${serviceName(title, path)} supports the hospital experience with transparent information, patient convenience, and continuity of care. The section is designed to help families understand access, process, benefits, and next steps before visiting.`
    : undefined;

  return {
    category,
    title,
    heroBg,
    stats: commonStats,
    subtitle: specific.subtitle || defaults.subtitle,
    introHead: specific.introHead || defaults.introHead || 'Overview',
    intro: specific.intro || hospitalSubIntro || defaults.intro,
    benefits: specific.benefits || defaults.benefits,
    process: specific.process || defaults.process,
    indications: specific.indications || defaults.indications,
    related: specific.related || defaults.related || baseRelated,
    relatedHead: specific.relatedHead || 'Explore connected care',
    faq: specific.faq || defaults.faq || commonFaq,
    duration: specific.duration || defaults.duration || '',
    sessions: specific.sessions || defaults.sessions || '',
    ctaTitle: 'Speak with Mangla Healthcare specialists',
    ctaSub: 'Book a consultation, share your reports, or take the free health assessment so our team can guide you to the right care pathway.',
  };
};

const PlaceholderPage = ({ category = 'Service', title = 'Healthcare Service' }) => {
  const location = useLocation();
  return <RichPage content={buildContent({ category, title }, location.pathname)} />;
};

export default PlaceholderPage;
