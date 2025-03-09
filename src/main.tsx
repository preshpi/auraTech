import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProviderWrapper from "./components/ProviderWrapper.tsx";
import { Toaster } from "sonner";
import AuthContextProvider from "./context/Auth.Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <AuthContextProvider>
        <App />
        <Toaster richColors position="top-right" />
      </AuthContextProvider>
    </ProviderWrapper>
  </StrictMode>
);
