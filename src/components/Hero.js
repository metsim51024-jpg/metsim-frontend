import React, { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import "./Hero.css";

function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToQuotes = () => {
    const quotesSection = document.getElementById("quotes");
    if (quotesSection) {
      quotesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="inicio">
      {/* Animated Background */}
      <div 
        className="hero-bg-animated" 
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      ></div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">SOLUCIONES METALÚRGICAS LÍDERES</span>
          </div>

          <h1 className="hero-title">
            Fabricación Industrial de
            <span className="hero-highlight"> Excelencia</span>
          </h1>

          <p className="hero-description">
            Estructuras metálicas y equipos electromecánicos diseñados con simulación y análisis de ingeniería avanzada para máxima durabilidad y rendimiento industrial.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToQuotes}>
              <span>Solicitar Cotización</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">
              <Play size={20} />
              <span>Ver Portafolio</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Simulación Estructural</div>
            </div>
            <div className="stat">
              <div className="stat-number">30+</div>
              <div className="stat-label">Proyectos Bien Planificados</div>
            </div>
            <div className="stat">
              <div className="stat-number">ISO</div>
              <div className="stat-label">Estándares de Calidad</div>
            </div>
          </div>
        </div>

        {/* LOGO METSIM - ADAPTADO */}
        <div className="hero-visual">
          <div className="hero-image-container">
            <img
              src="https://res.cloudinary.com/dk6wclcew/image/upload/v1775055928/LOGO_FONDO_NEGRO_uu3uf5.png"
              alt="Logo METSIM Solutions"
              className="hero-image logo-image"
            />
            <div className="hero-image-glow"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
        <p>Desplázate para explorar</p>
      </div>
    </section>
  );
}

export default Hero;