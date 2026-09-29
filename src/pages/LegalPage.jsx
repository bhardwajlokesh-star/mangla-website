import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, FileText, AlertTriangle, Map } from 'lucide-react';
import SEO from '../components/SEO';
import { placeholderRoutes } from './placeholderRoutes';
import { clinic } from '../config/clinic';

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
            Last updated: {config.updated}
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
    <p>
      This policy explains what personal data {clinic.name} (including Rogjeet Ayurveda, Mangla Nursing Home and Nirogpeeth
      Ayurveda) collects through this website, why, where it is kept, and the choices you have. We process personal data in line
      with India's Digital Personal Data Protection Act, 2023.
    </p>

    <h2>1. What we collect, and when</h2>
    <ul>
      <li>
        <strong>Free Health Test</strong> (<Link to="/health-test" style={{ color: '#0a6e66' }}>/health-test</Link>): your name, age, gender, mobile
        number, email (optional), health concern, symptoms, lifestyle details, notes, and a photo if you choose to add one.
        This is health information, so we only collect it after you tick the consent box on the form.
      </li>
      <li>
        <strong>Appointment and contact requests</strong> (the home page, <Link to="/contact" style={{ color: '#0a6e66' }}>Contact</Link>,
        Panchkarma and Super-speciality forms): your name, mobile number, email (optional), the treatment you are interested
        in, and your message.
      </li>
      <li>
        <strong>Health-tips newsletter</strong>: your email address.
      </li>
      <li>
        <strong>Technical details sent with every form</strong>: the page you submitted from and your browser/device type,
        which help us spot spam.
      </li>
      <li>
        <strong>Website analytics</strong>: anonymised page views and device information via Google Analytics, only if you
        choose "Accept all" in the cookie banner.
      </li>
    </ul>
    <p>
      We do not ask for identity documents, payment details or passwords on this website. Information you give us in person at
      the hospital is covered by your treatment records, not by this website policy.
    </p>

    <h2>2. Why we use it</h2>
    <ul>
      <li>To review your Free Health Test and call you back with advice or an appointment.</li>
      <li>To respond to appointment and contact requests.</li>
      <li>To send health tips, only if you signed up for them.</li>
      <li>To keep the website secure and understand, in aggregate, how it is used (analytics only with your consent).</li>
    </ul>
    <p>We do not sell your data, use it for advertising, or use it for any purpose you have not been told about here.</p>

    <h2>3. Where it is stored</h2>
    <p>
      The website itself does not keep your submissions. When you send a form, it goes over an encrypted (HTTPS) connection
      directly into a Google Sheet owned by {clinic.name}; Health Test photos are saved in a private Google Drive folder
      belonging to the same account. Google stores this data on our behalf as a service provider (a "data processor"), and it
      may be held on Google's servers outside India. Access is limited to the clinic staff who need it to contact and treat
      you.
    </p>

    <h2>4. Who we share it with</h2>
    <ul>
      <li>Our doctors and front-desk staff, to respond to you.</li>
      <li>Service providers who run the website and store data for us (Google; our website host), under their standard data-protection terms.</li>
      <li>Authorities, only where Indian law requires it.</li>
    </ul>

    <h2>5. How long we keep it</h2>
    <p>
      We keep form submissions only for as long as needed to respond to you and follow up on your care, and then delete them
      from the Google Sheet and Drive. If you become a patient, the details you gave may become part of your medical record,
      which we keep for the period required by law. Newsletter emails are kept until you unsubscribe.
    </p>

    <h2>6. Your rights and choices</h2>
    <ul>
      <li><strong>Access and correction:</strong> ask what we hold about you, and correct anything inaccurate.</li>
      <li><strong>Erasure:</strong> ask us to delete your submissions, unless we must keep them by law.</li>
      <li><strong>Withdraw consent:</strong> you can withdraw consent for your Health Test data or the newsletter at any time; this does not affect anything done before you withdrew it.</li>
      <li><strong>Analytics:</strong> clear this site's data in your browser to see the cookie banner again and change your choice.</li>
      <li><strong>Nominate:</strong> you may nominate someone to exercise these rights for you in case of death or incapacity.</li>
    </ul>
    <p>
      To use any of these rights, email <a href={`mailto:${clinic.privacyEmail}`} style={{ color: '#0a6e66' }}>{clinic.privacyEmail}</a> or
      call {clinic.phone}. We will respond within 30 days.
    </p>

    <h2>7. Children</h2>
    <p>
      If you are under 18, a parent or guardian should fill in the Free Health Test or any form on your behalf.
    </p>

    <h2>8. Cookies and browser storage</h2>
    <p>
      We store small settings in your browser: your cookie choice and, for doctors, the portal sign-in for the current
      browser session. Google Analytics cookies are set only if you choose "Accept all". Clinic staff use the prescription tool
      in the doctor portal; prescriptions are created in the doctor's own browser and are not stored on this website.
    </p>

    <h2>9. Grievances and contact</h2>
    <p>
      For questions or complaints about your data, contact our {clinic.grievanceOfficer} at{' '}
      <a href={`mailto:${clinic.privacyEmail}`} style={{ color: '#0a6e66' }}>{clinic.privacyEmail}</a>, call {clinic.phone}, or write to
      {' '}{clinic.name}, {clinic.address}. If you are not satisfied with our response, you may complain to the Data
      Protection Board of India.
    </p>

    <h2>10. Changes to this policy</h2>
    <p>If we change how we handle your data, we will update this page and the "Last updated" date above.</p>
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
  privacy:    { title: 'Privacy Policy',     eyebrow: 'Privacy', icon: ShieldCheck,    updated: '30 September 2026', intro: 'What we collect through this website, why, where it is stored, and your rights over it.', body: <PrivacyBody /> },
  terms:      { title: 'Terms of Service',   eyebrow: 'Terms',   icon: FileText,       updated: '29 May 2026', intro: 'The terms governing your use of this website and our clinical services.',        body: <TermsBody /> },
  disclaimer: { title: 'Medical Disclaimer', eyebrow: 'Notice',  icon: AlertTriangle,  updated: '29 May 2026', intro: 'Information about the educational scope of our website content.',                body: <DisclaimerBody /> },
  sitemap:    { title: 'Sitemap',            eyebrow: 'Index',   icon: Map,            updated: '30 September 2026', intro: 'Every public page on Mangla Healthcare, grouped by section.',                    body: <SitemapBody /> },
};

export default LegalPage;
