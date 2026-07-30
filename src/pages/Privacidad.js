import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COMPANY_CONFIG } from "../config/company";
import "./Legal.css";

const Privacidad = () => (
  <div className="legal-page">
    <Helmet>
      <title>Política de Privacidad | METSIM Solutions Paraguay</title>
      <meta name="description" content="Política de privacidad de METSIM Solutions. Informate sobre cómo manejamos tus datos personales." />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://www.metsim.com.py/privacidad" />
    </Helmet>
    <Navbar />
    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Política de Privacidad</span>
        </div>

        <h1>Política de Privacidad</h1>
        <p className="legal-updated">Última actualización: 12 de julio de 2026</p>

        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>METSIM Solutions</strong> (en adelante, "METSIM") es responsable del tratamiento de los datos
            personales recabados a través del sitio web <strong>www.metsim.com.py</strong>.
          </p>
          <ul>
            <li>Dirección: {COMPANY_CONFIG.address}</li>
            <li>Email: {COMPANY_CONFIG.email}</li>
            <li>Teléfono: {COMPANY_CONFIG.phone}</li>
          </ul>
        </section>

        <section>
          <h2>2. Datos que recopilamos</h2>
          <p>Recopilamos únicamente los datos que vos proporcionás voluntariamente al:</p>
          <ul>
            <li>Completar el formulario de solicitud de cotización (nombre, email, teléfono, descripción del proyecto).</li>
            <li>Contactarnos por WhatsApp o email.</li>
            <li>Navegar el sitio web (datos técnicos de sesión: IP, navegador, páginas visitadas).</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos recabados se utilizan exclusivamente para:</p>
          <ul>
            <li>Responder tu solicitud de cotización o consulta técnica.</li>
            <li>Enviarte información relacionada con tu proyecto.</li>
            <li>Mejorar la experiencia de navegación del sitio.</li>
          </ul>
          <p>METSIM <strong>no vende, cede ni comparte</strong> tus datos personales con terceros.</p>
        </section>

        <section>
          <h2>4. Plazo de conservación</h2>
          <p>
            Los datos se conservan durante el tiempo necesario para gestionar tu solicitud y, posteriormente,
            por el plazo que establezca la legislación paraguaya aplicable.
          </p>
        </section>

        <section>
          <h2>5. Tus derechos</h2>
          <p>Podés ejercer los siguientes derechos enviando un email a <a href={`mailto:${COMPANY_CONFIG.email}`}>{COMPANY_CONFIG.email}</a>:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre vos.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong>Eliminación:</strong> solicitar que eliminemos tus datos.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            Este sitio utiliza cookies técnicas necesarias para su funcionamiento. No utilizamos cookies
            de seguimiento publicitario de terceros.
          </p>
        </section>

        <section>
          <h2>7. Cambios en esta política</h2>
          <p>
            METSIM se reserva el derecho de actualizar esta política en cualquier momento. La versión vigente
            estará siempre disponible en esta página con la fecha de última actualización.
          </p>
        </section>

        <div className="legal-cta">
          <p>¿Tenés alguna pregunta sobre el manejo de tus datos?</p>
          <a href={`mailto:${COMPANY_CONFIG.email}`} className="legal-btn">
            Contactar a METSIM
          </a>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacidad;
