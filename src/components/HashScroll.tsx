import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does not scroll to #hash targets on navigation, so nav links
 * like /#projects would change the URL and do nothing. This restores that
 * behaviour. Sections carry scroll-mt-16 to clear the fixed header.
 */
export default function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Wait a frame so the target section is laid out before measuring
    const raf = requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);

  return null;
}
