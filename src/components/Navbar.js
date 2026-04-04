import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  const navItems = [
    { label: "INICIO", href: "#inicio" },
    { label: "NOSOTROS", href: "#nosotros" },
    { label: "SERVICIOS", href: "#servicios" },
    { label: "PROYECTOS", href: "#proyectos" },
    { label: "CONTACTO", href: "#contacto" }
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo - SOLUCIONADO */}
        <a href="#inicio" className="navbar-logo">
          <img
            src="https://res.cloudinary.com/dk6wclcew/image/upload/v1775063931/metsim_logo-1_wrsnco.png"
            alt="METSIM Logo"
            className="logo-img"
            onError={(e) => {
              console.error("Error cargando logo:", e);
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%2322d3ee'/%3E%3C/svg%3E";
            }}
          />
          <span className="logo-text">METSIM</span>
        </a>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-only">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="navbar-cta desktop-only">
          <a href="#quotes" className="cta-button">
            <ShoppingCart size={18} />
            COTIZAR
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu active">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#quotes" className="mobile-cta-button">
              <ShoppingCart size={18} />
              COTIZAR
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;