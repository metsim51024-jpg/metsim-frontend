import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { COMPANY_CONFIG } from "../config/company";
import "./Legal.css";

const Terminos = () => (
  <div className="legal-page">
    <Helmet>
      <title>Términos de Servicio | METSIM Solutions Paraguay</title>
      <meta name="description" content="Términos y condiciones de servicio de METSIM Solutions — fabricación de estructuras metálicas y equipos industriales en Paraguay." />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://www.metsim.com.py/terminos" />
    </Helmet>
    <Navbar />
    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Términos de Servicio</span>
        </div>

        <h1>Términos de Servicio</h1>
        <p className="legal-updated">Última actualización: 12 de julio de 2026</p>

        <section>
          <h2>1. Aceptación de los términos</h2>
          <p>
            Al utilizar el sitio web <strong>www.metsim.com.py</strong> o contratar los servicios de
            <strong> METSIM Solutions</strong>, aceptás los presentes Términos de Servicio.
            Si no estás de acuerdo, por favor no utilices el sitio.
          </p>
        </section>

        <section>
          <h2>2. Servicios ofrecidos</h2>
          <p>METSIM Solutions ofrece servicios de:</p>
          <ul>
            <li>Fabricación de estructuras metálicas, columnas y brazos de alumbrado.</li>
            <li>Fabricación de tanques industriales y equipos a medida.</li>
            <li>Sistemas de tratamiento de aguas (DAF, floculadores, mezcladores estáticos).</li>
            <li>Instalación y montaje en todo el territorio paraguayo.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cotizaciones y contratos</h2>
          <p>
            Las cotizaciones emitidas por METSIM Solutions tienen una validez de <strong>30 días</strong> desde
            su emisión, salvo indicación contraria en el documento. La aceptación de una cotización
            por parte del cliente constituye un acuerdo vinculante sujeto a las condiciones específicas
            detalladas en dicho documento.
          </p>
        </section>

        <section>
          <h2>4. Plazos de entrega</h2>
          <p>
            Los plazos de entrega son estimativos y dependen de la complejidad del proyecto, disponibilidad
            de materiales y carga de trabajo al momento de la contratación. METSIM se compromete a
            comunicar cualquier demora con la mayor anticipación posible.
          </p>
        </section>

        <section>
          <h2>5. Garantía</h2>
          <p>
            METSIM Solutions garantiza la calidad de sus productos contra defectos de fabricación.
            El alcance y duración de la garantía se especifica en cada contrato o cotización aprobada.
          </p>
        </section>

        <section>
          <h2>6. Propiedad intelectual</h2>
          <p>
            Todos los contenidos del sitio web (textos, imágenes, modelos 3D, logotipos) son propiedad
            de METSIM Solutions o de sus proveedores de contenido. Queda prohibida su reproducción
            sin autorización escrita.
          </p>
        </section>

        <section>
          <h2>7. Limitación de responsabilidad</h2>
          <p>
            METSIM no se responsabiliza por daños derivados del uso incorrecto de los equipos fabricados
            o de su instalación por personal no autorizado. Toda instalación debe ser realizada por
            técnicos calificados.
          </p>
        </section>

        <section>
          <h2>8. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la <strong>República del Paraguay</strong>. Cualquier
            disputa será sometida a la jurisdicción de los tribunales de <strong>Asunción, Paraguay</strong>.
          </p>
        </section>

        <div className="legal-cta">
          <p>¿Tenés alguna consulta sobre nuestros términos?</p>
          <a href={`mailto:${COMPANY_CONFIG.email}`} className="legal-btn">
            Contactar a METSIM
          </a>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terminos;
