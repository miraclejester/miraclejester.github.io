import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** id of the heading that labels this section */
  labelledBy?: string;
  /** literal label, for sections without a visible heading */
  label?: string;
  /** "surface" tints the band so alternating sections read as separate */
  tone?: "base" | "surface";
  className?: string;
}

/**
 * A full-width band with consistent vertical rhythm and a centered
 * content column. Every page section goes through this, so section
 * spacing can never drift between pages.
 */
export default function Section({
  children,
  id,
  labelledBy,
  label,
  tone = "base",
  className = "",
}: SectionProps) {
  const toned =
    tone === "surface" ? "bg-surface border-y border-line-soft" : "";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`scroll-mt-16 py-20 sm:py-24 lg:py-28 ${toned} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
