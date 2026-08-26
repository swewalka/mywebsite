"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { heroAssets } from "@/config/spaceAssets";
import { withBasePath } from "@/config/paths";
import { LaunchRocket } from "./LaunchRocket";

export function HeroArtwork() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 35, damping: 24 });
  const springY = useSpring(y, { stiffness: 35, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      reduceMotion ||
      window.innerWidth < 768 ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };

  const resetPointer = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="hero-artwork"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.img
        className="hero-cloud"
        src={withBasePath(heroAssets.cloud)}
        width="820"
        height="820"
        alt=""
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />
      <div className="hero-planet-wrap">
        <motion.img
          className="hero-planet"
          src={withBasePath(heroAssets.planet)}
          width="420"
          height="420"
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.76, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        />
      </div>
      <div className="hero-orbit-planet-wrap">
        <motion.img
          className="hero-orbit-planet"
          src={withBasePath(heroAssets.orbitPlanet)}
          width="420"
          height="420"
          alt=""
          decoding="async"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.72, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45 }}
        />
      </div>
      <LaunchRocket />
      <span className="artwork-orbit" />
      <span className="artwork-caption">ASSEMBLED / PAPER STUDY 02</span>
    </div>
  );
}
