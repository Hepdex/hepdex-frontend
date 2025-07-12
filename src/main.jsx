import App from "./App.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ErrorFallback from "./components/ErrorFallback.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
);
