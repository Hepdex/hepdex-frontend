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
import ViewJob from "./pages/ViewJob";
import Sourcing from "./pages/Sourcing";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "./lib/apiUser";
import { useUserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";

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
      AOS.refreshHard();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname, loading]);
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
  if (loading) return <div></div>;
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
          <Route path="home" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="company-bio" element={<Company />} />
          <Route path="jobs/:jobID" element={<ViewJob />} />
          <Route path="browse-talent" element={<Sourcing />} />
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
        </Route>
        <Route path="login" element={<Signin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
