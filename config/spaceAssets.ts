export type SpaceAssetType =
  | "rocket"
  | "satellite"
  | "meteor"
  | "planet"
  | "cloud"
  | "other";

export type SpaceAsset = {
  id: string;
  src: string;
  sourcePath: string;
  type: SpaceAssetType;
  weight: number;
  scale: readonly [number, number];
  duration: readonly [number, number];
  opacity: readonly [number, number];
  baseWidth: number;
};

// Register a new optimized asset here and it becomes available to SpaceTraffic.
export const trafficAssets: readonly SpaceAsset[] = [
  {
    id: "rocket-one",
    src: "/assets/optimized/rocket-1.webp",
    sourcePath: "assets/rocket-1.png",
    type: "rocket",
    weight: 2,
    scale: [0.35, 0.62],
    duration: [12, 20],
    opacity: [0.68, 0.92],
    baseWidth: 520,
  },
  {
    id: "satellite-one",
    src: "/assets/optimized/satellite-1.webp",
    sourcePath: "assets/satellite-1.png",
    type: "satellite",
    weight: 3,
    scale: [0.25, 0.44],
    duration: [22, 36],
    opacity: [0.38, 0.64],
    baseWidth: 520,
  },
  {
    id: "satellite-two",
    src: "/assets/optimized/satellite-2.webp",
    sourcePath: "assets/satellite-2.png",
    type: "satellite",
    weight: 3,
    scale: [0.25, 0.44],
    duration: [22, 36],
    opacity: [0.38, 0.64],
    baseWidth: 520,
  },
  {
    id: "meteor-one",
    src: "/assets/optimized/meterioide-1.webp",
    sourcePath: "assets/meterioide-1.png",
    type: "meteor",
    weight: 2,
    scale: [0.15, 0.3],
    duration: [3.5, 7],
    opacity: [0.58, 0.86],
    baseWidth: 420,
  },
];

export const heroAssets = {
  rocket: "/assets/optimized/rocket-2.webp",
  planet: "/assets/optimized/planet-2.webp",
  cloud: "/assets/optimized/nebula-1.webp",
} as const;
