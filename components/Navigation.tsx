"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/config/portfolio";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const closeMenuAtDesktopWidth = (event: MediaQueryListEvent) => {
      if (!event.matches) setIsOpen(false);
    };

    mobileQuery.addEventListener("change", closeMenuAtDesktopWidth);
    return () => mobileQuery.removeEventListener("change", closeMenuAtDesktopWidth);
  }, []);

  return (
    <header className={`site-nav ${hasScrolled || isOpen ? "site-nav--scrolled" : ""}`}>
      <div className="site-container nav-inner">
        <a className="monogram" href="#top" aria-label={`${portfolio.name}, back to top`}>
          {portfolio.monogram}
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${isOpen ? "mobile-nav--open" : ""}`}
          aria-label="Mobile navigation"
        >
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
