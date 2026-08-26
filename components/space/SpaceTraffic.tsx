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

function reversePath(path: FlightPath): FlightPath {
  return {
    x: [path.x[2], path.x[1], path.x[0]],
    y: [path.y[2], path.y[1], path.y[0]],
    rotation: [path.rotation[2], path.rotation[1], path.rotation[0]],
  };
}

function choosePath(): FlightPath {
  const path = paths[Math.floor(Math.random() * paths.length)];
  const shouldTravelRight = Math.random() < 0.5;
  const travelsRight = path.x[2] > path.x[0];

  return shouldTravelRight === travelsRight ? path : reversePath(path);
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
  const path = choosePath();
  const driftDirection = Math.random() < 0.5 ? -1 : 1;

  return {
    id,
    asset,
    path,
    duration: between(...asset.duration) * (isMobile ? 1.12 : 1),
    width: Math.round(asset.baseWidth * scale),
    brightness: between(...asset.brightness),
    blur: between(0, 0.8),
    rotationDrift: driftDirection * between(30, 56),
  };
}

export function SpaceTraffic() {
  const reduceMotion = useReducedMotion();
  const [trafficOpacity, setTrafficOpacity] = useState(0);
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
    const hero = document.getElementById("top");
    const work = document.getElementById("work");
    if (!hero) return;

    let frameId: number | null = null;

    const updateOpacity = () => {
      frameId = null;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const nebulaFadeHeight = Math.min(window.innerHeight * 0.34, 360);
      const heroOpacity = Math.max(0, Math.min(1, 1 - heroBottom / nebulaFadeHeight));
      const workBounds = work?.getBoundingClientRect();
      const workIsVisible = workBounds
        ? workBounds.top < window.innerHeight * 0.86 && workBounds.bottom > window.innerHeight * 0.14
        : false;
      const opacity = heroOpacity * (workIsVisible ? 0.08 : 1);
      setTrafficOpacity(opacity);
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateOpacity);
    };

    updateOpacity();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
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
        ? between(isMobile ? 8 : 6, isMobile ? 14 : 12)
        : between(isMobile ? 26 : 18, isMobile ? 46 : 32);

      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        nextId.current += 1;
        setFlight(createFlight(nextId.current, isMobile));
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

    const delay = between(isMobile ? 26 : 18, isMobile ? 46 : 32) * 1000;
    timerRef.current = setTimeout(() => {
      nextId.current += 1;
      setFlight(createFlight(nextId.current, isMobile));
    }, delay);
  };

  return flight ? (
    <div className="space-traffic-layer" style={{ opacity: trafficOpacity }}>
      <FlyingSpaceObject key={flight.id} flight={flight} onComplete={handleComplete} />
    </div>
  ) : null;
}
