export const SITE_NAME = 'Mangla Healthcare';
export const SITE_BASE = 'https://www.manglahealthcare.com';

/* ── Shared JSON-LD blocks ── */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: SITE_NAME,
  alternateName: 'Mangla Nursing Home & Nirogpeeth Ayurveda',
  url: SITE_BASE,
  logo: `${SITE_BASE}/icon-512.png`,
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
