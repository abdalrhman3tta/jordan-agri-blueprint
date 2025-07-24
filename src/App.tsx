import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/farmer" element={<Layout><FarmerDashboard /></Layout>} />
          <Route path="/employee" element={<Layout><div className="container mx-auto px-4 py-8"><h1 className="text-2xl">Employee Portal Coming Soon</h1></div></Layout>} />
          <Route path="/services" element={<Layout><div className="container mx-auto px-4 py-8"><h1 className="text-2xl">Services Coming Soon</h1></div></Layout>} />
          <Route path="/about" element={<Layout><div className="container mx-auto px-4 py-8"><h1 className="text-2xl">About Coming Soon</h1></div></Layout>} />
          <Route path="/contact" element={<Layout><div className="container mx-auto px-4 py-8"><h1 className="text-2xl">Contact Coming Soon</h1></div></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
