import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingSocials from './components/layout/FloatingSocials';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import { placeholderRoutes } from './pages/placeholderRoutes';
import CookieConsent from './components/CookieConsent';
import NotFoundPage from './pages/NotFoundPage';

import { LanguageProvider } from './components/layout/LanguageContext';

// Every page except Home is downloaded only when a visitor opens it.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HealthTestPage = lazy(() => import('./pages/HealthTestPage'));
const HospitalCafePage = lazy(() => import('./pages/HospitalCafePage'));
const PanchkarmaPage = lazy(() => import('./pages/PanchkarmaPage'));
const PainManagementPage = lazy(() => import('./pages/PainManagementPage'));
const SpaPage = lazy(() => import('./pages/SpaPages').then(m => ({ default: m.SpaPage })));
const HairSpaPage = lazy(() => import('./pages/SpaPages').then(m => ({ default: m.HairSpaPage })));
const SkinSpaPage = lazy(() => import('./pages/SpaPages').then(m => ({ default: m.SkinSpaPage })));
const BodySpaPage = lazy(() => import('./pages/SpaPages').then(m => ({ default: m.BodySpaPage })));
const SuvarnaprashanPage = lazy(() => import('./pages/SuvarnaprashanPage'));
const GarbhSanskarPage = lazy(() => import('./pages/GarbhSanskarPage'));
const PregnancyPathyaPage = lazy(() => import('./pages/PregnancyPathyaPage'));
const SuperSpecialityPage = lazy(() => import('./pages/SuperSpecialityPage'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const DoctorProfilePage = lazy(() => import('./pages/DoctorProfilePage'));

// The doctor portal (and its PDF libraries) is loaded only when someone opens it.
const LoginPage = lazy(() => import('./portal/LoginPage'));
const Dashboard = lazy(() => import('./portal/Dashboard'));
const Prescription = lazy(() => import('./portal/Prescription'));
const DietExercise = lazy(() => import('./portal/DietExercise'));
const PatientRecords = lazy(() => import('./portal/PatientRecords'));
const Settings = lazy(() => import('./portal/Settings'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading…</div>
);

function AppShell() {
  const { pathname } = useLocation();
  // Portal screens have their own sidebar layout; keep the public header/footer off them.
  const inPortalApp = pathname.startsWith('/portal/') && pathname !== '/portal/login';

  return (
          <div className="flex flex-col min-h-screen">
            {!inPortalApp && <Navbar />}
            <FloatingSocials />
            <main id="main-content" className="flex-grow pt-0"> {/* Padding handled in pages */}
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/health-test" element={<HealthTestPage />} />
                <Route path="/hospital/cafe" element={<HospitalCafePage />} />
                <Route path="/panchkarma" element={<PanchkarmaPage />} />
                <Route path="/pain-management" element={<PainManagementPage />} />
                <Route path="/spa" element={<SpaPage />} />
                <Route path="/spa/hair" element={<HairSpaPage />} />
                <Route path="/spa/skin" element={<SkinSpaPage />} />
                <Route path="/spa/body" element={<BodySpaPage />} />
                <Route path="/suvarnaprashan" element={<SuvarnaprashanPage />} />
                <Route path="/garbh-sanskar" element={<GarbhSanskarPage />} />
                <Route path="/pathya/pregnancy" element={<PregnancyPathyaPage />} />
                <Route path="/super-speciality" element={<SuperSpecialityPage />} />

                {/* Doctors */}
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:slug" element={<DoctorProfilePage />} />

                {/* Legal */}
                <Route path="/privacy" element={<LegalPage page="privacy" />} />
                <Route path="/terms" element={<LegalPage page="terms" />} />
                <Route path="/disclaimer" element={<LegalPage page="disclaimer" />} />
                <Route path="/sitemap" element={<LegalPage page="sitemap" />} />

                {/* Portal Routes */}
                <Route path="/portal" element={<Navigate to="/portal/login" replace />} />
                <Route path="/portal/login" element={<LoginPage />} />
                <Route path="/portal/dashboard" element={<Dashboard />} />
                <Route path="/portal/prescription" element={<Prescription />} />
                <Route path="/portal/diet-exercise" element={<DietExercise />} />
                <Route path="/portal/records" element={<PatientRecords />} />
                <Route path="/portal/settings" element={<Settings />} />

                {/* Dynamic placeholder routes — generated from manifest */}
                {placeholderRoutes.map(r => (
                  <Route
                    key={r.path}
                    path={r.path}
                    element={<PlaceholderPage category={r.category} title={r.title} />}
                  />
                ))}

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </Suspense>
            </main>
            {!inPortalApp && <Footer />}
            <CookieConsent />
          </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <AppShell />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
