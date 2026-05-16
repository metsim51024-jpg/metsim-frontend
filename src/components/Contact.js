import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import "./Contact.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.client_email)) {
        toast.error("Email inválido");
        setIsSubmitting(false);
        return;
      }

      console.log("📤 Enviando contacto a:", `${API}/quotes`);

      const response = await axios.post(`${API}/quotes`, {
        description: formData.description,
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_phone: formData.client_phone
      }, {
        timeout: 30000
      });

      console.log("✅ Respuesta recibida:", response.status, response.data);

      // Mostrar éxito
      setSubmitted(true);
      toast.success("¡Mensaje enviado correctamente! Revisa tu correo.");
      
      // Limpiar formulario
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        description: ""
      });

      // Resetear después de 3 segundos
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("❌ Error completo:", error);
      
      // Manejo de errores mejorado
      if (error.code === 'ECONNABORTED') {
        toast.error("⏱️ Tiempo de espera agotado. Intenta nuevamente.");
      } else if (error.response?.status === 503) {
        toast.error("⚠️ Servidor no disponible. Intenta en 1 minuto.");
      } else if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.response?.status >= 500) {
        toast.error("Error en el servidor. Por favor intenta más tarde.");
      } else {
        toast.error("Error al enviar. Verifica tu conexión e intenta nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      label: "Teléfono",
      value: "+595 (994) 685-767",
      link: "tel:+595994685767"
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "presupuestos@metsim.com.py",
      link: "mailto:presupuestos@metsim.com.py"
    },
    {
      icon: <MapPin size={24} />,
      label: "Ubicación",
      value: "Avda. Carlos Morphi casi Concepción",
      link: "#"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contacto | METSIM Solutions Paraguay</title>
        <meta name="description" content="Contáctenos en METSIM Solutions, Asunción, Paraguay. Llame al +595 972 834-336 o escriba por WhatsApp para consultas de ingeniería y tecnología." />
        <link rel="canonical" href="https://www.metsim.com.py/contacto" />
        <meta property="og:url" content="https://www.metsim.com.py/contacto" />
        <meta property="og:title" content="Contacto | METSIM Solutions" />
        <meta property="og:description" content="Contáctenos para consultas de ingeniería en Paraguay." />
      </Helmet>
    <section id="contacto" className="contact">
      <div className="contact-container">
        {/* Left: Contact Info */}
        <div className="contact-info-wrapper">
          <h2 className="section-title">Ponte en Contacto</h2>
          <p className="section-description">
            ¿Tienes preguntas o necesitas más información? Nuestro equipo está listo para ayudarte.
          </p>

          <div className="contact-info-list">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.link}
                className="contact-info-item"
              >
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <p className="info-label">{info.label}</p>
                  <p className="info-value">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="contact-hours">
            <h4>Horarios de Atención</h4>
            <p>Lunes a Viernes: 7:30 AM - 5:00 PM</p>
            <p>Sábado: 8:00 AM - 12:00 PM</p>
            <p className="closed">Domingo: Cerrado</p>
          </div>
        </div>

        {/* Right: Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleChange}
                  required
                  placeholder="+595 11 1234-5678"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                className="form-textarea"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
              {!isSubmitting && <Send size={20} />}
            </button>
          </form>
        ) : (
          <div className="contact-form success-message">
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>¡Mensaje Enviado Correctamente!</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Hemos recibido tu mensaje y nos pondremos en contacto pronto.<br/>
                Revisa tu correo: <strong>{formData.client_email}</strong>
              </p>
              <p style={{ color: '#999', fontSize: '14px' }}>
                Esperamos tu respuesta en menos de 24 horas.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}