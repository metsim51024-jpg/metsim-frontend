// src/config/company.js

export const COMPANY_CONFIG = {
  name: "METSIM Solutions",
  email: "presupuestos@metsim.com.py",
  // Dos lineas publicas. La primera es la de presupuestos: tambien atiende
  // WhatsApp y es la que va como telefono principal en el schema de Google.
  phones: [
    { label: "Presupuestos", display: "+595 994 685 767", tel: "+595994685767" },
    { label: "Dirección · CEO", display: "+595 972 834 336", tel: "+595972834336" }
  ],
  phone: "+595 994 685 767",
  whatsapp: "+595994685767",
  address: "Avda. Carlos Morphi casi Concepción, Paraguay",
  instagram: "https://www.instagram.com/metsim_solutions/",
  facebook: "https://www.facebook.com/metsim.solutions/",
  whatsappNumber: "595994685767", // Sin formato
  hours: {
    weekday: "7:30 AM - 5:00 PM",
    saturday: "8:00 AM - 12:00 PM",
    sunday: "Cerrado"
  }
};