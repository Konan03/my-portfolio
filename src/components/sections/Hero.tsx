import { CONTACT_HREF, PROJECTS_HREF } from "@/utils/constants";
import HeroBackground from "@/components/hero/HeroBackground";

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="site-container hero-content">
        <p className="hero-label">INGENIERO DE SISTEMAS · IBAGUÉ, COLOMBIA</p>
        <p className="hero-intro">Hola, soy Manuel Caicedo.</p>
        <h1 id="hero-title">
          Construyo software<br className="hero-line-break" /> para resolver{" "}
          <span>problemas reales.</span>
        </h1>
        <div className="hero-details">
          <p className="hero-description">
            Desarrollo sitios web, aplicaciones y sistemas a medida para personas,
            emprendimientos y organizaciones.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={PROJECTS_HREF}>
              Ver mis proyectos <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-secondary" href={CONTACT_HREF}>
              Hablemos <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
