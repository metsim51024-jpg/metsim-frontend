import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import QuoteForm from "./components/QuoteForm";

// Dependencias solo-ESM que el jest de CRA no transforma; ningun test envia formularios.
jest.mock("axios", () => ({ __esModule: true, default: { post: jest.fn(), get: jest.fn() } }));
jest.mock("sonner", () => ({ toast: { success: jest.fn(), error: jest.fn() } }));

// Lee el canonical del <head> real, que es lo que termina viendo Googlebot
// despues de renderizar el JS.
const canonicalOf = async (ui) => {
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>
  );
  // react-helmet-async escribe en el <head> de forma diferida
  await waitFor(() => expect(document.head.querySelector('link[rel="canonical"]')).not.toBeNull());
  return document.head.querySelector('link[rel="canonical"]').getAttribute("href");
};

afterEach(() => {
  cleanup();
  document.head.querySelectorAll('link[rel="canonical"]').forEach((n) => n.remove());
});

test("la home declara su propio canonical, no el de /contacto", async () => {
  expect(await canonicalOf(<Home />)).toBe("https://www.metsim.com.py/");
});

test("/contacto standalone si declara su canonical", async () => {
  expect(await canonicalOf(<Contact standalone />)).toBe("https://www.metsim.com.py/contacto");
});

test("/cotizacion standalone si declara su canonical", async () => {
  expect(await canonicalOf(<QuoteForm standalone />)).toBe("https://www.metsim.com.py/cotizacion");
});
