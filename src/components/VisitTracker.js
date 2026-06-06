// src/components/VisitTracker.js
// Registra una visita (pageview) cada vez que cambia la ruta.
// Es "fire-and-forget": si falla, no afecta la experiencia del usuario.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BACKEND_URL = "https://metsim-backend.onrender.com";

const VisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // No rastrear el panel administrativo
    if (location.pathname.startsWith("/admin")) return;

    const payload = JSON.stringify({
      path: location.pathname,
      referrer: document.referrer || ""
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
