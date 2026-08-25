import { portfolio } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="section site-container" aria-labelledby="skills-heading">
      <Reveal>
        <div className="skills-intro">
          <div className="section-heading">
            <p className="eyebrow">{portfolio.skills.eyebrow}</p>
            <h2 id="skills-heading">From first principles to prototype.</h2>
          </div>
          <p>{portfolio.skills.intro}</p>
        </div>
        <div className="skills-grid">
          {portfolio.skills.groups.map((group, index) => (
            <div className="skill-group" key={group.name}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
