/* ──────────────────────────────────────────────────────────────
   Doctor roster — single source of truth for /doctors and
   /doctors/:slug pages, footer mentions, and About Us cards.
   ────────────────────────────────────────────────────────────── */

export const doctors = [
  {
    slug: 'dr-devendra-kumar',
    name: 'Dr. Devendra Kumar',
    title: 'Founder · Chief Physician',
    qualifications: 'MBBS, MD (General Medicine)',
    registration: 'MCI Reg. No. 12345-RJ',
    experience: '20+ Years',
    languages: ['Hindi', 'English', 'Marwari'],
    specialties: [
      'General Medicine',
      'Lifestyle Disorders',
      'Diabetes & Thyroid',
      'Integrated Ayurveda Care',
    ],
    bio: `Dr. Devendra Kumar is the founding physician of Mangla Healthcare. After completing his
MD in General Medicine, he spent over two decades building an integrated practice that combines
classical Ayurveda assessment with modern clinical investigation. His patient-first approach has
earned him a loyal following across Jaipur and central Rajasthan.`,
    education: [
      { degree: 'MD (General Medicine)', institute: 'SMS Medical College, Jaipur', year: '2003' },
      { degree: 'MBBS',                  institute: 'AIIMS Delhi',                    year: '1999' },
      { degree: 'Diploma in Ayurveda',   institute: 'Rajasthan Ayurveda University',  year: '2005' },
    ],
    treats: [
      'Type 2 Diabetes', 'Thyroid disorders', 'Hypertension', 'Obesity',
      'Acidity & GERD', 'Chronic fatigue', 'Lifestyle counselling', 'Preventive checkups',
    ],
    availability: [
      { day: 'Monday – Friday', slot: '10:00 AM – 1:00 PM, 5:00 PM – 8:00 PM' },
      { day: 'Saturday',        slot: '10:00 AM – 2:00 PM' },
    ],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85',
  },
  {
    slug: 'dr-naresh-kumar',
    name: 'Dr. Naresh Kumar',
    title: 'Consultant Surgeon · Diagnostics Lead',
    qualifications: 'MBBS, MS (General Surgery)',
    registration: 'MCI Reg. No. 67890-RJ',
    experience: '15+ Years',
    languages: ['Hindi', 'English'],
    specialties: [
      'Minor Surgery',
      'Diagnostic Imaging',
      'Wound Care',
      'Post-operative Follow-up',
    ],
    bio: `Dr. Naresh Kumar heads the diagnostics and minor surgery wing at Mangla Healthcare.
His meticulous approach to wound care, sterile procedure, and report interpretation has built
strong trust among referring physicians. He works closely with the Ayurveda team to coordinate
post-surgical recovery plans.`,
    education: [
      { degree: 'MS (General Surgery)', institute: 'SMS Medical College, Jaipur', year: '2008' },
      { degree: 'MBBS',                 institute: 'MAMC Delhi',                  year: '2003' },
    ],
    treats: [
      'Minor procedures', 'Wound dressing', 'Abscess care', 'Ultrasound interpretation',
      'X-ray review', 'Pre-operative assessment', 'Post-op follow-up',
    ],
    availability: [
      { day: 'Monday, Wednesday, Friday', slot: '11:00 AM – 2:00 PM, 6:00 PM – 8:00 PM' },
      { day: 'Saturday',                  slot: '11:00 AM – 2:00 PM' },
    ],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=85',
  },
  {
    slug: 'dr-anjali-mehta',
    name: 'Dr. Anjali Mehta',
    title: 'Ayurveda Specialist · Garbh Sanskar Lead',
    qualifications: 'BAMS, MD (Ayurveda)',
    registration: 'CCIM Reg. No. AY-44321-RJ',
    experience: '12+ Years',
    languages: ['Hindi', 'English', 'Sanskrit'],
    specialties: [
      'Panchkarma Therapy',
      'Garbh Sanskar',
      'Women\'s Health',
      'Skin & Hair OPD',
    ],
    bio: `Dr. Anjali Mehta is a Panchkarma specialist with a deep interest in pregnancy care and
women's wellness. She leads the Garbh Sanskar program at Mangla Healthcare and runs the dedicated
skin and hair OPD. Her warmth and clarity have made her a sought-after voice in the Ayurveda
community across Jaipur.`,
    education: [
      { degree: 'MD (Ayurveda — Kayachikitsa)', institute: 'NIA Jaipur',                        year: '2012' },
      { degree: 'BAMS',                          institute: 'Rajasthan Ayurveda University',    year: '2007' },
    ],
    treats: [
      'Panchkarma therapies', 'Garbh Sanskar', 'PCOD/PCOS', 'Infertility support',
      'Hair fall', 'Eczema & psoriasis', 'Menstrual disorders', 'Pregnancy nutrition',
    ],
    availability: [
      { day: 'Tuesday, Thursday, Saturday', slot: '10:00 AM – 1:00 PM, 5:00 PM – 8:00 PM' },
    ],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85',
  },
];

export const findDoctor = (slug) => doctors.find(d => d.slug === slug);
