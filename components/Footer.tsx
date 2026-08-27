import { portfolio } from "@/config/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-container footer">
      <p>© {currentYear} {portfolio.name}</p>
      <p>{portfolio.location}</p>
      <div className="footer-links">
        {portfolio.contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in a new tab)`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
