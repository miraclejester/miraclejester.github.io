import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** "page" is the standard content column, "prose" is the narrow reading column. */
  width?: "page" | "prose";
  className?: string;
}

/**
 * The one place the page gutter and content width are defined.
 * Header, footer, and every page section use this so their left and
 * right edges line up exactly.
 */
export default function Container({
  children,
  width = "page",
  className = "",
}: ContainerProps) {
  const max = width === "prose" ? "max-w-prose" : "max-w-page";
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${max} ${className}`}>
      {children}
    </div>
  );
}
