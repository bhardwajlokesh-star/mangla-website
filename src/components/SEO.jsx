import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, SITE_BASE } from './seoSchemas';

/* ──────────────────────────────────────────────────────────────
   SEO — drop into any page to get per-page <title>, meta,
   Open Graph, Twitter card, and canonical URL.
   Defaults are sensible Mangla Healthcare values.
   ────────────────────────────────────────────────────────────── */

const DEFAULT_OG = `${SITE_BASE}/og-default.jpg`;

const SEO = ({
  title,
  description,
  image = DEFAULT_OG,
  type = 'website',
  noIndex = false,
  schema, // optional JSON-LD object
}) => {
  const location = useLocation();
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Ayurveda Hospital, Panchkarma & Diagnostics`;
  const desc =
    description ||
    'Mangla Healthcare brings together Ayurveda, modern diagnostics, and compassionate hospital care. Book a consultation with experienced doctors in Jaipur.';
  const canonical = `${SITE_BASE}${location.pathname}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Optional JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
