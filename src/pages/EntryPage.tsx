import type { ReactNode } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getEntry, sections, type EntryKind } from "@/data/types";
import NotFoundPage from "./NotFoundPage";
import Container from "@/components/Container";
import Breadcrumb from "@/components/Breadcrumb";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import MediaGallery from "@/components/MediaGallery";
import DetailSidebar from "@/components/DetailSidebar";

/** One heading + body block, so every detail section shares its rhythm. */
function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-5">
      <h2 id={headingId} className="text-xl font-bold text-fg">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items, dim = false }: { items: string[]; dim?: boolean }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              dim ? "bg-accent/40" : "bg-accent"
            }`}
          />
          <span className="text-base leading-[1.8] text-fg-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function EntryPage() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const kind: EntryKind = pathname.startsWith("/experience")
    ? "experience"
    : "project";

  if (!id) return <NotFoundPage />;

  const entry = getEntry(kind, id);
  if (!entry) return <NotFoundPage />;

  const listingHref = kind === "experience" ? "/experience" : "/projects";
  const listingLabel =
    kind === "experience" ? sections.experience.title : sections.projects.title;

  const hasMedia =
    entry.media.screenshots.length > 0 || entry.media.videos.length > 0;

  return (
    <main id="main-content" className="py-12 sm:py-16">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: listingLabel, href: listingHref },
            { label: entry.title },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          {/* ---------------- Main column ---------------- */}
          <article className="flex flex-col gap-12">
            <header className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Tag
                  label={entry.statusLabel}
                  variant="status"
                  status={entry.status}
                />
                {entry.jam?.placement && (
                  <Tag label={entry.jam.placement} variant="jam" />
                )}
                {entry.genre && <Tag label={entry.genre} />}
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-fg">{entry.title}</h1>
                {entry.role && (
                  <p className="text-base font-semibold text-accent">
                    {entry.role}
                  </p>
                )}
              </div>

              <p className="max-w-[62ch] text-lg leading-relaxed text-fg-muted">
                {entry.tagline}
              </p>

              {entry.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {entry.links.map((link, i) => (
                    <Button
                      key={i}
                      href={link.href}
                      variant={i === 0 ? "primary" : "secondary"}
                    >
                      {link.label}
                    </Button>
                  ))}
                </div>
              )}
            </header>

            {entry.media.hero && (
              <div className="overflow-hidden rounded-xl border border-line bg-elevated">
                <img
                  src={entry.media.hero.src}
                  alt={entry.media.hero.alt}
                  className="max-h-[480px] w-full object-cover"
                />
              </div>
            )}

            {entry.description.length > 0 && (
              <DetailSection title="Overview">
                <div className="flex flex-col gap-5">
                  {entry.description.map((paragraph, i) => (
                    <p
                      key={i}
                      className="max-w-[68ch] text-base leading-[1.8] text-fg-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </DetailSection>
            )}

            {entry.highlights.length > 0 && (
              <DetailSection title="Technical Highlights">
                <BulletList items={entry.highlights} />
              </DetailSection>
            )}

            {entry.features.length > 0 && (
              <DetailSection title="Features">
                <BulletList items={entry.features} dim />
              </DetailSection>
            )}

            {hasMedia && (
              <DetailSection title="Media">
                <MediaGallery
                  screenshots={entry.media.screenshots}
                  videos={entry.media.videos}
                />
              </DetailSection>
            )}

            {entry.whatILearned && (
              <section
                aria-labelledby="learned-heading"
                className="rounded-xl border border-line bg-surface p-6 sm:p-8"
              >
                <h2
                  id="learned-heading"
                  className="mb-4 text-xl font-bold text-fg"
                >
                  What I Learned
                </h2>
                <div className="flex flex-col gap-5">
                  {entry.whatILearned.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="max-w-[68ch] text-base leading-[1.8] text-fg-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ---------------- Sidebar ----------------
              Sticky, and its own scroll container: a sidebar taller than the
              viewport would otherwise only reveal its bottom once the main
              column had scrolled past it. */}
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-3 lg:[scrollbar-gutter:stable]">
            <DetailSidebar entry={entry} />
          </div>
        </div>
      </Container>
    </main>
  );
}
