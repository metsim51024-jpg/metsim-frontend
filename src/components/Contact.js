import React, { useState } from "react";
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

      console.log("Enviando contacto a:", `${API}/quotes`);

      const response = await axios.post(`${API}/quotes`, {
        description: formData.description,
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_phone: formData.client_phone
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("¡Mensaje enviado correctamente!");
        setFormData({
          client_name: "",
          client_email: "",
          client_phone: "",
          description: ""
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Error al enviar"}`);
      } else {
        toast.error("Error al conectar con el servidor");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      label: "Teléfono",
      value: "+595 (972) 834-336",
      link: "tel:+595972834336"
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
      </div>
    </section>
  );
}