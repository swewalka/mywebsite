import Image from "next/image";
import { portfolio } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import profilePhoto from "@/assets/Bewerbungsfoto_compressed.jpg";

export function About() {
  return (
    <section id="about" className="section site-container" aria-labelledby="about-heading">
      <Reveal className="split-section">
        <figure className="about-portrait">
          <Image
            src={profilePhoto}
            alt={`Portrait of ${portfolio.name}`}
            sizes="(max-width: 767px) calc(100vw - 48px), 36vw"
          />
        </figure>
        <div className="about-content">
          <div className="section-heading about-heading">
            <p className="eyebrow">{portfolio.about.eyebrow}</p>
            <h2 id="about-heading">Curious across disciplines.</h2>
          </div>
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
