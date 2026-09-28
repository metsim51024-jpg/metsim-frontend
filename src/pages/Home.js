import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import ProjectsShowcase from "../components/ProjectsShowcase";
import QuoteForm from "../components/QuoteForm";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Helmet>
        <title>Estructuras Metálicas y Equipos Industriales en Paraguay | METSIM</title>
        <meta name="description" content="METSIM Solutions — fabricación de estructuras metálicas, galpones industriales y equipos de tratamiento de aguas en Paraguay. Cotización sin cargo en 24 horas." />
        <link rel="canonical" href="https://www.metsim.com.py/" />
        <meta property="og:url" content="https://www.metsim.com.py/" />
        <meta property="og:title" content="Estructuras Metálicas y Equipos Industriales en Paraguay | METSIM" />
        <meta property="og:description" content="Fabricación de estructuras metálicas, galpones industriales y equipos de tratamiento de aguas en Paraguay. Cotización sin cargo en 24 horas." />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectsShowcase />
        {/* <ProductCatalog /> - ELIMINADO PARA VERSION 1.0 - AGREGADO EN VERSION 2.0 */}
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;