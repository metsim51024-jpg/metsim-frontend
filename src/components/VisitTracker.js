// src/components/VisitTracker.js
// Registra una visita (pageview) cada vez que cambia la ruta.
// Es "fire-and-forget": si falla, no afecta la experiencia del usuario.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BACKEND_URL = "https://metsim-backend.onrender.com";

// Identificador anonimo del navegador, para poder distinguir personas de
// paginas vistas. Es un azar sin nada personal, y si el navegador bloquea el
// almacenamiento simplemente no se manda: la visita se cuenta igual.
const visitorId = () => {
  try {
    let id = localStorage.getItem("metsim_vid");
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) ||
        Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("metsim_vid", id);
    }
    return id;
  } catch (e) {
    return "";
  }
};

const VisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Ni el panel ni las paginas de seguimiento son trafico comercial.
    if (location.pathname.startsWith("/admin")) return;
    if (location.pathname.startsWith("/seguimiento")) return;

    const payload = JSON.stringify({
      path: location.pathname,
      referrer: document.referrer || "",
      visitorId: visitorId()
    });

    // sendBeacon no bloquea la navegación; fetch como respaldo
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${BACKEND_URL}/api/visits`,
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch(`${BACKEND_URL}/api/visits`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {
      /* ignorar errores de tracking */
    }
  }, [location.pathname]);

  return null;
};

export default VisitTracker;
