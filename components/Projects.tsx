import { portfolio } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectEntry } from "@/components/work/ProjectEntry";

export function Projects() {
  return (
    <section className="section site-container" aria-labelledby="work-heading">
      <Reveal>
        <div id="work" className="section-heading work-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-heading">Projects, experiments and things I’ve built.</h2>
        </div>
      </Reveal>
      <div className="project-list">
        {portfolio.projects.map((project, index) => (
          <ProjectEntry
            key={project.id}
            project={project}
            index={index}
            total={portfolio.projects.length}
          />
        ))}
      </div>
    </section>
  );
}
