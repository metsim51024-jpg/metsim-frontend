// src/components/ModelViewer.js
import React, { useEffect, useRef } from "react";
import "./ModelViewer.css";

function ModelViewer({ src, alt, poster }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  if (!src) {
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
          <div className="placeholder-steps">
            <p className="placeholder-steps-title">Para cargar tu modelo SolidWorks:</p>
            <ol>
              <li>Exportar desde SolidWorks → <strong>Archivo → Guardar como → GLTF/GLB</strong></li>
              <li>Subir el archivo <code>.glb</code> a <code>/public/models/</code></li>
              <li>Actualizar <code>modelSrc</code> en <code>src/data/products.js</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="model-viewer-wrapper">
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        poster={poster}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        shadow-softness="0.5"
        environment-image="neutral"
        exposure="1"
        style={{ width: "100%", height: "500px", background: "transparent" }}
      />
      <div className="model-controls-hint">
        <span>🖱️ Arrastrá para rotar · Scroll para zoom</span>
      </div>
    </div>
  );
}

export default ModelViewer;
