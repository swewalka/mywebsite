import { portfolio } from "@/config/portfolio";
import { Arrow } from "@/components/ui/Arrow";
import { HeroArtwork } from "@/components/space/HeroArtwork";
import { SpaceTraffic } from "@/components/space/SpaceTraffic";

export function Hero() {
  return (
    <section id="top" className="hero site-container" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{portfolio.hero.eyebrow}</p>
        <h1 id="hero-heading">
          {portfolio.hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-description">{portfolio.hero.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={portfolio.hero.primaryCta.href}>
            {portfolio.hero.primaryCta.label}
            <Arrow />
          </a>
          <a className="button button-secondary" href={portfolio.hero.secondaryCta.href}>
            {portfolio.hero.secondaryCta.label}
          </a>
        </div>
      </div>
      <HeroArtwork />
      <SpaceTraffic />
      <div className="hero-index" aria-hidden="true">
        <span>47.3769° N</span>
        <span>16° / 02°</span>
      </div>
    </section>
  );
}
