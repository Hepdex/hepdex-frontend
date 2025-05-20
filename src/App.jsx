import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./GlobalStyles";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Requirements from "./pages/Requirements";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/Forgotpassword";
import useQuery from "./hooks/useQuery";
import AltLayout from "./layouts/AltLayout";
import EditJob from "./pages/EditJob";
import EditCompany from "./pages/EditCompany";
import Company from "./pages/Company";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "./lib/apiUser";
import { useUserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import ViewJob from "./pages/ViewJob";
export default function App() {
  const location = useLocation();
  const [user, pending] = useQuery(fetchUser);
  const [loading, setLoading] = useState(true);
  const { setUser } = useUserContext();
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
    // Set user state
    if (user) setUser(user.user);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [user, setUser]);
  if (pending || loading) return <div>Loading...</div>;
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
        <Route element={<DashboardLayout />} path="dashboard">
          <Route index element={<Navigate replace to="home" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="company-bio" element={<Company />} />
          <Route path="jobs/:jobID" element={<ViewJob />} />
        </Route>
        <Route element={<AltLayout />}>
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
