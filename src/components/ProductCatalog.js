import React, { useState } from "react";
import { ShoppingCart, ChevronRight } from "lucide-react";
import "./ProductCatalog.css";

function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Brazos para Iluminación",
      category: "iluminacion",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Brazos+Iluminación",
      description: "Brazos ajustables de acero inoxidable para sistemas de iluminación industrial"
    },
    {
      id: 2,
      name: "Columnas Telescópicas",
      category: "columnas",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Columnas+Telescópicas",
      description: "Columnas extensibles con altura variable para múltiples aplicaciones"
    },
    {
      id: 3,
      name: "Escaleras Metálicas",
      category: "escaleras",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Escaleras+Metálicas",
      description: "Escaleras de seguridad con certificación internacional para industria"
    },
    {
      id: 4,
      name: "Postes de Alumbrado",
      category: "iluminacion",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Postes+Alumbrado",
      description: "Postes robustos para iluminación exterior e industrial"
    },
    {
      id: 5,
      name: "Estructuras Modulares",
      category: "estructuras",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Estructuras+Modulares",
      description: "Estructuras metálicas modulares personalizables"
    },
    {
      id: 6,
      name: "Tanques Industriales",
      category: "tanques",
      price: "Consultar",
      image: "https://via.placeholder.com/300x200/1a1f3a/22d3ee?text=Tanques+Industriales",
      description: "Tanques de almacenamiento fabricados con acero de calidad"
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "iluminacion", label: "Iluminación" },
    { id: "columnas", label: "Columnas" },
    { id: "escaleras", label: "Escaleras" },
    { id: "estructuras", label: "Estructuras" },
    { id: "tanques", label: "Tanques" }
  ];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="product-catalog" id="equipos">
      <div className="product-container">
        {/* Header */}
        <div className="product-header">
          <span className="section-badge">[ CATÁLOGO ]</span>
          <h2 className="section-title">Nuestros Equipos</h2>
          <p className="section-description">
            Explora nuestro completo catálogo de equipos y componentes metalúrgicos de alta calidad
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <button className="view-btn">
                    <ShoppingCart size={20} />
                    Ver Detalles
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="product-btn">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCatalog;