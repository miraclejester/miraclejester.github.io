import type { ReactNode } from "react";
import type { Entry } from "@/data/types";
import Tag from "./Tag";
import Button from "./Button";

interface DetailSidebarProps {
  entry: Entry;
}

/** One card shell, so every sidebar block shares padding and border treatment. */
function SidebarCard({
  title,
  children,
  tone = "base",
}: {
  title: string;
  children: ReactNode;
  tone?: "base" | "gold";
}) {
  const shell =
    tone === "gold"
      ? "border-gold/25 bg-gold/8"
      : "border-line bg-surface";
  const heading = tone === "gold" ? "text-gold/80" : "text-fg-faint";

  return (
    <div className={`rounded-xl border p-6 ${shell}`}>
      <h2
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.14em] ${heading}`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/** One label/value row of the info list. */
function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-xs uppercase tracking-wide text-fg-faint">{label}</dt>
      <dd className="text-sm leading-relaxed text-fg">{children}</dd>
    </div>
  );
}

export default function DetailSidebar({ entry }: DetailSidebarProps) {
  return (
    <aside className="flex flex-col gap-6" aria-label="Details">
      <SidebarCard title="Info">
        <dl className="flex flex-col gap-5">
          <InfoRow label="Status">
            <Tag
              label={entry.statusLabel}
              variant="status"
              status={entry.status}
            />
          </InfoRow>
          <InfoRow label="Date">{entry.dateLabel}</InfoRow>
          {entry.role && <InfoRow label="Role">{entry.role}</InfoRow>}
          {entry.genre && <InfoRow label="Genre">{entry.genre}</InfoRow>}
          {entry.platforms.length > 0 && (
            <InfoRow label="Platforms">{entry.platforms.join(", ")}</InfoRow>
          )}
          {entry.team.composition && (
            <InfoRow label="Team">{entry.team.composition}</InfoRow>
          )}
        </dl>
      </SidebarCard>

      {entry.jam && (
        <SidebarCard title="Jam" tone="gold">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gold">{entry.jam.name}</p>
            {entry.jam.theme && (
              <p className="text-sm text-fg-muted">Theme: {entry.jam.theme}</p>
            )}
            {entry.jam.placement && (
              <p className="text-base font-bold text-gold">
                {entry.jam.placement}
              </p>
            )}
          </div>
        </SidebarCard>
      )}

      {entry.techStack.length > 0 && (
        <SidebarCard title="Tech Stack">
          <div className="flex flex-wrap gap-2">
            {entry.techStack.map((tech) => (
              <Tag key={tech} label={tech} variant="accent" />
            ))}
          </div>
        </SidebarCard>
      )}

      {entry.team.credits.length > 0 && (
        <SidebarCard title="Credits">
          <ul className="flex flex-col gap-4">
            {entry.team.credits.map((credit, i) => (
              <li key={i} className="flex flex-col gap-1">
                {credit.url ? (
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-colors hover:text-accent-bright"
                  >
                    {credit.name}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-fg">
                    {credit.name}
                  </span>
                )}
                <span className="text-xs leading-relaxed text-fg-faint">
                  {credit.role}
                </span>
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}

      {entry.links.length > 0 && (
        <div className="flex flex-col gap-3">
          {entry.links.map((link, i) => (
            <Button
              key={i}
              href={link.href}
              variant={i === 0 ? "primary" : "secondary"}
              className="w-full"
            >
              {link.label}
            </Button>
          ))}
        </div>
      )}
    </aside>
  );
}
