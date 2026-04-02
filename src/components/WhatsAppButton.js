import React from "react";
import { MessageCircle } from "lucide-react";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  const whatsappNumber = "+595994685767";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

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