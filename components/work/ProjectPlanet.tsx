"use client";

import { motion, useReducedMotion } from "motion/react";
import { withBasePath } from "@/config/paths";
import type { Project } from "@/config/portfolio";

type ProjectPlanetProps = {
  project: Project;
  projectIndex: number;
  isMobileCarousel?: boolean;
};

const idleMotion: Array<{ y: number[]; rotate: number[]; duration: number }> = [
  { y: [0, -3, 0, 2, 0], rotate: [0, 0.35, 0, -0.25, 0], duration: 11.5 },
  { y: [0, 2, 0, -3, 0], rotate: [0, -0.3, 0, 0.2, 0], duration: 13.2 },
  { y: [0, -2, 1, 3, 0], rotate: [0, 0.2, -0.25, 0.15, 0], duration: 9.8 },
];

export function ProjectPlanet({
  project,
  projectIndex,
  isMobileCarousel = false,
}: ProjectPlanetProps) {
  const reduceMotion = useReducedMotion();
  const motionProfile = idleMotion[projectIndex % idleMotion.length];

  return (
    <motion.div
      className={`project-planet-reveal project-planet-reveal--${project.planetSize}`}
      initial={
        isMobileCarousel
          ? false
          : { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.97 }
      }
      animate={isMobileCarousel ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={isMobileCarousel ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="project-planet-halo" />
      <motion.img
        className="project-planet"
        src={withBasePath(project.planet)}
        width="720"
        height="720"
        alt=""
        loading="lazy"
        decoding="async"
        animate={
          reduceMotion
            ? undefined
            : {
                y: motionProfile.y,
                rotate: motionProfile.rotate,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: motionProfile.duration,
                ease: "easeInOut",
                repeat: Infinity,
              }
        }
      />
    </motion.div>
  );
}
