import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProviderWrapper from "./components/ProviderWrapper.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <App />
      <Toaster richColors position="top-right" />
    </ProviderWrapper>
  </StrictMode>
);
