import GlobalStyles from "./GlobalStyles";
import Home from "./pages/Home";
import AOS from "aos";
import MainLayout from "./layouts/MainLayout";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  // Set animation library
  useEffect(() => {
    AOS.init({
      once: true, // only animate once
      offset: 0,
    });

    // Delay refresh to ensure DOM is fully loaded
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);
  return (
    <div>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route element={<MainLayout />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
