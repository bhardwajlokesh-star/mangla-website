import { Link } from 'react-router-dom';
import { ArrowRight, Home, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { clinic } from '../config/clinic';

const NotFoundPage = () => (
  <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', background: '#f7faf9', fontFamily: 'Inter, system-ui, sans-serif' }}>
    <SEO title="Page not found" noIndex />
    <div style={{ maxWidth: 560, textAlign: 'center' }}>
      <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0a6e66' }}>Error 404</p>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 700, color: '#07202f', margin: '12px 0 16px', lineHeight: 1.2 }}>
        We couldn’t find that page
      </h1>
      <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
        The link may be old or mistyped. You can head back to the home page, or call us and we’ll help you directly.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 100, background: '#B84C2B', color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
          <Home size={16} /> Go to Home <ArrowRight size={16} />
        </Link>
        <a href={clinic.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 100, border: '1px solid #cbd5e1', color: '#07202f', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
          <Phone size={16} /> {clinic.phone}
        </a>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
