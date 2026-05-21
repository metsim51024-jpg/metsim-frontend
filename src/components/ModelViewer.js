// src/components/ModelViewer.js
import React, { useEffect, useState, useRef } from "react";
import "./ModelViewer.css";

function ModelViewer({ models = [], alt, poster, pdfSrc }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("3d");
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  useEffect(() => {
    setLoading(true);
    // Give model-viewer time to register as custom element, then attach listeners
    const timer = setTimeout(() => {
      const el = viewerRef.current;
      if (!el) { setLoading(false); return; }
      const onLoad  = () => setLoading(false);
      const onError = () => setLoading(false);
      el.addEventListener("load",  onLoad);
      el.addEventListener("error", onError);
      // Safety fallback: hide spinner after 15s regardless
      const fallback = setTimeout(() => setLoading(false), 15000);
      return () => {
        el.removeEventListener("load",  onLoad);
        el.removeEventListener("error", onError);
        clearTimeout(fallback);
      };
    }, 100);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const hasModels = models.length > 0;
  const hasPdf    = Boolean(pdfSrc);
  const current   = hasModels ? models[activeIndex] : null;

  if (!hasModels && !hasPdf) {
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
          {/* Spinner as overlay — model-viewer always visible underneath */}
          {loading && (
            <div className="mv-loading">
              <div className="mv-spinner" />
              <span>Cargando modelo 3D…</span>
            </div>
          )}
          <model-viewer
            ref={viewerRef}
            src={current.src}
            alt={alt || current.label}
            auto-rotate
            camera-controls
            shadow-intensity="0.8"
            shadow-softness="1"
            environment-image="legacy"
            skybox-image="legacy"
            exposure="2.5"
            tone-mapping="commerce"
            style={{ width: "100%", height: "500px", background: "#0a0e1a" }}
          />
          <div className="model-controls-hint">
            <span>🖱️ Arrastrá para rotar · Scroll para zoom</span>
          </div>
          {models.length > 1 && (
            <div className="mv-nav-arrows">
              <button className="mv-arrow" onClick={() => setActiveIndex((activeIndex - 1 + models.length) % models.length)}>&#8592;</button>
              <span className="mv-nav-label">{activeIndex + 1} / {models.length}</span>
              <button className="mv-arrow" onClick={() => setActiveIndex((activeIndex + 1) % models.length)}>&#8594;</button>
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
