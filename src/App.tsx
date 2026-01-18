import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./Layouts/MainLayout";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/ai-tools">
  <Routes>

    {/* Layout Wrapper */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pricing" element={<PricingPage />} />
    </Route>

    {/* Pages WITHOUT header/footer */}
    <Route path="/auth" element={<AuthPage />} />

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />

  </Routes>
</BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
