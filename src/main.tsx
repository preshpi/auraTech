import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProviderWrapper from "./components/ProviderWrapper.tsx";
import { Toaster } from "sonner";
import AuthContextProvider from "./context/Auth.Context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { FilterContextProvider } from "./context/Filter.Context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <AuthContextProvider>
        <FilterContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster richColors position="top-right" />
          </QueryClientProvider>
        </FilterContextProvider>
      </AuthContextProvider>
    </ProviderWrapper>
  </StrictMode>
);
