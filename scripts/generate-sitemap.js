/* Generates public/sitemap.xml from the app's routes. Runs before every
   `npm run build` (see "prebuild" in package.json), so it never goes stale. */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { placeholderRoutes } from '../src/pages/placeholderRoutes.js';
import { doctors } from '../src/pages/doctorsData.js';

const SITE = 'https://www.manglahealthcare.com';
const root = new URL('..', import.meta.url);

const appSource = readFileSync(new URL('src/App.jsx', root), 'utf8');
const appRoutes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map(m => m[1]);

const paths = new Set([
  ...appRoutes,
  ...placeholderRoutes.map(r => r.path),
  ...doctors.map(d => `/doctors/${d.slug}`),
]);

const excluded = (p) => p === '*' || p.includes(':') || p.startsWith('/portal');
const urls = [...paths].filter(p => !excluded(p)).sort((a, b) =>
  a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b));

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(p => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;

const out = fileURLToPath(new URL('public/sitemap.xml', root));
writeFileSync(out, xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
