// src/pages/TrackingRecovery.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Mail, MessageCircle, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./QuoteTracking.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;
const WHATSAPP = "https://wa.me/595994685767";

const TrackingRecovery = () => {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      // Render duerme el plan gratuito: la primera consulta puede demorar.
      await axios.post(`${API}/tracking/recuperar`, { email }, { timeout: 90000 });
      setListo(true);
    } catch (err) {
      setError(
        err.response?.status === 400
          ? "Revisá el correo, parece que tiene un error de tipeo."
          : "No pudimos procesar el pedido. Probá de nuevo en un momento."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="tracking-page">
      <Helmet>
        <title>Recuperar el seguimiento de tu presupuesto | METSIM Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

      <main className="tracking-main">
        <div className="tracking-container tracking-narrow">
          {listo ? (
            <div className="tracking-state">
              <CheckCircle size={40} className="tracking-state-icon" />
              <h1>Revisá tu correo</h1>
              <p>
                Si <strong>{email}</strong> tiene un presupuesto con nosotros, te acabamos de
                enviar el enlace de seguimiento. Puede tardar un par de minutos en llegar; si no
                lo ves, mirá en spam.
              </p>
              <div className="tracking-actions">
                <a href={WHATSAPP} className="tracking-btn primary" target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> Consultar por WhatsApp
                </a>
                <Link to="/" className="tracking-btn ghost">
                  Volver al inicio
                </Link>
              </div>
            </div>
          ) : (
            <>
              <header className="tracking-header">
                <span className="section-badge">[ SEGUIMIENTO ]</span>
                <h1>Recuperá el enlace de tu presupuesto</h1>
                <p className="tracking-current">
                  Poné el correo con el que pediste la cotización y te reenviamos el acceso.
                </p>
              </header>

              <form className="recovery-form" onSubmit={enviar}>
                <label htmlFor="rec-email">Tu correo</label>
                <div className="recovery-field">
                  <Mail size={18} />
                  <input
                    id="rec-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                  />
                </div>

                {error && <p className="recovery-error">{error}</p>}

                <button type="submit" className="tracking-btn primary" disabled={enviando}>
                  {enviando ? "Enviando…" : "Enviarme el enlace"}
                </button>

                <p className="recovery-note">
                  El enlace se envía únicamente al correo registrado en el pedido, así que no sirve
                  para ver presupuestos de otra persona.
                </p>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackingRecovery;
