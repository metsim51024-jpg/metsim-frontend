import React, { useEffect, useRef } from "react";
import { CheckCircle, Award, Zap } from "lucide-react";
import "./About.css";

// El original era un .mov HEVC de 39,5 MB: Chrome en Windows y la mayoria de
// los Android no lo reproducen, y se descargaba entero al abrir la home.
// Cloudinary lo entrega convertido: H.264, 640 px, 500 kbps, sin audio (1,5 MB).
const CLD = "https://res.cloudinary.com/dk6wclcew/video/upload";
const VIDEO_ID = "v1775049059/video_metsim_inicio_eig393";
const VIDEO_MP4 = `${CLD}/f_mp4,vc_h264,ac_none,w_640,br_500k,fps_24/${VIDEO_ID}.mp4`;
const VIDEO_POSTER = `${CLD}/so_2,w_640,f_auto,q_auto/${VIDEO_ID}.jpg`;

function About() {
  const videoRef = useRef(null);

  // No se descarga al abrir la pagina: arranca recien cuando la seccion entra en
  // pantalla y se pausa al salir. Con "reducir movimiento" queda el poster fijo.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

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
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster={VIDEO_POSTER}
            className="about-video"
            aria-label="Fabricación y montaje en la planta de METSIM"
          >
            <source src={VIDEO_MP4} type="video/mp4" />
            <img
              src="/logo512.png"
              alt="METSIM Solutions — Fabricación industrial en Paraguay"
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
          <h2 className="section-title">Fabricación Industrial en Paraguay</h2>
          <p className="section-subtitle">
            METSIM Solutions — especializados en soluciones metalúrgicas de precisión
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