import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import "../styles/AdminLogin.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.username.trim()) {
      toast.error("Usuario requerido");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Contraseña requerida");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Intentando login a:", `${API}/admin/login`);
      
      const response = await axios.post(`${API}/admin/login`, 
        {
          username: formData.username.trim(),
          password: formData.password.trim()
        },
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      console.log("✅ Respuesta de login:", response.status);
      
      if (response.data && (response.data.access_token || response.data.token)) {
        const token = response.data.access_token || response.data.token;
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_user", formData.username);
        
        toast.success("¡Bienvenido al panel administrativo!");
        
        // Pequeño delay para que el toast se vea
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        toast.error("Respuesta inválida del servidor");
      }
    } catch (error) {
      console.error("❌ Error completo:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error("⏱️ Tiempo de conexión agotado. Intenta nuevamente.");
      } else if (error.response?.status === 401) {
        toast.error("❌ Usuario o contraseña incorrectos");
      } else if (error.response?.status === 400) {
        toast.error("❌ Datos inválidos. Verifica usuario y contraseña");
      } else if (error.response?.status === 500) {
        toast.error("❌ Error del servidor. Intenta más tarde");
      } else if (!error.response) {
        toast.error("❌ No se puede conectar con el servidor. Verifica la URL del backend");
      } else {
        toast.error("❌ Error al conectar con el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img
              src="https://res.cloudinary.com/dk6wclcew/image/upload/v1775063931/metsim_logo-1_wrsnco.png"
              alt="METSIM"
              className="login-logo"
            />
            <h1 className="login-title">Panel Administrativo</h1>
            <p className="login-subtitle">METSIM SOLUTIONS</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu usuario"
                  className="form-input"
                  data-testid="admin-username-input"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu contraseña"
                  className="form-input"
                  data-testid="admin-password-input"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
              data-testid="admin-login-button"
            >
              {isLoading ? "INGRESANDO..." : "INGRESAR"}
            </button>

            <p className="login-help">
              ¿Problemas para acceder? Contacta al administrador
            </p>
          </form>

          <div className="login-info">
            <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '20px' }}>
              Usuario: <strong>admin</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="back-button"
        >
          ← Volver al sitio
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;