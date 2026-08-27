export type SpaceAssetType = "satellite";

export type SpaceAsset = {
  id: string;
  src: string;
  sourcePath: string;
  type: SpaceAssetType;
  weight: number;
  scale: readonly [number, number];
  duration: readonly [number, number];
  brightness: readonly [number, number];
  baseWidth: number;
  beacon: {
    x: number;
    y: number;
    delay: number;
  };
};

// Register a new optimized satellite here and it becomes available to SpaceTraffic.
export const trafficAssets: readonly SpaceAsset[] = [
  {
    id: "satellite-one",
    src: "/assets/optimized/satellite-1.webp",
    sourcePath: "assets/satellite-1.png",
    type: "satellite",
    weight: 3,
    scale: [0.14, 0.22],
    duration: [38, 58],
    brightness: [0.54, 0.7],
    baseWidth: 520,
    beacon: { x: 86.7, y: 17.2, delay: -1.4 },
  },
  {
    id: "satellite-two",
    src: "/assets/optimized/satellite-2.webp",
    sourcePath: "assets/satellite-2.png",
    type: "satellite",
    weight: 3,
    scale: [0.14, 0.22],
    duration: [38, 58],
    brightness: [0.54, 0.7],
    baseWidth: 520,
    beacon: { x: 74.7, y: 12.1, delay: -3.8 },
  },
];

export const heroAssets = {
  planet: "/assets/optimized/planet-1.webp",
  orbitPlanet: "/assets/optimized/planet-2.webp",
  cloud: "/assets/optimized/nebula-1.webp",
  launchRocket: "/assets/optimized/launch-rocket.webp",
  propulsion: [
    "/assets/optimized/propulsion-1.webp",
    "/assets/optimized/propulsion-2.webp",
    "/assets/optimized/propulsion-3.webp",
    "/assets/optimized/propulsion-4.webp",
    "/assets/optimized/propulsion-5.webp",
  ],
} as const;
