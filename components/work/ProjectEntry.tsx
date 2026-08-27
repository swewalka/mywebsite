"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/config/portfolio";
import { ProjectPlanet } from "./ProjectPlanet";

type ProjectEntryProps = {
  project: Project;
  index: number;
  total: number;
};

type ProjectLink = {
  href: string;
  label: string;
  accessibleLabel: string;
};

function getProjectLinks(project: Project): ProjectLink[] {
  return [
    project.projectUrl
      ? {
          href: project.projectUrl,
          label: "Visit project",
          accessibleLabel: `View ${project.title}`,
        }
      : null,
    project.githubUrl
      ? {
          href: project.githubUrl,
          label: "View on GitHub",
          accessibleLabel: `View ${project.title} on GitHub`,
        }
      : null,
    project.caseStudyUrl
      ? {
          href: project.caseStudyUrl,
          label: "Case study",
          accessibleLabel: `Read the ${project.title} case study`,
        }
      : null,
  ].filter((link): link is ProjectLink => link !== null);
}

export function ProjectEntry({ project, index, total }: ProjectEntryProps) {
  const reduceMotion = useReducedMotion();
  const orientation = index % 2 === 0 ? "planet-left" : "planet-right";
  const links = getProjectLinks(project);

  return (
    <article className={`project-entry project-entry--${orientation}`}>
      <div className="project-visual">
        <ProjectPlanet project={project} projectIndex={index} />
      </div>

      <motion.div
        className="project-copy"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.58, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="project-index">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3>{project.title}</h3>
        {project.status ? <p className="project-status">{project.status}</p> : null}
        <p className="project-description">{project.description}</p>
        {links.length > 0 ? (
          <div className="project-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.accessibleLabel} (opens in a new tab)`}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        ) : null}
      </motion.div>
    </article>
  );
}
