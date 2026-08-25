"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { trafficAssets, type SpaceAsset } from "@/config/spaceAssets";
import { FlyingSpaceObject, type Flight, type FlightPath } from "./FlyingSpaceObject";

const paths: readonly FlightPath[] = [
  { x: [-28, 48, 118], y: [82, 42, -24], rotation: [40, 43, 41] },
  { x: [-28, 44, 118], y: [18, 30, 72], rotation: [126, 129, 127] },
  { x: [118, 46, -30], y: [20, 46, 70], rotation: [-133, -130, -132] },
  { x: [-26, 52, 118], y: [66, 52, 22], rotation: [63, 60, 62] },
];

function between(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function chooseWeightedAsset(): SpaceAsset {
  const totalWeight = trafficAssets.reduce((sum, asset) => sum + asset.weight, 0);
  let point = Math.random() * totalWeight;

  for (const asset of trafficAssets) {
    point -= asset.weight;
    if (point <= 0) return asset;
  }

  return trafficAssets[trafficAssets.length - 1];
}

function createFlight(id: number, isMobile: boolean): Flight {
  const asset = chooseWeightedAsset();
  const scale = between(...asset.scale) * (isMobile ? 0.72 : 1);
  const basePath = paths[Math.floor(Math.random() * paths.length)];
  const path =
    asset.type === "meteor"
      ? paths[Math.floor(Math.random() * 2)]
      : basePath;

  return {
    id,
    asset,
    path,
    duration: between(...asset.duration) * (isMobile ? 1.12 : 1),
    width: Math.round(asset.baseWidth * scale),
    opacity: between(...asset.opacity),
    blur: asset.type === "satellite" ? between(0, 0.8) : between(0, 0.35),
  };
}

export function SpaceTraffic() {
  const reduceMotion = useReducedMotion();
  const [flight, setFlight] = useState<Flight | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      clearTimer();
      timerRef.current = setTimeout(() => setFlight(null), 0);
      return clearTimer;
    }

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    let cancelled = false;

    const schedule = (initial: boolean) => {
      const delaySeconds = initial
        ? between(isMobile ? 14 : 8, isMobile ? 25 : 18)
        : between(isMobile ? 24 : 15, isMobile ? 48 : 40);

      timerRef.current = setTimeout(() => {
        if (cancelled) return;

        const shouldSpawn = initial || Math.random() < (isMobile ? 0.48 : 0.68);
        if (shouldSpawn) {
          nextId.current += 1;
          setFlight(createFlight(nextId.current, isMobile));
        } else {
          schedule(false);
        }
      }, delaySeconds * 1000);
    };

    schedule(true);
    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [clearTimer, reduceMotion]);

  const handleComplete = () => {
    setFlight(null);
    if (reduceMotion) return;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    clearTimer();

    const attemptSpawn = () => {
      const delay = between(isMobile ? 24 : 15, isMobile ? 48 : 40) * 1000;
      timerRef.current = setTimeout(() => {
        if (Math.random() < (isMobile ? 0.48 : 0.68)) {
          nextId.current += 1;
          setFlight(createFlight(nextId.current, isMobile));
        } else {
          attemptSpawn();
        }
      }, delay);
    };

    attemptSpawn();
  };

  return flight ? (
    <FlyingSpaceObject key={flight.id} flight={flight} onComplete={handleComplete} />
  ) : null;
}
