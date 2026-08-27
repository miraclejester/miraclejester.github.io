import { sortedEntries, sections } from "@/data/types";
import Section from "@/components/Section";
import EntryGrid from "@/components/EntryGrid";
import SectionHeader from "@/components/SectionHeader";

const allExperience = sortedEntries("experience");

export default function ExperiencePage() {
  return (
    <main id="main-content">
      <Section labelledBy="experience-heading">
        <SectionHeader
          as="h1"
          id="experience-heading"
          title={sections.experience.title}
          blurb={sections.experience.blurb}
        />
        <EntryGrid entries={allExperience} />
      </Section>
    </main>
  );
}
