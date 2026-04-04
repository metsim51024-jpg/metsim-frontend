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
    attachments: []
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
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("client_name", formData.client_name);
      formDataToSend.append("client_email", formData.client_email);
      formDataToSend.append("client_phone", formData.client_phone);

      // Agregar archivos
      formData.attachments.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const response = await axios.post(`${API}/quotes`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        setSubmitted(true);
        toast.success("¡Solicitud enviada correctamente!");

        setTimeout(() => {
          setFormData({
            description: "",
            client_name: "",
            client_email: "",
            client_phone: "",
            attachments: []
          });
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Error al enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quotes" className="quote-section">
      <div className="quote-container">
        {/* Left: Form */}
        <div className="quote-form-wrapper">
          <div className="quote-header">
            <span className="section-badge">[ PRESUPUESTO ]</span>
            <h2 className="section-title">Solicita tu Presupuesto</h2>
            <p className="section-description">
              Describe tu proyecto y adjunta tus planos o imágenes. Nuestros expertos te enviarán un presupuesto detallado sin costo ni compromiso.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-group large">
                <label htmlFor="description">Descripción del Proyecto</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe las especificaciones, materiales, dimensiones y cualquier detalle relevante de tu proyecto..."
                  className="form-textarea"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="client_name">Nombre Completo</label>
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
                  <label htmlFor="client_email">Email</label>
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
                <label htmlFor="client_phone">Teléfono de Contacto</label>
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

              {/* File Upload */}
              <div className="form-group">
                <label htmlFor="attachments" className="file-upload-label">
                  <Upload size={20} />
                  Adjuntar Archivos (DWG, PDF, Imágenes)
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleFileChange}
                  multiple
                  accept=".dwg,.pdf,.jpg,.jpeg,.png,.gif"
                  className="file-input"
                />
                {formData.attachments.length > 0 && (
                  <div className="attached-files">
                    <p className="files-label">Archivos adjuntos:</p>
                    {formData.attachments.map((file, idx) => (
                      <span key={idx} className="file-tag">
                        📎 {file.name}
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
                ⏱️ Respuesta típica dentro de 24 horas hábiles
              </p>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>¡Presupuesto Solicitado!</h3>
              <p>
                Hemos recibido tu solicitud con los archivos adjuntos. Nuestro equipo analizará los detalles y se pondrá en contacto contigo pronto.
              </p>
              <div className="success-details">
                <p><strong>Email:</strong> {formData.client_email}</p>
                <p><strong>Teléfono:</strong> {formData.client_phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Benefits */}
        <div className="quote-benefits">
          <div className="benefits-card">
            <div className="benefit-icon">⚡</div>
            <h4>Respuesta Rápida</h4>
            <p>Análisis de tu proyecto en menos de 24 horas</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">💰</div>
            <h4>Sin Costo</h4>
            <p>Presupuestos completamente gratuitos y sin compromiso</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">🎯</div>
            <h4>Exactitud</h4>
            <p>Cotizaciones detalladas con desglose completo</p>
          </div>

          <div className="benefits-card">
            <div className="benefit-icon">👥</div>
            <h4>Expertos</h4>
            <p>Equipo especializado en metalurgia industrial</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;