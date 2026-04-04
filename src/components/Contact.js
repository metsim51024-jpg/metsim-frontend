import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_CONFIG } from "../config/company";
import "./Contact.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
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
      await axios.post(`${API}/quotes`, formData);
      toast.success("¡Mensaje enviado correctamente!");
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        description: ""
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      label: "Teléfono",
      value: COMPANY_CONFIG.phone,
      link: `tel:${COMPANY_CONFIG.whatsapp}`
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: COMPANY_CONFIG.email,
      link: `mailto:${COMPANY_CONFIG.email}`
    },
    {
      icon: <MapPin size={24} />,
      label: "Ubicación",
      value: COMPANY_CONFIG.address,
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
            <p>Lunes a Viernes: {COMPANY_CONFIG.hours.weekday}</p>
            <p>Sábado: {COMPANY_CONFIG.hours.saturday}</p>
            <p className="closed">Domingo: {COMPANY_CONFIG.hours.sunday}</p>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="client_name">Nombre Completo</label>
            <input
              type="text"
              id="client_name"
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
              <label htmlFor="client_email">Email</label>
              <input
                type="email"
                id="client_email"
                name="client_email"
                value={formData.client_email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="client_phone">Teléfono</label>
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
          </div>

          <div className="form-group">
            <label htmlFor="description">Mensaje</label>
            <textarea
              id="description"
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