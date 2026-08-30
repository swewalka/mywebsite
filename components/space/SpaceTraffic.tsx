"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { trafficAssets, type SpaceAsset } from "@/config/spaceAssets";
import { FlyingSpaceObject, type Flight, type FlightPath } from "./FlyingSpaceObject";

type TrafficZone = "about" | "contact";

const paths: Record<TrafficZone, readonly FlightPath[]> = {
  about: [
    { x: [-18, 48, 112], y: [50, 24, -8], rotation: [40, 43, 41] },
    { x: [112, 48, -20], y: [-8, 22, 50], rotation: [-133, -130, -132] },
  ],
  contact: [
    { x: [-18, 50, 112], y: [46, 28, 8], rotation: [63, 60, 62] },
    { x: [112, 48, -20], y: [8, 26, 46], rotation: [-133, -130, -132] },
  ],
};

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

function choosePath(zone: TrafficZone): FlightPath {
  const zonePaths = paths[zone];
  const path = zonePaths[Math.floor(Math.random() * zonePaths.length)];
  const shouldTravelRight = Math.random() < 0.5;
  const travelsRight = path.x[2] > path.x[0];

  return shouldTravelRight === travelsRight ? path : reversePath(path);
}

function chooseAsset(zone: TrafficZone): SpaceAsset {
  const zoneAsset = trafficAssets[zone === "about" ? 0 : 1];
  if (zoneAsset) return zoneAsset;

  const totalWeight = trafficAssets.reduce((sum, asset) => sum + asset.weight, 0);
  let point = Math.random() * totalWeight;

  for (const asset of trafficAssets) {
    point -= asset.weight;
    if (point <= 0) return asset;
  }

  return trafficAssets[trafficAssets.length - 1];
}

function createFlight(id: number, isMobile: boolean, zone: TrafficZone): Flight {
  const asset = chooseAsset(zone);
  const scale = between(...asset.scale) * (isMobile ? 0.72 : 1);
  const path = choosePath(zone);
  const driftDirection = Math.random() < 0.5 ? -1 : 1;

  return {
    id,
    asset,
    path,
    duration: between(...asset.duration) * (isMobile ? 1.12 : 1),
    width: Math.round(asset.baseWidth * scale),
    brightness: between(...asset.brightness),
    blur: between(0, 0.55),
    rotationDrift: driftDirection * between(30, 56),
  };
}

export function SpaceTraffic({ zone }: { zone: TrafficZone }) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [flight, setFlight] = useState<Flight | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mobileQuery.matches);

    updateMobileState();
    mobileQuery.addEventListener("change", updateMobileState);
    return () => mobileQuery.removeEventListener("change", updateMobileState);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearby(entry.isIntersecting),
      { rootMargin: "35% 0px" },
    );
    observer.observe(layer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !isNearby) {
      clearTimer();
      timerRef.current = setTimeout(() => setFlight(null), 0);
      return clearTimer;
    }

    let cancelled = false;

    const schedule = (initial: boolean) => {
      const delaySeconds = initial
        ? between(0.2, 1.2)
        : between(isMobile ? 18 : 12, isMobile ? 30 : 22);

      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        nextId.current += 1;
        setFlight(createFlight(nextId.current, isMobile, zone));
      }, delaySeconds * 1000);
    };

    schedule(true);
    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [clearTimer, isMobile, isNearby, reduceMotion, zone]);

  const handleComplete = () => {
    setFlight(null);
    if (reduceMotion || !isNearby) return;

    clearTimer();

    const delay = between(isMobile ? 18 : 12, isMobile ? 30 : 22) * 1000;
    timerRef.current = setTimeout(() => {
      nextId.current += 1;
      setFlight(createFlight(nextId.current, isMobile, zone));
    }, delay);
  };

  return (
    <div ref={layerRef} className={`space-traffic-layer space-traffic-layer--${zone}`}>
      {flight ? (
        <FlyingSpaceObject key={flight.id} flight={flight} onComplete={handleComplete} />
      ) : null}
    </div>
  );
}
