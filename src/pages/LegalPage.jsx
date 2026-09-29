import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, FileText, AlertTriangle, Map } from 'lucide-react';
import SEO from '../components/SEO';
import { placeholderRoutes } from './placeholderRoutes';

/* ──────────────────────────────────────────────────────────────
   LEGAL PAGE — handles /privacy, /terms, /disclaimer, /sitemap
   from a single component. Plain, dense, lawyer-readable copy.
   ────────────────────────────────────────────────────────────── */

const LegalPage = ({ page = 'privacy' }) => {
  const config = PAGES[page] || PAGES.privacy;
  const Icon = config.icon;

  return (
    <div style={{ background: '#fcfdfd', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SEO title={config.title} description={config.intro} noIndex={page === 'disclaimer'} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&display=swap');
        .lg-display { font-family: 'Playfair Display', serif; }
        .lg-prose h2 { font-family: 'Playfair Display', serif; font-size: 22px; color: #0f1e2c; margin: 32px 0 10px; }
        .lg-prose p, .lg-prose li { font-size: 15.5px; color: #475569; line-height: 1.75; margin-bottom: 12px; }
        .lg-prose ul { padding-left: 22px; margin-bottom: 12px; }
        .lg-prose strong { color: #0f1e2c; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg,#07202f 0%,#0a3545 100%)',
        color: '#fff',
        padding: '72px 20px 84px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,169,110,.22), transparent 70%)',
        }} />
        <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(247,243,237,.7)', marginBottom: 22 }}>
            <Link to="/" style={{ color: 'rgba(247,243,237,.7)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} style={{ opacity: .5 }} />
            <span style={{ color: '#c8a96e', fontWeight: 600 }}>{config.title}</span>
          </nav>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 16px', borderRadius: 100,
            background: 'rgba(200,169,110,.14)',
            border: '1px solid rgba(200,169,110,.32)',
            color: '#c8a96e',
            fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            <Icon size={14} /> {config.eyebrow}
          </div>
          <h1 className="lg-display" style={{ fontSize: 'clamp(34px,5vw,52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.8px', marginBottom: 14 }}>
            {config.title}
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(247,243,237,.8)', lineHeight: 1.65, maxWidth: 720 }}>
            {config.intro}
          </p>
          <p style={{ fontSize: 12.5, color: 'rgba(247,243,237,.55)', marginTop: 18 }}>
            Last updated: 29 May 2026
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px 96px' }}>
        <div className="lg-prose">{config.body}</div>
      </section>
    </div>
  );
};

/* ──────────── PAGE BODIES ──────────── */

const PrivacyBody = () => (
  <>
    <h2>1. Information we collect</h2>
    <p>When you interact with Mangla Healthcare, we may collect the following information:</p>
    <ul>
      <li><strong>Identity & contact details</strong>: name, age, gender, phone, email, address, emergency contact.</li>
      <li><strong>Clinical information</strong>: symptoms, medical history, current medications, lab reports, images, and consultation notes — only when you voluntarily share them with us.</li>
      <li><strong>Free Health Test submissions</strong>: form data submitted at <Link to="/health-test" style={{ color: '#0a6e66' }}>/health-test</Link>, stored in a private Google Sheet accessible only to our medical team.</li>
      <li><strong>Site analytics</strong>: anonymised page views, device type, and approximate location, collected only after you accept analytics in the cookie banner.</li>
    </ul>

    <h2>2. How we use your information</h2>
    <ul>
      <li>To deliver clinical consultation, follow-up care, and personalised treatment plans.</li>
      <li>To respond to your enquiries, appointment requests, and feedback.</li>
      <li>To improve our services, website, and the quality of patient communication.</li>
      <li>To comply with applicable medical, accounting, and regulatory record-keeping obligations.</li>
    </ul>

    <h2>3. Sharing & disclosure</h2>
    <p>
      We do <strong>not sell</strong> personal data. We share information only with: (a) our treating doctors and clinical staff,
      (b) the diagnostic lab partners required to process your test, (c) regulatory authorities when legally required, and (d)
      service providers (e.g. hosting, email) bound by confidentiality.
    </p>

    <h2>4. Data security</h2>
    <p>
      Patient records are stored with restricted access. The website transmits data over HTTPS. Submissions to our Google Sheets
      backend are tokenised and accessible only to designated team members.
    </p>

    <h2>5. Your rights</h2>
    <ul>
      <li>Request a copy of the personal information we hold about you.</li>
      <li>Correct any inaccurate or outdated information.</li>
      <li>Request deletion of your data, subject to legal record-keeping obligations.</li>
      <li>Withdraw consent for marketing communication at any time.</li>
    </ul>

    <h2>6. Cookies</h2>
    <p>
      We use a minimal set of cookies to remember your consent choice and (only if you opt in) to gather anonymised usage analytics.
      You can clear cookies at any time from your browser settings.
    </p>

    <h2>7. Contact</h2>
    <p>
      Questions or requests can be sent to <a href="mailto:privacy@manglahealthcare.com" style={{ color: '#0a6e66' }}>privacy@manglahealthcare.com</a> or
      by post to Mangla Healthcare, Medical Square, Jaipur — 302001.
    </p>
  </>
);

const TermsBody = () => (
  <>
    <h2>1. Acceptance</h2>
    <p>
      By accessing this website or interacting with our services, you agree to be bound by these Terms.
      If you do not agree, please discontinue use of the site.
    </p>

    <h2>2. Nature of services</h2>
    <p>
      Mangla Healthcare operates an integrated facility comprising Mangla Nursing Home, Nirogpeeth Ayurveda, and Durgadevi
      Ultrasound. We provide doctor-led consultation, Panchkarma therapy, nursing care, diagnostics, and allied services as
      described on this website.
    </p>

    <h2>3. No emergency service</h2>
    <p>
      This website is not a substitute for emergency care. If you are experiencing a medical emergency, please call your local
      emergency number immediately.
    </p>

    <h2>4. Appointments & cancellations</h2>
    <p>
      Bookings are confirmed only after acknowledgement by our team. Cancellation policies vary by service and will be communicated
      at the time of booking. Late arrivals may be rescheduled at our discretion.
    </p>

    <h2>5. Payment</h2>
    <p>
      All fees are listed in Indian Rupees (INR) and are payable in advance unless otherwise agreed. Refunds, where applicable, are
      processed within 7-10 working days.
    </p>

    <h2>6. Intellectual property</h2>
    <p>
      All content, branding, photography, and software on this site are the property of Mangla Healthcare or licensed to us.
      You may not reproduce or redistribute any content without written permission.
    </p>

    <h2>7. Limitation of liability</h2>
    <p>
      To the extent permitted by Indian law, Mangla Healthcare shall not be liable for indirect, incidental, or consequential
      damages arising from website use. Clinical liability is governed by the doctor-patient agreement signed at the time of
      treatment.
    </p>

    <h2>8. Governing law</h2>
    <p>
      These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts at
      Jaipur, Rajasthan.
    </p>
  </>
);

const DisclaimerBody = () => (
  <>
    <h2>Medical disclaimer</h2>
    <p>
      The information published on this website is for general educational purposes only. It should <strong>not</strong> be
      considered a substitute for personalised medical advice, diagnosis, or treatment from a qualified physician.
    </p>

    <h2>Individual variation</h2>
    <p>
      Every patient's body, prakriti, and medical history is unique. Treatment outcomes, durations, and responses described on
      this website are typical expectations. Individual results may vary and are confirmed only after clinical assessment.
    </p>

    <h2>Ayurveda & integrated care</h2>
    <p>
      Our Ayurveda services follow classical principles supplemented with modern clinical screening. While we follow safe and
      time-tested protocols, no therapy is universally suitable. Our doctors reserve the right to decline any therapy if it is
      clinically inappropriate.
    </p>

    <h2>External links</h2>
    <p>
      This site may link to third-party resources. Mangla Healthcare does not endorse and is not responsible for the content of
      those sites.
    </p>

    <h2>Emergencies</h2>
    <p>
      In a medical emergency, please contact local emergency services. Do not rely on online consultation for time-critical
      conditions.
    </p>
  </>
);

const SitemapBody = () => {
  /* group routes by top-level segment */
  const all = [
    { name: 'Home',           path: '/' },
    { name: 'About Us',       path: '/about' },
    { name: 'Services',       path: '/services' },
    { name: 'Contact',        path: '/contact' },
    { name: 'Free Health Test',path: '/health-test' },
    { name: 'Our Doctors',    path: '/doctors' },
    ...placeholderRoutes.map(r => ({ name: r.title, path: r.path })),
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service',path: '/terms' },
    { name: 'Disclaimer',     path: '/disclaimer' },
  ];
  const grouped = all.reduce((acc, r) => {
    const seg = r.path === '/' ? 'Main' : r.path.split('/')[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    (acc[seg] = acc[seg] || []).push(r);
    return acc;
  }, {});
  return (
    <>
      <p>Every page on Mangla Healthcare, grouped by section. If a route 404s, please write to us so we can fix it.</p>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} style={{ marginTop: 26 }}>
          <h2>{group}</h2>
          <ul>
            {items.map(it => (
              <li key={it.path}>
                <Link to={it.path} style={{ color: '#0a6e66', textDecoration: 'none', fontWeight: 500 }}>
                  {it.name}
                </Link>
                <span style={{ color: '#94a3b8', marginLeft: 8, fontSize: 13 }}>{it.path}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

const PAGES = {
  privacy:    { title: 'Privacy Policy',     eyebrow: 'Privacy', icon: ShieldCheck,    intro: 'How we collect, use, store, and protect your personal and clinical information.', body: <PrivacyBody /> },
  terms:      { title: 'Terms of Service',   eyebrow: 'Terms',   icon: FileText,       intro: 'The terms governing your use of this website and our clinical services.',        body: <TermsBody /> },
  disclaimer: { title: 'Medical Disclaimer', eyebrow: 'Notice',  icon: AlertTriangle,  intro: 'Information about the educational scope of our website content.',                body: <DisclaimerBody /> },
  sitemap:    { title: 'Sitemap',            eyebrow: 'Index',   icon: Map,            intro: 'Every public page on Mangla Healthcare, grouped by section.',                    body: <SitemapBody /> },
};

export default LegalPage;
