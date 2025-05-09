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
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  // Set animation library
  useEffect(() => {
    AOS.init({
      once: true, // only animate once
      offset: 0,
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <div>
      <GlobalStyles />
      <ScrollToTop />
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
        </Route>
        <Route element={<AddJob />} path="post-a-job" />
        <Route path="login" element={<Signin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
