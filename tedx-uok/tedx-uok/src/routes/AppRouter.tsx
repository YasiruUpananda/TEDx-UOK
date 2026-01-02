// routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";

import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import AboutTedPage from "../pages/About/AboutTedPage";
import AboutTedxPage from "../pages/About/AboutTedxPage";
import AboutTedxUokPage from "../pages/About/AboutTedxUokPage";
import SpeakersListPage from "../pages/Speakers/SpeakersListPage";
import SpeakerDetailPage from "../pages/Speakers/SpeakerDetailPage";
import TeamPage from "../pages/Team/TeamPage";
import PartnersPage from "../pages/Partners/PartnersPage";
import ContactPage from "../pages/Contact/ContactPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import AgendaPage from "../pages/Agenda/AgendaPage";
import ThemePage from "../pages/Theme/Theme";
import BlogListPage from "../pages/Blog/BlogListPage";
import BlogPostPage from "../pages/Blog/BlogPostPage";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
import ImpactPage from "../pages/Impact/ImpactPage";
import MediaPage from "../pages/PressAndMedia/PressAndMediaPage";
import PastEventsPage from "../pages/PastEvents/PastEventsPage";
import VolunteerPage from "../pages/Volunteers/VolunteersPage"; // Form
import VolunteerApplicationPage from "../pages/Volunteers/VolunteerApplicationPage"; // Info/Landing
import VenuePage from "../pages/Venue/VenuePage";
import FAQPage from "../pages/FAQ/FAQPage";
import PrivacyPolicyPage from "../pages/Legal/PrivacyPolicyPage";
import AccessibilityPage from "../pages/Legal/AccessibilityPage";
import CodeOfConductPage from "../pages/Legal/CodeOfConductPage";
import LicensingPage from "../pages/Legal/LicensingPage";
import PaymentSuccessPage from "../pages/Payment/PaymentSuccessPage";
import PaymentFailPage from "../pages/Payment/PaymentFailPage";
import PaymentCancelPage from "../pages/Payment/PaymentCancelPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

import ScrollToTop from "../components/common/ScrollToTop";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <div key={location.pathname} className="page-transition">
            <HomePage />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div key={location.pathname} className="page-transition">
            <AboutPage />
          </div>
        }
      />
      <Route
        path="/about/ted"
        element={
          <div key={location.pathname} className="page-transition">
            <AboutTedPage />
          </div>
        }
      />
      <Route
        path="/about/tedx"
        element={
          <div key={location.pathname} className="page-transition">
            <AboutTedxPage />
          </div>
        }
      />
      <Route
        path="/about/tedx-uok"
        element={
          <div key={location.pathname} className="page-transition">
            <AboutTedxUokPage />
          </div>
        }
      />
      <Route
        path="/theme"
        element={
          <div key={location.pathname} className="page-transition">
            <ThemePage />
          </div>
        }
      />

      <Route
        path="/speakers"
        element={
          <div key={location.pathname} className="page-transition">
            <SpeakersListPage />
          </div>
        }
      />
      <Route
        path="/speakers/:id"
        element={
          <div key={location.pathname} className="page-transition">
            <SpeakerDetailPage />
          </div>
        }
      />

      <Route
        path="/agenda"
        element={
          <div key={location.pathname} className="page-transition">
            <AgendaPage />
          </div>
        }
      />

      <Route
        path="/team"
        element={
          <div key={location.pathname} className="page-transition">
            <TeamPage />
          </div>
        }
      />
      <Route
        path="/partners"
        element={
          <div key={location.pathname} className="page-transition">
            <PartnersPage />
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div key={location.pathname} className="page-transition">
            <ContactPage />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div key={location.pathname} className="page-transition">
            <RegistrationPage />
          </div>
        }
      />

      {/* Blog */}
      <Route
        path="/blog"
        element={
          <div key={location.pathname} className="page-transition">
            <BlogListPage />
          </div>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <div key={location.pathname} className="page-transition">
            <BlogPostPage />
          </div>
        }
      />
      <Route
        path="/blog/detail/:id"
        element={
          <div key={location.pathname} className="page-transition">
            <BlogDetailPage />
          </div>
        }
      />

      {/* New Pages */}
      <Route
        path="/impact"
        element={
          <div key={location.pathname} className="page-transition">
            <ImpactPage />
          </div>
        }
      />
      <Route
        path="/media"
        element={
          <div key={location.pathname} className="page-transition">
            <MediaPage />
          </div>
        }
      />
      <Route
        path="/past-events"
        element={
          <div key={location.pathname} className="page-transition">
            <PastEventsPage />
          </div>
        }
      />

      {/* Volunteer Routes - Swapped to match content */}
      <Route
        path="/volunteer"
        element={
          <div key={location.pathname} className="page-transition">
            <VolunteerApplicationPage />
          </div>
        }
      />
      <Route
        path="/volunteer/register"
        element={
          <div key={location.pathname} className="page-transition">
            <VolunteerPage />
          </div>
        }
      />

      <Route
        path="/venue"
        element={
          <div key={location.pathname} className="page-transition">
            <VenuePage />
          </div>
        }
      />
      <Route
        path="/faq"
        element={
          <div key={location.pathname} className="page-transition">
            <FAQPage />
          </div>
        }
      />

      {/* Legal */}
      <Route
        path="/privacy"
        element={
          <div key={location.pathname} className="page-transition">
            <PrivacyPolicyPage />
          </div>
        }
      />
      <Route
        path="/accessibility"
        element={
          <div key={location.pathname} className="page-transition">
            <AccessibilityPage />
          </div>
        }
      />
      <Route
        path="/code-of-conduct"
        element={
          <div key={location.pathname} className="page-transition">
            <CodeOfConductPage />
          </div>
        }
      />
      <Route
        path="/licensing"
        element={
          <div key={location.pathname} className="page-transition">
            <LicensingPage />
          </div>
        }
      />

      {/* Payment Routes (Sprint 03) */}
      <Route
        path="/payment/success"
        element={
          <div key={location.pathname} className="page-transition">
            <PaymentSuccessPage />
          </div>
        }
      />
      <Route
        path="/payment/fail"
        element={
          <div key={location.pathname} className="page-transition">
            <PaymentFailPage />
          </div>
        }
      />
      <Route
        path="/payment/cancel"
        element={
          <div key={location.pathname} className="page-transition">
            <PaymentCancelPage />
          </div>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div key={location.pathname} className="page-transition">
            <NotFoundPage />
          </div>
        }
      />
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <ScrollToTop />
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
