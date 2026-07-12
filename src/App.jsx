import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingSocials from './components/layout/FloatingSocials';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import HealthTestPage from './pages/HealthTestPage';
import HospitalCafePage from './pages/HospitalCafePage';
import PanchkarmaPage from './pages/PanchkarmaPage';
import PainManagementPage from './pages/PainManagementPage';
import { SpaPage, HairSpaPage, SkinSpaPage, BodySpaPage } from './pages/SpaPages';
import SuvarnaprashanPage from './pages/SuvarnaprashanPage';
import GarbhSanskarPage from './pages/GarbhSanskarPage';
import PregnancyPathyaPage from './pages/PregnancyPathyaPage';
import SuperSpecialityPage from './pages/SuperSpecialityPage';
import LoginPage from './portal/LoginPage';
import Dashboard from './portal/Dashboard';
import Prescription from './portal/Prescription';
import DietExercise from './portal/DietExercise';
import PatientRecords from './portal/PatientRecords';
import Settings from './portal/Settings';
import ScrollToTop from './components/ScrollToTop';
import PlaceholderPage from './pages/PlaceholderPage';
import { placeholderRoutes } from './pages/placeholderRoutes';
import LegalPage from './pages/LegalPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import CookieConsent from './components/CookieConsent';

import { LanguageProvider } from './components/layout/LanguageContext';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <FloatingSocials />
            <main id="main-content" className="flex-grow pt-0"> {/* Padding handled in pages */}
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
              </Routes>
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
