import React from "react";
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