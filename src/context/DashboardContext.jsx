import { createContext, useContext, useState } from "react";

// Dashboard context
const DashboardContext = createContext(undefined);

export default function DashboardContextProvider({ children }) {
  // Main nav
  const [isNavOpen, setIsNavOpen] = useState(true);
  // Mobile nav
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // Toggle nav
  const toggleNav = () => setIsNavOpen((v) => !v);
  // Toggle mobile nav
  const toggleMobileNav = () => setIsMobileNavOpen((v) => !v);
  return (
    <DashboardContext.Provider
      value={{
        isMobileNavOpen,
        toggleNav,
        isNavOpen,
        setIsNavOpen,
        toggleMobileNav,
        setIsMobileNavOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// Use dashboard context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error("DashboardContext was used outside provider");
  return context;
};
