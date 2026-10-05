import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experiencia" className="experience" aria-labelledby="experience-title">
      <div className="site-container">
        <header className="experience-heading">
          <div>
            <p className="section-label experience-label">EXPERIENCIA</p>
            <h2 id="experience-title">Experiencia que suma perspectiva.</h2>
          </div>
          <p className="experience-intro">
            Mi recorrido combina desarrollo de software, trabajo en proyectos reales
            y experiencia en formación académica.
          </p>
        </header>
        <ol className="experience-list" data-count={experience.length} role="list">
          {experience.map((item) => (
            <li className="experience-card" key={item.id}>
              <p className="experience-period">{item.period}</p>
              <h3>{item.organization}</h3>
              <p className="experience-role">{item.role}</p>
              <p className="experience-description">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
