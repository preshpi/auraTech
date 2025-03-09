import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ProviderWrapper from "./components/ProviderWrapper.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import { FilterContextProvider } from "./context/Filter.Context.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <FilterContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </FilterContextProvider>
    </ProviderWrapper>
  </StrictMode>
);
