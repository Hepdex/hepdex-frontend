import { createContext, useContext, useState } from "react";

// Create context
const TabContext = createContext();

// Use context
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (context === undefined)
    throw new Error("TabContext was used outside provider");
  return context;
};

// Tab
function Tab({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  // Change
  const setTab = setActive;
  return (
    <TabContext.Provider value={{ active, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

// Button
function Button({ opens, children }) {
  const { setTab, active } = useTabContext();
  return (
    <button
      className={`${active === opens ? "active" : ""}`}
      onClick={() => setTab(opens)}
    >
      {children}
    </button>
  );
}

// Window
function Window({ name, children }) {
  const { active } = useTabContext();
  if (name !== active) return null;
  return <div>{children}</div>;
}

Tab.Button = Button;
Tab.Window = Window;
export default Tab;
