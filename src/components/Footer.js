import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Share2,
  Users,
  Instagram,
  ArrowRight,
  Facebook
} from "lucide-react";
import { COMPANY_CONFIG } from "../config/company";
import "./Footer.css";

const Footer = () => {
  const footerLinks = {
    Productos: [
      { label: "Brazos para Iluminación",  to: "/productos/brazos-alumbrado" },
      { label: "Columnas Telescópicas",     to: "/productos/columnas-metalicas" },
      { label: "Estructuras Metálicas",     to: "/productos/estructuras-metalicas" },
      { label: "Flotador DAF",              to: "/productos/flotador-aire-disuelto" },
    ],
    Servicios: [
      { label: "Estructuras Metálicas",     to: "/productos/estructuras-metalicas" },
      { label: "Tanques Industriales",      to: "/productos/tanques-metalicos" },
      { label: "Tratamiento de Aguas",      to: "/productos/flotador-aire-disuelto" },
      { label: "Catálogo completo",         to: "/productos" },
    ],
    Empresa: [
      { label: "Sobre Nosotros",            to: "/#nosotros" },
      { label: "Proyectos",                 to: "/#proyectos" },
      { label: "Productos",                 to: "/productos" },
      { label: "Contacto",                  to: "/#contacto" },
    ],
  };

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Column 1: Brand */}
          <div className="footer-column footer-brand">
            <div className="footer-logo">
              <img
                src="/logo.png"
                alt="METSIM"
                className="footer-logo-img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="footer-logo-text">METSIM</span>
            </div>

            <p className="footer-description">
              Soluciones metalúrgicas de excelencia para la industria paraguaya. Fabricamos piezas y estructuras que resisten el tiempo.
            </p>

            {/* Social Links */}
            <div className="footer-socials">
              <a 
                href={COMPANY_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={COMPANY_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-column">
              <h4 className="footer-column-title">{title}</h4>
              <ul className="footer-links">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.to} className="footer-link">
                      <ArrowRight size={16} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 3: Contact */}
          <div className="footer-column footer-contact">
            <h4 className="footer-column-title">Contacto</h4>

            <div className="contact-item">
              <MapPin size={20} />
              <div>
                <p className="contact-label">Ubicación</p>
                <p className="contact-value">
                  {COMPANY_CONFIG.address}
                </p>
              </div>
            </div>

            <div className="contact-item">
              <Phone size={20} />
              <div>
                <p className="contact-label">Teléfono</p>
                <a href={`tel:${COMPANY_CONFIG.whatsapp}`} className="contact-value">
                  {COMPANY_CONFIG.phone}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <Mail size={20} />
              <div>
                <p className="contact-label">Email</p>
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="contact-value">
                  {COMPANY_CONFIG.email}
                </a>
              </div>
            </div>

            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <MessageCircle size={18} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} {COMPANY_CONFIG.name}. Todos los derechos reservados.
            </p>

            <div className="footer-values">
              <span className="value-badge">[ PRECISIÓN ]</span>
              <span className="value-badge">[ CALIDAD ]</span>
              <span className="value-badge">[ CONFIANZA ]</span>
            </div>

            <div className="footer-legal">
              <a href="#" className="legal-link">
                Política de Privacidad
              </a>
              <span className="separator">•</span>
              <a href="#" className="legal-link">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;