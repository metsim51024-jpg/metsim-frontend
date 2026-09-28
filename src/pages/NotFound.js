// src/pages/NotFound.js
// Antes cualquier URL inexistente redirigia a la home. Como Vercel responde 200
// a todas las rutas de la app, Google las veia como copias de la home ("soft
// 404"). Ahora se muestra esta pagina con noindex: Google la descarta y el
// visitante tiene a donde ir.
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertCircle, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COMPANY_CONFIG } from "../config/company";
import "./QuoteTracking.css";

const NotFound = () => (
  <div className="tracking-page">
    <Helmet>
      <title>Página no encontrada | METSIM Solutions</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <Navbar />

    <main className="tracking-main">
      <div className="tracking-container">
        <div className="tracking-state">
          <AlertCircle size={40} className="tracking-state-icon" />
          <h1>No encontramos esta página</h1>
          <p>
            La dirección puede estar mal escrita o la página ya no existe. Desde acá
            podés ver los productos o pedir un presupuesto.
          </p>
          <div className="tracking-actions">
            <Link to="/productos" className="tracking-btn ghost">
              Ver productos
            </Link>
            <Link to="/cotizacion" className="tracking-btn ghost">
              Pedir presupuesto
            </Link>
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
              className="tracking-btn primary"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default NotFound;
