import React from "react";
import { Zap, Shield, Cpu, Wrench } from "lucide-react";
import "./Services.css";

function Services() {
  const services = [
    {
      icon: <Zap size={32} />,
      title: "Estructuras Metálicas",
      description: "Fabricación industrial de alta resistencia para proyectos de envergadura.",
      features: ["Diseño personalizado", "Acero de calidad", "Entrega rápida"]
    },
    {
      icon: <Shield size={32} />,
      title: "Tanques Industriales",
      description: "Construcción especializada para líquidos, gases y materiales peligrosos.",
      features: ["Certificaciones", "Durabilidad", "Seguridad garantizada"]
    },
    {
      icon: <Cpu size={32} />,
      title: "Piezas Metálicas",
      description: "Manufactura de precisión para maquinaria y equipos industriales.",
      features: ["Tolerancias estrictas", "CNC moderno", "Control de calidad"]
    },
    {
      icon: <Wrench size={32} />,
      title: "Instalaciones",
      description: "Montaje y servicio técnico con profesionales especializados.",
      features: ["Equipo capacitado", "Garantía", "Soporte técnico"]
    }
  ];

  return (
    <section className="services" id="servicios">
      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <span className="section-badge">[ SERVICIOS ]</span>
          <h2 className="section-title">Soluciones Especializadas</h2>
          <p className="section-description">
            Ofrecemos una gama completa de servicios metalúrgicos para satisfacer las necesidades más exigentes de la industria.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-container">
                <div className="service-icon">{service.icon}</div>
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-feature">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="service-btn">Conocer más</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;