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
        <title>METSIM Solutions | Ingeniería y Tecnología en Paraguay</title>
        <meta name="description" content="METSIM Solutions ofrece servicios de ingeniería, automatización y tecnología en Paraguay. Consulte proyectos, solicite cotización y contáctenos hoy." />
        <link rel="canonical" href="https://www.metsim.com.py/" />
        <meta property="og:url" content="https://www.metsim.com.py/" />
        <meta property="og:title" content="METSIM Solutions | Ingeniería y Tecnología en Paraguay" />
        <meta property="og:description" content="Servicios de ingeniería, automatización y tecnología en Paraguay. Solicite su cotización gratuita." />
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