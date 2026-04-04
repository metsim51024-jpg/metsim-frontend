// src/components/QuoteForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FileText, CheckCircle, Upload } from "lucide-react";
import "./QuoteForm.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

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
    
    // Validar tamaño total (máx 50MB)
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 50 * 1024 * 1024) {
      toast.error("El tamaño total de archivos no debe exceder 50MB");
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
      toast.error("El nombre es requerido");
      return;
    }

    if (!formData.client_email.trim()) {
      toast.error("El email es requerido");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.client_email)) {
      toast.error("Email inválido");
      return;
    }

    if (!formData.client_phone.trim()) {
      toast.error("El teléfono es requerido");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("La descripción es requerida");
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear FormData
      const formDataToSend = new FormData();
      formDataToSend.append("client_name", formData.client_name);
      formDataToSend.append("client_email", formData.client_email);
      formDataToSend.append("client_phone", formData.client_phone);
      formDataToSend.append("description", formData.description);

      // Agregar archivos
      formData.files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      console.log("📤 Enviando cotización a:", `${API}/quotes`);

      const response = await axios.post(`${API}/quotes`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        timeout: 60000
      });

      console.log("✅ Respuesta del servidor:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        toast.success("¡Cotización enviada correctamente!");

        // Limpiar formulario después de 2 segundos
        setTimeout(() => {
          setFormData({
            description: "",
            client_name: "",
            client_email: "",
            client_phone: "",
            files: []
          });
          setSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Error completo:", error);

      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        const errorMsg = error.response.data?.message || error.response.data?.detail || "Error del servidor";
        toast.error(`Error: ${errorMsg}`);
      } else if (error.request) {
        console.error("Sin respuesta del servidor");
        toast.error("No se pudo conectar al servidor. Intenta nuevamente.");
      } else {
        console.error("Error:", error.message);
        toast.error("Error al enviar la cotización");
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
              Describe tu proyecto. Nuestros expertos te enviarán un presupuesto sin costo ni compromiso.
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
                  placeholder="Describe las especificaciones, materiales, dimensiones..."
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

              {/* SUBIDA DE ARCHIVOS */}
              <div className="form-group">
                <label htmlFor="files" className="file-upload-label">
                  <Upload size={20} />
                  Adjuntar Archivos (Opcional - Máx 50MB)
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.doc,.docx"
                  className="file-input"
                />
                {formData.files.length > 0 && (
                  <div className="attached-files">
                    <p className="files-label">📎 Archivos adjuntos:</p>
                    {formData.files.map((file, idx) => (
                      <span key={idx} className="file-tag">
                        {file.name} ({(file.size / 1024).toFixed(2)}KB)
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
                ⏱️ Respuesta en menos de 24 horas hábiles
              </p>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>¡Presupuesto Solicitado!</h3>
              <p>
                Hemos recibido tu solicitud. Nuestro equipo se contactará contigo pronto.
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
            <p>Presupuestos gratuitos y sin compromiso</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">🎯</div>
            <h4>Exactitud</h4>
            <p>Cotizaciones detalladas completas</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">👥</div>
            <h4>Expertos</h4>
            <p>Equipo especializado en metalurgia</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;