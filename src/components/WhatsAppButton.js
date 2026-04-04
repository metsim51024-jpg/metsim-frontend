import React from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY_CONFIG } from "../config/company";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  const whatsappLink = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-btn"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="whatsapp-tooltip">¿Necesitas ayuda?</span>
    </a>
  );
}

export default WhatsAppButton;