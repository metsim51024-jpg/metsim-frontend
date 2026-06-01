import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { label: "INICIO",    hash: "inicio" },
    { label: "NOSOTROS",  hash: "nosotros" },
    { label: "SERVICIOS", hash: "servicios" },
    { label: "PROYECTOS", hash: "proyectos" },
    { label: "PRODUCTOS", route: "/productos" },
    { label: "CONTACTO",  hash: "contacto" },
  ];

  const scrollToHash = (hash) => {
    const el = document.getElementById(hash);
    if (!el) return;
    const offset = 72; // navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      scrollToHash(hash);
    } else {
      navigate("/");
      setTimeout(() => scrollToHash(hash), 320);
    }
  };

  const handleCotizarClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      const el = document.getElementById("quotes");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/cotizacion");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a
          href="/#inicio"
          className="navbar-logo"
          onClick={(e) => handleHashClick(e, "inicio")}
        >
          <img
            src="/metsim-isotipo.png"
            alt="METSIM Logo"
            className="navbar-isotipo"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span className="logo-text">Metsim</span>
        </a>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-only">
          {navItems.map((item) =>
            item.route ? (
              <Link
                key={item.label}
                to={item.route}
                className="nav-link nav-link-highlight"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={`/#${item.hash}`}
                className="nav-link"
                onClick={(e) => handleHashClick(e, item.hash)}
              >
                {item.label}
              </a>
            )
          )}
        </div>

        {/* CTA Button */}
        <div className="navbar-cta desktop-only">
          <a href="#quotes" className="cta-button" onClick={handleCotizarClick}>
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
            {navItems.map((item) =>
              item.route ? (
                <Link
                  key={item.label}
                  to={item.route}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`/#${item.hash}`}
                  className="mobile-nav-link"
                  onClick={(e) => handleHashClick(e, item.hash)}
                >
                  {item.label}
                </a>
              )
            )}
            <a href="#quotes" className="mobile-cta-button" onClick={handleCotizarClick}>
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
