import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";
import "../styles/AdminLogin.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
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
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, formData);
      
      if (response.data.access_token) {
        localStorage.setItem("admin_token", response.data.access_token);
        toast.success("¡Bienvenido!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Credenciales incorrectas");
      } else if (error.response?.status === 400) {
        toast.error("Usuario o contraseña inválidos");
      } else {
        toast.error("Error al conectar con el servidor");
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
              src="https://i.ibb.co/fYjtsMdc/LOGO-FONDO-NEGRO.png"
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