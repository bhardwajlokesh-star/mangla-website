import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/* ──────────────────────────────────────────────────────────────
   SEO — drop into any page to get per-page <title>, meta,
   Open Graph, Twitter card, and canonical URL.
   Defaults are sensible Mangla Healthcare values.
   ────────────────────────────────────────────────────────────── */

const SITE_NAME = 'Mangla Healthcare';
const SITE_BASE = 'https://www.manglahealthcare.com';
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

/* ── Shared JSON-LD blocks ── */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: SITE_NAME,
  alternateName: 'Mangla Nursing Home & Nirogpeeth Ayurveda',
  url: SITE_BASE,
  logo: `${SITE_BASE}/logo.png`,
  image: `${SITE_BASE}/og-default.jpg`,
  description:
    'Integrated Ayurveda hospital, Panchkarma centre, and diagnostic facility serving Jaipur and Rajasthan since 2015.',
  telephone: '+91-99926-54891',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Medical Square',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '26.9124',
    longitude: '75.7873',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  medicalSpecialty: [
    'Ayurveda',
    'Panchkarma',
    'Pain Management',
    'Diagnostics',
    'General Medicine',
  ],
  sameAs: [
    'https://facebook.com/manglahealthcare',
    'https://instagram.com/manglahealthcare',
    'https://youtube.com/manglahealthcare',
  ],
};

export const medicalProcedureSchema = (name, description) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name,
  description,
  procedureType: 'TherapeuticProcedure',
  bodyLocation: 'Whole body',
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE_BASE}${it.path}`,
  })),
});

export default SEO;
