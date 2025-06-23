import { createContext, useContext, useState } from "react";

// User context
const UserContext = createContext(undefined);

export default function UserContextProvider({ children }) {
  // User state
  const [user, setUser] = useState(null);

  // Is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Use user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside provider");
  return context;
};
