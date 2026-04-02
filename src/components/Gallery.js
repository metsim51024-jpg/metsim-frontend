import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./Gallery.css";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "https://ibb.co/MxygZpLR/install1.jpg",
      alt: "Instalaciones 1",
      category: "Instalaciones"
    },
    {
      id: 2,
      src: "https://ibb.co/Z6gqjmF3/install2.jpg",
      alt: "Instalaciones 2",
      category: "Instalaciones"
    },
    {
      id: 3,
      src: "https://ibb.co/FkcnD3rt/install3.jpg",
      alt: "Instalaciones 3",
      category: "Instalaciones"
    },
    {
      id: 4,
      src: "https://ibb.co/0VfyZMJm/pieces1.jpg",
      alt: "Piezas 1",
      category: "Piezas"
    },
    {
      id: 5,
      src: "https://ibb.co/8nd7rmxV/pieces2.jpg",
      alt: "Piezas 2",
      category: "Piezas"
    },
    {
      id: 6,
      src: "https://ibb.co/MxCLLZjW/struct1.jpg",
      alt: "Estructuras 1",
      category: "Estructuras"
    }
  ];

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage?.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage?.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <section className="gallery">
      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <span className="section-badge">[ GALERÍA ]</span>
          <h2 className="section-title">Trabajos Recientes</h2>
          <p className="section-description">
            Explora algunos de nuestros proyectos más destacados en fabricación metalúrgica
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {images.map(image => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=" + image.category;
                }}
              />
              <div className="gallery-overlay">
                <span className="gallery-category">{image.category}</span>
                <button className="gallery-view-btn">VER DETALLES</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>

            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <ChevronLeft size={32} />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x600?text=" + selectedImage.category;
              }}
            />

            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <ChevronRight size={32} />
            </button>

            <div className="lightbox-info">
              <span className="lightbox-category">{selectedImage.category}</span>
              <p className="lightbox-title">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;