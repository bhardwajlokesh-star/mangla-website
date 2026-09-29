# Mangla Healthcare — Website

Static website for Mangla Healthcare / Rogjeet Ayurveda (Jaipur), built with
React 19, Vite and React Router. There is no backend. The only moving parts
are:

- **Free Health Test**: submissions go to the clinic's own Google Sheet
  through a Google Apps Script (see [APPS_SCRIPT_SETUP.md](APPS_SCRIPT_SETUP.md)).
- **Doctor Portal → Prescription**: builds a branded A4 prescription in the
  browser, then downloads it as a PDF or prints it. Nothing is stored.

The other portal screens (dashboard, records, diet, settings) are demo UI
with sample data.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/ (also regenerates public/sitemap.xml)
npm run preview    # serve the production build locally
npm run lint
```

## Configure

| What | Where |
| --- | --- |
| Clinic name, address, phone, website, OPD hours (prescription letterhead, 404 page, health test messages) | `src/config/clinic.js` |
| Doctors (profiles, prescription doctor list, registration numbers) | `src/pages/doctorsData.js` |
| Health Test Google Sheet URL | `VITE_HEALTH_TEST_ENDPOINT` in `.env.local` / host settings |
| Portal username and password | `VITE_PORTAL_USERNAME`, `VITE_PORTAL_PASSWORD_SHA256` (see `.env.example`) |
| Google Analytics 4 | `VITE_GA_ID` (optional; nothing loads without it) |

Copy `.env.example` to `.env.local` to start. **Change the default portal
password (`admin123`) before going live.** The portal login only keeps
casual visitors out, because the site has no server. Never put real patient
data in the demo portal screens.

## Deploy

Any static host works. Rewrites are already set up, so reloading a deep link
like `/panchkarma` doesn't 404:

- **Vercel**: `vercel.json`
- **Netlify**: `public/_redirects`

Set the `VITE_*` variables in the host's environment settings and redeploy
whenever they change (they're baked in at build time).

## Project layout

```
src/
  App.jsx                 routes (pages are lazy-loaded)
  config/clinic.js        clinic contact details
  components/             Navbar, Footer, SEO, cookie banner…
  pages/                  public pages; placeholderRoutes.js + content/subPages.js drive ~50 sub-pages
  portal/                 doctor portal (auth.js, Prescription.jsx, …)
  utils/submitHealthTest.js
google-apps-script/Code.gs  paste into the Sheet's Apps Script editor
scripts/generate-sitemap.js runs before every build
public/img/               photos (WebP)
```
