
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import GenerateBill from "@/pages/GenerateBill";
import BillResult from "@/pages/BillResult";
import BillHistory from "@/pages/BillHistory";
import SearchMeter from "@/pages/SearchMeter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/generate-bill" element={
              <ProtectedRoute>
                <GenerateBill />
              </ProtectedRoute>
            } />
            <Route path="/bill-result" element={
              <ProtectedRoute>
                <BillResult />
              </ProtectedRoute>
            } />
            <Route path="/bill-history" element={
              <ProtectedRoute>
                <BillHistory />
              </ProtectedRoute>
            } />
            <Route path="/search-meter" element={
              <ProtectedRoute>
                <SearchMeter />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
