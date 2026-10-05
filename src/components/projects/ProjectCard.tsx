import type { Project } from "@/data/projects";
import Image from "next/image";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      {project.image ? (
        <div className="project-visual project-visual-image">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            sizes="(min-width: 1264px) 600px, (min-width: 1024px) 52vw, (max-width: 640px) calc(100vw - 40px), calc(100vw - 80px)"
          />
        </div>
      ) : (
      <div className="project-visual" aria-hidden="true">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-cover-name">{project.name}</span>
      </div>
      )}
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
          {project.externalLink ? (
            <a className="project-link" href={project.externalLink.href} target="_blank" rel="noopener noreferrer">
              {project.externalLink.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (abre en una nueva pestaña)</span>
            </a>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </article>
  );
}
