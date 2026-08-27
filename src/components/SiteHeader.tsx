import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/data/types";
import Container from "./Container";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Border appears only once the page has scrolled under the bar
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !toggleRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // Nav targets are in-page hashes (/#projects). NavLink compares pathname
  // only, so it would mark every one of them active on the home page.
  const current = `${location.pathname}${location.hash}`;
  const isActive = (href: string) =>
    href.includes("#") ? current === href : location.pathname === href;

  const linkBase =
    "relative py-2 text-sm font-medium tracking-tight transition-colors duration-150";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 h-16 bg-bg/85 backdrop-blur-md transition-colors duration-200 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          to="/"
          className="shrink-0 text-[0.9375rem] font-bold tracking-tight text-fg transition-colors hover:text-accent"
        >
          {site.author}
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {site.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} rounded-md px-3 ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-px transition-opacity duration-150 ${
                    active ? "bg-accent opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md text-fg-muted transition-colors hover:text-fg md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-px w-5 origin-center bg-current transition-transform duration-200 ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 origin-center bg-current transition-transform duration-200 ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        ref={menuRef}
        className={`absolute inset-x-0 top-full overflow-hidden bg-surface/98 backdrop-blur-md transition-[max-height,opacity] duration-200 md:hidden ${
          menuOpen
            ? "max-h-96 border-b border-line opacity-100"
            : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <Container>
          <nav aria-label="Mobile navigation" className="flex flex-col py-2">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-line-soft py-3.5 text-base font-medium transition-colors last:border-0 ${
                    active ? "text-accent" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
