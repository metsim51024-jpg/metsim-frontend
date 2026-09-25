import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Cpu, Wrench } from "lucide-react";
import "./Services.css";

function Services() {
  const navigate = useNavigate();
  const services = [
    {
      icon: <Zap size={32} />,
      title: "Estructuras Metálicas",
      description: "Galpones, naves industriales y entrepisos de acero diseñados con cálculo estructural AISC para proyectos en todo Paraguay.",
      features: ["Cálculo estructural AISC", "Acero A36 / A572", "Montaje incluido"],
      to: "/productos/estructuras-metalicas",
    },
    {
      icon: <Shield size={32} />,
      title: "Tanques Industriales",
      description: "Tanques metálicos para almacenamiento de agua, combustibles y líquidos industriales según norma API 650.",
      features: ["Norma API 650 / ASME", "500 L – 500.000 L", "Acero al carbono / Inox"],
      to: "/productos/tanques-metalicos",
    },
    {
      icon: <Cpu size={32} />,
      title: "Tratamiento de Aguas",
      description: "Sistemas DAF, floculadores tubulares y tamices rotativos para tratamiento de aguas industriales en Paraguay.",
      features: ["Sistema DAF integrado", "Floculador tubular", "Sin partes móviles"],
      to: "/productos/flotador-aire-disuelto",
    },
    {
      icon: <Wrench size={32} />,
      title: "Columnas e Iluminación",
      description: "Columnas metálicas telescópicas de 7 a 16m y brazos de alumbrado para proyectos MOPC, ANDE y municipalidades.",
      features: ["Norma IEC / ITAIPÚ / ANDE", "7 m a 16 m de altura", "Galvanizadas"],
      to: "/productos/columnas-metalicas",
    },
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

              <button className="service-btn" onClick={() => navigate(service.to || "/productos")}>Conocer más</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;