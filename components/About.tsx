import Image from "next/image";
import { portfolio } from "@/config/portfolio";
import { withBasePath } from "@/config/paths";
import { Reveal } from "@/components/ui/Reveal";
import { SpaceTraffic } from "@/components/space/SpaceTraffic";

export function About() {
  return (
    <section id="about" className="section site-container" aria-labelledby="about-heading">
      <SpaceTraffic zone="about" />
      <Reveal className="split-section">
        <div className="section-heading about-heading">
          <p className="eyebrow">{portfolio.about.eyebrow}</p>
          <h2 id="about-heading">Curious across disciplines.</h2>
        </div>
        <figure className="about-portrait">
          <Image
            src={withBasePath("/assets/optimized/profile.webp")}
            alt={`Portrait of ${portfolio.name}`}
            width={1000}
            height={1500}
            sizes="(max-width: 767px) calc(100vw - 48px), 36vw"
          />
        </figure>
        <div className="about-content">
          <p>{portfolio.about.body}</p>
          <div className="focus-list">
            <span className="meta-label">Current focus</span>
            <ul>
              {portfolio.about.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
