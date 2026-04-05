// src/components/QuoteForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FileText, CheckCircle, Upload } from "lucide-react";
import "./QuoteForm.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API_URL = `${BACKEND_URL}/api`;

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    
    if (totalSize > 50 * 1024 * 1024) {
      toast.error("Máximo 50MB de archivos");
      return;
    }

    setFormData({
      ...formData,
      files: selectedFiles
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.client_name.trim()) {
      toast.error("Nombre requerido");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.client_email)) {
      toast.error("Email inválido");
      return;
    }

    if (!formData.client_phone.trim()) {
      toast.error("Teléfono requerido");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Descripción requerida");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("client_name", formData.client_name.trim());
      formDataToSend.append("client_email", formData.client_email.trim());
      formDataToSend.append("client_phone", formData.client_phone.trim());
      formDataToSend.append("description", formData.description.trim());

      // Agregar archivos
      formData.files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const API_ENDPOINT = `${API_URL}/quotes`;
      console.log("📤 Enviando a:", API_ENDPOINT);

      const response = await axios.post(API_ENDPOINT, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        timeout: 60000 // 60 segundos
      });

      console.log("✅ Respuesta exitosa:", response.data);

      setSubmitted(true);
      toast.success("¡Cotización enviada exitosamente!");

      setTimeout(() => {
        setFormData({
          description: "",
          client_name: "",
          client_email: "",
          client_phone: "",
          files: []
        });
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("❌ Error completo:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });

      // Diferentes tipos de errores
      if (error.code === 'ECONNABORTED') {
        toast.error("⏱️ Tiempo de espera agotado (60s). Intenta nuevamente.");
      } else if (error.response?.status === 503) {
        toast.error("⚠️ Base de datos no disponible. Por favor intenta en 1 minuto.");
      } else if (error.response?.status === 504) {
        toast.error("⏱️ Servidor tardó demasiado respondiendo. Intenta nuevamente.");
      } else if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.message === 'Network Error') {
        toast.error("❌ Error de conexión. Verifica tu internet.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quotes" className="quote-section">
      <div className="quote-container">
        {/* FORMULARIO */}
        <div className="quote-form-wrapper">
          <div className="quote-header">
            <span className="section-badge">[ PRESUPUESTO ]</span>
            <h2 className="section-title">Solicita tu Presupuesto</h2>
            <p className="section-description">
              Describe tu proyecto. Nuestros expertos te enviarán un presupuesto sin costo.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-group large">
                <label htmlFor="description">Descripción del Proyecto *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe especificaciones, materiales, dimensiones..."
                  className="form-textarea"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="client_name">Nombre Completo *</label>
                  <input
                    type="text"
                    id="client_name"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    placeholder="Juan Pérez"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="client_email">Email *</label>
                  <input
                    type="email"
                    id="client_email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleChange}
                    required
                    placeholder="juan@empresa.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="client_phone">Teléfono *</label>
                <input
                  type="tel"
                  id="client_phone"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleChange}
                  required
                  placeholder="+595 11 1234-5678"
                  className="form-input"
                />
              </div>

              {/* ARCHIVOS */}
              <div className="form-group">
                <label htmlFor="files" className="file-upload-label">
                  <Upload size={20} />
                  Adjuntar Archivos (Opcional)
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx"
                  className="file-input"
                />
                {formData.files.length > 0 && (
                  <div className="attached-files">
                    <p className="files-label">📎 Archivos:</p>
                    {formData.files.map((file, idx) => (
                      <span key={idx} className="file-tag">
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "ENVIANDO..." : "SOLICITAR PRESUPUESTO"}
                {!isSubmitting && <FileText size={20} />}
              </button>

              <p className="form-note">
                ⏱️ Respuesta en menos de 24 horas
              </p>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>¡Presupuesto Solicitado!</h3>
              <p>
                Hemos recibido tu solicitud. Nuestro equipo se contactará pronto.
              </p>
              <div className="success-details">
                <p><strong>Email:</strong> {formData.client_email}</p>
                <p><strong>Teléfono:</strong> {formData.client_phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* BENEFICIOS */}
        <div className="quote-benefits">
          <div className="benefits-card">
            <div className="benefit-icon">⚡</div>
            <h4>Respuesta Rápida</h4>
            <p>Análisis en menos de 24 horas</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">💰</div>
            <h4>Sin Costo</h4>
            <p>Presupuestos gratuitos</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">🎯</div>
            <h4>Exactitud</h4>
            <p>Cotizaciones detalladas</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">👥</div>
            <h4>Expertos</h4>
            <p>Equipo especializado</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;