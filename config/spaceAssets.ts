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
};

// Register a new optimized satellite here and it becomes available to SpaceTraffic.
export const trafficAssets: readonly SpaceAsset[] = [
  {
    id: "satellite-one",
    src: "/assets/optimized/satellite-1.webp",
    sourcePath: "assets/satellite-1.png",
    type: "satellite",
    weight: 3,
    scale: [0.25, 0.38],
    duration: [27, 44],
    brightness: [0.58, 0.76],
    baseWidth: 520,
  },
  {
    id: "satellite-two",
    src: "/assets/optimized/satellite-2.webp",
    sourcePath: "assets/satellite-2.png",
    type: "satellite",
    weight: 3,
    scale: [0.25, 0.38],
    duration: [27, 44],
    brightness: [0.58, 0.76],
    baseWidth: 520,
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
