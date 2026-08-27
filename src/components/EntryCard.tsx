import { Link } from "react-router-dom";
import type { Entry } from "@/data/types";
import Tag from "./Tag";

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const href =
    entry.kind === "experience"
      ? `/experience/${entry.id}`
      : `/projects/${entry.id}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-within:border-accent/50">
      {/* Media */}
      <div className="overflow-hidden border-b border-line-soft bg-elevated">
        {entry.media.hero ? (
          <img
            src={entry.media.hero.src}
            alt={entry.media.hero.alt}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div
            className="flex aspect-video w-full items-center justify-center text-sm text-fg-faint"
            role="img"
            aria-label="No preview available"
          >
            No preview available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Status + jam badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Tag label={entry.statusLabel} variant="status" status={entry.status} />
          {entry.jam?.placement && (
            <Tag label={entry.jam.placement} variant="jam" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-fg">
            {/* Stretched link: the whole card is clickable, one link in the a11y tree */}
            <Link
              to={href}
              className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-accent"
            >
              {entry.title}
            </Link>
          </h3>
          {entry.role && (
            <p className="text-sm font-medium text-accent">{entry.role}</p>
          )}
          <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
            {entry.tagline}
          </p>
        </div>

        {entry.jam && (
          <p className="flex items-center gap-2 text-xs text-gold">
            <span aria-hidden="true">★</span>
            <span className="truncate">{entry.jam.name}</span>
          </p>
        )}

        <div className="flex-1" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
          <div className="flex flex-wrap gap-1.5">
            {entry.techStack.slice(0, 3).map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
            {entry.techStack.length > 3 && (
              <Tag label={`+${entry.techStack.length - 3}`} />
            )}
          </div>
          <span className="shrink-0 text-xs tabular-nums text-fg-faint">
            {entry.year}
          </span>
        </div>
      </div>
    </article>
  );
}
