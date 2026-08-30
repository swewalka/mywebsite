"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Project } from "@/config/portfolio";
import { ProjectPlanet } from "./ProjectPlanet";

type ProjectEntryProps = {
  project: Project;
  index: number;
  total: number;
  carouselRef: RefObject<HTMLDivElement | null>;
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

export function ProjectEntry({
  project,
  index,
  total,
  carouselRef,
}: ProjectEntryProps) {
  const reduceMotion = useReducedMotion();
  const entryRef = useRef<HTMLElement>(null);
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);
  const orientation = index % 2 === 0 ? "planet-left" : "planet-right";
  const links = getProjectLinks(project);
  const { scrollXProgress } = useScroll({
    container: carouselRef,
    target: entryRef,
    axis: "x",
    offset: ["start end", "end start"],
  });
  const planetX = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    ["-42vw", "0vw", "42vw"],
  );
  const planetScale = useTransform(scrollXProgress, [0, 0.5, 1], [0.68, 1, 0.68]);
  const planetOpacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.28, 1, 0.28]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateCarouselMode = () => setIsMobileCarousel(mediaQuery.matches);

    updateCarouselMode();
    mediaQuery.addEventListener("change", updateCarouselMode);

    return () => mediaQuery.removeEventListener("change", updateCarouselMode);
  }, []);

  const animateWithCarousel = isMobileCarousel && !reduceMotion;

  return (
    <article
      ref={entryRef}
      className={`project-entry project-entry--${orientation}`}
      aria-label={`Project ${index + 1} of ${total}: ${project.title}`}
    >
      <div className="project-visual">
        <motion.div
          className="project-planet-carousel-motion"
          style={
            animateWithCarousel
              ? {
                  x: planetX,
                  scale: planetScale,
                  opacity: planetOpacity,
                }
              : undefined
          }
        >
          <ProjectPlanet
            project={project}
            projectIndex={index}
            isMobileCarousel={isMobileCarousel}
          />
        </motion.div>
      </div>

      <div className="project-copy">
        <motion.div
          className="project-copy-content"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{
            duration: 0.58,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="project-index">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3>{project.title}</h3>
          {project.status ? <p className="project-status">{project.status}</p> : null}
          <p className="project-description">{project.description}</p>
        </motion.div>
        {links.length > 0 ? (
          <motion.div
            className="project-links"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
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
          </motion.div>
        ) : null}
      </div>
    </article>
  );
}
