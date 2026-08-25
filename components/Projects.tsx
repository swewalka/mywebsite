import { portfolio } from "@/config/portfolio";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section id="work" className="section site-container" aria-labelledby="work-heading">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-heading">Projects built with purpose.</h2>
        </div>
        <div className="project-list">
          {portfolio.projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="project-body">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} disciplines`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              {project.href ? (
                <a className="project-link" href={project.href} aria-label={`View ${project.title}`}>
                  <Arrow />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
