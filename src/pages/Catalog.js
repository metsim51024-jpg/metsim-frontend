// src/pages/Catalog.js
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import "./Catalog.css";

const Catalog = () => {
  return (
    <div className="catalog-page">
      <Helmet>
        <title>Catálogo de Productos Metálicos | METSIM Solutions Paraguay</title>
        <meta
          name="description"
          content="Catálogo de productos metálicos de METSIM Solutions Paraguay: columnas metálicas, brazos de alumbrado, estructuras metálicas, tanques y tamices rotativos. Solicite cotización."
        />
        <link rel="canonical" href="https://www.metsim.com.py/productos" />
        <meta property="og:url" content="https://www.metsim.com.py/productos" />
        <meta property="og:title" content="Catálogo de Productos Metálicos | METSIM Solutions Paraguay" />
        <meta property="og:description" content="Columnas metálicas, brazos de alumbrado, estructuras, tanques y tamices rotativos fabricados en Paraguay." />
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
                <div className="product-card-icon">{product.icon}</div>
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
