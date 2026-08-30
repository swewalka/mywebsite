"use client";

import { useRef } from "react";
import { portfolio } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectEntry } from "@/components/work/ProjectEntry";

export function Projects() {
  const projectListRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="section site-container" aria-labelledby="work-heading">
      <Reveal>
        <div className="section-heading work-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-heading">Projects, experiments and things I’ve built.</h2>
        </div>
      </Reveal>
      <p className="project-swipe-hint" aria-hidden="true">
        Swipe to explore <span>←&nbsp;&nbsp;→</span>
      </p>
      <div
        ref={projectListRef}
        className="project-list"
        role="region"
        aria-label="Selected projects"
      >
        {portfolio.projects.map((project, index) => (
          <ProjectEntry
            key={project.id}
            project={project}
            index={index}
            total={portfolio.projects.length}
            carouselRef={projectListRef}
          />
        ))}
      </div>
    </section>
  );
}
