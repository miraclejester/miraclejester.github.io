import type { ReactNode } from "react";
import { hero, sortedEntries, tracks, type TrackId } from "@/data/types";
import { useTrack } from "@/context/TrackContext";

/**
 * Two cards in the hero letting a visitor choose which body of work
 * to look at. Selecting one filters every experience and projects
 * listing on the site; the header toggle mirrors the same state.
 */

const icons: Record<TrackId, ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3Z" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7.5 7h9a5 5 0 0 1 4.9 4l.9 5.2A2.6 2.6 0 0 1 19.7 19c-.9 0-1.7-.5-2.2-1.2L16.2 16H7.8l-1.3 1.8C6 18.5 5.2 19 4.3 19a2.6 2.6 0 0 1-2.6-2.8l.9-5.2A5 5 0 0 1 7.5 7Z" />
      <path d="M7.2 11v2.4M6 12.2h2.4" strokeLinecap="round" />
      <circle cx="15.6" cy="11.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="13.2" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/** Static counts — the data set is fixed at build time. */
const counts = Object.fromEntries(
  tracks.map((t) => [
    t.id,
    {
      experience: sortedEntries("experience", t.id).length,
      projects: sortedEntries("project", t.id).length,
    },
  ])
) as Record<TrackId, { experience: number; projects: number }>;

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

export default function TrackPicker() {
  const { track, setTrack } = useTrack();

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold tracking-tight text-fg">
          {hero.trackPicker.heading}
        </h2>
        <p className="text-sm text-fg-faint">{hero.trackPicker.hint}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tracks.map((t) => {
          const active = t.id === track;
          const c = counts[t.id];
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setTrack(t.id)}
              className={`group flex flex-col gap-3 rounded-xl border p-5 text-left transition duration-200 ${
                active
                  ? "border-accent/50 bg-accent/[0.07] shadow-lift"
                  : "border-line bg-surface hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    active ? "text-accent" : "text-fg-faint group-hover:text-fg-muted"
                  }`}
                >
                  {icons[t.id]}
                </span>
                <span
                  className={`text-base font-bold tracking-tight transition-colors ${
                    active ? "text-accent" : "text-fg"
                  }`}
                >
                  {t.label}
                </span>
                {active && (
                  <span className="ml-auto text-xs font-medium text-accent">
                    Viewing
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-fg-muted">{t.blurb}</p>

              <p className="text-xs tabular-nums text-fg-faint">
                {plural(c.experience, "role")}
                <span aria-hidden="true"> · </span>
                {plural(c.projects, "project")}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
