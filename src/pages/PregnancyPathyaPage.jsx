import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Leaf, ChevronRight, Check, X, Quote } from 'lucide-react';
import SEO from '../components/SEO';

/* ──────────────────────────────────────────────────────────────
   PREGNANCY PATHYA (गर्भावस्था पथ्य) — Mangla Ayurveda
   Content: मासानुसार पथ्य · सामान्य पथ्य · गर्भसंस्कार (Hindi).
   Palette: #1E5B4F / #C9A86A / #FAF8F3 / #DDE8E3.
   ────────────────────────────────────────────────────────────── */

const WHATSAPP = '8222001891';

/* ── month-wise pathya table ── */
const MONTHS = [
  ['प्रथम मास',  'शीतल, मधुर एवं ताजा दूध। बार-बार थोड़ी मात्रा में दूध पिलाएं।'],
  ['द्वितीय मास', 'दूध में मधुर औषधियों (शतावरी, विदारी आदि) का सिद्ध क्षीर।'],
  ['तृतीय मास',  'दूध में घृत एवं मधु (समान मात्रा में नहीं) मिलाकर सेवन।'],
  ['चतुर्थ मास', 'ताजा मक्खन (नवनीत) एवं दूध।'],
  ['पंचम मास',   'घृतयुक्त दूध, खीर एवं पौष्टिक मधुर आहार।'],
  ['षष्ठ मास',   'शतावरी, गोक्षुर आदि से सिद्ध घृत एवं दूध।'],
  ['सप्तम मास',  'घृतयुक्त भोजन, दूध, खीर तथा स्निग्ध आहार।'],
  ['अष्टम मास',  'क्षीर-यवागू (दूध वाली पतली खिचड़ी), घृतयुक्त यवागू।'],
  ['नवम मास',    'घृतयुक्त यवागू, सुपाच्य भोजन, चिकित्सकीय सलाह से योनि पिचु एवं स्नेहन।'],
];

const ALL_MONTH_PATHYA = [
  'गाय का दूध', 'घी', 'मूंग दाल खिचड़ी', 'गेहूं, पुराना चावल',
  'अनार, सेब, नारियल पानी', 'भीगे बादाम, किशमिश', 'लौकी, तोरी, परवल, कद्दू',
];

const MASIK_APATHYA = [
  'अधिक तीखा, खट्टा, तला हुआ भोजन', 'शराब, तंबाकू, धूम्रपान',
  'भारी वजन उठाना', 'उपवास', 'अत्यधिक यात्रा एवं तनाव',
];

const MODERN = [
  'फोलिक एसिड: प्रथम त्रैमासिक में आवश्यक',
  'आयरन: द्वितीय त्रैमासिक से',
  'कैल्शियम: चिकित्सकीय सलाह अनुसार',
  'नियमित ANC जांच, BP, Hb, Sugar एवं Ultrasound',
];

/* ── general garbhini pathya ── */
const PATHYA_AHAR = [
  { group: 'दूध एवं दुग्ध पदार्थ', items: ['गाय का दूध', 'घी (उचित मात्रा में)', 'मक्खन', 'ताजा छाछ'] },
  { group: 'अनाज',                items: ['गेहूं', 'पुराना चावल', 'जौ', 'दलिया', 'मूंग दाल की खिचड़ी'] },
  { group: 'दालें',               items: ['मूंग दाल', 'मसूर दाल (हल्की मात्रा में)'] },
  { group: 'फल',                  items: ['अनार', 'सेब', 'पका केला', 'नारियल पानी', 'मौसमी, संतरा', 'पपीता (पका हुआ, सीमित मात्रा में)'] },
  { group: 'सब्जियां',            items: ['लौकी', 'तोरी', 'परवल', 'कद्दू', 'शकरकंद', 'पालक एवं हरी पत्तेदार सब्जियां'] },
  { group: 'सूखे मेवे',           items: ['भीगे बादाम', 'किशमिश', 'खजूर (यदि मधुमेह न हो)'] },
];

const PATHYA_VIHAR = [
  'पर्याप्त आराम एवं 7–8 घंटे नींद',
  'प्रतिदिन हल्की सैर',
  'प्रसन्न एवं सकारात्मक रहना',
  'मधुर संगीत, धार्मिक/प्रेरणादायक साहित्य',
  'ढीले एवं आरामदायक वस्त्र',
  'नियमित प्रसवपूर्व जांच (ANC)',
];

const GEN_APATHYA = [
  'बासी भोजन',
  'अधिक तीखा, खट्टा, नमकीन एवं तला भोजन',
  'धूम्रपान, तंबाकू, शराब',
  'अत्यधिक चाय-कॉफी',
  'भारी वजन उठाना',
  'देर रात जागना',
  'क्रोध, चिंता, तनाव',
  'झटकेदार यात्रा',
];

const SPECIAL_NOTES = [
  'कब्ज न होने दें; पर्याप्त पानी पिएं।',
  'भूख से थोड़ा कम एवं बार-बार भोजन करें।',
  'ऋतु अनुसार ताजे फल एवं सब्जियां लें।',
  'भोजन के बाद थोड़ी देर विश्राम करें।',
  'बिना चिकित्सकीय सलाह के कोई औषधि न लें।',
];

/* ── garbh sanskar ── */
const GS_INCLUDES = [
  'गर्भधारण पूर्व परामर्श (Pre-Conception Counseling)',
  'प्रकृति परीक्षण एवं दम्पत्ति स्वास्थ्य मूल्यांकन',
  'पंचकर्म एवं शरीर शुद्धि (आवश्यकतानुसार)',
  'मासानुसार गर्भिणी परिचर्या',
  'आयुर्वेदिक आहार एवं पोषण मार्गदर्शन',
  'गर्भावस्था योग एवं प्राणायाम',
  'ध्यान (Meditation) एवं मानसिक स्वास्थ्य मार्गदर्शन',
  'वैदिक मंत्र, संगीत एवं सकारात्मक संवाद',
  'तनाव प्रबंधन एवं भावनात्मक सहयोग',
  'सुरक्षित एवं स्वस्थ प्रसव की तैयारी',
  'प्रसवोत्तर (सूतिका) देखभाल एवं नवजात शिशु मार्गदर्शन',
];

const GS_BENEFITS = [
  'स्वस्थ गर्भावस्था में सहायता',
  'माता के मानसिक तनाव में कमी',
  'सकारात्मक एवं प्रसन्न मानसिक अवस्था',
  'गर्भस्थ शिशु के साथ बेहतर भावनात्मक जुड़ाव',
  'संतुलित जीवनशैली एवं उत्तम पोषण',
  'स्वस्थ एवं संस्कारित भविष्य की नींव',
];

/* ── small UI helpers ── */
const SubHead = ({ children }) => (
  <h3 className="pp-hi" style={{ fontSize: 18, fontWeight: 800, color: '#1E5B4F', margin: '24px 0 12px' }}>
    {children}
  </h3>
);

const TickList = ({ items, marker = 'check' }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {items.map((it) => (
      <li key={it} className="pp-hi" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#2D2D2DCC', marginBottom: 10, lineHeight: 1.7 }}>
        <span style={{
          width: 22, height: 22, flexShrink: 0, borderRadius: '50%', marginTop: 2,
          background: marker === 'cross' ? 'rgba(193,57,43,.12)' : '#1E5B4F',
          color: marker === 'cross' ? '#C1392B' : '#C9A86A',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {marker === 'cross' ? <X size={13} strokeWidth={3} /> : <Check size={13} strokeWidth={3} />}
        </span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const Card = ({ num, title, sub, children }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    style={{
      background: '#fff', border: '1px solid rgba(30,91,79,.08)', borderRadius: 24,
      padding: 'clamp(24px, 3.5vw, 44px)', boxShadow: '0 24px 56px -40px rgba(30,91,79,.4)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
      <span style={{
        width: 46, height: 46, flexShrink: 0, borderRadius: 12,
        background: 'linear-gradient(135deg, #1E5B4F, #144239)', color: '#C9A86A',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 800,
      }}>
        {num}
      </span>
      <div>
        <h2 className="pp-hi" style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#1E5B4F', lineHeight: 1.25 }}>
          {title}
        </h2>
        {sub && <p className="pp-hi" style={{ fontSize: 15, color: '#2D2D2DAA', marginTop: 6, lineHeight: 1.7 }}>{sub}</p>}
      </div>
    </div>
    {children}
  </motion.article>
);

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
const PregnancyPathyaPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Pregnancy Pathya — गर्भावस्था पथ्य',
    description: 'आयुर्वेदिक गर्भावस्था पथ्य — मासानुसार पथ्य, सामान्य गर्भिणी पथ्य एवं गर्भसंस्कार। Mangla Nursing Home & Rogjeet Ayurveda.',
    inLanguage: ['hi', 'en'],
  };

  return (
    <div className="pp-page" style={{ background: '#FAF8F3', color: '#2D2D2D', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title="Pregnancy Pathya — गर्भावस्था पथ्य"
        description="आयुर्वेदिक गर्भावस्था पथ्य: मासानुसार पथ्य, सामान्य गर्भिणी पथ्य एवं गर्भसंस्कार। स्वस्थ गर्भावस्था व सुखप्रसव हेतु मार्गदर्शन।"
        schema={schema}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');
        .pp-page { font-family: 'Inter', system-ui, sans-serif; }
        .pp-display { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
        .pp-hi { font-family: 'Noto Sans Devanagari', 'Inter', sans-serif; }
        .pp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 100px;
          background: rgba(201,168,106,.14); border: 1px solid rgba(201,168,106,.4);
          color: #1E5B4F; font-size: 11.5px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
        }
        .pp-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1E5B4F, #144239);
          color: #FAF8F3; padding: 14px 28px; border-radius: 100px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 14.5px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(30,91,79,.6);
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .pp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -10px rgba(30,91,79,.7); }
        .pp-table { width: 100%; border-collapse: collapse; border-radius: 14px; overflow: hidden; }
        .pp-table th { background: linear-gradient(135deg, #1E5B4F, #144239); color: #FAF8F3; font-weight: 700; text-align: left; padding: 14px 16px; font-size: 14.5px; }
        .pp-table td { padding: 13px 16px; font-size: 15px; color: #2D2D2DCC; line-height: 1.6; border-bottom: 1px solid rgba(30,91,79,.1); vertical-align: top; }
        .pp-table tr:nth-child(even) td { background: rgba(221,232,227,.35); }
        .pp-table td:first-child { font-weight: 700; color: #1E5B4F; white-space: nowrap; }
        .pp-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
        @media (max-width: 720px) { .pp-2col { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── PAGE TITLE / BREADCRUMB ── */}
      <section style={{
        position: 'relative', background: 'linear-gradient(135deg, #FAF8F3 0%, #DDE8E3 100%)',
        padding: '56px 20px', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, opacity: 0.06, color: '#1E5B4F' }}>
          <Leaf size={280} strokeWidth={1} />
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 className="pp-display" style={{
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.05,
            color: '#1E5B4F', letterSpacing: '-1px', marginBottom: 6,
          }}>
            Pregnancy <em style={{ color: '#C9A86A', fontStyle: 'italic' }}>Pathya</em>
          </h1>
          <p className="pp-hi" style={{ fontSize: 18, color: '#1E5B4FBB', fontWeight: 700, marginBottom: 14 }}>
            गर्भावस्था पथ्य
          </p>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2D2D2D99', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/pathya" style={{ color: '#1E5B4F', textDecoration: 'none', fontWeight: 600 }}>Pathya</Link>
            <ChevronRight size={14} />
            <span>Pregnancy Pathya</span>
          </nav>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ padding: '56px 20px 72px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* SECTION 1 — मासानुसार पथ्य */}
          <Card
            num="01"
            title="गर्भावस्था में मासानुसार पथ्य (मासनुमासिक गर्भिणी परिचर्या)"
            sub="आयुर्वेद में प्रत्येक महीने गर्भ के विकास के अनुसार विशेष आहार बताया गया है।"
          >
            <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid rgba(30,91,79,.12)' }}>
              <table className="pp-table pp-hi">
                <thead>
                  <tr><th style={{ width: 120 }}>मास</th><th>पथ्य (आहार)</th></tr>
                </thead>
                <tbody>
                  {MONTHS.map(([m, p]) => (
                    <tr key={m}><td>{m}</td><td>{p}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SubHead>सभी महीनों में उपयोगी पथ्य</SubHead>
            <div className="pp-2col"><TickList items={ALL_MONTH_PATHYA} /></div>

            <SubHead>अपथ्य</SubHead>
            <div className="pp-2col"><TickList items={MASIK_APATHYA} marker="cross" /></div>

            <SubHead>आधुनिक दृष्टिकोण से</SubHead>
            <TickList items={MODERN} />

            <p className="pp-hi" style={{
              marginTop: 22, padding: '16px 18px', borderRadius: 12,
              background: 'rgba(221,232,227,.5)', border: '1px solid rgba(30,91,79,.12)',
              fontSize: 14.5, color: '#2D2D2DCC', lineHeight: 1.8,
            }}>
              <strong style={{ color: '#1E5B4F' }}>नोट:</strong> चरक संहिता एवं अष्टांग हृदय में वर्णित मासनुमासिक
              परिचर्या का उद्देश्य गर्भ का पोषण, गर्भस्थ शिशु का समुचित विकास तथा सुखप्रसव है। किसी भी औषधि या घृत का
              प्रयोग स्थानीय आयुर्वेद चिकित्सक की सलाह से ही कराएं।
            </p>
          </Card>

          {/* SECTION 2 — सामान्य पथ्य */}
          <Card
            num="02"
            title="गर्भावस्था में सामान्य पथ्य (Ayurvedic Garbhini Pathya)"
            sub="आयुर्वेद के अनुसार गर्भवती स्त्री को मधुर, स्निग्ध, सुपाच्य, पौष्टिक एवं ताजा भोजन करना चाहिए।"
          >
            <SubHead>पथ्य आहार</SubHead>
            <div className="pp-2col">
              {PATHYA_AHAR.map((g) => (
                <div key={g.group} style={{ marginBottom: 8 }}>
                  <p className="pp-hi" style={{ fontSize: 14.5, fontWeight: 800, color: '#C9A86A', marginBottom: 8 }}>{g.group}</p>
                  <TickList items={g.items} />
                </div>
              ))}
            </div>

            <SubHead>पथ्य विहार</SubHead>
            <div className="pp-2col"><TickList items={PATHYA_VIHAR} /></div>

            <SubHead>अपथ्य</SubHead>
            <div className="pp-2col"><TickList items={GEN_APATHYA} marker="cross" /></div>

            <SubHead>विशेष आयुर्वेदिक निर्देश</SubHead>
            <TickList items={SPECIAL_NOTES} />

            <div style={{
              marginTop: 22, padding: '20px 22px', borderRadius: 14,
              background: 'linear-gradient(135deg, #FAF8F3, #DDE8E366)', border: '1px solid rgba(201,168,106,.3)',
              display: 'flex', gap: 14,
            }}>
              <Quote size={28} style={{ color: '#C9A86A', flexShrink: 0 }} />
              <p className="pp-hi" style={{ fontSize: 15.5, fontStyle: 'italic', color: '#2D2D2D', lineHeight: 1.8 }}>
                "गर्भिणी स्त्री को ऐसा आहार-विहार करना चाहिए जो माता एवं गर्भ दोनों के बल, वर्ण, आयु और स्वास्थ्य को
                बढ़ाए तथा सुखप्रसव में सहायक हो।" <span style={{ color: '#1E5B4F', fontWeight: 700, fontStyle: 'normal' }}>— चरक संहिता</span>
              </p>
            </div>
          </Card>

          {/* SECTION 3 — गर्भसंस्कार */}
          <Card
            num="03"
            title="गर्भसंस्कार (Garbh Sanskar)"
            sub="स्वस्थ, बुद्धिमान एवं संस्कारित संतान की आयुर्वेदिक तैयारी"
          >
            <p className="pp-hi" style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.9, marginBottom: 14 }}>
              "सुप्रजा जननम्" आयुर्वेद का एक महत्वपूर्ण उद्देश्य है। आयुर्वेद के अनुसार संतान का शारीरिक, मानसिक एवं
              भावनात्मक विकास गर्भधारण के समय से ही प्रारम्भ हो जाता है। गर्भसंस्कार एक ऐसी वैज्ञानिक एवं सांस्कृतिक
              प्रक्रिया है जिसके माध्यम से माता-पिता गर्भस्थ शिशु के लिए सकारात्मक वातावरण का निर्माण करते हैं।
            </p>

            <SubHead>गर्भसंस्कार क्या है?</SubHead>
            <p className="pp-hi" style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.9 }}>
              "गर्भ" का अर्थ है गर्भस्थ शिशु और "संस्कार" का अर्थ है उत्तम गुणों का संवर्धन। आयुर्वेद मानता है कि
              गर्भावस्था के दौरान माता के विचार, आहार, व्यवहार, भावनाएँ, संगीत, योग एवं जीवनशैली का प्रभाव गर्भस्थ शिशु
              पर पड़ता है।
            </p>

            <SubHead>गर्भसंस्कार कार्यक्रम में क्या शामिल है?</SubHead>
            <div className="pp-2col"><TickList items={GS_INCLUDES} /></div>

            <SubHead>गर्भसंस्कार के संभावित लाभ</SubHead>
            <div className="pp-2col"><TickList items={GS_BENEFITS} /></div>

            <SubHead>हमारी विशेषता</SubHead>
            <p className="pp-hi" style={{ fontSize: 15.5, color: '#2D2D2DCC', lineHeight: 1.9 }}>
              हमारे यहाँ आयुर्वेदिक ग्रन्थों में वर्णित गर्भिणी परिचर्या, मासानुसार आहार-विहार, योग, ध्यान तथा आधुनिक
              गर्भावस्था देखभाल के समन्वय से व्यक्तिगत गर्भसंस्कार परामर्श प्रदान किया जाता है।
            </p>
          </Card>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '20px 20px 80px', background: '#FAF8F3' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1E5B4F 0%, #144239 50%, #1E5B4F 100%)',
              color: '#FAF8F3', borderRadius: 28, padding: 'clamp(36px, 5vw, 56px)',
              position: 'relative', overflow: 'hidden', textAlign: 'center',
            }}
          >
            <div aria-hidden style={{
              position: 'absolute', top: -80, right: -60, width: 240, height: 240, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,106,.25), transparent 70%)',
            }} />
            <h2 className="pp-hi" style={{
              fontSize: 'clamp(22px, 3.4vw, 34px)', fontWeight: 800, lineHeight: 1.3,
              marginBottom: 12, position: 'relative',
            }}>
              स्वस्थ, बुद्धिमान एवं संस्कारित संतान के लिए आज ही संपर्क करें
            </h2>
            <p className="pp-hi" style={{ fontSize: 15.5, color: 'rgba(250,248,243,.85)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 24px', position: 'relative' }}>
              Rogjeet Ayurveda &amp; Mangla Nursing Home · Near Bus Stand, Biwan, District Nuh (Mewat), Haryana
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
              <a href={`https://wa.me/91${WHATSAPP}`} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, background: '#C9A86A', color: '#1E5B4F',
                padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 800, textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(201,168,106,.6)',
              }}>
                <Phone size={16} /> WhatsApp: {WHATSAPP}
              </a>
              <Link to="/contact" className="pp-btn-primary" style={{ background: 'transparent', border: '1.5px solid rgba(201,168,106,.5)' }}>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PregnancyPathyaPage;
