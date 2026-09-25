// src/pages/QuoteTracking.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Check, Circle, X, MessageCircle, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./QuoteTracking.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;
const WHATSAPP = "https://wa.me/595994685767";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("es-PY", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

const StepIcon = ({ state }) => {
  if (state === "done") return <Check size={16} strokeWidth={3} />;
  if (state === "rejected") return <X size={16} strokeWidth={3} />;
  if (state === "current") return <Circle size={10} strokeWidth={0} fill="currentColor" />;
  return null;
};

const QuoteTracking = () => {
  const { token } = useParams();
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Render duerme el servicio gratuito: el primer pedido puede tardar.
        const { data } = await axios.get(`${API}/tracking/${token}`, { timeout: 90000 });
        if (!cancelled) setQuote(data.data);
      } catch (err) {
        if (cancelled) return;
        setError(
          err.response?.status === 404
            ? "notfound"
            : "network"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="tracking-page">
      <Helmet>
        <title>Seguimiento de tu presupuesto | METSIM Solutions</title>
        {/* Cada enlace es privado: no debe entrar al índice de Google. */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

      <main className="tracking-main">
        <div className="tracking-container">
          {loading && (
            <div className="tracking-state">
              <div className="tracking-spinner" />
              <p>Buscando tu pedido…</p>
              <span>Si es la primera consulta del día puede demorar unos segundos.</span>
            </div>
          )}

          {!loading && error && (
            <div className="tracking-state">
              <AlertCircle size={40} className="tracking-state-icon" />
              <h1>
                {error === "notfound"
                  ? "No encontramos este seguimiento"
                  : "No pudimos conectarnos"}
              </h1>
              <p>
                {error === "notfound"
                  ? "El enlace puede estar incompleto o haber sido reemplazado por uno más nuevo. Revisá el último correo que te enviamos."
                  : "Hubo un problema al consultar el estado de tu pedido. Probá de nuevo en un momento."}
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
          )}

          {!loading && quote && (
            <>
              <header className="tracking-header">
                <span className="section-badge">[ SEGUIMIENTO ]</span>
                <h1>Hola {quote.client_name.split(" ")[0]}, tu pedido está en curso</h1>
                <p className="tracking-current">
                  Estado actual: <strong>{quote.status_label}</strong>
                </p>
              </header>

              <section className="tracking-summary">
                <div>
                  <span className="summary-label">Solicitado el</span>
                  <p>{formatDate(quote.created_at)}</p>
                </div>
                <div>
                  <span className="summary-label">Última actualización</span>
                  <p>{formatDate(quote.updated_at)}</p>
                </div>
                <div>
                  <span className="summary-label">Archivos adjuntos</span>
                  <p>{quote.files}</p>
                </div>
              </section>

              <section className="tracking-request">
                <span className="summary-label">Tu pedido</span>
                <p>{quote.description}</p>
              </section>

              <ol className="tracking-timeline">
                {quote.timeline.map((step) => (
                  <li key={step.key} className={`timeline-step is-${step.state}`}>
                    <div className="step-marker">
                      <StepIcon state={step.state} />
                    </div>
                    <div className="step-body">
                      <div className="step-head">
                        <h2>{step.label}</h2>
                        {step.at && <time>{formatDate(step.at)}</time>}
                      </div>
                      {(step.state === "current" || step.state === "rejected") && (
                        <p>{step.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <footer className="tracking-footer">
                <p>¿Tenés una consulta sobre este pedido?</p>
                <a href={WHATSAPP} className="tracking-btn primary" target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> Escribinos por WhatsApp
                </a>
              </footer>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuoteTracking;
