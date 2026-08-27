import { Link } from "react-router-dom";
import { hero, about, contact, sections, sortedEntries } from "@/data/types";
import Container from "@/components/Container";
import Section from "@/components/Section";
import EntryGrid from "@/components/EntryGrid";
import SectionHeader from "@/components/SectionHeader";
import SkillsPanel from "@/components/SkillsPanel";
import Button from "@/components/Button";

const featuredExperience = sortedEntries("experience").filter((e) => e.featured);
const featuredProjects = sortedEntries("project").filter((e) => e.featured);

function ViewAllLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      {/* ============================ HERO ============================ */}
      <section
        aria-label="Introduction"
        className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-24"
      >
        {/* Grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-strong) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)",
          }}
        />

        <Container className="relative">
          {/* Centered measure: keeps the text block optically centered on
              wide screens instead of stranded against the left edge. */}
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {hero.eyebrow}
            </p>
            <h1 className="text-fg">{hero.headline}</h1>
            <p className="text-lg leading-relaxed text-fg-muted sm:text-xl">
              {hero.subheadline}
            </p>
            <p className="max-w-[60ch] leading-relaxed text-fg-faint">
              {hero.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {hero.ctas.map((cta) => (
                <Button key={cta.href} href={cta.href} variant={cta.variant}>
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================= EXPERIENCE ========================= */}
      <Section id="experience" labelledBy="experience-heading" tone="surface">
        <SectionHeader
          id="experience-heading"
          title={sections.experience.title}
          blurb={sections.experience.blurb}
          action={<ViewAllLink to="/experience">View all</ViewAllLink>}
        />
        <EntryGrid entries={featuredExperience} />
      </Section>

      {/* ========================== PROJECTS ========================== */}
      <Section id="projects" labelledBy="projects-heading">
        <SectionHeader
          id="projects-heading"
          title={sections.projects.title}
          blurb={sections.projects.blurb}
          action={<ViewAllLink to="/projects">View all</ViewAllLink>}
        />
        <EntryGrid entries={featuredProjects} />
      </Section>

      {/* =========================== ABOUT ============================ */}
      <Section id="about" labelledBy="about-heading" tone="surface">
        <SectionHeader id="about-heading" title={about.heading} />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div className="flex flex-col gap-6">
            {about.bio.map((paragraph, i) => (
              <p
                key={i}
                className="max-w-[68ch] text-base leading-[1.8] text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <SkillsPanel skills={about.skills} />
        </div>
      </Section>

      {/* ========================== CONTACT =========================== */}
      <Section id="contact" labelledBy="contact-heading">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
          <h2 id="contact-heading" className="text-fg">
            {contact.heading}
          </h2>
          <p className="max-w-[52ch] text-base leading-relaxed text-fg-muted">
            {contact.body}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {contact.links.map((link) => (
              <Button key={link.href} href={link.href} variant={link.variant}>
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
