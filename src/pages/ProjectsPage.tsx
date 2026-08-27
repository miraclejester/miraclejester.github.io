import { sortedEntries, sections } from "@/data/types";
import Section from "@/components/Section";
import EntryGrid from "@/components/EntryGrid";
import SectionHeader from "@/components/SectionHeader";

const allProjects = sortedEntries("project");

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <Section labelledBy="projects-heading">
        <SectionHeader
          as="h1"
          id="projects-heading"
          title={sections.projects.title}
          blurb={sections.projects.blurb}
        />
        <EntryGrid entries={allProjects} />
      </Section>
    </main>
  );
}
