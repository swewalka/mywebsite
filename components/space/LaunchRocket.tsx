"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { withBasePath } from "@/config/paths";
import { heroAssets } from "@/config/spaceAssets";

const flightPath = {
  left: ["108%", "91%", "70%", "43%", "18%", "31%", "62%", "89%", "108%"],
  top: ["88%", "72%", "38%", "16%", "30%", "65%", "82%", "67%", "38%"],
  rotate: [-38, -48, -66, -102, -148, -218, -252, -300, -326],
  scale: [0.28, 0.4, 0.48, 0.42, 0.55, 0.72, 0.66, 0.44, 0.3],
  opacity: [0, 1, 1, 0.9, 1, 1, 1, 0.85, 0],
  times: [0, 0.1, 0.23, 0.38, 0.52, 0.66, 0.78, 0.9, 1],
};

const flightDuration = 16;

export function LaunchRocket() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="launch-rocket-stage"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, left: flightPath.left[0], top: flightPath.top[0] }}
      animate={
        reduceMotion
          ? { opacity: 0.72, left: "34%", top: "25%", rotate: -112, scale: 0.46 }
          : {
              left: flightPath.left,
              top: flightPath.top,
              rotate: flightPath.rotate,
              scale: flightPath.scale,
              opacity: flightPath.opacity,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: flightDuration,
              delay: 1.25,
              times: flightPath.times,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 4,
            }
      }
    >
      <div className="launch-flame-stack" hidden={Boolean(reduceMotion)}>
        {heroAssets.propulsion.map((src, index) => (
          <Image
            className="launch-flame-frame"
            src={withBasePath(src)}
            width="624"
            height="833"
            alt=""
            decoding="async"
            unoptimized
            key={src}
            style={{ animationDelay: `${index * -88}ms` }}
          />
        ))}
      </div>
      <Image
        className="launch-rocket-body"
        src={withBasePath(heroAssets.launchRocket)}
        width="720"
        height="720"
        alt=""
        fetchPriority="high"
        decoding="async"
        unoptimized
      />
    </motion.div>
  );
}
