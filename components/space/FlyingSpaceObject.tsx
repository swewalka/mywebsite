"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { withBasePath } from "@/config/paths";
import type { SpaceAsset } from "@/config/spaceAssets";

export type FlightPath = {
  x: readonly [number, number, number];
  y: readonly [number, number, number];
  rotation: readonly [number, number, number];
};

export type Flight = {
  id: number;
  asset: SpaceAsset;
  path: FlightPath;
  duration: number;
  width: number;
  brightness: number;
  blur: number;
  rotationDrift: number;
};

export function FlyingSpaceObject({
  flight,
  onComplete,
}: {
  flight: Flight;
  onComplete: () => void;
}) {
  const { path } = flight;

  return (
    <motion.div
      className={`flying-object flying-object--${flight.asset.type}`}
      aria-hidden="true"
      initial={{
        x: `${path.x[0]}vw`,
        y: `${path.y[0]}vh`,
        rotate: path.rotation[0],
      }}
      animate={{
        x: path.x.map((value) => `${value}vw`),
        y: path.y.map((value) => `${value}vh`),
        rotate: [...path.rotation],
      }}
      transition={{
        duration: flight.duration,
        ease: "linear",
        times: [0, 0.52, 1],
      }}
      onAnimationComplete={onComplete}
      style={{
        filter: `brightness(${flight.brightness}) saturate(0.72) contrast(0.94) blur(${flight.blur}px)`,
      }}
    >
      <motion.div
        className="flying-object-drift"
        initial={{ rotate: 0 }}
        animate={{ rotate: flight.rotationDrift }}
        transition={{ duration: flight.duration, ease: "linear" }}
      >
        <Image
          className="flying-object-image"
          src={withBasePath(flight.asset.src)}
          width={flight.asset.baseWidth}
          height={flight.asset.baseWidth}
          alt=""
          decoding="async"
          unoptimized
          style={{ width: flight.width, height: flight.width }}
        />
      </motion.div>
    </motion.div>
  );
}
