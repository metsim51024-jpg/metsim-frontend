import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./components/Contact";      // ← AGREGADA
import QuoteForm from "./components/QuoteForm";  // ← AGREGADA
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "sonner";
import "./App.css";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/cotizacion" element={<QuoteForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;