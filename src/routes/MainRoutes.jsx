import Home from "../pages/Home";
import ServicesPage from "../pages/Services";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact";
import Requirements from "../pages/Requirements";
import FindWork from "../pages/FindWork";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import Faqs from "../pages/Faqs";
import About from "../pages/About";
import { Route } from "react-router-dom";
import HireExperts from "../pages/HireExperts";

export default function MainRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route path="home" element={<Home />} />
      <Route path="share-requirement" element={<Requirements />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path="find-work" element={<FindWork />} />
      <Route path="faqs" element={<Faqs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-and-conditions" element={<TermsConditions />} />
      <Route path="about-us" element={<About />} />
      <Route path="hire-expert" element={<HireExperts />} />
    </Route>
  );
}
