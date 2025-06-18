import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./GlobalStyles";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Requirements from "./pages/Requirements";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/Forgotpassword";
import AltLayout from "./layouts/AltLayout";
import EditJob from "./pages/EditJob";
import EditCompany from "./pages/EditCompany";
import Company from "./pages/Company";
import JobDetails from "./pages/JobDetails";
import Sourcing from "./pages/Sourcing";
import FindJobs from "./pages/FindJobs";
import UploadResume from "./pages/UploadResume";
import JobApplication from "./pages/JobApplication";
import Services from "./pages/Services";
import FindWork from "./pages/FindWork";
import Signup from "./pages/Signup";
import CompanySignup from "./pages/CompanySignup";
import EmployerSignup from "./pages/EmployerSignup";
import CandidateSignup from "./pages/CandidateSignup";
import AddBio from "./pages/AddBio";
import ConfirmEmail from "./pages/ConfirmEmail";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "./services/apiUser";
import { useUserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import CandidateBio from "./pages/CandidateBio";
import EditCandidate from "./pages/EditCandidate";
import Candidate from "./pages/Candidate";
import Contact from "./pages/Contact";

// Set emojis
polyfillCountryFlagEmojis();

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { setUser, setIsLoggedIn } = useUserContext();
  // Set animation library
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 0,
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  // Fetch user
  useEffect(() => {
    // Send request
    (async () => {
      try {
        // Set loading state
        setLoading(true);
        const response = await fetchUser();
        // Set user state
        if (response?.user) {
          setUser(response.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setIsLoggedIn, setUser]);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <GlobalStyles />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="share-requirement" element={<Requirements />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="find-work" element={<FindWork />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
          path="dashboard"
        >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:jobID" element={<JobDetails />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="company-bio" element={<Company />} />
          <Route path="browse-talent" element={<Sourcing />} />
          <Route path="browse-talent/:id" element={<Candidate />} />
          <Route path="find-jobs" element={<FindJobs />} />
          <Route path="find-jobs/:jobID" element={<JobApplication />} />
          <Route path="candidate-bio" element={<CandidateBio />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <AltLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<AddJob />} path="post-a-job" />
          <Route element={<EditJob />} path="edit-job/:jobID" />
          <Route element={<EditCompany />} path="edit-company" />
          <Route element={<UploadResume />} path="upload-resume" />
          <Route element={<EditCandidate />} path="edit-profile" />
        </Route>
        <Route path="login" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="employer/signup" element={<EmployerSignup />} />
        <Route path="candidate/signup" element={<CandidateSignup />} />
        <Route path="company/signup" element={<CompanySignup />} />
        <Route path="add-bio" element={<AddBio />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
