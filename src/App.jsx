import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./GlobalStyles";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Requirements from "./pages/Requirements";

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
      </Routes>
    </div>
  );
}
