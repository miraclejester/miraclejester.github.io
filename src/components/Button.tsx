import { type AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import type { CtaVariant } from "@/data/types";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: CtaVariant | "ghost";
  href: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-150";

const variants: Record<string, string> = {
  primary: "bg-accent text-bg hover:bg-accent-bright",
  secondary:
    "border border-line-strong bg-transparent text-fg hover:border-accent/50 hover:bg-accent/8 hover:text-accent",
  ghost: "bg-transparent text-fg-muted hover:bg-elevated hover:text-fg",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  // Everything on this site is internal except http(s) and mailto. In-page
  // hashes go through the router too — HashScroll does the scrolling — so
  // "See my work" does not trigger a full page reload.
  const isExternal = href.startsWith("http") || href.startsWith("mailto");

  if (!isExternal) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
