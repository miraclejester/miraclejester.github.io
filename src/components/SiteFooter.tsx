import { Link } from "react-router-dom";
import { site } from "@/data/types";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line-soft bg-surface">
      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity */}
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-[0.9375rem] font-bold tracking-tight text-fg transition-colors hover:text-accent"
            >
              {site.author}
            </Link>
            <p className="text-sm leading-relaxed text-fg-faint">
              {site.footer.note}
            </p>
          </div>

          {/* Elsewhere */}
          <nav aria-label="Social links" className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-faint">
              Elsewhere
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.social.map((link) => {
                const isMail = link.href.startsWith("mailto");
                return (
                  <li key={link.kind}>
                    <a
                      href={link.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-line-soft pt-6 text-xs text-fg-faint">
          {site.footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
