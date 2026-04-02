import React from "react";
import { CheckCircle, Award, Zap } from "lucide-react";
import "./About.css";

function About() {
  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: "Diseño Estructural",
      description: "Análisis y simulación de estructuras metálicas con metodologías avanzadas de ingeniería"
    },
    {
      icon: <Zap size={24} />,
      title: "Equipos Electromecánicos",
      description: "Fabricación de equipos robustos y eficientes bajo estándares industriales internacionales"
    },
    {
      icon: <Award size={24} />,
      title: "Control de Calidad",
      description: "Inspección rigurosa en cada etapa del proceso para garantizar excelencia en entrega"
    }
  ];

  return (
    <section className="about" id="nosotros">
      <div className="about-container">
        {/* Left: Video METSIM */}
        <div className="about-image">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="about-video"
          >
            <source 
              src="https://res.cloudinary.com/dk6wclcew/video/upload/v1775049059/video_metsim_inicio_eig393.mov" 
              type="video/quicktime"
            />
            <source 
              src="https://res.cloudinary.com/dk6wclcew/video/upload/v1775049059/video_metsim_inicio_eig393.mov" 
              type="video/mp4"
            />
            {/* Fallback imagen */}
            <img
              src="https://via.placeholder.com/600x500/0f172a/22d3ee?text=METSIM+Solutions"
              alt="Equipo de Ingeniería METSIM"
              className="about-img"
            />
          </video>
          <div className="about-image-badge">
            Expertos en Ingeniería Aplicada
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content">
          <span className="section-badge">[ QUIÉNES SOMOS ]</span>
          <h2 className="section-title">METSIM Solutions</h2>
          <p className="section-subtitle">
            Especializados en soluciones metalúrgicas de precisión
          </p>

          <p className="about-description">
            Nos dedicamos a diseñar y fabricar estructuras metálicas y equipos electromecánicos de alta complejidad. Nuestro equipo de ingenieros aplica metodologías avanzadas de análisis y simulación para garantizar que cada proyecto cumpla con los más exigentes estándares de calidad y seguridad industrial.
          </p>

          <p className="about-description">
            Desde la conceptualización hasta la entrega, trabajamos con procesos de fabricación rigurosos que aseguran precisión, durabilidad y máximo rendimiento en operaciones industriales críticas.
          </p>

          <div className="about-features">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-cta">
            <a href="#proyectos" className="cta-link">
              Ver nuestros proyectos →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;