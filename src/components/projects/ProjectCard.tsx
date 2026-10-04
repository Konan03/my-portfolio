import type { Project } from "@/data/projects";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      {/* Reserved for a real screenshot; the typographic cover is decorative. */}
      <div className="project-visual" aria-hidden="true">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-cover-name">{project.name}</span>
      </div>
      <div className="project-content">
        <p className="section-label project-category">{project.category}</p>
        <h3 id={`${project.id}-title`}>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-technologies" aria-label="Tecnologías">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-action">
          <button
            type="button"
            disabled
            className="project-link"
            aria-describedby={`${project.id}-status`}
          >
            Ver proyecto <span aria-hidden="true">→</span>
          </button>
          <span id={`${project.id}-status`} className="project-status">
            Próximamente
          </span>
        </div>
      </div>
    </article>
  );
}
