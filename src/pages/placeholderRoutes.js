/* ──────────────────────────────────────────────────────────────
   Manifest of routed-but-empty pages.
   Adding a new route = adding one line here.
   ────────────────────────────────────────────────────────────── */

export const placeholderRoutes = [
  // — Top-level departments —
  { path: '/hospital',         category: 'Ayurveda Hospital',  title: 'Ayurveda Hospital' },

  // — Ayurveda Hospital sub-pages (per reference) —
  { path: '/hospital/mediclaim',      category: 'Ayurveda Hospital', title: 'Mediclaim & Insurance' },
  { path: '/hospital/event',          category: 'Ayurveda Hospital', title: 'Events, Workshops & Camps' },
  { path: '/hospital/nature',         category: 'Ayurveda Hospital', title: 'Healing Nature & Gardens' },
  { path: '/hospital/health-checkup', category: 'Ayurveda Hospital', title: 'Comprehensive Health Checkup' },
  { path: '/hospital/health-cards',   category: 'Ayurveda Hospital', title: 'Health Cards & Membership' },

  // — SPA — served by dedicated pages (SpaPage / Hair / Skin / Body) in App.jsx

  // — Yoga —
  { path: '/yoga',         category: 'Yoga & Music', title: 'Yoga & Music Therapy' },
  { path: '/yoga/music',   category: 'Yoga & Music', title: 'Music & Raga Therapy' },
  { path: '/yoga/classes', category: 'Yoga & Music', title: 'Yoga Classes & Pranayama' },

  // — Panchkarma — /panchkarma uses the dedicated PanchkarmaPage
  { path: '/panchkarma/vamana',          category: 'Panchkarma', title: 'Vamana — Therapeutic Emesis' },
  { path: '/panchkarma/virechana',       category: 'Panchkarma', title: 'Virechana — Cleansing Purgation' },
  { path: '/panchkarma/basti',           category: 'Panchkarma', title: 'Basti — Medicated Enema' },
  { path: '/panchkarma/nasya',           category: 'Panchkarma', title: 'Nasya — Nasal Detoxification' },
  { path: '/panchkarma/raktamokshana',   category: 'Panchkarma', title: 'Raktamokshana — Blood Purification' },
  { path: '/panchkarma/abhyanga',        category: 'Panchkarma', title: 'Abhyanga — Oil Therapy' },

  // — Pain Management —
  // '/pain-management' is served by the dedicated PainManagementPage (see App.jsx)
  { path: '/pain-management/knee',             category: 'Pain Management', title: 'Knee Pain Treatment' },
  { path: '/pain-management/cervical',         category: 'Pain Management', title: 'Cervical Pain Therapy' },
  { path: '/pain-management/back',             category: 'Pain Management', title: 'Back Pain Care' },
  { path: '/pain-management/sciatica',         category: 'Pain Management', title: 'Sciatica Treatment' },
  { path: '/pain-management/arthritis',        category: 'Pain Management', title: 'Arthritis Care' },
  { path: '/pain-management/frozen-shoulder',  category: 'Pain Management', title: 'Frozen Shoulder Therapy' },

  // — Diagnostics —
  { path: '/diagnostics',             category: 'Diagnostics', title: 'Diagnostics & Imaging' },
  { path: '/diagnostics/blood-test',  category: 'Diagnostics', title: 'Blood Test — NABL Lab' },
  { path: '/diagnostics/x-ray',       category: 'Diagnostics', title: 'Digital X-Ray' },
  { path: '/diagnostics/ultrasound',  category: 'Diagnostics', title: 'Ultrasound Imaging' },
  { path: '/diagnostics/lab',         category: 'Diagnostics', title: 'Lab Services' },

  // — Wellness —
  { path: '/wellness',           category: 'Wellness', title: 'Wellness Programs' },
  { path: '/wellness/diet',      category: 'Wellness', title: 'Diet Consultation' },
  { path: '/wellness/exercise',  category: 'Wellness', title: 'Exercise Guidance' },
  { path: '/wellness/ayurveda',  category: 'Wellness', title: 'Ayurveda Consultation' },
  { path: '/wellness/lifestyle', category: 'Wellness', title: 'Lifestyle Management' },

  // — Hospital Services —
  { path: '/services/opd',           category: 'Hospital Service', title: 'OPD Consultation' },
  { path: '/services/nursing-care',  category: 'Hospital Service', title: 'Nursing Care' },
  { path: '/services/minor-surgery', category: 'Hospital Service', title: 'Minor Surgery' },
  { path: '/services/skin-opd',      category: 'Hospital Service', title: 'Skin OPD' },
  { path: '/services/sexual-health', category: 'Hospital Service', title: 'Sexual Health OPD' },
  { path: '/services/joint-pain',    category: 'Hospital Service', title: 'Joint Pain Treatment' },

  // — Shop / Suvarnaprashan / Pathya / Garbh Sanskar —
  { path: '/shop',                       category: 'Shop',          title: 'Shop Ayurveda Products' },
  // '/suvarnaprashan' is served by the dedicated SuvarnaprashanPage (see App.jsx)
  { path: '/pathya',                     category: 'Pathya',        title: 'Pathya — Therapeutic Diet' },
  // '/pathya/pregnancy' is served by the dedicated PregnancyPathyaPage (see App.jsx)
  { path: '/pathya/common',              category: 'Pathya',        title: 'Common Pathya' },
  { path: '/pathya/panchkarma-diet',     category: 'Pathya',        title: 'Panchkarma Diet' },
  // '/garbh-sanskar' is served by the dedicated GarbhSanskarPage (see App.jsx)

  // '/privacy', '/terms', '/disclaimer', '/sitemap' are served by LegalPage (see App.jsx)
];
