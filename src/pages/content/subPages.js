/* ──────────────────────────────────────────────────────────────
   Per-page rich content — merged into PlaceholderPage's
   contentByPath. Add one entry at a time so each page reads
   distinct rather than relying on the category fallback.

   Schema (all fields optional, hero/category come from the route):
     subtitle, introHead, intro,
     benefits[]   { title, desc, icon }
     process[]    { title, desc }
     indications[] string
     faq[]        { q, a }
     related[]    { name, desc, path, icon }
     duration, sessions
   ────────────────────────────────────────────────────────────── */

export const subPagesContent = {

  /* ═════════════════════════════════════════════════════════════
     AYURVEDA HOSPITAL — Mediclaim & Insurance
     ═════════════════════════════════════════════════════════════ */
  '/hospital/mediclaim': {
    heroBg:
      'https://images.unsplash.com/photo-1631549917574-a9ba0aaa7ed7?auto=format&fit=crop&w=1920&q=85',

    subtitle:
      'Cashless mediclaim support, smooth pre-authorisation, and a dedicated insurance desk so that quality Ayurveda and hospital care stays affordable for every family.',

    introHead: 'About our Mediclaim desk',
    intro:
      'Mangla Healthcare works with leading health-insurance providers across India to make Ayurveda, Panchkarma and hospital care accessible without the usual paperwork stress. Our dedicated mediclaim desk handles policy verification, pre-authorisation requests, hospitalisation documents, discharge summaries, and post-claim follow-up. The goal is simple — you focus on getting well, we handle the forms, the calls, and the negotiation.',

    imageBlocks: [
      {
        eyebrow: 'Insurance partners',
        title: 'Empanelled with major Indian insurers',
        desc:
          'Our hospital is empanelled with most major health-insurance and TPA networks, including options that recognise AYUSH and Ayurveda treatment alongside allopathic admissions. We verify your policy in advance, share the exact coverage estimate, and flag any sub-limits before you commit to a treatment plan.',
        image:
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Insurance desk with documents and laptop',
        points: [
          'Cashless network across leading insurers',
          'AYUSH-coverage policies actively supported',
          'Upfront policy verification before admission',
          'Clear sub-limit and room-rent explanation',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Claim process',
        title: 'A single point of contact from admission to discharge',
        desc:
          'You are assigned one insurance coordinator from the moment your policy is verified. They prepare the pre-authorisation paperwork, follow up with your TPA, coordinate the discharge summary with the treating doctor, and stay on the call until your claim is settled. No bouncing between desks.',
        image:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
        alt: 'Patient coordinator helping with hospital paperwork',
        points: [
          'Dedicated coordinator per case',
          'Pre-authorisation usually within 24 hours',
          'Discharge summary prepared the same day',
          'Post-discharge follow-up until claim settles',
        ],
      },
    ],

    benefits: [
      { title: 'Cashless admission', desc: 'Approved cashless treatment at our hospital for most empanelled policies — no upfront deposit beyond standard reserves.', icon: 'shield' },
      { title: 'Transparent estimate', desc: 'A written cost estimate is shared before admission so there are no surprises during discharge.', icon: 'clipboard' },
      { title: 'AYUSH coverage', desc: 'For insurers that support AYUSH, we handle the specific documentation Ayurveda admissions require.', icon: 'leaf' },
      { title: 'Reimbursement support', desc: 'If your policy is out-of-network, we provide a complete bill packet to maximise the reimbursement you receive.', icon: 'award' },
      { title: 'EMI assistance', desc: 'For elective therapies and Panchkarma programs, no-cost EMI options are available with select banking partners.', icon: 'calendar' },
    ],

    process: [
      { title: 'Share your policy', desc: 'Send a photo of your policy card and ID proof to our insurance desk via WhatsApp or email.' },
      { title: 'Coverage check', desc: 'We verify your sum insured, sub-limits, network status, and AYUSH eligibility within a few hours.' },
      { title: 'Pre-authorisation', desc: 'Our team files the pre-auth with your TPA along with the doctor\'s admission note and treatment plan.' },
      { title: 'Cashless discharge', desc: 'On discharge, you sign the final bill, the insurer settles directly, and you walk out without the financial worry.' },
    ],

    indications: [
      'Hospital admission',
      'Panchkarma residential program',
      'Minor surgery',
      'Maternity care',
      'AYUSH-covered treatment',
      'Day-care procedures',
    ],

    duration: 'Pre-auth typically processed in under 24 hours',
    sessions: 'Per-admission basis · Renewals follow your policy cycle',

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85',
        alt: 'Insurance desk with documents',
        caption: 'Dedicated mediclaim coordinator desk',
      },
      {
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
        alt: 'Hospital reception area',
        caption: 'Cashless reception and admission counter',
      },
      {
        src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=85',
        alt: 'Patient meeting with hospital staff',
        caption: 'One coordinator per case — start to settlement',
      },
      {
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85',
        alt: 'Hospital admission documents being prepared',
        caption: 'Paperwork done before admission, not after',
      },
    ],
    galleryHead: 'Inside our insurance desk',
    gallerySub:
      'A look at how we keep your hospital experience stress-free — from policy verification to cashless discharge.',

    quote: {
      text:
        'My mother needed a 14-day Panchkarma admission and we were worried about cost. The insurance desk got our policy pre-authorised in a day, explained every sub-limit, and at discharge there was nothing left to pay out of pocket. The smoothest hospital experience our family has had.',
      author: 'A. Khanna',
      role: 'Family member · 14-day Panchkarma admission',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=85',
    },

    faq: [
      {
        q: 'Which insurance companies do you accept?',
        a: 'We are empanelled with most major Indian insurers including HDFC ERGO, Star Health, Care Health, Niva Bupa, ICICI Lombard, Bajaj Allianz, and the New India Assurance group, as well as their TPAs. WhatsApp us a photo of your policy card and we will confirm your specific cashless status within hours.',
      },
      {
        q: 'Does my policy cover Ayurveda and Panchkarma?',
        a: 'Many policies now include AYUSH coverage — usually with a sub-limit per claim and a requirement that treatment is taken at a government-recognised hospital. We meet those criteria. The insurance desk will read your policy wording line by line and tell you exactly what is covered and what is not.',
      },
      {
        q: 'What if my insurer is not on your network?',
        a: 'You can still take treatment with us and file a reimbursement claim afterward. We provide a complete bill packet — itemised bill, discharge summary, doctor notes, pharmacy receipts, and the AYUSH treatment certificate where required — to maximise the amount your insurer reimburses.',
      },
      {
        q: 'Do you offer EMI for elective Panchkarma programs?',
        a: 'Yes. For elective wellness programs and longer Panchkarma admissions, no-cost EMI options are available through partner banks and Bajaj Finserv. The insurance desk can walk you through the options before you commit.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     AYURVEDA HOSPITAL — Events, Workshops & Camps
     ═════════════════════════════════════════════════════════════ */
  '/hospital/event': {
    heroBg:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Free health camps, doctor-led workshops, Ayurveda awareness drives, and community wellness events — bringing prevention-first care directly to neighbourhoods and schools.',
    introHead: 'About our events programme',
    intro:
      'Beyond the hospital walls, Mangla Healthcare runs an active community calendar of free health camps, monthly OPD drives in surrounding villages, Ayurveda awareness workshops in schools and offices, and seasonal wellness events. The events programme is built on a simple principle — most health problems get easier and cheaper to solve when caught early, so prevention deserves at least as much attention as treatment.',
    imageBlocks: [
      {
        eyebrow: 'Free health camps',
        title: 'Monthly camps across Jaipur and nearby districts',
        desc:
          'Every month, a Mangla Healthcare medical team sets up free health camps in partnership with local panchayats, residents\' welfare associations, and corporate CSR partners. Camps typically include basic vitals, blood-sugar screening, BMI check, doctor consultation, and Ayurveda lifestyle advice — all at no cost to the community.',
        image:
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Doctors conducting a community health camp',
        points: [
          'Vitals, BP, blood sugar and BMI check',
          'Doctor consultation on the spot',
          'Free Ayurveda lifestyle pamphlets',
          'Referral support for those who need follow-up',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Workshops & talks',
        title: 'Ayurveda awareness in schools, colleges, and offices',
        desc:
          'Our doctors regularly conduct interactive sessions — covering posture and screen-time for IT teams, exam-stress and nutrition for students, women\'s health for college groups, and senior wellness for residential societies. Sessions are practical, free of jargon, and end with a Q&A patients actually want to ask.',
        image:
          'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85',
        alt: 'Doctor giving a workshop to a small audience',
        points: [
          'Posture and screen-time clinics for IT teams',
          'Exam-stress and nutrition for students',
          'Women\'s health sessions',
          'Senior wellness for residential societies',
        ],
      },
    ],
    benefits: [
      { title: 'Always free', desc: 'Camps and community workshops are run at no cost — patients pay nothing for the screening or the talk.', icon: 'heart' },
      { title: 'Doctor-led', desc: 'Every event is led by an actual treating doctor, not a sales rep — so the advice is practical and personalised.', icon: 'stethoscope' },
      { title: 'Partner-friendly', desc: 'We collaborate with RWAs, schools, offices, and CSR teams to bring care where it\'s most useful.', icon: 'users' },
      { title: 'Practical takeaways', desc: 'Every session ends with simple, actionable steps — diet, routine, exercise — that families can start the next day.', icon: 'clipboard' },
      { title: 'Referral pathway', desc: 'When deeper care is needed, our team helps with scheduling and provides discounted follow-up at the hospital.', icon: 'shield' },
    ],
    process: [
      { title: 'Request a camp', desc: 'RWAs, schools, offices and NGOs can request a camp by phone, WhatsApp, or the contact form. We aim to confirm within 48 hours.' },
      { title: 'Plan the agenda', desc: 'Our coordinator works with you to choose the focus — general health, women\'s health, posture, lifestyle — and the camp size.' },
      { title: 'Camp day', desc: 'Doctors, nurses, and Ayurveda specialists arrive with screening equipment, basic medicines, and printed handouts.' },
      { title: 'Follow-up', desc: 'Patients who need further consultation are scheduled at the hospital with priority slots and goodwill pricing.' },
    ],
    indications: [
      'RWA / society camp',
      'School awareness session',
      'Corporate wellness day',
      'CSR partnership',
      'Seasonal health drive',
      'Senior citizen camp',
    ],
    duration: '2–4 hours typical camp · 60–90 minute workshops',
    sessions: 'On request · Monthly community calendar published',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85', alt: 'Health camp screening setup', caption: 'Community blood-pressure and sugar screening' },
      { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=85', alt: 'Doctor giving a community workshop', caption: 'Workshop in a residential society' },
      { src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85', alt: 'School wellness session', caption: 'Wellness sessions for school students' },
      { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85', alt: 'Patients waiting at a community camp', caption: 'Free OPD drives in surrounding villages' },
    ],
    galleryHead: 'From our community calendar',
    gallerySub:
      'A look at the camps, school sessions, and corporate wellness drives our team has run across Jaipur and Rajasthan.',
    quote: {
      text:
        'They set up a free camp in our colony, screened seventy residents in a single morning, and three of us discovered borderline diabetes we didn\'t know about. The doctor took time with every person — no rush, no upsell. It was clear they were there to help.',
      author: 'Rajni K.',
      role: 'RWA Secretary · Vaishali Nagar camp',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'How do we request a free health camp for our society or office?',
        a: 'Call our community desk on +91 99926 54891 or message us via WhatsApp with your location, expected number of attendees, and preferred dates. Our coordinator gets back within 48 hours to plan logistics and confirm the team.',
      },
      {
        q: 'Is there any cost to the host organisation?',
        a: 'For RWAs, schools, NGOs and most CSR partnerships, the camp is fully free. For corporate health-day partnerships at larger scale, a nominal logistics cost may apply — discussed transparently during planning.',
      },
      {
        q: 'What screenings are included by default?',
        a: 'A standard camp covers vitals (BP, pulse, BMI), random blood sugar, basic doctor consultation, and Ayurveda lifestyle advice. We can add cholesterol, ECG, vision, or bone-density screening on request, depending on group size.',
      },
      {
        q: 'Where do you publish the upcoming public camps?',
        a: 'The community calendar is shared monthly via our Instagram, WhatsApp broadcast list, and the Contact page. To get the broadcast list, drop your number on the contact form with "Add me to camp updates" in the message.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     AYURVEDA HOSPITAL — Healing Nature & Gardens
     ═════════════════════════════════════════════════════════════ */
  '/hospital/nature': {
    heroBg:
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'A campus designed around classical Vata-Pitta-Kapha balance — herb gardens, meditation pavilions, shaded walks, and quiet recovery courts that quietly do half the healing work.',
    introHead: 'About our healing landscape',
    intro:
      'Ayurveda has always considered place — the air, the trees, the light, the sound — as part of treatment. The Mangla Healthcare campus is designed around this idea. Patient courtyards are oriented to morning sun, herb gardens supply our pharmacy, recovery pavilions look onto greenery, and the walking paths around the property are deliberately quiet. The result is a hospital that feels less like a hospital, and a campus that supports recovery between every consultation.',
    imageBlocks: [
      {
        eyebrow: 'Medicinal herb garden',
        title: 'Forty classical Ayurvedic herbs grown on campus',
        desc:
          'Our on-site herb garden cultivates over forty plants from the classical Ayurveda pharmacopoeia — Tulsi, Ashwagandha, Brahmi, Shatavari, Giloy, Kalmegh, Lemongrass and more. Many find their way into the in-house pharmacy. Patients on Panchkarma stays are encouraged to walk through it daily as part of their grounding routine.',
        image:
          'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?auto=format&fit=crop&w=1200&q=85',
        alt: 'Lush herb garden with labelled medicinal plants',
        points: [
          '40+ classical medicinal herbs',
          'Labelled with Sanskrit, Hindi and English names',
          'Open to guided patient walks',
          'Supplies fresh inputs to our pharmacy',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Meditation pavilions',
        title: 'Quiet courts for breathing, journaling and rest',
        desc:
          'Recovery from any therapy is just as much about parasympathetic rest as it is about the procedure itself. Three sheltered meditation courts spread around the campus offer cushioned floor seating, low natural light, and complete acoustic privacy. Patients use them for pranayama, journaling, or simply doing nothing — which is, ayurvedically speaking, doing a lot.',
        image:
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
        alt: 'Quiet meditation courtyard with cushions',
        points: [
          'Three private meditation courts',
          'Acoustic privacy for inner silence',
          'Open from sunrise to sunset',
          'No phones, no laptops, no exceptions',
        ],
      },
    ],
    benefits: [
      { title: 'Real shade, real plants', desc: 'No plastic palms. Mature local trees, native shrubs, and herbs from classical texts.', icon: 'leaf' },
      { title: 'Sun-oriented patient rooms', desc: 'Rooms designed so morning light reaches the bed — calibrated to Ayurvedic circadian principles.', icon: 'sun' },
      { title: 'Walking paths', desc: 'A 400m loop around the campus for slow morning walks, with benches every 60m for elderly patients.', icon: 'activity' },
      { title: 'Quiet by design', desc: 'Service corridors are routed away from patient zones. No paging system in the recovery wing.', icon: 'heart' },
      { title: 'Pharmacy garden', desc: 'Fresh inputs from the herb garden feed our in-house Ayurveda dispensary daily.', icon: 'flask' },
    ],
    process: [
      { title: 'Daily orientation', desc: 'On arrival, patients on residential stays are walked through the campus by a coordinator.' },
      { title: 'Personal routine', desc: 'A simple morning sequence — sunrise walk, herb garden visit, breathing — is prescribed.' },
      { title: 'Open access', desc: 'Meditation courts, gardens and walking loop are open during all daylight hours.' },
      { title: 'Guided sessions', desc: 'Twice a week, our wellness instructor leads a free group walk with herb identification.' },
    ],
    indications: [
      'Residential stays',
      'Panchkarma recovery',
      'Stress and burnout',
      'Sleep disturbance',
      'Post-illness recuperation',
      'Senior wellness',
    ],
    duration: 'Open sunrise to sunset · Guided walks twice weekly',
    sessions: 'Included in all residential admissions · Open to OPD patients',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=900&q=85', alt: 'Herb garden walking path', caption: 'The medicinal herb garden in spring' },
      { src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?auto=format&fit=crop&w=900&q=85', alt: 'Shaded campus walk', caption: 'The 400m recovery walking loop' },
      { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85', alt: 'Meditation court', caption: 'A private meditation court at dusk' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Fresh herbs in the pharmacy', caption: 'From garden to pharmacy, same day' },
    ],
    galleryHead: 'A campus that quietly heals',
    gallerySub:
      'The gardens, walks and pavilions our residential patients use every day — half the recovery happens here.',
    quote: {
      text:
        'I checked in for a fourteen-day Panchkarma stay and what surprised me most wasn\'t the therapy — it was how much the garden walks and the quiet courts changed how I slept. By day five I was sleeping deeper than I had in years.',
      author: 'Meena J.',
      role: 'Patient · 14-day residential stay',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Can OPD patients use the gardens and meditation courts?',
        a: 'Yes — the herb garden, meditation pavilions, and walking loop are open to all patients during daylight hours. Many follow-up OPD patients spend an hour on campus after their consultation. There is no fee.',
      },
      {
        q: 'Are guided walks free?',
        a: 'Yes. Our wellness instructor runs free group walks twice a week — typically Wednesday and Saturday mornings at 7 AM, with herb identification and a short breathing practice at the end. No registration required.',
      },
      {
        q: 'Is the campus wheelchair-accessible?',
        a: 'The main herb garden, the central meditation court, and the recovery walking loop are wheelchair-friendly with ramps and rest benches. Two outer pavilions involve a few steps and are best avoided for chair users.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     AYURVEDA HOSPITAL — Health Checkup
     ═════════════════════════════════════════════════════════════ */
  '/hospital/health-checkup': {
    heroBg:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Doctor-reviewed preventive health packages combining modern blood work, imaging, and Ayurvedic prakriti analysis — designed for adults, women, seniors, and corporate teams.',
    introHead: 'About our health checkup packages',
    intro:
      'A good health checkup is more than a lab printout. At Mangla Healthcare, every package includes a face-to-face doctor consultation, a personalised Ayurvedic prakriti assessment, and a written action plan you actually leave with. Tests are bundled to the life-stage that matters — Adult Basic, Women\'s 360, Senior Comprehensive, Pre-employment, and Corporate Annual — and reports are explained in plain language by a treating physician, not handed across a counter.',
    imageBlocks: [
      {
        eyebrow: 'What\'s included',
        title: 'Tests, imaging, doctor review, and a written plan',
        desc:
          'A typical package covers around 60 parameters — full haemogram, lipid profile, liver and kidney function, fasting and post-meal sugar, thyroid, vitamin D and B12, urine routine, ECG, and chest X-ray. Add-ons like ultrasound, HbA1c, PSA (men) or PCOD panel (women) are available. Every package ends with a 30-minute doctor consultation and a printed action plan.',
        image:
          'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=85',
        alt: 'Blood sample being processed in a lab',
        points: [
          '60+ parameters in the standard adult package',
          'In-house NABL-accredited lab',
          'Same-day reports for most tests',
          '30-minute doctor consultation included',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Ayurvedic angle',
        title: 'Modern numbers meet classical prakriti analysis',
        desc:
          'After your test reports, the doctor sits with you for a prakriti analysis — your inherent constitution and current dosha imbalance. The combination explains why two people with similar reports can need very different lifestyles. The plan you walk out with covers diet, sleep, movement and stress in real, daily-life terms.',
        image:
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Doctor reviewing reports with a patient',
        points: [
          'Prakriti + dosha assessment',
          'Diet, sleep and routine recommendations',
          'Movement guidance matched to body type',
          'Written summary you can share with family doctor',
        ],
      },
    ],
    benefits: [
      { title: 'Adult Basic', desc: 'Core preventive screening for adults aged 25-45 — 60 parameters and doctor review.', icon: 'clipboard' },
      { title: 'Women\'s 360', desc: 'Adds thyroid panel, hormonal screen, PCOD evaluation, breast and gynae assessment.', icon: 'heart' },
      { title: 'Senior Comprehensive', desc: 'Adds cardiac risk, bone density, vitamin status, eye and ear screening for 55+.', icon: 'shield' },
      { title: 'Corporate Annual', desc: 'Bulk pricing for teams — on-site collection, digital dashboards, group debrief sessions.', icon: 'users' },
      { title: 'Pre-employment', desc: 'Standardised packages aligned to common employer health requirements and Form 1A formats.', icon: 'award' },
    ],
    process: [
      { title: 'Book your slot', desc: 'Call or message us to pick a package and a morning slot. Fast eight hours before the visit.' },
      { title: 'Sample collection', desc: 'Blood draw, urine, ECG and X-ray are completed in around 45 minutes on arrival.' },
      { title: 'Doctor consultation', desc: 'Once primary reports are ready, a treating physician walks you through every value and the prakriti reading.' },
      { title: 'Action plan', desc: 'You leave with a printed plan covering diet, lifestyle, and any follow-up tests or referrals needed.' },
    ],
    indications: [
      'Annual screening',
      'New-job medical',
      'Women aged 25+',
      'Senior wellness (55+)',
      'Family history concerns',
      'Corporate health day',
    ],
    duration: '45-minute visit · Same-day primary reports',
    sessions: 'Annual · Repeat as advised by the doctor',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85', alt: 'NABL lab interior', caption: 'In-house NABL-accredited lab' },
      { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85', alt: 'Vials being labelled', caption: 'Same-day primary report turnaround' },
      { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85', alt: 'Doctor explaining reports', caption: 'Doctor-led report walk-through' },
      { src: 'https://images.unsplash.com/photo-1581093458791-9d15482442f6?auto=format&fit=crop&w=900&q=85', alt: 'Imaging suite', caption: 'On-site X-ray and ultrasound' },
    ],
    galleryHead: 'A checkup that ends with answers',
    gallerySub:
      'Lab, imaging, consultation and a personalised plan — all on the same morning.',
    quote: {
      text:
        'I have done annual checkups elsewhere for years and always left with a brown envelope of numbers I didn\'t understand. Here, the doctor sat with me for half an hour, explained which numbers mattered for someone my age, and gave me a one-page plan I actually follow.',
      author: 'Sandeep T.',
      role: 'Patient · Adult Basic + Add-on Cardiac',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'How long does the full visit take?',
        a: 'Around two hours end-to-end on the same morning. Sample collection, ECG and imaging take 45 minutes, then there\'s a short wait while primary reports are processed, and the doctor consultation lasts about 30 minutes.',
      },
      {
        q: 'Do I need to fast?',
        a: 'For most packages, an 8-hour overnight fast is required — water is fine. We schedule appointments in the early morning so this is least disruptive. Specific packages with HbA1c or post-meal sugar have additional instructions shared at booking.',
      },
      {
        q: 'Are reports digital?',
        a: 'Yes — all reports are emailed and available on WhatsApp the same evening. A printed copy is also handed to you at the consultation. For corporate packages, a secure team dashboard is available.',
      },
      {
        q: 'Can I use my mediclaim for the checkup?',
        a: 'Most preventive checkups are not covered by standard mediclaim unless your policy has a specific health-checkup benefit (some do, with a fixed annual sub-limit). Our insurance desk will verify before you book.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     AYURVEDA HOSPITAL — Health Cards & Membership
     ═════════════════════════════════════════════════════════════ */
  '/hospital/health-cards': {
    heroBg:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Annual family memberships that bundle consultations, therapies, diagnostics and pharmacy discounts — predictable healthcare for predictable monthly budgets.',
    introHead: 'About Mangla Health Cards',
    intro:
      'For families that visit us a few times a year, the Mangla Health Card is a cleaner way to budget healthcare. One annual fee covers a defined number of consultations, includes meaningful discounts on Panchkarma packages, diagnostics, and pharmacy purchases, and gives every family member their own ID. Cards come in Individual, Family of Four, and Senior tiers, and renew automatically with reminders sent a month before expiry.',
    imageBlocks: [
      {
        eyebrow: 'How it works',
        title: 'One card, four family members, all the services',
        desc:
          'The Family Card covers up to four members — parents and two children, or any combination you specify. Each member gets their own digital card with a unique ID. At reception, you simply share the ID — no paper card needed — and discounts apply automatically. Renewal is once a year, and you can upgrade tier any time.',
        image:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
        alt: 'Digital health card on a smartphone',
        points: [
          'Up to 4 family members per Family Card',
          'Digital card delivered via WhatsApp',
          'Automatic discount at billing',
          'Upgrade tier any time',
        ],
      },
      {
        reverse: true,
        eyebrow: 'What you save',
        title: 'Real savings, transparent maths',
        desc:
          'A typical Family Card pays for itself with a single Panchkarma admission. Beyond that, you save 15–25% on diagnostics, 10% on the in-house pharmacy, and the consultation copay drops to nothing for the included visits. We publish the full benefit math openly so there are no surprises.',
        image:
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
        alt: 'Patient discussing card benefits with reception',
        points: [
          '20% off Panchkarma packages',
          '15-25% off diagnostics',
          '10% off in-house pharmacy',
          'Included consultations per year',
        ],
      },
    ],
    benefits: [
      { title: 'Individual Card', desc: '12 OPD consultations, 15% diagnostics discount, 10% pharmacy. Best for working professionals.', icon: 'userCheck' },
      { title: 'Family Card', desc: 'Up to 4 members, 20 OPD consultations, 20% on Panchkarma packages, 25% diagnostics.', icon: 'users' },
      { title: 'Senior Card', desc: 'For 60+, unlimited OPDs, free quarterly checkup, priority appointments, home-collection on diagnostics.', icon: 'heart' },
      { title: 'Corporate Card', desc: 'Employer-sponsored cards for teams with annual checkup and on-site wellness sessions included.', icon: 'shield' },
      { title: 'No paperwork at billing', desc: 'Discounts apply automatically when you share your card ID — nothing to file or claim later.', icon: 'sparkles' },
    ],
    process: [
      { title: 'Choose a tier', desc: 'Compare the Individual, Family, Senior and Corporate tiers on the pricing page or with our team.' },
      { title: 'Register members', desc: 'Share name, date of birth and contact for each member. Digital cards arrive on WhatsApp within hours.' },
      { title: 'Use it', desc: 'Quote your card ID at reception, the pharmacy counter, or the diagnostics desk — discounts apply automatically.' },
      { title: 'Renew', desc: 'A renewal reminder is sent 30 days before expiry, with a small loyalty discount on continuous renewal.' },
    ],
    indications: [
      'Frequent OPD visitors',
      'Families with elderly parents',
      'Planning a Panchkarma course',
      'Annual diagnostic checkups',
      'Corporate employer benefit',
      'Long-term wellness focus',
    ],
    duration: 'Annual membership · 12-month validity',
    sessions: 'Unlimited within tier · Renew yearly',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85', alt: 'Digital health card on phone', caption: 'Digital cards on WhatsApp' },
      { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85', alt: 'Family at reception', caption: 'One ID covers the whole family' },
      { src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=85', alt: 'Senior patient with card', caption: 'Senior cards include home collection' },
      { src: 'https://images.unsplash.com/photo-1631549917574-a9ba0aaa7ed7?auto=format&fit=crop&w=900&q=85', alt: 'Card benefit summary', caption: 'Transparent benefit summary at billing' },
    ],
    galleryHead: 'Membership that pays for itself',
    gallerySub:
      'Real savings on the services your family actually uses — measured, not promised.',
    quote: {
      text:
        'We took the Family Card for ourselves and my parents. Between dad\'s annual Panchkarma course and our routine diagnostics, the card paid for itself in the first six months. The auto-discount at billing is what really makes it feel effortless.',
      author: 'Priya & Anuj',
      role: 'Family Card holders · 2 years',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Can I add my parents to a Family Card later?',
        a: 'Yes — you can add or substitute members any time during the membership year. The first four members are included in the base fee; additional members can be added at a per-person rate. The insurance desk processes the change within an hour.',
      },
      {
        q: 'Are Panchkarma admissions covered fully?',
        a: 'The card gives a 20% discount on the package price. It does not cover the full cost — that would be insurance. Used together with mediclaim, many families end up with negligible out-of-pocket spend.',
      },
      {
        q: 'What happens if I don\'t use all the included consultations?',
        a: 'Unused consultations don\'t carry over to the next year, similar to gym memberships. Cards are still worth it for most families because the diagnostic and pharmacy discounts apply on every visit, used or not.',
      },
      {
        q: 'Is the card transferable?',
        a: 'No — cards are issued in the registered members\' names. However, you can add up to four members at sign-up and substitute one for another during the year if your family situation changes.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SPA — Hub
     ═════════════════════════════════════════════════════════════ */
  '/spa': {
    heroBg:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'A premium Ayurvedic spa where classical oils, traditional rituals, and a quiet sensory environment work together to reset hair, skin and body.',
    introHead: 'About the Mangla Ayurveda Spa',
    intro:
      'The Mangla Spa is the wellness-focused counterpart to our clinical Panchkarma centre. While Panchkarma is for serious doshic correction under a doctor, the Spa is for rest, restoration, and visible care of hair, skin and body using the same classical Ayurvedic oils and rituals — applied by trained therapists in a calm, beautifully kept setting. Every visit begins with a brief wellness intake, so even a 60-minute ritual is matched to your body type and the season.',
    imageBlocks: [
      {
        eyebrow: 'A different kind of spa',
        title: 'Classical Ayurveda, not generic wellness',
        desc:
          'Most spas borrow Ayurveda vocabulary without the substance. We do the opposite — every oil is sourced from classical formulations, every therapist is trained in traditional sequence and pressure, and the room temperatures, post-treatment teas, and even music are chosen to balance the dominant dosha of the season. The result is treatments that feel both deeply relaxing and quietly therapeutic.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Warm Ayurvedic oil being prepared',
        points: [
          'Classical oils from authenticated suppliers',
          'Therapists trained in traditional sequence',
          'Season-aware ritual selection',
          'Quiet, single-occupancy rooms',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Three departments',
        title: 'Hair, Skin and Body — each with its own specialist',
        desc:
          'The Spa is organised around three focus areas: hair (scalp nourishment, shiro abhyanga, hair-fall rituals), skin (ubtan, herbal facials, glow protocols), and body (full-body abhyanga, swedana, relaxation rituals). Each department has its own lead therapist and a defined menu — so whether you come in for one ritual or a half-day package, the care is consistent.',
        image:
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        alt: 'Ayurvedic herbs being ground for spa preparation',
        points: [
          'Hair — scalp therapy and hair-fall support',
          'Skin — ubtan, facials and glow rituals',
          'Body — abhyanga and full relaxation',
          'Combination packages on request',
        ],
      },
    ],
    benefits: [
      { title: 'Hair Therapy', desc: 'Warm-oil scalp massage, herbal hair masks, and shiro abhyanga for hair-fall, dryness and stress.', icon: 'sparkles' },
      { title: 'Skin Therapy', desc: 'Ubtan, herbal facials, and rejuvenation protocols for glow, dryness and dullness.', icon: 'sun' },
      { title: 'Body Therapy', desc: 'Classical abhyanga, swedana, and relaxation rituals for fatigue, stiffness and stress.', icon: 'heart' },
      { title: 'Couple suites', desc: 'Two adjacent treatment rooms can be booked together for couples or family visits.', icon: 'users' },
      { title: 'Day packages', desc: 'Half-day and full-day packages combine treatments, herbal lunch and post-ritual rest.', icon: 'calendar' },
    ],
    process: [
      { title: 'Wellness intake', desc: 'A 10-minute consultation with our therapy lead matches the ritual to your body type, the season, and your concerns.' },
      { title: 'Preparation', desc: 'You change into spa wear, the therapist explains the sequence, and warm oils are tempered to the right temperature.' },
      { title: 'The ritual', desc: 'Classical Ayurvedic technique is followed throughout — rhythm, pressure and sequence as per traditional texts.' },
      { title: 'Rest & aftercare', desc: 'A short rest with herbal tea and dietary advice for the rest of the day.' },
    ],
    indications: [
      'Stress and burnout',
      'Hair fall and scalp issues',
      'Dry, dull or tired skin',
      'Body stiffness and fatigue',
      'Wellness gifting',
      'Couple or anniversary visit',
    ],
    duration: 'Single ritual 60–90 min · Half-day package 3 hours · Full day 5–6 hours',
    sessions: 'Single visit or 5/10-session series for cumulative benefit',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Spa room interior', caption: 'Single-occupancy treatment rooms' },
      { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', alt: 'Warm oil being poured', caption: 'Classical warm-oil rituals' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Herbal preparations', caption: 'Authenticated herbal preparations' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Relaxation lounge', caption: 'Post-ritual rest and herbal tea' },
    ],
    galleryHead: 'Inside the Mangla Spa',
    gallerySub:
      'Treatment rooms, oil pantry, relaxation lounge — a calm, well-kept environment for restorative care.',
    quote: {
      text:
        'I was sceptical that an Ayurveda spa could feel as polished as the international chains I\'ve been to. After my first shiro abhyanga here, I cancelled my next chain appointment. The therapy was real, the room was beautiful, and I slept like I haven\'t slept in months.',
      author: 'Tanya M.',
      role: 'Spa client · Hair therapy series',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'How is this different from a hotel spa?',
        a: 'Hotel spas typically use Ayurveda as a marketing layer over Swedish-style massage. We do classical Ayurveda — authenticated oils, traditional sequence, dosha-matched ritual selection, and post-treatment dietary guidance. The room feels just as beautiful, but the work underneath is the real thing.',
      },
      {
        q: 'Do I need to come for the day or can I do a single ritual?',
        a: 'Single rituals of 60-90 minutes are absolutely welcome — they\'re the most common bookings. Half-day and full-day packages exist for those who want a deeper reset or are visiting from out of town.',
      },
      {
        q: 'Can I book the spa alongside a hospital visit?',
        a: 'Yes — many patients pair a morning OPD or diagnostics visit with an afternoon spa ritual. Reception can sequence the day so you\'re not waiting around.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SPA — Hair
     ═════════════════════════════════════════════════════════════ */
  '/spa/hair': {
    heroBg:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Warm-oil scalp therapy, classical shiro abhyanga, and Ayurvedic hair masks designed for hair-fall, premature greying, dandruff, and stress-related shedding.',
    introHead: 'About Hair Therapy',
    intro:
      'Hair-fall is rarely just a hair problem — it tracks stress, sleep, digestion, hormones, and seasonal change. The Mangla hair therapy menu is built around that understanding. Treatments combine warm medicated oils, scalp pressure work, herbal masks, and shirodhara when indicated, with a brief lifestyle consultation so the work you do in the room is matched by what you do at home.',
    imageBlocks: [
      {
        eyebrow: 'Shiro Abhyanga',
        title: 'The scalp massage that everyone returns for',
        desc:
          'Shiro abhyanga is our most-booked hair treatment — a 45-minute warm-oil scalp and head massage using oils selected for your hair type and dominant dosha. The pressure is rhythmic and traditional, working from the crown outward. Patients describe leaving with a quieter mind and a noticeably calmer scalp.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Therapist performing scalp massage with warm oil',
        points: [
          '45-minute classical scalp ritual',
          'Oils matched to hair type and dosha',
          'Calms scalp tension and stress',
          'Best in a series of 5 or 10 sessions',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Hair-fall protocol',
        title: 'A four-week series with measurable results',
        desc:
          'For active hair-fall, our four-week protocol combines weekly shiro abhyanga, twice-weekly herbal hair masks (bhringraj, amla, hibiscus), and a short dietary plan. We photograph the scalp at week 1 and week 4 so the change is documentable, not just promised.',
        image:
          'https://images.unsplash.com/photo-1605698713234-ba9d2e3d92ba?auto=format&fit=crop&w=1200&q=85',
        alt: 'Herbal hair mask being prepared',
        points: [
          '4-week structured protocol',
          'Weekly shiro abhyanga + herbal masks',
          'Diet and lifestyle plan included',
          'Before/after scalp photography',
        ],
      },
    ],
    benefits: [
      { title: 'Reduced shedding', desc: 'Most patients see noticeable reduction in daily hair-fall within the 4-week protocol.', icon: 'sparkles' },
      { title: 'Calmer scalp', desc: 'Helps with itching, flaking, dandruff and irritation, especially during seasonal change.', icon: 'leaf' },
      { title: 'Stress reset', desc: 'Shiro abhyanga is as much a nervous-system reset as a scalp treatment.', icon: 'brain' },
      { title: 'Better sleep', desc: 'Many patients report deeper sleep starting the night of the first session.', icon: 'moon' },
    ],
    process: [
      { title: 'Hair consultation', desc: 'Hair pattern, fall pattern, scalp condition, sleep and digestion are reviewed.' },
      { title: 'Oil selection', desc: 'Warm medicated oil is chosen — bhringraj, neelibhringadi, or amla-based — for your case.' },
      { title: 'Ritual', desc: 'Scalp massage with rhythmic traditional pressure, ending with a short shoulder release.' },
      { title: 'Home routine', desc: 'A simple weekly home-oiling and washing routine extends the in-spa benefit.' },
    ],
    indications: [
      'Active hair fall',
      'Premature greying',
      'Dandruff and itching',
      'Stress and insomnia',
      'Post-illness shedding',
      'Pre-wedding hair care',
    ],
    duration: 'Single session 45-60 min · 4-week protocol with 4-6 visits',
    sessions: 'One-off or 5/10 series · 4-week protocol for active hair-fall',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', alt: 'Scalp oil massage', caption: 'Classical shiro abhyanga in progress' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Herbal oils on tray', caption: 'Authenticated herbal oils' },
      { src: 'https://images.unsplash.com/photo-1605698713234-ba9d2e3d92ba?auto=format&fit=crop&w=900&q=85', alt: 'Herbal mask preparation', caption: 'Hair masks prepared per session' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Spa treatment room', caption: 'Quiet single-occupancy rooms' },
    ],
    galleryHead: 'Hair therapy in practice',
    gallerySub:
      'The oils, masks and rooms our hair-therapy patients return to every month.',
    quote: {
      text:
        'After my second pregnancy my hair was falling out by the handful. Three months of the 4-week protocol and the shedding has stopped completely. I look forward to my session every two weeks now.',
      author: 'Aisha P.',
      role: 'Hair therapy series · Postpartum recovery',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'How many sessions before I see results?',
        a: 'Most patients see a calmer scalp after a single session and a measurable reduction in fall by the third week of the protocol. Genetic patterns of thinning need longer and may benefit from doctor consultation alongside the spa work.',
      },
      {
        q: 'Can I do this if I colour my hair?',
        a: 'Yes. We use oils that are safe on colour-treated hair and avoid washes immediately before or after colouring. Tell us about your colour schedule at the consultation and we will sequence around it.',
      },
      {
        q: 'Will my hair feel greasy after?',
        a: 'You leave with oil in your hair for the rest of the day for maximum benefit. We provide a shower cap and a herbal shampoo for an easy wash at home that evening. By morning, hair is soft, not greasy.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SPA — Skin
     ═════════════════════════════════════════════════════════════ */
  '/spa/skin': {
    heroBg:
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Classical Ayurvedic skin rituals — ubtan, herbal facials, and glow protocols — designed for dullness, dryness, pigmentation and the slow shifts that come with age and stress.',
    introHead: 'About Skin Therapy',
    intro:
      'Ayurvedic skin care is built on a simple premise: glow is a reflection of digestion, sleep, hydration and stress, and topical work is most powerful when it amplifies what\'s happening inside. The Mangla skin menu uses ubtan (herbal exfoliating paste), warm-oil facials, herbal masks and gentle steam, paired with a short lifestyle and diet review for cases where deeper change is needed.',
    imageBlocks: [
      {
        eyebrow: 'Ubtan ritual',
        title: 'The exfoliating paste that\'s been used for centuries',
        desc:
          'Ubtan is a fresh herbal paste — chickpea flour, turmeric, sandalwood, rose, and milk or yogurt — applied warm to the face and gently worked in. It exfoliates without abrasion, brightens tone, and leaves skin visibly softer. We mix the paste fresh for each guest, calibrated to your skin type.',
        image:
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        alt: 'Fresh ubtan paste being prepared',
        points: [
          'Fresh paste mixed per appointment',
          'Calibrated to dry, oily or combination skin',
          'Brightens without harsh exfoliation',
          'Safe through pregnancy',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Mukha abhyanga',
        title: 'The classical Ayurvedic facial massage',
        desc:
          'Our signature 75-minute facial begins with a warm-oil massage of face, neck and décolletage using marma-point technique, followed by herbal steam, ubtan, mask and a hydrating closing oil. It is genuinely relaxing — many guests fall asleep partway through — and the glow that follows lasts for days.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Facial massage with warm oil',
        points: [
          '75-minute signature ritual',
          'Marma-point facial technique',
          'Herbal steam + ubtan + mask',
          'Visible glow lasting 5-7 days',
        ],
      },
    ],
    benefits: [
      { title: 'Brighter tone', desc: 'Reduces dullness and uneven pigmentation through gentle, repeated rituals.', icon: 'sun' },
      { title: 'Calmed sensitivity', desc: 'Suitable for sensitive skin where chemical peels and harsh actives are off-limits.', icon: 'leaf' },
      { title: 'Pregnancy-safe', desc: 'Our entire skin menu uses ingredients safe through pregnancy and lactation.', icon: 'baby' },
      { title: 'Pre-event glow', desc: 'Popular as a 48-hour-before-the-wedding ritual for natural-looking radiance.', icon: 'sparkles' },
    ],
    process: [
      { title: 'Skin consultation', desc: 'Skin type, concerns, allergies, and current routine are reviewed.' },
      { title: 'Cleanse and steam', desc: 'Gentle herbal cleanse followed by short steam to open the pores.' },
      { title: 'Ritual', desc: 'Oil massage, ubtan, mask and closing oil — applied in classical sequence.' },
      { title: 'Aftercare', desc: 'A short list of what to use (and not use) at home for the next 48 hours.' },
    ],
    indications: [
      'Dull or tired skin',
      'Mild pigmentation',
      'Dryness and flakiness',
      'Sensitive or reactive skin',
      'Pregnancy skin care',
      'Pre-wedding glow ritual',
    ],
    duration: 'Express 45 min · Signature 75 min · Bridal 2 hours',
    sessions: 'Monthly maintenance or 4-week glow series',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85', alt: 'Calm spa portrait', caption: 'Gentle, results-driven skin work' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Fresh herbal preparation', caption: 'Fresh ubtan mixed per appointment' },
      { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', alt: 'Facial oil massage', caption: 'Marma-point facial massage' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Spa treatment room', caption: 'Quiet single-occupancy rooms' },
    ],
    galleryHead: 'Skin therapy in our spa',
    gallerySub:
      'A look at the rituals, fresh preparations, and rooms we use for our skin-therapy guests.',
    quote: {
      text:
        'I have sensitive skin and every chemical peel I have tried left me red for a week. My first ubtan facial here was the gentlest treatment I have had, and somehow the most effective. I now come every month and my skin has never been clearer.',
      author: 'Riya S.',
      role: 'Monthly skin therapy client',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Is this suitable for sensitive or reactive skin?',
        a: 'Yes — our entire skin menu avoids harsh chemical actives. For very reactive skin, we do a patch test of the ubtan and oils at the start of your first appointment and adjust if needed.',
      },
      {
        q: 'Can I do this during pregnancy?',
        a: 'Yes. Our skin treatments use only ingredients with traditional safety records during pregnancy and lactation. Tell us at booking and we will use the pregnancy-safe menu by default.',
      },
      {
        q: 'How soon before a wedding should I book?',
        a: 'For a bridal glow ritual, 48 hours before the main event is ideal — long enough for any micro-flushing to settle, recent enough for the glow to still be at peak. Our bridal coordinator can plan a 4-week pre-wedding series.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SPA — Body
     ═════════════════════════════════════════════════════════════ */
  '/spa/body': {
    heroBg:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Classical full-body Ayurvedic rituals — abhyanga, swedana, pizhichil, and njavarakizhi — for fatigue, stiffness, stress, and full-system reset.',
    introHead: 'About Body Therapy',
    intro:
      'Body therapy at Mangla is the heart of the spa menu. Whether you book a single 90-minute abhyanga or a half-day combination ritual, the principle is the same — warm classical oils, rhythmic traditional pressure, steam, and rest, all in a quiet single-occupancy room. The result is a body that feels noticeably lighter and a mind that finally drops out of work mode.',
    imageBlocks: [
      {
        eyebrow: 'Abhyanga',
        title: 'The classical four-handed warm-oil ritual',
        desc:
          'Our signature abhyanga uses two therapists working in synchrony — what classical texts call chaturhasta — applying warm medicated oils with rhythmic strokes across the entire body. The synchronised pressure quiets the nervous system in a way single-therapist work cannot. Most guests describe it as the most relaxed they have felt in months.',
        image:
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
        alt: 'Two therapists performing synchronised abhyanga',
        points: [
          '90-minute four-handed ritual',
          'Two therapists, synchronised rhythm',
          'Warm medicated classical oils',
          'Deep nervous-system reset',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Pizhichil & Njavarakizhi',
        title: 'Speciality rituals from Kerala\'s tradition',
        desc:
          'For deeper restorative work, we offer two classical Keralan rituals. Pizhichil — a continuous warm-oil pour over the body for 60 minutes, deeply nourishing for dry, depleted constitutions. Njavarakizhi — warm medicinal rice poultices applied across the body, calming and strengthening. Both are available as standalone treatments or as part of half-day packages.',
        image:
          'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=85',
        alt: 'Warm oil pour during pizhichil',
        points: [
          'Pizhichil — continuous warm-oil pour',
          'Njavarakizhi — rice poultice ritual',
          'Single ritual or half-day package',
          'Deeply nourishing for dry, depleted bodies',
        ],
      },
    ],
    benefits: [
      { title: 'Stress reset', desc: 'Drops cortisol noticeably — most guests sleep better the same night.', icon: 'brain' },
      { title: 'Stiffness relief', desc: 'Loosens chronic muscular tension from desk work, travel and stress.', icon: 'bone' },
      { title: 'Better circulation', desc: 'Warm oil and rhythmic pressure support blood and lymphatic flow.', icon: 'heartPulse' },
      { title: 'Sleep depth', desc: 'Many guests report the deepest sleep of recent months on treatment night.', icon: 'moon' },
    ],
    process: [
      { title: 'Wellness intake', desc: 'Body type, current stress, sleep, and any musculoskeletal issues are reviewed.' },
      { title: 'Preparation', desc: 'Treatment room warmed, oils tempered, sequence explained.' },
      { title: 'Ritual', desc: 'Classical Ayurvedic sequence applied — abhyanga, swedana or speciality ritual as booked.' },
      { title: 'Rest', desc: 'A short rest in the relaxation lounge with herbal tea and aftercare advice.' },
    ],
    indications: [
      'Chronic stress',
      'Body fatigue',
      'Travel recovery',
      'Sleep disturbance',
      'Post-illness recuperation',
      'Anniversary or celebration',
    ],
    duration: 'Abhyanga 90 min · Pizhichil 60 min · Half-day package 3-4 hours',
    sessions: 'Single visit · Weekly for active stress relief · Monthly maintenance',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85', alt: 'Warm oil massage', caption: 'Four-handed abhyanga in classical sequence' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Oil pouring during pizhichil', caption: 'Continuous warm-oil pour — pizhichil' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Spa room interior', caption: 'Single-occupancy treatment rooms' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Oil and herbs', caption: 'Classical oils, authenticated sources' },
    ],
    galleryHead: 'Body therapy in our spa',
    gallerySub:
      'The rooms, oils and rituals our body-therapy guests come back for.',
    quote: {
      text:
        'I travel for work and live with permanent neck and shoulder tension. The 90-minute four-handed abhyanga at Mangla is the only treatment I have had that lasted into the next week. It has become my pre-flight ritual.',
      author: 'Karthik R.',
      role: 'Monthly abhyanga client · Business traveller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Will I be modest during the treatment?',
        a: 'Yes. Disposable spa underwear is provided, draping is generous, and only the area being worked on is uncovered at any time. Therapists are trained in modesty protocols.',
      },
      {
        q: 'Should I eat before?',
        a: 'A light meal two hours before is ideal. Avoid heavy food and alcohol the same day — the body responds better to the oils on a settled, not overloaded, digestion.',
      },
      {
        q: 'How is this different from a Swedish massage?',
        a: 'Swedish massage is mostly muscle work. Ayurvedic abhyanga uses warm medicated oils, marma-point awareness, and rhythmic sequence — the effect is on the nervous system as much as the muscles. Most people who try both end up preferring abhyanga for deep recovery.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     YOGA — Hub
     ═════════════════════════════════════════════════════════════ */
  '/yoga': {
    heroBg:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Doctor-supervised yoga and music therapy designed for stress, posture, sleep, and gentle daily wellness — accessible to every body, no flexibility required.',
    introHead: 'About Yoga & Music Therapy',
    intro:
      'Yoga at Mangla is not performance-focused. It is therapy. Our sessions are designed around the bodies and concerns that walk through our OPD — desk-bound professionals with neck and back issues, women with PCOD seeking gentle movement, seniors looking for safe joint mobility, and patients in stress-burnout looking to breathe again. Sessions are small, doctor-informed, and slower than commercial yoga — and that is the point.',
    imageBlocks: [
      {
        eyebrow: 'How we teach',
        title: 'Slower, smaller, doctor-informed',
        desc:
          'Group sessions are capped at twelve so each student gets adjustment and attention. Pace is deliberately slower than commercial studios — every pose is broken down, no one is shamed for a modification, and difficulty options are offered for each asana. For patients with specific conditions, the doctor briefs the instructor before the first session.',
        image:
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
        alt: 'Small group yoga session',
        points: [
          'Maximum 12 per group session',
          'Doctor-informed for medical conditions',
          'Modifications offered for every pose',
          'No background or flexibility required',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Two streams',
        title: 'Classical yoga, and music as therapy',
        desc:
          'The programme runs two streams. Yoga Classes cover asana, pranayama, meditation and yoga-therapy specific to conditions. Music Therapy uses raga-based listening and simple instrumental practice for mood, sleep, and emotional regulation — built on the classical Indian framework that pairs specific ragas with specific states of mind.',
        image:
          'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=1200&q=85',
        alt: 'Indian classical instruments laid out',
        points: [
          'Yoga Classes — asana, pranayama, meditation',
          'Music Therapy — raga-based listening and practice',
          'Combination packages available',
          'Private sessions for specific conditions',
        ],
      },
    ],
    benefits: [
      { title: 'Yoga Classes', desc: 'Daily and weekend group sessions covering asana, pranayama, meditation and condition-specific yoga.', icon: 'leaf' },
      { title: 'Music Therapy', desc: 'Raga-based listening sessions and gentle instrument practice for emotional and sleep wellness.', icon: 'music' },
      { title: 'Private sessions', desc: 'One-on-one sessions for specific medical conditions referred from the OPD.', icon: 'userCheck' },
      { title: 'Senior programme', desc: 'Chair-based yoga and gentle movement designed specifically for the 60+ audience.', icon: 'heart' },
    ],
    process: [
      { title: 'Trial class', desc: 'A no-obligation trial class is available — book a slot and try a session before committing.' },
      { title: 'Goal review', desc: 'A brief chat with the instructor identifies your goal — stress, posture, sleep, condition-specific support.' },
      { title: 'Regular practice', desc: 'Group sessions on a fixed weekly schedule or private sessions on appointment.' },
      { title: 'Home routine', desc: 'A short take-home practice — 15-20 minutes — keeps the work alive between studio sessions.' },
    ],
    indications: [
      'Office stress and screen fatigue',
      'Back and neck stiffness',
      'PCOD-friendly movement',
      'Senior joint mobility',
      'Sleep and emotional regulation',
      'Beginner-friendly yoga',
    ],
    duration: 'Group sessions 60 min · Private 45 min · Music sessions 45-60 min',
    sessions: 'Drop-in or 10/20/30-class memberships',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85', alt: 'Yoga session in progress', caption: 'Small-group yoga class' },
      { src: 'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=900&q=85', alt: 'Classical instruments', caption: 'Indian classical music therapy' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Yoga studio interior', caption: 'Calm, naturally lit studio' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Meditation space', caption: 'Private meditation corner' },
    ],
    galleryHead: 'In the studio',
    gallerySub:
      'A look at our yoga studio, music room, and meditation corner — the spaces our students come back to weekly.',
    quote: {
      text:
        'I had not done yoga since college and was nervous about going to a studio at my age and weight. The trial class here changed that — the instructor was kind, the pace was right for me, and after six months I am stronger than I have been in a decade.',
      author: 'Sunita G.',
      role: 'Group yoga member · 8 months',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Do I need to be flexible to start?',
        a: 'No. The whole point of our programme is to start where you are. About half of our regular students could not touch their toes when they began. Modifications and props are part of every class.',
      },
      {
        q: 'Can I attend if I have a medical condition?',
        a: 'Yes — that is exactly who many of our students are. Tell us at the trial class and, where useful, the doctor will brief the instructor so movements are adapted around your condition.',
      },
      {
        q: 'What should I bring?',
        a: 'Just comfortable clothing and water. Mats, props, blankets and bolsters are provided. For music therapy sessions, nothing at all — just yourself.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     YOGA — Music
     ═════════════════════════════════════════════════════════════ */
  '/yoga/music': {
    heroBg:
      'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Classical Indian raga-based listening sessions and gentle instrumental practice — designed for sleep, mood regulation, anxiety, and emotional wellbeing.',
    introHead: 'About Music Therapy',
    intro:
      'Music therapy at Mangla draws on the classical Indian framework that maps specific ragas to specific times of day and specific states of mind. Sessions are part listening, part guided breathing, and — for those who want it — part gentle instrumental practice. There is no musical background required and no performance expectation. The aim is to use sound as a calming, regulating tool that travels home with you.',
    imageBlocks: [
      {
        eyebrow: 'Raga-based listening',
        title: 'Sessions matched to time of day and your state',
        desc:
          'Each session begins with a brief mood check, then a curated raga is played — often live by our visiting musician, sometimes recorded — while you sit comfortably with eyes closed and a guided breathing pace. Morning sessions tend toward energising ragas, evening sessions toward calming. The state-shift is usually noticeable within ten minutes.',
        image:
          'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=1200&q=85',
        alt: 'Classical Indian instruments arranged for a session',
        points: [
          'Live or curated raga listening',
          'Morning energising / evening calming',
          'Guided breathing throughout',
          'No musical background needed',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Gentle practice',
        title: 'Optional instrument introduction for those who want it',
        desc:
          'For those who want to take the work home, we offer a gentle introduction to simple instruments — singing bowls, harmonium drones, or basic vocal toning. It is not music school. It is using your own voice or hands to anchor your nervous system. Many patients with anxiety find the home practice particularly grounding.',
        image:
          'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1200&q=85',
        alt: 'Singing bowl in soft light',
        points: [
          'Singing bowls and harmonium drones',
          'Simple vocal toning',
          'Take-home daily practice',
          'No performance, no judgement',
        ],
      },
    ],
    benefits: [
      { title: 'Better sleep', desc: 'Evening sessions noticeably improve sleep latency and depth for most participants.', icon: 'moon' },
      { title: 'Mood regulation', desc: 'Helps with low mood, anxiety spikes, and emotional overwhelm.', icon: 'heart' },
      { title: 'Focus reset', desc: 'Morning sessions help clear mental fog and set a calmer tone for the day.', icon: 'brain' },
      { title: 'Pairs with yoga', desc: 'Music therapy is often combined with breathwork and yoga for deeper effect.', icon: 'leaf' },
    ],
    process: [
      { title: 'Brief intake', desc: 'A 5-minute conversation identifies your goal — sleep, mood, anxiety, or general wellness.' },
      { title: 'Session', desc: '45-60 minutes of guided listening, breathing, and optional gentle practice.' },
      { title: 'Home audio', desc: 'A curated 15-minute audio is shared for you to use at home, matched to your goal.' },
      { title: 'Review', desc: 'Every fourth session includes a short review — what is working, what to adjust.' },
    ],
    indications: [
      'Sleep difficulty',
      'Anxiety',
      'Low mood',
      'Stress and burnout',
      'Pre-exam or pre-event nerves',
      'Companion to therapy or counselling',
    ],
    duration: 'Session 45-60 minutes · Home audio 15 minutes',
    sessions: 'Weekly · 8-week introductory series available',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&w=900&q=85', alt: 'Classical instruments', caption: 'Live raga sessions with visiting musicians' },
      { src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=900&q=85', alt: 'Singing bowls', caption: 'Gentle instrument practice' },
      { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85', alt: 'Quiet meditation space', caption: 'Quiet listening corner' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Cushioned listening seats', caption: 'Cushioned seating for long sessions' },
    ],
    galleryHead: 'Inside our music therapy space',
    gallerySub:
      'The instruments, listening corners, and quiet rooms our music-therapy students return to weekly.',
    quote: {
      text:
        'I came to music therapy after struggling with insomnia for two years. Within four sessions I was falling asleep faster than I had in years, and the 15-minute home audio they gave me became part of my night routine. It felt almost too simple to work, and yet it did.',
      author: 'Pranav D.',
      role: 'Music therapy client · 4 months',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Do I need to be a musician?',
        a: 'No. The vast majority of our music-therapy clients have no musical training. Sessions are designed around listening and breathing. The optional instrumental practice is built so a complete beginner can do it.',
      },
      {
        q: 'Is this a replacement for therapy or medication?',
        a: 'No — it is a complement, not a replacement. For anyone in active treatment for anxiety, depression or insomnia, we recommend continuing your existing care. Music therapy can sit alongside it and is something our team can coordinate with your treating doctor.',
      },
      {
        q: 'Can the family attend together?',
        a: 'Yes — we run occasional small group sessions specifically for couples and families dealing with shared stress. Reception can advise on the next available slot.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     YOGA — Classes
     ═════════════════════════════════════════════════════════════ */
  '/yoga/classes': {
    heroBg:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Small-group yoga classes — beginner, intermediate, senior, and condition-specific — taught at a slower, more accessible pace by certified instructors.',
    introHead: 'About Yoga Classes',
    intro:
      'Our yoga classes are designed for the people who walk through our hospital — not for Instagram. That means slower pace, smaller groups (max twelve), and a curriculum built around real-life concerns: desk-related stiffness, sleep, women\'s health, senior mobility, and stress. Beginners are welcome at every class, and modifications are offered for every pose so no one feels left behind.',
    imageBlocks: [
      {
        eyebrow: 'Class types',
        title: 'Five class types, one for every body',
        desc:
          'We run five distinct class types through the week. Foundations (gentle, all-level beginners), Vinyasa (steady-paced flowing yoga for intermediate students), Restorative (held poses with props for stress recovery), Senior Yoga (chair-based and floor-based for 60+), and Therapy Yoga (condition-specific small groups for back pain, PCOD, anxiety). Drop in, mix and match, or follow one stream consistently.',
        image:
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
        alt: 'Yoga class in progress',
        points: [
          'Foundations — gentle, all-level',
          'Vinyasa — steady-paced flow',
          'Restorative — held poses with props',
          'Senior Yoga — chair-based options',
          'Therapy Yoga — condition-specific',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Instructors',
        title: 'Certified, doctor-informed, and patient with beginners',
        desc:
          'Our instructors are RYT-500 certified at minimum, and several have additional certification in yoga therapy. Before any therapy-yoga class, the instructor reviews the student\'s referral note from the OPD doctor. For group classes, instructors carry a clipboard of common modifications so adjustments happen quickly and quietly mid-pose.',
        image:
          'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1200&q=85',
        alt: 'Yoga instructor adjusting a student',
        points: [
          'RYT-500 certified instructors',
          'Yoga therapy certified for therapy classes',
          'Doctor-informed for medical referrals',
          'Quiet adjustments and modifications',
        ],
      },
    ],
    benefits: [
      { title: 'Foundations', desc: 'A gentle, accessible class for absolute beginners, returning students, and anyone with stiffness.', icon: 'leaf' },
      { title: 'Vinyasa', desc: 'A steady-paced flow class for intermediate students looking for strength and breath work.', icon: 'activity' },
      { title: 'Restorative', desc: 'Held poses with bolsters and blankets — designed for stress recovery and sleep.', icon: 'moon' },
      { title: 'Senior Yoga', desc: 'Chair-based and gentle floor practice for the 60+ student. Joint-friendly throughout.', icon: 'heart' },
      { title: 'Therapy Yoga', desc: 'Condition-specific small-group sessions for back pain, PCOD, anxiety and more.', icon: 'shield' },
    ],
    process: [
      { title: 'Pick a class type', desc: 'Browse the weekly schedule and pick a class that matches your level and goal.' },
      { title: 'Book your spot', desc: 'Reserve via WhatsApp or reception — classes are capped at twelve so spots go fast.' },
      { title: 'Show up early', desc: 'Arrive ten minutes early on your first day for a brief intake and mat orientation.' },
      { title: 'Practice', desc: 'Step into the class. Modifications are offered, no pressure to keep up.' },
    ],
    indications: [
      'Absolute beginners',
      'Returning to yoga after a break',
      'Office-related stiffness',
      'PCOD-friendly movement',
      'Senior mobility',
      'Stress and sleep recovery',
    ],
    duration: 'Classes 60 min · Therapy yoga 75 min',
    sessions: 'Drop-in · 10/20/30-class memberships · Unlimited monthly',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85', alt: 'Group yoga class', caption: 'Foundations class — slower, accessible' },
      { src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=900&q=85', alt: 'Restorative pose with bolster', caption: 'Restorative pose with props' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Naturally-lit studio', caption: 'Naturally-lit, calm studio' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85', alt: 'Meditation space', caption: 'Closing meditation space' },
    ],
    galleryHead: 'In the yoga studio',
    gallerySub:
      'A look at the classes, props, and quiet studio our regular students return to several times a week.',
    quote: {
      text:
        'I had given up on yoga because every class I tried moved too fast. The Foundations class here is different — slow, kind, and I leave feeling stronger every time. Six months in, I am attending Vinyasa too, which I never thought I would manage.',
      author: 'Madhuri V.',
      role: 'Foundations + Vinyasa member',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Which class should I start with as a beginner?',
        a: 'Foundations is the right starting point for almost everyone. The pace is gentle, modifications are offered, and the instructor will not single anyone out. Try it for two to three classes before deciding whether to move to a faster style.',
      },
      {
        q: 'I have a back issue. Can I attend a regular class?',
        a: 'Tell us at the trial class. For most common back issues, Foundations or Restorative works well with modifications. For more specific cases, our Therapy Yoga class is small and instructor-led with doctor input.',
      },
      {
        q: 'How long is the membership?',
        a: 'Membership options range from a single drop-in class, to 10/20/30-class packages valid for 3-6 months, to an unlimited monthly pass. The 10-class pack tends to be the sweet spot for new students.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     PATHYA — Pregnancy Pathya
     ═════════════════════════════════════════════════════════════ */
  '/pathya/pregnancy': {
    heroBg:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Trimester-wise Ayurvedic diet plans for pregnancy — what to eat, what to avoid, when to eat, and how to support digestion, sleep, and energy through every month.',
    introHead: 'About Pregnancy Pathya',
    intro:
      'Pregnancy pathya is the classical Ayurvedic dietary discipline tailored to each trimester. The framework is centuries old but practical: support nausea and digestion in the first trimester, build strength and tissue in the second, prepare for labour and rest in the third. Our plans translate that classical guidance into everyday meals — rice, dal, ghee, milk, fruit, seasonal vegetables — that a working family can actually cook at home.',
    imageBlocks: [
      {
        eyebrow: 'Trimester one',
        title: 'Light, warm, easily digestible',
        desc:
          'The first trimester focuses on calming nausea, supporting weak digestion, and getting the basics in — folate-rich greens, hydrating fruits, rice-based meals that sit gently on the stomach. We adapt the plan if morning sickness is severe, and add specific easy-to-cook recipes our team has refined over years.',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85',
        alt: 'Light Indian meal with rice and vegetables',
        points: [
          'Nausea-friendly meal timing',
          'Light, warm khichdi-style food',
          'Folate-rich greens and seasonal fruits',
          'Easy recipes for queasy mornings',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Trimesters two and three',
        title: 'Building strength, preparing for delivery',
        desc:
          'In the second and third trimesters, the plan shifts to building the baby and the mother\'s reserves — ghee, milk, almonds, dates, and a careful protein structure. Specific foods are recommended for joint flexibility in late pregnancy. Late third-trimester adds gentle preparatory foods that traditionally support labour.',
        image:
          'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=85',
        alt: 'Pregnant woman preparing food',
        points: [
          'Strength-building meals with ghee and milk',
          'Almonds, dates and protein structure',
          'Joint-flexibility foods for late pregnancy',
          'Labour-preparation diet in the final weeks',
        ],
      },
    ],
    benefits: [
      { title: 'Trimester-specific', desc: 'A different plan for each trimester, tailored to what your body is doing that month.', icon: 'calendar' },
      { title: 'Family-cookable', desc: 'Everything we recommend is normal Indian food — nothing exotic or expensive.', icon: 'utensils' },
      { title: 'Morning-sickness adapted', desc: 'A specific protocol for severe nausea that works even when nothing else stays down.', icon: 'apple' },
      { title: 'Post-delivery extension', desc: 'Plan includes the first 45 days post-delivery — sutika kala — for recovery and lactation.', icon: 'baby' },
      { title: 'Doctor-coordinated', desc: 'We coordinate with your gynaecologist if you are seeing one outside our hospital.', icon: 'stethoscope' },
    ],
    process: [
      { title: 'Initial consultation', desc: 'Pregnancy stage, current symptoms, food preferences, and any concerns are reviewed.' },
      { title: 'Plan handover', desc: 'You receive a printed plan with day-wise meal structure, recipes, and a do/don\'t list.' },
      { title: 'Monthly review', desc: 'Plan is updated each month or each trimester as your needs change.' },
      { title: 'Postpartum follow-up', desc: 'Plan extends through the 45-day postpartum window with breastfeeding-supportive food.' },
    ],
    indications: [
      'Confirmed pregnancy',
      'Morning sickness',
      'Anaemia in pregnancy',
      'Gestational diabetes (with doctor co-management)',
      'Multiple pregnancy',
      'Postpartum recovery',
    ],
    duration: 'Monthly consultations through pregnancy + 45 days postpartum',
    sessions: 'Once per month minimum · Weekly if symptoms need active management',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85', alt: 'Healthy plated meal', caption: 'Day-wise meal structure' },
      { src: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=85', alt: 'Pregnant woman with food', caption: 'Practical, family-cookable food' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Herbs and spices', caption: 'Classical supportive herbs and spices' },
      { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85', alt: 'Consultation room', caption: 'Trimester-wise consultations' },
    ],
    galleryHead: 'Pregnancy pathya in practice',
    gallerySub:
      'The meals, herbs and consultations that support our patients through every trimester.',
    quote: {
      text:
        'My first pregnancy was terrible with nausea and I lost weight. Going into my second, I started with the pregnancy pathya from week six and the difference was night and day. By the third trimester I was the strongest I have ever felt going into delivery.',
      author: 'Neha B.',
      role: 'Pregnancy pathya · Second pregnancy',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Does this work alongside my gynaecologist?',
        a: 'Yes, completely — and we encourage it. Pregnancy pathya is nutritional guidance, not medical care. We coordinate with your treating gynaecologist if needed and never replace obstetric monitoring.',
      },
      {
        q: 'Can I start in the third trimester?',
        a: 'Yes — even starting in the seventh or eighth month is useful, especially for the strength-building and labour-preparation phase. The earlier you start, the more cumulative the benefit.',
      },
      {
        q: 'Is it safe for gestational diabetes?',
        a: 'We adapt the plan carefully for gestational diabetes — refined sugar is restricted, fruit is timed, and meal portions are structured. We require regular sugar monitoring and coordinate with your treating doctor.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     PATHYA — Common Pathya
     ═════════════════════════════════════════════════════════════ */
  '/pathya/common': {
    heroBg:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'Everyday Ayurvedic nutrition for the whole family — simple, seasonal, family-cookable plans for digestion, energy, immunity, and steady wellness.',
    introHead: 'About Common Pathya',
    intro:
      'Common Pathya is the everyday version of Ayurvedic dietary discipline — designed for families who want to eat better without overhauling their kitchen. Plans are seasonal (different in summer, monsoon, and winter), constitution-aware (vata, pitta, kapha), and built around dishes a normal Indian household already cooks. The goal is small, sustainable changes that compound over months.',
    imageBlocks: [
      {
        eyebrow: 'Seasonal eating',
        title: 'Different season, different plate',
        desc:
          'Classical Ayurveda observes that the same food affects the body differently across seasons. We translate that into practical seasonal plans: cooling, hydrating food in summer; lighter, well-spiced food in monsoon; warming, nourishing food in winter. The change is gentle and obvious in retrospect.',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85',
        alt: 'Seasonal Indian thali',
        points: [
          'Summer plans — cooling, hydrating',
          'Monsoon plans — lighter, well-spiced',
          'Winter plans — warming, nourishing',
          'Updated quarterly with the season',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Constitution-aware',
        title: 'Plans matched to your body type',
        desc:
          'A vata-dominant person needs warm, oily, regularly-timed meals. A pitta-dominant person needs cooler, less spicy food. A kapha person needs lighter, drier, well-seasoned food. We do a quick prakriti assessment at the first consultation and adjust the plan accordingly. Family plans accommodate two or three constitutions sharing one kitchen.',
        image:
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        alt: 'Herbs and spices for personalised cooking',
        points: [
          'Quick prakriti assessment included',
          'Vata, pitta, kapha-specific guidance',
          'Family plans for shared kitchens',
          'Practical, no exotic ingredients',
        ],
      },
    ],
    benefits: [
      { title: 'Better digestion', desc: 'The single biggest improvement most families notice within two weeks of following the plan.', icon: 'apple' },
      { title: 'Stable energy', desc: 'Eating the right things at the right times stabilises afternoon and evening energy dips.', icon: 'activity' },
      { title: 'Family-friendly', desc: 'Plans are written for the whole family, not just one person trying to eat differently.', icon: 'users' },
      { title: 'Seasonal updates', desc: 'Plans refresh quarterly so the diet stays in step with the season and your body.', icon: 'calendar' },
    ],
    process: [
      { title: 'Family consultation', desc: 'A 30-minute conversation covering everyone\'s constitution, preferences, and any health concerns.' },
      { title: 'Plan delivery', desc: 'You receive a printed family plan with weekly menus, do/don\'t lists, and timing guidance.' },
      { title: 'Two-week check-in', desc: 'A short call after two weeks to adjust anything that isn\'t working for the family.' },
      { title: 'Seasonal refresh', desc: 'Plans are refreshed every three months with the changing season.' },
    ],
    indications: [
      'Family wellness',
      'Mild digestive issues',
      'Low energy through the day',
      'Seasonal immunity support',
      'Lifestyle reset',
      'Companion to other treatments',
    ],
    duration: 'Quarterly consultations · Annual subscription option',
    sessions: 'Once per quarter minimum · More frequent during specific concerns',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85', alt: 'Family meal', caption: 'Family-cookable everyday meals' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Herbs and spices', caption: 'Pantry building with everyday spices' },
      { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85', alt: 'Cooking demonstration', caption: 'Practical cooking sessions on request' },
      { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85', alt: 'Consultation', caption: 'Family pathya consultation' },
    ],
    galleryHead: 'Pathya in everyday family life',
    gallerySub:
      'The meals, pantries and small kitchen changes that make a real difference over months.',
    quote: {
      text:
        'We started the family pathya three years ago because my husband had acidity. The acidity went away in a month. What surprised us was that all four of us — including the kids — started feeling better in ways we did not expect. We will never go back.',
      author: 'Anita & Vikram',
      role: 'Family pathya · 3 years',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Is this a weight loss plan?',
        a: 'Not directly — it is a steady wellness plan. Many families do see gradual weight normalisation as a side effect, but the plan focuses on digestion, energy and seasonal balance rather than calorie restriction.',
      },
      {
        q: 'Can my whole family follow one plan?',
        a: 'Yes. Family plans are written to accommodate two or three different constitutions in one kitchen, with notes on how to adjust portions, spices, or accompaniments for each person.',
      },
      {
        q: 'Do I need to buy special ingredients?',
        a: 'No. The whole point of common pathya is that it uses everyday Indian pantry ingredients. The only thing we might recommend is upgrading the quality of your ghee and oils.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     PATHYA — Panchkarma Diet
     ═════════════════════════════════════════════════════════════ */
  '/pathya/panchkarma-diet': {
    heroBg:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'The pre- and post-Panchkarma dietary protocol — preparation phase oleation diet, treatment-day rules, and the stepped samsarjana krama recovery diet that protects therapy benefits.',
    introHead: 'About Panchkarma Diet',
    intro:
      'A Panchkarma course is only as good as the diet around it. The therapy itself is the procedure, but the days before — when the body is prepared through internal oleation and dietary discipline — and the days after — when digestion is rebuilt through samsarjana krama, a stepped recovery diet — are equally important. The Panchkarma Diet protocol covers all of it: preparation, treatment day, and the carefully sequenced recovery that protects the work.',
    imageBlocks: [
      {
        eyebrow: 'Preparation phase',
        title: 'The diet that primes the body for therapy',
        desc:
          'During the three-to-seven-day preparation phase, the diet shifts to light, warm, easily digestible food — typically rice gruel and well-cooked khichdi. The light diet, combined with internal medicated ghee (snehana), softens accumulated doshas and prepares them to be released by the therapy itself.',
        image:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bowl of khichdi with ghee',
        points: [
          'Rice gruel and warm khichdi',
          'Internal medicated ghee (snehana)',
          'No raw, cold, or heavy foods',
          '3-7 days depending on the therapy',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Samsarjana Krama',
        title: 'The stepped recovery diet that protects results',
        desc:
          'After the main therapy, digestive fire is fragile — rebuilding it gradually is what makes the benefits last. Samsarjana krama is a five-day stepped recovery diet that begins with thin rice water (peya), progresses through thicker rice gruel (vilepi), to khichdi, then to normal vegetables, and finally to regular food. Skipping or rushing this step is the most common reason Panchkarma benefits fade quickly.',
        image:
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        alt: 'Stepped recovery meals lined up',
        points: [
          'Peya — thin rice water',
          'Vilepi — thicker rice gruel',
          'Krita yusha — well-cooked dal',
          'Akrita yusha — vegetables',
          'Return to normal food on day 5',
        ],
      },
    ],
    benefits: [
      { title: 'Protects therapy results', desc: 'The recovery diet is often what separates short-term and long-term Panchkarma benefits.', icon: 'shield' },
      { title: 'Rebuilds digestive fire', desc: 'Samsarjana krama is specifically designed to rebuild agni after therapy.', icon: 'flame' },
      { title: 'Doctor-supervised', desc: 'Every patient on a Panchkarma admission follows the diet under doctor and nutritionist supervision.', icon: 'stethoscope' },
      { title: 'Home extension', desc: 'A 30-day home extension diet keeps the work going after you leave the hospital.', icon: 'utensils' },
    ],
    process: [
      { title: 'Pre-therapy briefing', desc: 'On admission, you receive a printed diet schedule with day-wise meals through preparation, therapy, and recovery.' },
      { title: 'In-hospital meals', desc: 'All meals are prepared in our therapy kitchen to the exact specification of the schedule.' },
      { title: 'Discharge plan', desc: 'You leave with a 30-day home extension diet, recipes, and a follow-up plan.' },
      { title: 'Follow-up', desc: 'A two-week post-discharge call checks how the home diet is going and adjusts if needed.' },
    ],
    indications: [
      'Panchkarma admission',
      'Vamana / Virechana protocol',
      'Basti course',
      'Post-therapy recovery',
      'Digestion rebuild',
      'Long-term therapy maintenance',
    ],
    duration: 'Through admission + 30-day home extension',
    sessions: 'Per-admission · Briefings and follow-up included',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85', alt: 'Light khichdi meal', caption: 'Preparation phase — light, warm food' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Stepped recovery meals', caption: 'Samsarjana krama — stepped recovery' },
      { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85', alt: 'Hospital kitchen', caption: 'In-hospital therapy kitchen' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Patient dining area', caption: 'Calm dining area for residential patients' },
    ],
    galleryHead: 'The diet that holds the work together',
    gallerySub:
      'A look at the meals, kitchens, and recovery protocols that make Panchkarma results last.',
    quote: {
      text:
        'My first Panchkarma elsewhere left me feeling great for three weeks, then everything came back. At Mangla, the recovery diet was just as carefully done as the therapy. Six months later I still feel the difference.',
      author: 'Rakesh M.',
      role: 'Panchkarma diet · 14-day admission',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Can I follow this diet at home without an admission?',
        a: 'Samsarjana krama as a standalone home practice has limited use without the preceding therapy. However, the preparation phase diet — light warm khichdi-style eating with ghee — can be done at home as a 7-day reset under doctor supervision.',
      },
      {
        q: 'Is the food bland?',
        a: 'The preparation and recovery diets are deliberately simple. They are not the cuisine you would order at a restaurant. They are designed to do a specific job — prepare or rebuild digestion — and that requires simplicity. After the recovery, regular food returns.',
      },
      {
        q: 'What happens if I cheat during recovery?',
        a: 'Honestly — most of the therapy benefit fades. The recovery diet is the load-bearing part of the protocol. Patients who maintain it see lasting results; patients who shortcut it usually need a repeat course in twelve months.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SHOP — Ayurveda Products
     ═════════════════════════════════════════════════════════════ */
  '/shop': {
    heroBg:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'A curated Ayurveda shop — classical herbal formulations, therapy oils, daily-use wellness products, and our in-house pharmacy preparations, available in-clinic and on WhatsApp order.',
    introHead: 'About the Mangla Ayurveda Shop',
    intro:
      'The shop is the everyday wellness counterpart to our hospital pharmacy. It carries the products we routinely recommend to OPD patients — daily-use chyawanprash, classical churnas, therapy oils, immunity blends, hair and skin preparations, and a small line of our own in-house formulations. Everything sold here is something we would give to our own family. Nothing is here just to fill shelves.',
    imageBlocks: [
      {
        eyebrow: 'Curated, not stocked',
        title: 'Every product earns its shelf space',
        desc:
          'We carry around 80 SKUs — far fewer than a typical Ayurveda store. Each one is either (a) a product we use clinically and want patients to access easily, or (b) a daily-wellness product from a brand we trust. We avoid trendy formulations and avoid the parallel market of unauthenticated herbs.',
        image:
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
        alt: 'Curated Ayurveda products on shelves',
        points: [
          '~80 carefully chosen SKUs',
          'Classical formulations and trusted brands',
          'No unauthenticated herbs',
          'Doctor-recommended product list',
        ],
      },
      {
        reverse: true,
        eyebrow: 'In-house line',
        title: 'Twelve formulations made in our own pharmacy',
        desc:
          'Twelve products in the shop are made in our own GMP pharmacy: a digestion churna, a sleep ghrita, a hair oil, a joint pain liniment, an immunity kashayam, and others. These are sold without markup at near pharmacy cost — many patients budget them into their monthly health spend.',
        image:
          'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1200&q=85',
        alt: 'In-house Ayurveda formulations',
        points: [
          '12 in-house formulations',
          'Made in our GMP pharmacy',
          'Sold near cost',
          'Used routinely by our doctors',
        ],
      },
    ],
    benefits: [
      { title: 'Daily wellness', desc: 'Chyawanprash, churnas, immunity blends — the routine products families use through the year.', icon: 'leaf' },
      { title: 'Therapy oils', desc: 'Authenticated oils for self-massage, hair care, joint pain, and post-therapy maintenance.', icon: 'droplet' },
      { title: 'Hair and skin', desc: 'Oils, masks, ubtans and herbal soaps from our own pharmacy and trusted partners.', icon: 'sparkles' },
      { title: 'Doctor-curated', desc: 'Every product is something a Mangla doctor would actually prescribe or use personally.', icon: 'stethoscope' },
      { title: 'WhatsApp ordering', desc: 'Order via WhatsApp with quick delivery in Jaipur and pan-India courier for the rest.', icon: 'sparkles' },
    ],
    process: [
      { title: 'Browse or ask', desc: 'Visit the shop, ask reception for a list, or message us on WhatsApp with what you need.' },
      { title: 'Doctor recommendation', desc: 'For unfamiliar conditions, a quick OPD consultation matches the right product to you.' },
      { title: 'Order', desc: 'In-clinic pickup, Jaipur same-day delivery, or pan-India courier.' },
      { title: 'Use and review', desc: 'Most products carry usage notes. Follow-up review is included on doctor-recommended purchases.' },
    ],
    indications: [
      'Daily wellness support',
      'Pain and joint care',
      'Hair and skin routine',
      'Immunity through seasons',
      'Sleep support',
      'Therapy follow-up products',
    ],
    duration: 'Open during clinic hours · WhatsApp orders 9 AM - 9 PM',
    sessions: 'In-store visit, WhatsApp, or pan-India delivery',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85', alt: 'Ayurveda shop interior', caption: 'Curated, calm in-store experience' },
      { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', alt: 'Classical herbal bottles', caption: 'Classical formulations from trusted makers' },
      { src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=900&q=85', alt: 'In-house oils', caption: 'In-house pharmacy line' },
      { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85', alt: 'Daily wellness products', caption: 'Everyday wellness essentials' },
    ],
    galleryHead: 'Inside the shop',
    gallerySub:
      'A curated, doctor-recommended Ayurveda store — eighty products that earn their shelf space.',
    quote: {
      text:
        'I have stopped buying Ayurveda products online entirely. Everything we use as a family — chyawanprash, hair oils, dad\'s joint liniment, my mother\'s sleep ghrita — comes from the Mangla shop now. The quality is obviously different.',
      author: 'Deepa S.',
      role: 'Regular shop customer · 2 years',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Do I need a prescription to buy products?',
        a: 'For most daily-wellness products, no. For classical formulations used to treat specific conditions, we encourage a brief consultation with our doctor or pharmacist so the product matches the case. Many products are safe but not appropriate for every constitution.',
      },
      {
        q: 'Can you ship outside Jaipur?',
        a: 'Yes — pan-India courier for orders over ₹500. International orders are not currently supported because of customs and herbal-product restrictions.',
      },
      {
        q: 'Are the products authentic?',
        a: 'Yes. We carry only classical formulations from authenticated makers and our own GMP pharmacy. We do not stock the parallel market of low-cost lookalike products that flood online marketplaces.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     SUVARNAPRASHAN — Children's Immunity Programme
     ═════════════════════════════════════════════════════════════ */
  '/suvarnaprashan': {
    heroBg:
      'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1920&q=85',
    subtitle:
      'A classical Ayurvedic immunity and developmental wellness practice for children — administered on Pushya nakshatra each month under doctor supervision, paired with parent counselling.',
    introHead: 'About Suvarnaprashan',
    intro:
      'Suvarnaprashan is a traditional Ayurvedic preventive practice for children, classically administered on the Pushya nakshatra each month. It combines a small amount of suvarna bhasma (gold preparation), ghrita, honey, and selected herbs — given in age-appropriate doses to support immunity, digestion, appetite, and developmental milestones. At Mangla Healthcare, the practice is offered responsibly: every dose is doctor-supervised, vaccination continuity is encouraged, and parents receive structured guidance on diet, sleep, hygiene, and seasonal care.',
    imageBlocks: [
      {
        eyebrow: 'How it works',
        title: 'Monthly drops, classically timed',
        desc:
          'Each month, on the Pushya nakshatra date, parents bring their child to a scheduled morning slot. The doctor reviews the child briefly, the dose is given in liquid form, and the parents receive a printed sheet for that month covering diet, sleep, seasonal care, and any specific notes. The same time slot is reserved for the family across all months of the year-long programme.',
        image:
          'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=85',
        alt: 'Doctor with child during Suvarnaprashan',
        points: [
          'Monthly on Pushya nakshatra',
          'Age-appropriate doctor-supervised dose',
          'Morning slots reserved for the year',
          'Printed parent guidance each month',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Parent counselling',
        title: 'The wider wellness wrapper that matters',
        desc:
          'The dose itself is a small part of the value. Most of what builds child immunity and steady development is what happens between doses — diet, sleep, screen time, hygiene, seasonal care, and emotional environment. Each visit ends with a brief parent conversation covering current concerns and the next month\'s focus. Over a year, families develop a robust everyday wellness rhythm.',
        image:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
        alt: 'Parent counselling session',
        points: [
          'Monthly parent conversation',
          'Food, sleep, screen-time guidance',
          'Hygiene and seasonal care',
          'Cumulative wellness rhythm',
        ],
      },
    ],
    benefits: [
      { title: 'Supportive immunity', desc: 'Combined with vaccination continuity and good hygiene, parents report fewer minor illnesses.', icon: 'shield' },
      { title: 'Appetite and digestion', desc: 'A common parent observation — picky eating and digestive issues ease over months.', icon: 'apple' },
      { title: 'Parent confidence', desc: 'Monthly parent counselling builds a steady, supportive routine at home.', icon: 'heart' },
      { title: 'Developmental support', desc: 'Used as a wellness adjunct, not a substitute for paediatric care.', icon: 'baby' },
      { title: 'Vaccination continuity', desc: 'Suvarnaprashan does not replace vaccines and we encourage every parent to follow the immunisation schedule.', icon: 'stethoscope' },
    ],
    process: [
      { title: 'Initial registration', desc: 'A 20-minute intake with the doctor reviews the child\'s history, growth, allergies, and current health.' },
      { title: 'Monthly visit', desc: 'On the Pushya nakshatra date, the dose is administered and parents receive the month\'s guidance sheet.' },
      { title: 'Annual review', desc: 'After 12 months, a longer review assesses growth, observations, and whether to continue the next year.' },
      { title: 'Year-round access', desc: 'Parents can WhatsApp the team between visits for quick guidance on minor concerns.' },
    ],
    indications: [
      'Children aged 6 months to 16 years',
      'Frequent minor illnesses',
      'Picky eating and digestion concerns',
      'Family wellness focus',
      'Seasonal allergy support',
      'Adjunct to standard paediatric care',
    ],
    duration: 'Monthly 15-minute visits · 12-month programme',
    sessions: 'Once per month on Pushya nakshatra',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=900&q=85', alt: 'Child being given drops', caption: 'Gentle, doctor-supervised administration' },
      { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85', alt: 'Child consultation room', caption: 'Child-friendly consultation room' },
      { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85', alt: 'Parent counselling', caption: 'Monthly parent counselling' },
      { src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85', alt: 'Group of children', caption: 'Many siblings enrolled together' },
    ],
    galleryHead: 'A year-long wellness rhythm',
    gallerySub:
      'The monthly visits, parent guidance, and quiet rooms that build steady child wellness over twelve months.',
    quote: {
      text:
        'Both my kids have been on Suvarnaprashan for two years. The difference is not dramatic on any one day — it is the absence of dramatic illness over months. Their appetite is better, they fall sick less, and the monthly visit has become our family\'s wellness anchor.',
      author: 'Komal P.',
      role: 'Parent · 2 children, 2 years',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
    },
    faq: [
      {
        q: 'Does Suvarnaprashan replace vaccines?',
        a: 'No — and please do not stop vaccinations. Suvarnaprashan is a complementary wellness practice. We actively encourage every family to follow the standard immunisation schedule. Both have a role.',
      },
      {
        q: 'What age can a child start?',
        a: 'Classically, from 6 months of age. The dose and recipe are adapted to age — infants receive a very small drop, while older children receive larger doses. We also have a programme for children up to age 16.',
      },
      {
        q: 'Are there side effects?',
        a: 'Given as we administer it — small, age-appropriate, doctor-supervised — side effects are very rare. We screen for allergies at the initial visit and watch for any sensitivities in the first three months.',
      },
      {
        q: 'Do I have to commit to a full year?',
        a: 'No, you can stop any time. However, the practice is classically designed as a monthly rhythm over a year, and most of the cumulative benefit comes from consistency. We do not lock you in financially — payment is per-visit.',
      },
    ],
  },

  /* ═════════════════════════════════════════════════════════════
     PANCHKARMA — Vamana
     ═════════════════════════════════════════════════════════════ */
  '/panchkarma/vamana': {
    heroBg:
      'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1920&q=85',

    subtitle:
      'Vamana is a doctor-supervised Ayurvedic emesis therapy used selectively for Kapha-dominant disorders — chronic cough, respiratory congestion, stubborn skin conditions, and metabolic imbalance.',

    introHead: 'About Vamana',
    intro:
      'Vamana is one of the five classical Panchkarma procedures described in Ayurveda. It is a controlled therapeutic emesis carried out by trained doctors and therapists to clear excess Kapha from the upper gastrointestinal tract. At Mangla Healthcare, Vamana is undertaken only after a thorough screening — including age, strength, digestive capacity, current medication, and pulse and prakriti assessment — and is preceded by several days of internal oleation, dietary preparation, and external sweating to mobilise the doshas safely. The aim is not a quick cleanse but a measured, classical protocol with long-lasting metabolic and respiratory benefit.',

    imageBlocks: [
      {
        eyebrow: 'Preparation phase',
        title: 'Days of careful prep before any therapy day',
        desc:
          'Vamana is never performed cold. For three to seven days you take graduated doses of medicated ghee (snehana) alongside a light, warm diet. Internal oleation softens accumulated Kapha and prepares the channels for safe elimination. Daily steam (swedana) and a calm routine round out the preparation.',
        image:
          'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1200&q=85',
        alt: 'Doctor preparing herbal ghee for Panchkarma preparation phase',
        points: [
          'Personalised dose of medicated ghee, increased daily',
          'Warm khichdi-style diet, no cold or fried food',
          'Abhyanga (oil massage) and swedana (steam) every day',
          'Sleep, hydration and bowel rhythm tracked by the team',
        ],
      },
      {
        reverse: true,
        eyebrow: 'Procedure day',
        title: 'A monitored, classical morning ritual',
        desc:
          'On the Vamana day itself, you arrive after a herbal porridge breakfast that triggers the elimination response. The procedure is carried out in a private treatment room with continuous vitals monitoring by the doctor and an assisting therapist. Most patients feel noticeably lighter within a few hours.',
        image:
          'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=85',
        alt: 'Calm Ayurveda treatment room with therapist supervising patient',
        points: [
          'Doctor-led, never self-administered',
          'Continuous monitoring of pulse and tolerance',
          'Private, hygienic treatment room',
          'Recovery rest area immediately after',
        ],
      },
    ],

    benefits: [
      { title: 'Respiratory clearance', desc: 'Used selectively for chronic cough, bronchial congestion, and recurring upper-airway complaints linked to excess Kapha.', icon: 'waves' },
      { title: 'Skin disease support', desc: 'Indicated in stubborn skin conditions where toxins and dampness are part of the underlying imbalance.', icon: 'sun' },
      { title: 'Metabolic reset', desc: 'Helps the digestive fire (agni) reset after long periods of heavy diet, sluggishness, or unresolved symptoms.', icon: 'flame' },
      { title: 'Doctor-led safety', desc: 'Patient stability, vitals, and tolerance are monitored throughout the procedure — never a self-administered cleanse.', icon: 'shield' },
      { title: 'Lasting effect', desc: 'When followed by classical rasayana and lifestyle guidance, benefits hold for months rather than days.', icon: 'sparkles' },
    ],

    process: [
      { title: 'Suitability assessment', desc: 'A 30–45 minute consultation reviews symptoms, history, current medicines, prakriti, and contraindications.' },
      { title: 'Preparation (3–7 days)', desc: 'Snehana (internal medicated ghee), light diet, and swedana (steam) prime the body to release toxins safely.' },
      { title: 'Vamana day', desc: 'Procedure is performed in the morning in a clean treatment room with continuous monitoring by the doctor and therapist.' },
      { title: 'Recovery (samsarjana krama)', desc: 'A stepped post-therapy diet rebuilds digestion gradually, followed by rasayana medicines and lifestyle review.' },
    ],

    indications: [
      'Chronic respiratory complaints',
      'Recurring cold and cough',
      'Stubborn skin conditions',
      'Obesity with sluggish digestion',
      'Hyperacidity with Kapha pattern',
      'Doctor-recommended detox',
    ],

    duration: '2–3 hours (procedure day) · 7–10 day total protocol',
    sessions: 'Single supervised admission, repeated only if clinically indicated',

    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
        alt: 'Herbal medicines lined up in the Ayurvedic pharmacy',
        caption: 'Classical herbal formulations from our in-house pharmacy',
      },
      {
        src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85',
        alt: 'Steam therapy bed in a calm treatment room',
        caption: 'Swedana (steam) preparation suite',
      },
      {
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
        alt: 'Warm oil pouring during a Panchkarma session',
        caption: 'Snehana — internal and external oleation',
      },
      {
        src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85',
        alt: 'Recovery and consultation room interior',
        caption: 'Recovery and consultation rooms',
      },
    ],
    galleryHead: 'Inside our Panchkarma centre',
    gallerySub:
      'A glimpse of the preparation suite, treatment rooms, herbal pharmacy and recovery spaces our patients experience during their Vamana stay.',

    quote: {
      text:
        'I came in after two years of chronic cough that no inhaler could fix for long. The team explained every step, prepared me carefully, and the procedure itself felt safe. Three months later, I still breathe more easily than I have in years.',
      author: 'R. Sharma',
      role: 'Chronic respiratory case · 9-day Vamana stay',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85',
    },

    faq: [
      {
        q: 'Is Vamana safe and is it the same as forced vomiting?',
        a: 'No. Vamana is a clinically supervised classical procedure carried out after days of internal oleation and stabilisation. It is not the same as forced or improvised vomiting — patient eligibility, timing, monitoring, and aftercare are all part of the protocol. Patients with weak digestion, pregnancy, certain heart conditions, or specific medications are excluded after the consultation.',
      },
      {
        q: 'How long do I need to stay at the centre?',
        a: 'Most patients spend 7–10 days under our care — 3–5 days of preparation, the Vamana day itself, and 2–4 days of structured post-therapy diet and rest. Day-care options are possible only in selected cases at the doctor\'s discretion.',
      },
      {
        q: 'What should I expect during the recovery diet?',
        a: 'You\'ll follow samsarjana krama — a stepped diet that begins with light rice water and progresses gradually to normal food over several days. This allows the digestive fire to rebuild without overwhelming the system. Our team provides daily meal guidance.',
      },
      {
        q: 'Can I take my regular medicines during the protocol?',
        a: 'Most chronic medicines (for blood pressure, diabetes, thyroid) are continued with timing adjustments. Our doctor reviews each medicine during the initial consultation and gives a clear instruction sheet for the protocol days.',
      },
    ],
  },

};

export default subPagesContent;
