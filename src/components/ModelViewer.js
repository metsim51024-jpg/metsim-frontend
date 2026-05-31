// src/components/ModelViewer.js
import React, { useEffect, useState, useRef } from "react";
import "./ModelViewer.css";

function ModelViewer({ models = [], alt, poster, pdfSrc, images = [] }) {
  const hasModels = models.length > 0;
  const hasPdf    = Boolean(pdfSrc);
  const hasImages = images.length > 0;

  const initialMode = hasModels ? "3d" : hasImages ? "image" : "pdf";

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode]       = useState(initialMode);
  const [imageIndex, setImageIndex]   = useState(0);
  const [loading, setLoading]         = useState(true);
  const [modelError, setModelError]   = useState(false);
  const viewerRef  = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  useEffect(() => {
    if (viewMode !== "3d") return;
    setLoading(true);
    setModelError(false);

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const timer = setTimeout(() => {
      const el = viewerRef.current;
      if (!el) { setLoading(false); return; }

      const onLoad  = () => { setLoading(false); setModelError(false); };
      const onError = () => { setLoading(false); setModelError(true); };
      el.addEventListener("load",  onLoad);
      el.addEventListener("error", onError);
      const fallback = setTimeout(() => setLoading(false), 15000);

      cleanupRef.current = () => {
        el.removeEventListener("load",  onLoad);
        el.removeEventListener("error", onError);
        clearTimeout(fallback);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [activeIndex, viewMode]);

  const current = hasModels ? models[activeIndex] : null;

  if (!hasModels && !hasPdf && !hasImages) {
    return (
      <div className="model-placeholder">
        <div className="model-placeholder-inner">
          <div className="model-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="20" y="30" width="40" height="35" rx="2" stroke="#00d4ff" strokeWidth="2" fill="none"/>
              <path d="M20 30L40 18L60 30" stroke="#00d4ff" strokeWidth="2" fill="none"/>
              <path d="M40 18V53" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4 3"/>
              <path d="M20 30L40 42L60 30" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4 3"/>
              <circle cx="20" cy="30" r="3" fill="#00d4ff"/>
              <circle cx="60" cy="30" r="3" fill="#00d4ff"/>
              <circle cx="40" cy="18" r="3" fill="#00d4ff"/>
              <circle cx="40" cy="65" r="3" fill="#00d4ff"/>
            </svg>
          </div>
          <h3 className="placeholder-title">Modelo 3D</h3>
          <p className="placeholder-sub">Disponible próximamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mv-container">
      {/* Tabs */}
      <div className="mv-topbar">
        <div className="mv-tabs">
          {hasModels && models.map((m, i) => (
            <button
              key={i}
              className={`mv-tab ${viewMode === "3d" && activeIndex === i ? "mv-tab-active" : ""}`}
              onClick={() => { setActiveIndex(i); setViewMode("3d"); }}
            >
              <span className="mv-tab-icon">⬡</span>
              {m.label}
            </button>
          ))}
          {hasImages && (
            <button
              className={`mv-tab mv-tab-gallery ${viewMode === "image" ? "mv-tab-active" : ""}`}
              onClick={() => setViewMode("image")}
            >
              <span className="mv-tab-icon">📷</span>
              Trabajos Realizados
            </button>
          )}
          {hasPdf && (
            <button
              className={`mv-tab mv-tab-pdf ${viewMode === "pdf" ? "mv-tab-active" : ""}`}
              onClick={() => setViewMode("pdf")}
            >
              <span className="mv-tab-icon">📄</span>
              Planos Técnicos
            </button>
          )}
        </div>
      </div>

      {/* 3D viewer */}
      {viewMode === "3d" && current && (
        <div className="model-viewer-wrapper">
          {loading && (
            <div className="mv-loading">
              <div className="mv-spinner" />
              <span>Cargando modelo 3D…</span>
            </div>
          )}
          {modelError && !loading && (
            <div className="mv-error">
              <span>⚠ No se pudo cargar el modelo 3D</span>
            </div>
          )}
          <model-viewer
            ref={viewerRef}
            src={current.src}
            alt={alt || current.label}
            {...(!current.staticView && { 'auto-rotate': true })}
            {...(!current.staticView && { 'camera-controls': true })}
            {...(current.staticView && { 'camera-orbit': '25deg 68deg auto' })}
            {...(current.staticView && { 'interaction-prompt': 'none' })}
            {...(current.staticView && { 'disable-zoom': true })}
            shadow-intensity="1"
            shadow-softness="1"
            environment-image="neutral"
            exposure="1.5"
            style={{ width: "100%", height: "500px", background: "#0a0e1a" }}
          />
          {!current.staticView && (
            <div className="model-controls-hint">
              <span>🖱️ Arrastrá para rotar · Scroll para zoom</span>
            </div>
          )}
          {models.length > 1 && (
            <div className="mv-nav-arrows">
              <button className="mv-arrow" onClick={() => setActiveIndex((activeIndex - 1 + models.length) % models.length)}>&#8592;</button>
              <span className="mv-nav-label">{activeIndex + 1} / {models.length}</span>
              <button className="mv-arrow" onClick={() => setActiveIndex((activeIndex + 1) % models.length)}>&#8594;</button>
            </div>
          )}
        </div>
      )}

      {/* Image gallery viewer */}
      {viewMode === "image" && hasImages && (
        <div className="mv-image-wrapper">
          <div className="mv-image-display">
            <img
              src={images[imageIndex].src}
              alt={images[imageIndex].label}
              className="mv-gallery-img"
            />
            <div className="mv-image-label">{images[imageIndex].label}</div>
          </div>
          {images.length > 1 && (
            <div className="mv-nav-arrows">
              <button className="mv-arrow" onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}>&#8592;</button>
              <span className="mv-nav-label">{imageIndex + 1} / {images.length}</span>
              <button className="mv-arrow" onClick={() => setImageIndex((imageIndex + 1) % images.length)}>&#8594;</button>
            </div>
          )}
        </div>
      )}

      {/* PDF viewer */}
      {viewMode === "pdf" && hasPdf && (
        <div className="mv-pdf-wrapper">
          <div className="mv-pdf-notice">
            <span>📄 Planos técnicos — solo visualización</span>
            {hasModels && (
              <button className="mv-back-3d" onClick={() => setViewMode("3d")}>← Volver al 3D</button>
            )}
          </div>
          <iframe
            src={`${pdfSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title="Planos técnicos"
            className="mv-pdf-frame"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
