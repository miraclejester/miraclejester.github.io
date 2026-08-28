import { tracks } from "@/data/types";
import { useTrack } from "@/context/TrackContext";

interface TrackToggleProps {
  /** "sm" fits the header bar; "md" is for in-page use above a grid. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Segmented control for switching between the Web and Games tracks.
 * Rendered in the header and above the listing pages, so the choice
 * is reachable from anywhere the filtered content is visible.
 */
export default function TrackToggle({
  size = "sm",
  className = "",
}: TrackToggleProps) {
  const { track, setTrack } = useTrack();

  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      role="group"
      aria-label="Portfolio track"
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-line bg-elevated p-0.5 ${className}`}
    >
      {tracks.map((t) => {
        const active = t.id === track;
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={active}
            onClick={() => setTrack(t.id)}
            className={`rounded-md font-semibold tracking-tight transition-colors duration-150 ${pad} ${
              active
                ? "bg-accent/15 text-accent"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
