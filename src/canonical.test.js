import fs from "fs";
import path from "path";
import React from "react";
import { render, cleanup, waitFor, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Contact from "./components/Contact";
import QuoteForm from "./components/QuoteForm";

// Dependencias solo-ESM que el jest de CRA no transforma; ningun test envia formularios.
jest.mock("axios", () => ({ __esModule: true, default: { post: jest.fn(), get: jest.fn() } }));
jest.mock("sonner", () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
// El visor 3D no aporta nada al <head> y carga un web component que jsdom no soporta.
jest.mock("./components/ModelViewer", () => () => null);

const SITE = "https://www.metsim.com.py";

// El <head> real que sirve Vercel. La primera version de este test renderizaba
// en un documento vacio y por eso no vio que las etiquetas fijas de index.html
// quedaban junto a las de Helmet: dos canonical en cada ficha, el de la home primero.
const HEAD_HTML = (() => {
  const html = fs.readFileSync(path.join(__dirname, "..", "public", "index.html"), "utf8");
  return html.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/%PUBLIC_URL%/g, "");
})();

const leer = () => ({
  canonicals: [...document.head.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute("href")),
  descriptions: [...document.head.querySelectorAll('meta[name="description"]')].map((m) => m.getAttribute("content")),
});

const DESCRIPCION_HOME = (() => {
  document.head.innerHTML = HEAD_HTML;
  return leer().descriptions[0];
})();

const renderEn = (ruta, ui, patron = ruta) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path={patron} element={ui} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

// Espera a que Helmet termine de escribir y exige UNA sola etiqueta de cada tipo.
// La pausa no es decorativa: en la home el canonical fijo ya vale "/", asi que sin
// esperar a Helmet la condicion se cumple antes de tiempo y el test no prueba nada.
const headFinal = async (canonicalEsperado) => {
  await act(() => new Promise((r) => setTimeout(r, 150)));
  await waitFor(() => expect(leer().canonicals).toEqual([canonicalEsperado]));
  return leer();
};

beforeEach(() => {
  document.head.innerHTML = HEAD_HTML;
});

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
});

test("el index.html real trae un canonical fijo (si no, el resto de los tests no prueba nada)", () => {
  expect(leer().canonicals).toEqual([`${SITE}/`]);
});

test("la home queda con un solo canonical, el suyo", async () => {
  renderEn("/", <Home />);
  const h = await headFinal(`${SITE}/`);
  expect(h.descriptions).toHaveLength(1);
});

test("una ficha de producto reemplaza el canonical y la descripcion de la home", async () => {
  renderEn("/productos/tanques-metalicos", <ProductPage />, "/productos/:slug");
  const h = await headFinal(`${SITE}/productos/tanques-metalicos`);
  expect(h.descriptions).toHaveLength(1);
  expect(h.descriptions[0]).not.toBe(DESCRIPCION_HOME);
  expect(h.descriptions[0]).toMatch(/tanques/i);
});

test("/contacto standalone declara su canonical y no el de la home", async () => {
  renderEn("/contacto", <Contact standalone />);
  await headFinal(`${SITE}/contacto`);
});

test("/cotizacion standalone declara su canonical y no el de la home", async () => {
  renderEn("/cotizacion", <QuoteForm standalone />);
  await headFinal(`${SITE}/cotizacion`);
});
