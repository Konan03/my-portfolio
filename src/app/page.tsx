import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
