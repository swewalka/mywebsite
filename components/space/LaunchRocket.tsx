"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { withBasePath } from "@/config/paths";
import { heroAssets } from "@/config/spaceAssets";

type Point = readonly [x: number, y: number];

type Curve = {
  start: Point;
  controlOne: Point;
  controlTwo: Point;
  end: Point;
};

type FlightProfile = {
  id: string;
  curves: readonly Curve[];
  duration: number;
  scale: readonly [start: number, middle: number, end: number];
};

const flightProfiles: readonly FlightProfile[] = [
  {
    id: "high-orbit",
    duration: 25,
    scale: [0.13, 0.21, 0.15],
    curves: [
      {
        start: [112, 72],
        controlOne: [96, 42],
        controlTwo: [76, 17],
        end: [52, 14],
      },
      {
        start: [52, 14],
        controlOne: [25, 10],
        controlTwo: [4, 28],
        end: [-12, 54],
      },
    ],
  },
  {
    id: "low-sweep",
    duration: 28,
    scale: [0.16, 0.29, 0.18],
    curves: [
      {
        start: [-12, 68],
        controlOne: [17, 83],
        controlTwo: [42, 84],
        end: [65, 73],
      },
      {
        start: [65, 73],
        controlOne: [86, 64],
        controlTwo: [101, 48],
        end: [112, 31],
      },
    ],
  },
  {
    id: "moon-slingshot",
    duration: 22,
    scale: [0.12, 0.18, 0.14],
    curves: [
      {
        start: [110, 17],
        controlOne: [80, 7],
        controlTwo: [48, 7],
        end: [29, 20],
      },
      {
        start: [29, 20],
        controlOne: [10, 32],
        controlTwo: [1, 51],
        end: [-12, 69],
      },
    ],
  },
  {
    id: "planet-skimming",
    duration: 26,
    scale: [0.14, 0.3, 0.17],
    curves: [
      {
        start: [-12, 40],
        controlOne: [10, 55],
        controlTwo: [22, 80],
        end: [50, 84],
      },
      {
        start: [50, 84],
        controlOne: [76, 89],
        controlTwo: [101, 66],
        end: [112, 39],
      },
    ],
  },
  {
    id: "distant-ascent",
    duration: 31,
    scale: [0.11, 0.16, 0.1],
    curves: [
      {
        start: [-11, 94],
        controlOne: [16, 81],
        controlTwo: [40, 57],
        end: [61, 36],
      },
      {
        start: [61, 36],
        controlOne: [81, 16],
        controlTwo: [99, 0],
        end: [111, -13],
      },
    ],
  },
];

const propulsionSparks = [
  { x: -54, y: 138, size: 7, duration: 1.26, delay: -0.18, angle: -16, tone: "warm" },
  { x: 38, y: 116, size: 5, duration: 1.08, delay: -0.76, angle: 13, tone: "cool" },
  { x: -25, y: 174, size: 6, duration: 1.48, delay: -1.22, angle: -7, tone: "warm" },
  { x: 67, y: 158, size: 8, duration: 1.42, delay: -0.42, angle: 19, tone: "warm" },
  { x: 16, y: 194, size: 5, duration: 1.62, delay: -1.05, angle: 5, tone: "cool" },
  { x: -72, y: 184, size: 5, duration: 1.54, delay: -0.91, angle: -22, tone: "warm" },
  { x: 48, y: 212, size: 6, duration: 1.75, delay: -1.54, angle: 14, tone: "warm" },
  { x: -10, y: 108, size: 8, duration: 1.02, delay: -0.58, angle: -3, tone: "cool" },
  { x: 82, y: 186, size: 4, duration: 1.68, delay: -0.14, angle: 24, tone: "warm" },
  { x: -42, y: 222, size: 5, duration: 1.86, delay: -1.31, angle: -12, tone: "cool" },
] as const;

function pointOnCurve(curve: Curve, progress: number): Point {
  const inverse = 1 - progress;
  const startWeight = inverse ** 3;
  const controlOneWeight = 3 * inverse ** 2 * progress;
  const controlTwoWeight = 3 * inverse * progress ** 2;
  const endWeight = progress ** 3;

  return [
    curve.start[0] * startWeight +
      curve.controlOne[0] * controlOneWeight +
      curve.controlTwo[0] * controlTwoWeight +
      curve.end[0] * endWeight,
    curve.start[1] * startWeight +
      curve.controlOne[1] * controlOneWeight +
      curve.controlTwo[1] * controlTwoWeight +
      curve.end[1] * endWeight,
  ];
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function interpolateScale(progress: number, scale: FlightProfile["scale"]) {
  if (progress <= 0.5) {
    const localProgress = smoothstep(progress * 2);
    return scale[0] + (scale[1] - scale[0]) * localProgress;
  }

  const localProgress = smoothstep((progress - 0.5) * 2);
  return scale[1] + (scale[2] - scale[1]) * localProgress;
}

function buildFlight(profile: FlightProfile, frameCount = 120) {
  const rawPoints: Point[] = [];
  const samplesPerCurve = 90;

  profile.curves.forEach((curve, curveIndex) => {
    for (let index = curveIndex === 0 ? 0 : 1; index <= samplesPerCurve; index += 1) {
      rawPoints.push(pointOnCurve(curve, index / samplesPerCurve));
    }
  });

  const distances = [0];
  for (let index = 1; index < rawPoints.length; index += 1) {
    const previous = rawPoints[index - 1];
    const current = rawPoints[index];
    distances.push(
      distances[index - 1] +
        Math.hypot((current[0] - previous[0]) * 1.08, current[1] - previous[1]),
    );
  }

  const totalDistance = distances.at(-1) ?? 1;

  const pointAtDistance = (distanceProgress: number): Point => {
    const targetDistance = distanceProgress * totalDistance;
    let upperIndex = distances.findIndex((distance) => distance >= targetDistance);
    if (upperIndex < 1) upperIndex = 1;

    const lowerIndex = upperIndex - 1;
    const segmentDistance = distances[upperIndex] - distances[lowerIndex];
    const segmentProgress = segmentDistance
      ? (targetDistance - distances[lowerIndex]) / segmentDistance
      : 0;
    const lowerPoint = rawPoints[lowerIndex];
    const upperPoint = rawPoints[upperIndex];

    return [
      lowerPoint[0] + (upperPoint[0] - lowerPoint[0]) * segmentProgress,
      lowerPoint[1] + (upperPoint[1] - lowerPoint[1]) * segmentProgress,
    ];
  };

  const times = Array.from({ length: frameCount }, (_, index) =>
    index / (frameCount - 1),
  );
  const points = times.map(pointAtDistance);
  const rotations: number[] = [];

  points.forEach((point, index) => {
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const directionX = (next[0] - previous[0]) * 1.08;
    const directionY = next[1] - previous[1];
    let rotation = (Math.atan2(directionY, directionX) * 180) / Math.PI + 90;

    if (index > 0) {
      while (rotation - rotations[index - 1] > 180) rotation -= 360;
      while (rotation - rotations[index - 1] < -180) rotation += 360;
    }

    rotations.push(rotation);
  });

  return {
    ...profile,
    left: points.map(([x]) => `${x}%`),
    top: points.map(([, y]) => `${y}%`),
    rotate: rotations,
    scaleFrames: times.map((progress) => interpolateScale(progress, profile.scale)),
    times,
  };
}

const flights = flightProfiles.map((profile) => buildFlight(profile));

function between(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

export function LaunchRocket() {
  const reduceMotion = useReducedMotion();
  const [activeFlight, setActiveFlight] = useState<{
    index: number;
    sequence: number;
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFlightIndex = useRef(-1);
  const sequence = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleFlight = useCallback(
    (initial = false) => {
      clearTimer();
      const delay = between(initial ? 4 : 9, initial ? 10 : 19) * 1000;

      timerRef.current = setTimeout(() => {
        let nextIndex = Math.floor(Math.random() * flights.length);
        while (nextIndex === lastFlightIndex.current) {
          nextIndex = Math.floor(Math.random() * flights.length);
        }

        lastFlightIndex.current = nextIndex;
        sequence.current += 1;
        setActiveFlight({ index: nextIndex, sequence: sequence.current });
      }, delay);
    },
    [clearTimer],
  );

  useEffect(() => {
    if (reduceMotion) return clearTimer;
    scheduleFlight(true);
    return clearTimer;
  }, [clearTimer, reduceMotion, scheduleFlight]);

  if (reduceMotion) {
    return (
      <RocketArtwork
        className="launch-rocket-stage launch-rocket-stage-static"
        style={{ left: "36%", top: "30%", rotate: "-112deg", scale: "0.2" }}
        showFlame={false}
      />
    );
  }

  if (!activeFlight) return null;

  const flight = flights[activeFlight.index];

  return (
    <motion.div
      key={`${flight.id}-${activeFlight.sequence}`}
      className="launch-rocket-stage"
      aria-hidden="true"
      initial={{
        left: flight.left[0],
        top: flight.top[0],
        rotate: flight.rotate[0],
        scale: flight.scaleFrames[0],
      }}
      animate={{
        left: flight.left,
        top: flight.top,
        rotate: flight.rotate,
        scale: flight.scaleFrames,
      }}
      transition={{
        duration: flight.duration,
        times: flight.times,
        ease: "linear",
      }}
      onAnimationComplete={() => {
        setActiveFlight(null);
        scheduleFlight(false);
      }}
    >
      <RocketLayers showFlame />
    </motion.div>
  );
}

function RocketArtwork({
  className,
  style,
  showFlame,
}: {
  className: string;
  style: CSSProperties;
  showFlame: boolean;
}) {
  return (
    <div className={className} aria-hidden="true" style={style}>
      <RocketLayers showFlame={showFlame} />
    </div>
  );
}

function RocketLayers({ showFlame }: { showFlame: boolean }) {
  return (
    <>
      {showFlame ? (
        <>
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
          <div className="launch-exhaust-effects" aria-hidden="true">
            <span className="launch-engine-bloom" />
            <span className="launch-exhaust-core" />
            {propulsionSparks.map((spark, index) => (
              <span
                className={`launch-spark launch-spark--${spark.tone}`}
                key={`${spark.x}-${spark.y}-${index}`}
                style={
                  {
                    "--spark-x": `${spark.x}px`,
                    "--spark-y": `${spark.y}px`,
                    "--spark-size": `${spark.size}px`,
                    "--spark-duration": `${spark.duration}s`,
                    "--spark-delay": `${spark.delay}s`,
                    "--spark-angle": `${spark.angle}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </>
      ) : null}
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
    </>
  );
}
