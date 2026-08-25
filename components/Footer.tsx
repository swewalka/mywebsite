import { portfolio } from "@/config/portfolio";

export function Footer() {
  return (
    <footer className="site-container footer">
      <p>© {portfolio.year} {portfolio.name}</p>
      <p>{portfolio.location}</p>
      <div className="footer-links">
        {portfolio.contact.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
