import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Projects />
        <Services />
      </main>
    </>
  );
}
