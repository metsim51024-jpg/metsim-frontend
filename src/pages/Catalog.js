// src/pages/Catalog.js
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Columns, Lightbulb, Factory, Package, Filter,
  Sun, Droplets, Wind, RefreshCw, Settings,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import "./Catalog.css";

const CATALOG_ICONS = {
  "columnas-metalicas":     Columns,
  "brazos-alumbrado":       Lightbulb,
  "estructuras-metalicas":  Factory,
  "tanques-metalicos":      Package,
  "tamiz-rotativo":         Filter,
  "soporte-panel-solar":    Sun,
  "flotador-aire-disuelto": Droplets,
  "floculador-tubular":     Wind,
  "mezclador-estatico":     RefreshCw,
};

const Catalog = () => {
  return (
    <div className="catalog-page">
      <Helmet>
        <title>Catálogo de Productos Metálicos | METSIM Solutions Paraguay</title>
        <meta
          name="description"
          content="Catálogo de productos de METSIM Solutions Paraguay: columnas metálicas, brazos de alumbrado, estructuras, tanques, tamices rotativos, flotador DAF, floculador tubular y mezcladores estáticos. Solicite cotización."
        />
        <link rel="canonical" href="https://www.metsim.com.py/productos" />
        <meta property="og:url" content="https://www.metsim.com.py/productos" />
        <meta property="og:title" content="Catálogo de Productos Metálicos | METSIM Solutions Paraguay" />
        <meta property="og:description" content="Columnas metálicas, brazos de alumbrado, estructuras, tanques, tamices, flotador DAF, floculador tubular y mezcladores estáticos fabricados en Paraguay." />
      </Helmet>

      <Navbar />

      <main className="catalog-main">
        {/* Hero */}
        <section className="catalog-hero">
          <div className="catalog-hero-content">
            <span className="section-badge">[ CATÁLOGO ]</span>
            <h1 className="catalog-title">Productos Metálicos</h1>
            <p className="catalog-subtitle">
              Fabricación industrial de alta resistencia diseñada y simulada en SolidWorks.
              Cada producto cumple normas internacionales con cálculo estructural avanzado.
            </p>
          </div>
        </section>

        {/* Grid de productos */}
        <section className="catalog-grid-section">
          <div className="catalog-grid">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/productos/${product.id}`}
                className="product-card"
              >
                <div className="product-card-icon">
                  {React.createElement(CATALOG_ICONS[product.id] || Settings, { size: 36, strokeWidth: 1.4 })}
                </div>
                <div className="product-card-badge">{product.badge}</div>
                <h2 className="product-card-name">{product.name}</h2>
                <p className="product-card-desc">{product.shortDescription}</p>
                <div className="product-card-category">{product.category}</div>
                <div className="product-card-cta">
                  Ver producto + modelo 3D →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="catalog-cta-section">
          <div className="catalog-cta-box">
            <h2>¿No encontrás lo que buscás?</h2>
            <p>Fabricamos cualquier pieza o estructura metálica a medida. Envianos los planos o describinos tu necesidad.</p>
            <Link to="/cotizacion" className="catalog-cta-btn">
              Solicitar cotización personalizada →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
