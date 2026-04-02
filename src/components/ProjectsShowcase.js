import React, { useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectsShowcase.css";

function ProjectsShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const projects = [
    {
      id: 1,
      title: "Instalaciones Industriales",
      description: "Montaje y puesta en marcha de equipos electromecanicos de última tecnología",
      images: [
        "https://i.ibb.co/DHP1zkn7/INSTALACION-INDUSTRIAL-13.jpg",
        "https://i.ibb.co/pvKY7yMg/INSTALACION-INDUSTRIAL-14.jpg",
        "https://i.ibb.co/j9qHrfNF/INSTALACION-INDUSTRIAL-15.jpg",
        "https://i.ibb.co/GfBLPGsT/INSTALACION-INDUSTRIAL-16.jpg",
        "https://i.ibb.co/NbMsD9k/INSTALACION-INDUSTRIAL-5.jpg",
        "https://i.ibb.co/MkbwfmWM/INSTALACION-INDUSTRIAL-9.jpg"
      ],
      video: "https://res.cloudinary.com/dk6wclcew/video/upload/v1774546766/INSTALACION_INDUSTRIAL_VIDEO_c4aduh.mov",
      icon: "⚙️",
      features: ["Montaje profesional", "Equipos de calidad", "Certificación internacional"]
    },
    {
      id: 2,
      title: "Fabricación de Piezas Metálicas",
      description: "Piezas con precisión milimétrica para maquinaria industrial",
      images: [
        "https://i.ibb.co/tPbpcsCQ/piezas-metalicas.jpg",
        "https://i.ibb.co/JWysvcpP/piezas-metalicas-2.jpg",
        "https://i.ibb.co/QsKQm3X/piezas-metalicas-3.jpg",
        "https://i.ibb.co/k2PDwfD6/piezas-metalicas-4.jpg"
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
        "https://i.ibb.co/q3rww74X/instalacion-de-paneles-solares-2.jpg",
        "https://i.ibb.co/prKYRfpc/instalaciones-de-paneles-solares.jpg"
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
        "https://i.ibb.co/3ZDn63c/TAMIZ-5.avif",
        "https://i.ibb.co/DfyB479c/TAMIZ-2.avif",
        "https://i.ibb.co/39P2fmcz/TAMIZ-3.avif",
        "https://i.ibb.co/Xr77g7Zq/TAMIZ-7.avif"
      ],
      video: null,
      icon: "🔄",
      features: ["Rotación eficiente", "Bajo mantenimiento", "Alta capacidad"]
    },
    {
      id: 5,
      title: "Instalación de Paneles Solares",
      description: "Sistemas de energía solar con instalación profesional y garantía completa",
      images: [
        "https://via.placeholder.com/600x400/0f172a/22d3ee?text=Paneles+Solares"
      ],
      video: "https://res.cloudinary.com/dk6wclcew/video/upload/v1774546760/montaje_de_paneles_solares_glavca.mp4",
      icon: "☀️",
      features: ["Energía renovable", "Ahorro de costos", "Instalación garantizada"]
    }
  ];

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
        <div className="projects-header">
          <span className="section-badge">[ PORTAFOLIO ]</span>
          <h2 className="section-title">Nuestros Proyectos</h2>
          <p className="section-description">
            Conoce los servicios especializados que ofrecemos a la industria.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const currentImageIdx = currentImageIndex[project.id] || 0;
            const currentImage = project.images[currentImageIdx];

            return (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  <img
                    src={currentImage}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300/1a1f3a/22d3ee?text=" + encodeURIComponent(project.title);
                    }}
                  />

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
                  <div className="project-icon">{project.icon}</div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-features">
                    {project.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        ✓ {feature}
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
              <source src={selectedVideo} type="video/quicktime" />
              Tu navegador no soporta videos HTML5
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsShowcase;