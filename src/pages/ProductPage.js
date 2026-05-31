// src/pages/ProductPage.js
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Settings2, Lightbulb, Factory, Droplets, Sun,
  Wind, RefreshCw, Package, Columns3, Filter,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelViewer from "../components/ModelViewer";
import { getProductBySlug } from "../data/products";
import "./ProductPage.css";

const PRODUCT_ICONS = {
  "columnas-metalicas":      Columns3,
  "brazos-alumbrado":        Lightbulb,
  "estructuras-metalicas":   Factory,
  "tanques-metalicos":       Package,
  "tamiz-rotativo":          Filter,
  "soporte-panel-solar":     Sun,
  "flotador-aire-disuelto":  Droplets,
  "floculador-tubular":      Wind,
  "mezclador-estatico":      RefreshCw,
};

const ProductPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const HeroIcon = PRODUCT_ICONS[slug] || Settings2;

  if (!product) return <Navigate to="/productos" replace />;

  const productImage = product.images?.[0] || "https://www.metsim.com.py/logo512.png";
  const productUrl = `https://www.metsim.com.py/productos/${product.id}`;

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription,
    image: productImage,
    brand: {
      "@type": "Brand",
      name: "METSIM Solutions",
    },
    manufacturer: {
      "@type": "Organization",
      name: "METSIM Solutions",
      url: "https://www.metsim.com.py",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "PYG",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "METSIM Solutions",
      },
    },
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.metsim.com.py" },
      { "@type": "ListItem", position: 2, name: "Productos", item: "https://www.metsim.com.py/productos" },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <div className="product-page">
      <Helmet>
        <title>{product.name} | METSIM Solutions Paraguay</title>
        <meta name="description" content={product.metaDescription} />
        <meta name="keywords" content={product.keywords.join(", ")} />
        <link rel="canonical" href={productUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:title" content={`${product.name} | METSIM Solutions Paraguay`} />
        <meta property="og:description" content={product.metaDescription} />
        <meta property="og:image" content={productImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | METSIM Solutions Paraguay`} />
        <meta name="twitter:description" content={product.metaDescription} />
        <meta name="twitter:image" content={productImage} />
        <script type="application/ld+json">{JSON.stringify(schemaProduct)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <Navbar />

      <main className="product-main">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/productos">Productos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Hero del producto */}
        <section className="product-hero">
          <div className="product-hero-content">
            <span className="product-category-tag">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-lead">{product.shortDescription}</p>
            <div className="product-hero-actions">
              <Link to="/cotizacion" className="btn-primary">
                Solicitar cotización →
              </Link>
              <Link to="/contacto" className="btn-secondary">
                Consultar técnicamente
              </Link>
            </div>
          </div>
          <div className="product-hero-badge">
            <div className="hero-icon-wrapper">
              <HeroIcon size={52} strokeWidth={1.2} />
            </div>
            <span className="hero-badge-label">{product.badge}</span>
            <span className="hero-badge-sub">Fabricación Nacional</span>
          </div>
        </section>

        <div className="product-body">
          {/* Visor 3D */}
          <section className="product-3d-section">
            <h2 className="section-heading">
              {product.pdfSrc
                ? "Modelo 3D y Planos Técnicos"
                : product.models?.length > 0 && product.images?.length > 0
                ? "Modelo 3D y Trabajos Realizados"
                : product.images?.length > 0 && !product.models?.length
                ? "Trabajos Realizados"
                : "Modelo 3D Interactivo"}
            </h2>
            <ModelViewer
              models={product.models || []}
              images={product.images || []}
              alt={`Modelo 3D de ${product.name}`}
              poster={product.modelPoster}
              pdfSrc={product.pdfSrc}
            />
          </section>

          <div className="product-details-grid">
            {/* Descripción */}
            <section className="product-description-section">
              <h2 className="section-heading">Descripción</h2>
              <p className="product-description">{product.description}</p>

              {/* Aplicaciones */}
              <h3 className="subsection-heading">Aplicaciones</h3>
              <ul className="applications-list">
                {product.applications.map((app, i) => (
                  <li key={i}>
                    <span className="app-check">✓</span>
                    {app}
                  </li>
                ))}
              </ul>
            </section>

            {/* Especificaciones técnicas */}
            <section className="product-specs-section">
              <h2 className="section-heading">Especificaciones Técnicas</h2>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i}>
                      <td className="spec-label">{spec.label}</td>
                      <td className="spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* CTA lateral */}
              <div className="side-cta">
                <h3>¿Necesitás este producto?</h3>
                <p>Envianos las medidas o planos y te enviamos cotización en 24 horas.</p>
                <Link to="/cotizacion" className="btn-primary full-width">
                  Solicitar cotización →
                </Link>
                <a
                  href="https://wa.me/595994685767?text=Hola%20METSIM,%20me%20interesa%20consultar%20sobre%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp full-width"
                >
                  💬 Consultar por WhatsApp
                </a>
              </div>
            </section>
          </div>

          {/* Software de cálculo estructural */}
          {product.softwareImage && (
            <section className="product-software-section">
              <div className="software-callout">
                <div className="software-callout-text">
                  <span className="software-tag">SOFTWARE ESPECIALIZADO</span>
                  <h3>Diseño y cálculo estructural con SolidWorks</h3>
                  <p>Cada estructura es modelada y simulada en SolidWorks antes de su fabricación, garantizando resistencia, precisión dimensional y cumplimiento de normas AISC.</p>
                  <ul className="software-features">
                    <li>✓ Simulación de cargas estáticas y dinámicas</li>
                    <li>✓ Análisis de tensiones y deformaciones</li>
                    <li>✓ Planos de fabricación generados desde el modelo 3D</li>
                  </ul>
                </div>
                <div className="software-callout-image">
                  <img
                    src={product.softwareImage.src}
                    alt={product.softwareImage.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Keywords SEO ocultos semánticamente */}
          <section className="product-seo-section">
            <h2 className="section-heading">Preguntas frecuentes</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>¿Dónde fabrican {product.name.toLowerCase()} en Paraguay?</h3>
                <p>METSIM Solutions fabrica {product.name.toLowerCase()} en Paraguay, con planta en Cordillera. Realizamos proyectos en todo el territorio nacional.</p>
              </div>
              <div className="faq-item">
                <h3>¿Cuál es el tiempo de entrega?</h3>
                <p>El tiempo de entrega varía según la complejidad y cantidad del pedido. Para proyectos estándar, típicamente entre 2 y 6 semanas. Contactanos para una estimación precisa según tu proyecto.</p>
              </div>
              <div className="faq-item">
                <h3>¿Ofrecen servicio de instalación?</h3>
                <p>Sí. METSIM ofrece servicio integral que incluye fabricación, transporte e instalación con equipo técnico especializado.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Otros productos */}
        <section className="related-section">
          <h2 className="section-heading centered">Ver más productos</h2>
          <div className="related-cta">
            <Link to="/productos" className="btn-secondary">
              ← Ver catálogo completo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
