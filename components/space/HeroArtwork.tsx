import Image from "next/image";
import { heroAssets } from "@/config/spaceAssets";
import { withBasePath } from "@/config/paths";
import { LaunchRocket } from "./LaunchRocket";

export function HeroArtwork() {
  return (
    <div className="hero-artwork" aria-hidden="true">
      <Image
        className="hero-cloud"
        src={withBasePath(heroAssets.cloud)}
        width="820"
        height="820"
        alt=""
        decoding="async"
      />
      <span className="artwork-axis artwork-axis-horizontal" />
      <span className="artwork-axis artwork-axis-vertical" />
      <span className="artwork-orbit artwork-orbit-outer" />
      <span className="artwork-orbit artwork-orbit-inner" />
      <div className="hero-planet-wrap">
        <Image
          className="hero-planet"
          src={withBasePath(heroAssets.planet)}
          width="1100"
          height="1100"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-orbit-planet-wrap">
        <Image
          className="hero-orbit-planet"
          src={withBasePath(heroAssets.orbitPlanet)}
          width="420"
          height="420"
          alt=""
          decoding="async"
        />
      </div>
      <LaunchRocket />
      <span className="artwork-marker artwork-marker-one" />
      <span className="artwork-marker artwork-marker-two" />
    </div>
  );
}
