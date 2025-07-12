import AOS from "aos";
import "aos/dist/aos.css";
import GlobalStyles from "./GlobalStyles";
import AltRoutes from "./routes/AltRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import MainRoutes from "./routes/MainRoutes";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "./context/UserContext";
import { fetchUser } from "./services/apiUser";

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
          // Set user
          setUser(response.user);
          // Set logged in state
          setIsLoggedIn(true);
        }
      } catch (err) {
        // Error
        console.log(err.message);
      } finally {
        // Set loading state
        setLoading(false);
      }
    })();
  }, [setIsLoggedIn, setUser]);
  if (loading) return <Preloader />;
  return (
    <div>
      <GlobalStyles />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        {MainRoutes()}
        {DashboardRoutes()}
        {AltRoutes()}
        {AuthRoutes()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
