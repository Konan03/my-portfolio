import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  return (
    <section id="proyectos" className="projects" aria-labelledby="projects-title">
      <div className="site-container">
        <header className="projects-heading">
          <p className="section-label">PROYECTOS DESTACADOS</p>
          <h2 id="projects-title">Trabajos que he realizado.</h2>
          <p className="section-description">
            Proyectos en los que la tecnología responde a una necesidad concreta.
          </p>
        </header>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
