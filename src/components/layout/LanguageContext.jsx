/* eslint-disable react-refresh/only-export-components -- context module: provider + hook + context */
import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    /* ─────────── NAVBAR ─────────── */
    // Utility (top) bar
    nav_ticker_1: "Free consultation with Top Ayurveda doctors — Call",
    nav_ticker_2: "No travel, no waiting — Consult from home via video call",
    nav_ticker_3: "Up to 10% OFF on Authentic Ayurveda Products",
    nav_locateClinic: "Locate Clinic",
    nav_doctorPortal: "Doctor Portal",
    nav_lang_label_en: "English",
    nav_lang_label_hi: "हिंदी",

    // Main nav items
    nav_home: "Home",
    nav_diseases: "Diseases",
    nav_therapies: "Therapies",
    nav_services: "Services",
    nav_doctors: "Our Doctors",
    nav_shop: "Shop",
    nav_blog: "Blog",
    nav_about: "About",

    // CTA / actions
    nav_bookCta: "Book Free Consultation",
    nav_search_placeholder: "Search treatments, doctors, conditions...",
    nav_search_popular: "POPULAR:",
    nav_menu_label: "Menu",
    nav_language_label: "Language",
    nav_subUnit: "A Unit of Mangla Healthcare",

    /* ── Mega menu: DISEASES ── */
    mega_dis_title: "Treatments by Health Category",
    mega_dis_col1: "Lifestyle Conditions",
    mega_dis_col2: "Pain & Joint",
    mega_dis_col3: "Skin, Hair & Digestion",
    mega_dis_col4: "Wellness & Mind",
    dis_diabetes: "Diabetes",
    dis_thyroid_pcod: "Thyroid & PCOD",
    dis_obesity: "Obesity",
    dis_hypertension: "High Blood Pressure",
    dis_cholesterol: "High Cholesterol",
    dis_arthritis: "Arthritis",
    dis_slipped_disc: "Slipped Disc",
    dis_cervical: "Cervical Pain",
    dis_knee_pain: "Knee Pain",
    dis_sciatica: "Sciatica",
    dis_hair_fall: "Hair Fall",
    dis_psoriasis: "Psoriasis",
    dis_eczema: "Eczema",
    dis_acidity: "Acidity & GERD",
    dis_piles: "Piles & Fistula",
    dis_stress: "Stress & Anxiety",
    dis_insomnia: "Insomnia",
    dis_infertility: "Infertility",
    dis_womens_health: "Women's Health",
    dis_respiratory: "Respiratory Issues",
    mega_dis_feature_title: "Take Free Health Test",
    mega_dis_feature_desc: "Discover your Prakriti & dosha imbalance in 3 minutes",
    mega_dis_feature_cta: "Start Test",

    /* ── Mega menu: THERAPIES ── */
    mega_th_title: "Authentic Ayurvedic Therapies",
    mega_th_col1: "Detoxification",
    mega_th_col2: "Body Therapies",
    mega_th_col3: "Head & Mind",
    th_panchakarma: "Panchakarma",
    th_vamana: "Vamana",
    th_virechana: "Virechana",
    th_basti: "Basti",
    th_abhyanga: "Abhyanga (Oil Massage)",
    th_kati_basti: "Kati Basti",
    th_janu_basti: "Janu Basti",
    th_pizhichil: "Pizhichil",
    th_shirodhara: "Shirodhara",
    th_nasya: "Nasya",
    th_shiro_abhyanga: "Shiro Abhyanga",
    th_karna_purana: "Karna Purana",
    mega_th_feature_title: "Therapy Packages",
    mega_th_feature_desc: "Curated wellness retreats — 7, 14 & 21-day stays",
    mega_th_feature_cta: "View Packages",

    /* ── Mega menu: SERVICES ── */
    mega_srv_title: "Our Services",
    mega_srv_col1: "Consultation",
    mega_srv_col2: "Diagnostics",
    mega_srv_col3: "For Doctors",
    srv_clinic_consult: "In-Clinic Consultation",
    srv_video_consult: "Video Consultation",
    srv_home_visit: "Home Visit",
    srv_second_opinion: "Second Opinion",
    srv_prakriti: "Prakriti Analysis",
    srv_nadi: "Nadi Pariksha",
    srv_health_checkup: "Health Check-up Packages",
    srv_doctor_portal: "Doctor Portal",
    srv_partner: "Partner With Us",
    srv_refer: "Refer a Patient",

    // Search popular chips
    srch_diabetes: "Diabetes",
    srch_knee_pain: "Knee Pain",
    srch_pcod: "PCOD",
    srch_hair_fall: "Hair Fall",
    srch_panchakarma: "Panchakarma",

    /* ─────────── ORIGINAL KEYS (kept for backward compatibility) ─────────── */
    announcement: "📞 Book a FREE consultation with our Ayurveda experts · +91 99926 54891 · No travel, No waiting — consult from home!",
    home: "Home", about: "About Us", services: "Services",
    contact: "Contact", healthTest: "Free Health Test",
    bookConsultation: "Book Free Consultation",
    doctorPortal: "Doctor Portal",

    heroTag: "Ancient Wisdom · Modern Medicine",
    heroTitle: "Holistic Healing\nFor Body, Mind\n& Soul.",
    heroSub: "Rogjeet Ayurveda combines 15+ years of Ayurvedic expertise with modern diagnostics — for lasting, root-cause healing.",
    bookAppointment: "Book Appointment",
    freeHealthTest: "Free Health Test",
    ourDoctors: "Our Doctors",
    patientName: "Patient Name",
    mobileNumber: "Mobile Number",
    bookNow: "Book Now",
    consultTitle: "Consult India's Trusted Ayurveda Doctors",
    consultSub: "Get a call from our health coach in 5–10 mins",

    openingHours: "Opening Hours",
    openingTime: "Mon – Sat: 9am – 8pm",
    emergencyLine: "Emergency Line",
    ourLocation: "Our Location",
    locationVal: "Medical Square, Jaipur",

    categoriesTitle: "Explore Ayurvedic Treatments",
    categoriesSub: "by Health Category",
    moreCategories: "+ More Ayurvedic Treatments",

    yearsExcellence: "Years of Excellence",
    patientsTreated: "Patients Treated",
    specialistDoctors: "Specialist Doctors",
    satisfactionRate: "Patient Satisfaction",

    aboutPill: "About Us",
    aboutTitle: "Welcome to Rogjeet Ayurveda",
    aboutSub: "A Unit of Mangla Healthcare",
    aboutBody: "Rogjeet Ayurveda is a premier Ayurvedic institution rooted in the rich tradition of Nirogpeeth Ayurveda. We integrate ancient healing wisdom with modern clinical protocols — ensuring complete, personalised wellness for every patient.",
    readMore: "Read Our Full Story",
    nabh: "Quality Certified",
    qualityAssured: "Quality Assured",
    founded: "Est. 2015",
    serving: "Serving Since",

    whyTitle: "Why Choose Rogjeet Ayurveda",
    rootCause: "Root-Cause Based Treatment",
    rootCauseDesc: "We don't just treat symptoms — we identify and eliminate the root cause for lasting relief.",
    expertDoctors: "Expert Certified Doctors",
    expertDesc: "Our Ayurvedic physicians hold advanced certifications with years of clinical experience.",
    customPlan: "Personalised Treatment Plan",
    customDesc: "Every patient receives a unique protocol tailored to their body constitution (Prakriti).",
    protocol: "Protocol-Based Analysis",
    protocolDesc: "Treatments grounded in classical Ayurvedic texts, validated by modern research.",
    affordable: "Affordable & Transparent",
    affordableDesc: "Clear, honest pricing with no hidden charges. Quality care for every family.",

    stepsTitle: "Steps to Get Your Personalised Ayurvedic Treatment",
    stepsSub: "No two patients are alike. We follow our \"Ayunique\" approach — examining each patient individually to deliver completely personalised treatment.",
    step1: "Connect", step1Sub: "Call, WhatsApp, or Chat",
    step2: "Prakriti Analysis", step2Sub: "Your body constitution analysed",
    step3: "Health Coach", step3Sub: "A coach will be assigned to you",
    step4: "Fix Appointment", step4Sub: "At your convenient time",
    step5: "Consult", step5Sub: "Receive personalised Ayurvedic plan",

    therapiesTitle: "Experience Authentic Ayurvedic Therapies",
    exploreTherapies: "+ Explore All Therapies",

    testimonialsPill: "Patient Stories",
    testimonialsTitle: "Stories of Lasting Health & Happiness",
    googleRating: "Google Rating",
    googleReviews: "2,400+ Google Reviews",

    ctaPill: "Take The First Step",
    ctaTitle: "Ready to Experience Better Health?",
    ctaBody: "Take our free health assessment or book a consultation with our Ayurveda specialists today.",
    startTest: "Start Free Health Test",
    contactUs: "Contact Us Now",

    ourStory: "Our Story",
    aboutHeroTitle: "About Rogjeet\nAyurveda",
    aboutHeroSub: "A legacy of trust, compassionate care, and holistic healing — serving our community for over two decades.",

    whatWeDo: "What We Do",
    servicesTitle: "Our Ayurvedic Services",
    servicesSub: "A comprehensive range of treatments — from classical Ayurveda and Panchakarma to modern diagnostics and specialist care.",

    getInTouch: "Get In Touch",
    contactTitle: "We're Here to Help You.",
    contactSub: "Whether it's booking a consultation or a general inquiry — reach out and we'll respond promptly.",

    tagline: "Your trusted Ayurvedic wellness partner. Rooted in ancient wisdom, powered by modern healing.",
    quickLinks: "Quick Links",
    ourServices: "Our Services",
    contactInfo: "Contact Info",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },

  hi: {
    /* ─────────── NAVBAR ─────────── */
    nav_ticker_1: "शीर्ष आयुर्वेद डॉक्टरों के साथ मुफ्त परामर्श — कॉल करें",
    nav_ticker_2: "बिना यात्रा, बिना प्रतीक्षा — वीडियो कॉल से घर बैठे परामर्श",
    nav_ticker_3: "प्रामाणिक आयुर्वेद उत्पादों पर 10% तक की छूट",
    nav_locateClinic: "क्लिनिक खोजें",
    nav_doctorPortal: "डॉक्टर पोर्टल",
    nav_lang_label_en: "English",
    nav_lang_label_hi: "हिंदी",

    nav_home: "होम",
    nav_diseases: "रोग",
    nav_therapies: "चिकित्सा",
    nav_services: "सेवाएं",
    nav_doctors: "हमारे डॉक्टर",
    nav_shop: "शॉप",
    nav_blog: "ब्लॉग",
    nav_about: "हमारे बारे में",

    nav_bookCta: "मुफ़्त परामर्श बुक करें",
    nav_search_placeholder: "उपचार, डॉक्टर, रोग खोजें...",
    nav_search_popular: "लोकप्रिय:",
    nav_menu_label: "मेन्यू",
    nav_language_label: "भाषा",
    nav_subUnit: "मंगला हेल्थकेयर की एक इकाई",

    mega_dis_title: "स्वास्थ्य श्रेणी के अनुसार उपचार",
    mega_dis_col1: "जीवनशैली रोग",
    mega_dis_col2: "दर्द एवं जोड़",
    mega_dis_col3: "त्वचा, बाल एवं पाचन",
    mega_dis_col4: "मानसिक स्वास्थ्य",
    dis_diabetes: "मधुमेह",
    dis_thyroid_pcod: "थायरॉइड एवं PCOD",
    dis_obesity: "मोटापा",
    dis_hypertension: "उच्च रक्तचाप",
    dis_cholesterol: "उच्च कोलेस्ट्रॉल",
    dis_arthritis: "गठिया",
    dis_slipped_disc: "स्लिप डिस्क",
    dis_cervical: "सर्वाइकल दर्द",
    dis_knee_pain: "घुटने का दर्द",
    dis_sciatica: "साइटिका",
    dis_hair_fall: "बालों का झड़ना",
    dis_psoriasis: "सोरायसिस",
    dis_eczema: "एक्जिमा",
    dis_acidity: "अम्लता एवं GERD",
    dis_piles: "बवासीर एवं भगंदर",
    dis_stress: "तनाव एवं चिंता",
    dis_insomnia: "अनिद्रा",
    dis_infertility: "बाँझपन",
    dis_womens_health: "महिला स्वास्थ्य",
    dis_respiratory: "श्वसन समस्याएं",
    mega_dis_feature_title: "मुफ़्त स्वास्थ्य जाँच लें",
    mega_dis_feature_desc: "3 मिनट में अपनी प्रकृति एवं दोष असंतुलन जानें",
    mega_dis_feature_cta: "जाँच शुरू करें",

    mega_th_title: "प्रामाणिक आयुर्वेदिक चिकित्साएं",
    mega_th_col1: "विषहरण",
    mega_th_col2: "शारीरिक चिकित्सा",
    mega_th_col3: "सिर एवं मन",
    th_panchakarma: "पंचकर्म",
    th_vamana: "वमन",
    th_virechana: "विरेचन",
    th_basti: "बस्ती",
    th_abhyanga: "अभ्यंग (तेल मालिश)",
    th_kati_basti: "कटि बस्ती",
    th_janu_basti: "जानु बस्ती",
    th_pizhichil: "पिझिचिल",
    th_shirodhara: "शिरोधारा",
    th_nasya: "नस्य",
    th_shiro_abhyanga: "शिरो अभ्यंग",
    th_karna_purana: "कर्ण पूरण",
    mega_th_feature_title: "चिकित्सा पैकेज",
    mega_th_feature_desc: "विशेष कल्याण रिट्रीट — 7, 14 एवं 21-दिवसीय प्रवास",
    mega_th_feature_cta: "पैकेज देखें",

    mega_srv_title: "हमारी सेवाएं",
    mega_srv_col1: "परामर्श",
    mega_srv_col2: "निदान",
    mega_srv_col3: "डॉक्टरों के लिए",
    srv_clinic_consult: "क्लिनिक में परामर्श",
    srv_video_consult: "वीडियो परामर्श",
    srv_home_visit: "घर पर विज़िट",
    srv_second_opinion: "दूसरी राय",
    srv_prakriti: "प्रकृति विश्लेषण",
    srv_nadi: "नाड़ी परीक्षा",
    srv_health_checkup: "स्वास्थ्य जाँच पैकेज",
    srv_doctor_portal: "डॉक्टर पोर्टल",
    srv_partner: "हमारे साथ जुड़ें",
    srv_refer: "मरीज़ रेफर करें",

    srch_diabetes: "मधुमेह",
    srch_knee_pain: "घुटने का दर्द",
    srch_pcod: "PCOD",
    srch_hair_fall: "बालों का झड़ना",
    srch_panchakarma: "पंचकर्म",

    /* ─────────── ORIGINAL KEYS ─────────── */
    announcement: "📞 हमारे आयुर्वेद विशेषज्ञों से मुफ़्त परामर्श बुक करें · +91 99926 54891 · बिना यात्रा, बिना प्रतीक्षा — घर से परामर्श!",
    home: "होम", about: "हमारे बारे में", services: "सेवाएं",
    contact: "संपर्क", healthTest: "मुफ़्त स्वास्थ्य जाँच",
    bookConsultation: "मुफ़्त परामर्श बुक करें",
    doctorPortal: "डॉक्टर पोर्टल",

    heroTag: "प्राचीन ज्ञान · आधुनिक चिकित्सा",
    heroTitle: "समग्र उपचार\nशरीर, मन\nएवं आत्मा के लिए।",
    heroSub: "रोगजीत आयुर्वेद 15+ वर्षों की आयुर्वेदिक विशेषज्ञता को आधुनिक निदान के साथ जोड़ता है — स्थायी, जड़ से उपचार के लिए।",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    freeHealthTest: "मुफ़्त स्वास्थ्य जाँच",
    ourDoctors: "हमारे डॉक्टर",
    patientName: "मरीज़ का नाम",
    mobileNumber: "मोबाइल नंबर",
    bookNow: "अभी बुक करें",
    consultTitle: "भारत के विश्वसनीय आयुर्वेद डॉक्टरों से परामर्श",
    consultSub: "हमारे स्वास्थ्य कोच से 5–10 मिनट में कॉल पाएं",

    openingHours: "खुलने का समय",
    openingTime: "सोम – शनि: सुबह 9 – शाम 8",
    emergencyLine: "आपातकालीन लाइन",
    ourLocation: "हमारा पता",
    locationVal: "मेडिकल स्क्वायर, जयपुर",

    categoriesTitle: "आयुर्वेदिक उपचार खोजें",
    categoriesSub: "स्वास्थ्य श्रेणी के अनुसार",
    moreCategories: "+ और आयुर्वेदिक उपचार",

    yearsExcellence: "वर्षों का अनुभव",
    patientsTreated: "मरीज़ों का इलाज",
    specialistDoctors: "विशेषज्ञ डॉक्टर",
    satisfactionRate: "मरीज़ संतुष्टि दर",

    aboutPill: "हमारे बारे में",
    aboutTitle: "रोगजीत आयुर्वेद में आपका स्वागत है",
    aboutSub: "मंगला हेल्थकेयर की एक इकाई",
    aboutBody: "रोगजीत आयुर्वेद एक प्रमुख आयुर्वेदिक संस्था है जो निरोगपीठ आयुर्वेद की समृद्ध परंपरा में निहित है। हम प्राचीन उपचार ज्ञान को आधुनिक नैदानिक प्रोटोकॉल के साथ जोड़ते हैं।",
    readMore: "हमारी पूरी कहानी पढ़ें",
    nabh: "गुणवत्ता प्रमाणित",
    qualityAssured: "गुणवत्ता सुनिश्चित",
    founded: "स्थापित 2015",
    serving: "सेवा में",

    whyTitle: "रोगजीत आयुर्वेद क्यों चुनें",
    rootCause: "जड़ से उपचार",
    rootCauseDesc: "हम केवल लक्षणों का नहीं — जड़ कारण की पहचान कर स्थायी राहत देते हैं।",
    expertDoctors: "विशेषज्ञ प्रमाणित डॉक्टर",
    expertDesc: "हमारे आयुर्वेदिक चिकित्सक उन्नत प्रमाणपत्र और वर्षों के नैदानिक अनुभव के साथ हैं।",
    customPlan: "व्यक्तिगत उपचार योजना",
    customDesc: "प्रत्येक रोगी को उनकी प्रकृति के अनुसार अद्वितीय प्रोटोकॉल प्राप्त होता है।",
    protocol: "प्रोटोकॉल-आधारित विश्लेषण",
    protocolDesc: "शास्त्रीय आयुर्वेदिक ग्रंथों पर आधारित उपचार, आधुनिक अनुसंधान द्वारा मान्य।",
    affordable: "सस्ती और पारदर्शी",
    affordableDesc: "कोई छुपा शुल्क नहीं — हर परिवार के लिए गुणवत्तापूर्ण देखभाल।",

    stepsTitle: "अपना व्यक्तिगत आयुर्वेदिक उपचार पाने के चरण",
    stepsSub: "कोई दो मरीज़ एक जैसे नहीं होते। हम प्रत्येक मरीज़ को व्यक्तिगत रूप से जाँचते हैं।",
    step1: "जुड़ें", step1Sub: "कॉल, WhatsApp, या चैट करें",
    step2: "प्रकृति विश्लेषण", step2Sub: "आपकी दोष–प्रकृति का विश्लेषण",
    step3: "स्वास्थ्य कोच", step3Sub: "एक कोच आपको सौंपा जाएगा",
    step4: "अपॉइंटमेंट", step4Sub: "आपके सुविधाजनक समय पर",
    step5: "परामर्श", step5Sub: "व्यक्तिगत आयुर्वेदिक योजना पाएं",

    therapiesTitle: "प्रामाणिक आयुर्वेदिक चिकित्साओं का अनुभव करें",
    exploreTherapies: "+ सभी चिकित्साएं देखें",

    testimonialsPill: "मरीज़ों की कहानियां",
    testimonialsTitle: "स्थायी स्वास्थ्य और खुशी की कहानियां",
    googleRating: "गूगल रेटिंग",
    googleReviews: "2,400+ गूगल समीक्षाएं",

    ctaPill: "पहला कदम उठाएं",
    ctaTitle: "बेहतर स्वास्थ्य पाने के लिए तैयार हैं?",
    ctaBody: "हमारा मुफ़्त स्वास्थ्य मूल्यांकन लें या आज ही हमारे आयुर्वेद विशेषज्ञों से परामर्श बुक करें।",
    startTest: "मुफ़्त स्वास्थ्य जाँच शुरू करें",
    contactUs: "अभी संपर्क करें",

    ourStory: "हमारी कहानी",
    aboutHeroTitle: "रोगजीत आयुर्वेद\nके बारे में",
    aboutHeroSub: "विश्वास, करुणामय देखभाल और समग्र उपचार की विरासत — दो दशकों से समुदाय की सेवा में।",

    whatWeDo: "हम क्या करते हैं",
    servicesTitle: "हमारी आयुर्वेदिक सेवाएं",
    servicesSub: "शास्त्रीय आयुर्वेद और पंचकर्म से आधुनिक निदान तक — सम्पूर्ण स्वास्थ्य देखभाल।",

    getInTouch: "संपर्क करें",
    contactTitle: "हम आपकी मदद के लिए यहाँ हैं।",
    contactSub: "परामर्श बुक करना हो या कोई सामान्य जानकारी चाहिए — हम शीघ्र उत्तर देते हैं।",

    tagline: "आपका विश्वसनीय आयुर्वेदिक स्वास्थ्य साथी। प्राचीन ज्ञान, आधुनिक उपचार।",
    quickLinks: "त्वरित लिंक",
    ourServices: "हमारी सेवाएं",
    contactInfo: "संपर्क जानकारी",
    rights: "सर्वाधिकार सुरक्षित।",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('rogjeet_lang') || 'en';
  });

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rogjeet_lang', newLang);
    }
  };

  const t = (key) => {
    if (translations[lang] && translations[lang][key] !== undefined) {
      return translations[lang][key];
    }
    // Fallback to English if Hindi key missing
    if (translations.en[key] !== undefined) return translations.en[key];
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default translations;