import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import QuoteTracking from "./QuoteTracking";

jest.mock("axios", () => ({ __esModule: true, default: { get: jest.fn() } }));

const TOKEN = "a".repeat(48);

// Misma forma que devuelve GET /api/tracking/:token en backend/routes/tracking.js
const respuesta = {
  client_name: "Carmen Mathews",
  description: "Galpon de 20x40 con entrepiso",
  files: 2,
  status: "manufacturing",
  status_label: "En fabricacion",
  created_at: "2026-09-01T12:00:00.000Z",
  updated_at: "2026-09-12T12:00:00.000Z",
  timeline: [
    { key: "received", label: "Solicitud recibida", description: "", state: "done", at: "2026-09-01T12:00:00.000Z" },
    { key: "analyzing", label: "En analisis tecnico", description: "", state: "done", at: "2026-09-02T12:00:00.000Z" },
    { key: "quoted", label: "Presupuesto enviado", description: "", state: "done", at: "2026-09-03T12:00:00.000Z" },
    { key: "approved", label: "Aprobado por el cliente", description: "", state: "done", at: "2026-09-05T12:00:00.000Z" },
    { key: "drawings", label: "Planos en aprobacion", description: "", state: "done", at: "2026-09-08T12:00:00.000Z" },
    { key: "manufacturing", label: "En fabricacion", description: "Tu pedido esta en planta.", state: "current", at: "2026-09-12T12:00:00.000Z" },
    { key: "delivered", label: "Entregado", description: "", state: "pending", at: null },
  ],
};

const renderTracking = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/seguimiento/${TOKEN}`]}>
        <Routes>
          <Route path="/seguimiento/:token" element={<QuoteTracking />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

afterEach(() => jest.clearAllMocks());

test("pide el seguimiento del token de la URL", async () => {
  axios.get.mockResolvedValue({ data: { success: true, data: respuesta } });
  renderTracking();

  await waitFor(() => expect(axios.get).toHaveBeenCalled());
  expect(axios.get.mock.calls[0][0]).toContain(`/tracking/${TOKEN}`);
});

test("muestra el recorrido completo y la etapa actual", async () => {
  axios.get.mockResolvedValue({ data: { success: true, data: respuesta } });
  renderTracking();

  expect(await screen.findByText("Entregado")).toBeInTheDocument();
  // Saluda por el nombre de pila, no por el nombre completo
  expect(screen.getByText(/Hola Carmen/)).toBeInTheDocument();
  expect(screen.getByText("Galpon de 20x40 con entrepiso")).toBeInTheDocument();

  // La etapa en curso es la unica marcada como actual
  const actuales = document.querySelectorAll(".timeline-step.is-current");
  expect(actuales).toHaveLength(1);
  expect(actuales[0]).toHaveTextContent("En fabricacion");
});

test("un token inexistente no se reporta como error de red", async () => {
  axios.get.mockRejectedValue({ response: { status: 404 } });
  renderTracking();

  expect(await screen.findByText("No encontramos este seguimiento")).toBeInTheDocument();
});

test("una caida del backend ofrece WhatsApp como salida", async () => {
  axios.get.mockRejectedValue(new Error("Network Error"));
  renderTracking();

  expect(await screen.findByText("No pudimos conectarnos")).toBeInTheDocument();
  expect(screen.getByText(/Consultar por WhatsApp/)).toBeInTheDocument();
});
