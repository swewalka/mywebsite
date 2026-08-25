import { portfolio } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section site-container" aria-labelledby="about-heading">
      <Reveal className="split-section">
        <div className="section-heading">
          <p className="eyebrow">{portfolio.about.eyebrow}</p>
          <h2 id="about-heading">Curious across disciplines.</h2>
        </div>
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
