"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { withBasePath } from "@/config/paths";
import { heroAssets } from "@/config/spaceAssets";

const launchImages = [heroAssets.launchRocket, ...heroAssets.propulsion];

type Point = readonly [x: number, y: number];

type CurveSegment = {
  start: Point;
  controlOne: Point;
  controlTwo: Point;
  end: Point;
};

const orbitCenter: Point = [-58, 42];
const orbitRadius: Point = [15, 20];

const approachCurve: CurveSegment = {
  start: [0, 2],
  controlOne: [-2, -12],
  controlTwo: [-38, 68],
  end: [orbitCenter[0] + orbitRadius[0], orbitCenter[1]],
};

const departureCurve: CurveSegment = {
  start: [orbitCenter[0] + orbitRadius[0], orbitCenter[1]],
  controlOne: [-43, 12],
  controlTwo: [25, -5],
  end: [62, -105],
};

function pointOnCurve(segment: CurveSegment, progress: number): Point {
  const inverse = 1 - progress;
  const startWeight = inverse ** 3;
  const controlOneWeight = 3 * inverse ** 2 * progress;
  const controlTwoWeight = 3 * inverse * progress ** 2;
  const endWeight = progress ** 3;

  return [
    segment.start[0] * startWeight +
      segment.controlOne[0] * controlOneWeight +
      segment.controlTwo[0] * controlTwoWeight +
      segment.end[0] * endWeight,
    segment.start[1] * startWeight +
      segment.controlOne[1] * controlOneWeight +
      segment.controlTwo[1] * controlTwoWeight +
      segment.end[1] * endWeight,
  ];
}

function createFlightPath(frameCount = 180) {
  const curveSamples: Point[] = [];
  const curveSampleCount = 120;
  const orbitSampleCount = 240;

  for (let index = 0; index <= curveSampleCount; index += 1) {
    curveSamples.push(pointOnCurve(approachCurve, index / curveSampleCount));
  }

  for (let index = 1; index <= orbitSampleCount; index += 1) {
    const angle = (-Math.PI * 2 * index) / orbitSampleCount;
    curveSamples.push([
      orbitCenter[0] + Math.cos(angle) * orbitRadius[0],
      orbitCenter[1] + Math.sin(angle) * orbitRadius[1],
    ]);
  }

  for (let index = 1; index <= curveSampleCount; index += 1) {
    curveSamples.push(pointOnCurve(departureCurve, index / curveSampleCount));
  }

  const distances = [0];
  for (let index = 1; index < curveSamples.length; index += 1) {
    const previous = curveSamples[index - 1];
    const current = curveSamples[index];
    const horizontalDistance = (current[0] - previous[0]) * 1.65;
    const verticalDistance = current[1] - previous[1];
    distances.push(
      distances[index - 1] + Math.hypot(horizontalDistance, verticalDistance),
    );
  }

  const totalDistance = distances.at(-1) ?? 1;
  const accelerationDuration = 0.3;
  const constantSpeedNormalizer = 1 - accelerationDuration / 2;

  const sampleAtDistance = (distanceProgress: number): Point => {
    const targetDistance = Math.min(1, Math.max(0, distanceProgress)) * totalDistance;
    let upperIndex = distances.findIndex((distance) => distance >= targetDistance);
    if (upperIndex === -1) upperIndex = distances.length - 1;
    if (upperIndex < 1) upperIndex = 1;

    const lowerIndex = upperIndex - 1;
    const segmentDistance = distances[upperIndex] - distances[lowerIndex];
    const localProgress = segmentDistance
      ? (targetDistance - distances[lowerIndex]) / segmentDistance
      : 0;
    const lowerPoint = curveSamples[lowerIndex];
    const upperPoint = curveSamples[upperIndex];

    return [
      lowerPoint[0] + (upperPoint[0] - lowerPoint[0]) * localProgress,
      lowerPoint[1] + (upperPoint[1] - lowerPoint[1]) * localProgress,
    ];
  };

  const times = Array.from({ length: frameCount }, (_, index) =>
    index / (frameCount - 1),
  );
  const points = times.map((time) => {
    const distanceProgress =
      time < accelerationDuration
        ? time ** 2 /
          (2 * accelerationDuration * constantSpeedNormalizer)
        : (time - accelerationDuration / 2) / constantSpeedNormalizer;

    return sampleAtDistance(distanceProgress);
  });

  const rotations: number[] = [];
  points.forEach((point, index) => {
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const horizontalDirection = (next[0] - previous[0]) * 1.65;
    const verticalDirection = next[1] - previous[1];
    let rotation =
      (Math.atan2(verticalDirection, horizontalDirection) * 180) / Math.PI + 90;

    if (index > 0) {
      while (rotation - rotations[index - 1] > 180) rotation -= 360;
      while (rotation - rotations[index - 1] < -180) rotation += 360;
    }
    rotations.push(rotation);
  });

  return {
    times,
    x: points.map(([x]) => `${x}vw`),
    y: points.map(([, y]) => `${y}vh`),
    rotate: rotations,
  };
}

const flightPath = createFlightPath();
const flightDuration = 44;

export function LaunchRocket() {
  const reduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const preload = launchImages.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = withBasePath(src);
          if (image.complete) resolve();
        }),
    );

    void Promise.all(preload).then(() => {
      if (!cancelled) setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  if (reduceMotion || !isReady || isFinished) return null;

  return (
    <motion.div
      className="launch-rocket-stage"
      aria-hidden="true"
      initial={{
        opacity: 0,
        x: flightPath.x[0],
        y: flightPath.y[0],
        scale: 0.085,
        rotate: flightPath.rotate[0],
      }}
      animate={{
        opacity: 1,
        x: flightPath.x,
        y: flightPath.y,
        scale: [0.085, 0.17, 0.255],
        rotate: flightPath.rotate,
      }}
      transition={{
        x: {
          duration: flightDuration,
          delay: 0.6,
          times: flightPath.times,
          ease: "linear",
        },
        y: {
          duration: flightDuration,
          delay: 0.6,
          times: flightPath.times,
          ease: "linear",
        },
        rotate: {
          duration: flightDuration,
          delay: 0.6,
          times: flightPath.times,
          ease: "linear",
        },
        scale: {
          duration: 24,
          delay: 0.6,
          times: [0, 0.55, 1],
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 1.2, delay: 0.6, ease: "linear" },
      }}
      onAnimationComplete={() => setIsFinished(true)}
    >
      <div className="launch-flame-stack">
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
