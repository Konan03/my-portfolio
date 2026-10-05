import { technicalAreas } from "@/data/technologies";

export default function About() {
  return (
    <section id="sobre-mi" className="about" aria-labelledby="about-title">
      <div className="site-container about-layout">
        <div className="about-profile">
          <header className="about-heading">
            <p className="section-label about-label">SOBRE MÍ</p>
            <h2 id="about-title">Ingeniería enfocada en resolver.</h2>
          </header>
          <div className="about-copy">
            <p>
              Soy Ingeniero de Sistemas egresado de la Universidad de Ibagué. He
              trabajado en desarrollo de software para proyectos académicos,
              organizaciones y soluciones orientadas a necesidades reales.
            </p>
            <p>
              Me interesa entender primero el problema antes de escribir código,
              proponer una solución clara y construir software que sea útil,
              mantenible y pueda evolucionar con el tiempo.
            </p>
          </div>
        </div>
        <div className="about-technical">
          <h3 className="section-label" id="technical-title">PERFIL TÉCNICO</h3>
          <dl className="technical-areas" aria-labelledby="technical-title">
            {technicalAreas.map((area) => (
              <div className="technical-area" key={area.name}>
                <dt>{area.name}</dt>
                <dd>
                  <ul role="list">
                    {area.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
