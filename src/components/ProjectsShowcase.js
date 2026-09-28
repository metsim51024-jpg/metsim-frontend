import React, { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectsShowcase.css";

// Fotos del portafolio, optimizadas en public/images/proyectos/ (WebP, 640 y
// 1200 px de ancho). Las originales pesaban 127 MB en total y el carrusel las
// carga todas juntas; en WebP son 0,9 MB. Cada tarjeta se ve a ~600 px como
// maximo, asi que 1200 alcanza para pantallas de alta densidad.
const FOTOS = "/images/proyectos";
// la unica original mas angosta que 1200 px
const ANCHO_REAL = { "instalacion-de-paneles-solares-2": 900 };
const fotoSrcSet = (base) =>
  `${FOTOS}/${base}-640.webp 640w, ${FOTOS}/${base}-1200.webp ${ANCHO_REAL[base] || 1200}w`;

function ProjectsShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const projects = [
    {
      id: 1,
      title: "Instalaciones Industriales",
      description: "Montaje y puesta en marcha de equipos electromecanicos de última tecnología",
      images: [
        "instalacion-industrial-13",
        "instalacion-industrial-14",
        "instalacion-industrial-15",
        "instalacion-industrial-16",
      ],
      video: "https://res.cloudinary.com/dk6wclcew/video/upload/f_mp4,vc_h264,q_auto,w_1280/v1774546766/INSTALACION_INDUSTRIAL_VIDEO_c4aduh.mp4",
      icon: "⚙️",
      features: ["Montaje profesional", "Equipos de calidad", "Certificación internacional"]
    },
    {
      id: 2,
      title: "Fabricación de Piezas Metálicas",
      description: "Piezas con precisión milimétrica para maquinaria industrial",
      images: [
        "piezas-metalicas",
        "piezas-metalicas-2",
        "piezas-metalicas-3",
        "piezas-metalicas-4"
      ],
      video: null,
      icon: "🔧",
      features: ["Tolerancias estrictas", "CNC moderno", "Control de calidad"]
    },
    {
      id: 3,
      title: "Fabricación de Estructuras Metálicas",
      description: "Estructuras de acero de alta resistencia para construcciones complejas",
      images: [
        "instalacion-de-paneles-solares-2",
        "instalaciones-de-paneles-solares"
      ],
      video: null,
      icon: "🏗️",
      features: ["Diseño personalizado", "Acero certificado", "Soldadura de calidad"]
    },
    {
      id: 4,
      title: "Fabricación de Tamiz Rotativo de Finos",
      description: "Equipos especializados para separación y clasificación de materiales",
      images: [
        "tamiz-5",
        "tamiz-2",
        "tamiz-3",
        "tamiz-7"
      ],
      video: null,
      icon: "🔄",
      features: ["Rotación eficiente", "Bajo mantenimiento", "Alta capacidad"]
    }
  ];

  // SOLO click en flechas - SIN MOUSE MOVE
  const handleNextImage = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    const currentIndex = currentImageIndex[projectId] || 0;
    setCurrentImageIndex({
      ...currentImageIndex,
      [projectId]: (currentIndex + 1) % project.images.length
    });
  };

  const handlePrevImage = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    const currentIndex = currentImageIndex[projectId] || 0;
    setCurrentImageIndex({
      ...currentImageIndex,
      [projectId]: (currentIndex - 1 + project.images.length) % project.images.length
    });
  };

  return (
    <section className="projects-showcase" id="proyectos">
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <span className="section-badge">[ PORTAFOLIO ]</span>
          <h2 className="section-title">Nuestros Proyectos</h2>
          <p className="section-description">
            Conoce los servicios especializados que ofrecemos a la industria. Usa las flechas para cambiar de imagen.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => {
            const currentImageIdx = currentImageIndex[project.id] || 0;
            const currentImage = project.images[currentImageIdx];

            return (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  {project.images.map((img, imgIdx) => (
                    <img
                      key={img}
                      src={`${FOTOS}/${img}-640.webp`}
                      srcSet={fotoSrcSet(img)}
                      sizes="(max-width: 768px) 100vw, 600px"
                      decoding="async"
                      alt={`${project.title} — imagen ${imgIdx + 1} de ${project.images.length}`}
                      className={`project-image${imgIdx === currentImageIdx ? " active" : ""}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300/1a1f3a/22d3ee?text=" + encodeURIComponent(project.title);
                      }}
                    />
                  ))}

                  {/* Navigation Buttons - SOLO CLICK */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        className="image-nav-btn prev"
                        onClick={() => handlePrevImage(project.id)}
                        aria-label="Imagen anterior"
                        title="Anterior"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        className="image-nav-btn next"
                        onClick={() => handleNextImage(project.id)}
                        aria-label="Siguiente imagen"
                        title="Siguiente"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="image-counter">
                        {currentImageIdx + 1} / {project.images.length}
                      </div>
                    </>
                  )}

                  {/* Play Button para video */}
                  <div className="project-overlay">
                    {project.video && (
                      <button
                        className="play-button"
                        onClick={() => setSelectedVideo(project.video)}
                        title="Ver video"
                      >
                        <Play size={32} fill="white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-features">
                    {project.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{marginRight:'5px',flexShrink:0}}><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{feature}
                      </span>
                    ))}
                  </div>

                  {project.video && (
                    <button
                      className="watch-video-btn"
                      onClick={() => setSelectedVideo(project.video)}
                    >
                      <Play size={18} />
                      Ver Video
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={28} />
            </button>

            <video
              width="100%"
              height="auto"
              controls
              autoPlay
              className="modal-video"
            >
              <source src={selectedVideo} type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsShowcase;