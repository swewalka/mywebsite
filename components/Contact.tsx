import { portfolio } from "@/config/portfolio";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { SpaceTraffic } from "@/components/space/SpaceTraffic";

export function Contact() {
  return (
    <section id="contact" className="contact-section site-container" aria-labelledby="contact-heading">
      <SpaceTraffic zone="contact" />
      <Reveal>
        <p className="eyebrow">{portfolio.contact.eyebrow}</p>
        <p className="contact-prompt">{portfolio.contact.prompt}</p>
        <h2 id="contact-heading">
          <a href={`mailto:${portfolio.contact.email}`}>
            {portfolio.contact.cta}
            <Arrow />
          </a>
        </h2>
        <a className="contact-email" href={`mailto:${portfolio.contact.email}`}>
          {portfolio.contact.email}
        </a>
      </Reveal>
    </section>
  );
}
