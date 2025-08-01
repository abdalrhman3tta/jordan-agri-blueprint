import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import NewApplication from "./pages/farmer/NewApplication";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/farmer" element={<Layout><ProtectedRoute requiredRole="farmer"><FarmerDashboard /></ProtectedRoute></Layout>} />
            <Route path="/farmer/applications/new" element={<Layout><ProtectedRoute requiredRole="farmer"><NewApplication /></ProtectedRoute></Layout>} />
            <Route path="/employee" element={<Layout><ProtectedRoute requiredRole="employee"><EmployeeDashboard /></ProtectedRoute></Layout>} />
            <Route path="/admin" element={<Layout><ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
