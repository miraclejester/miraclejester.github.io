import { useMemo } from "react";
import { sortedEntries } from "@/data/types";
import { useTrack, useTrackData } from "@/context/TrackContext";
import Section from "@/components/Section";
import EntryGrid from "@/components/EntryGrid";
import SectionHeader from "@/components/SectionHeader";
import TrackToggle from "@/components/TrackToggle";

export default function ProjectsPage() {
  const { track } = useTrack();
  const trackData = useTrackData();
  const entries = useMemo(() => sortedEntries("project", track), [track]);

  return (
    <main id="main-content">
      <Section labelledBy="projects-heading">
        <SectionHeader
          as="h1"
          id="projects-heading"
          title={trackData.sections.projects.title}
          blurb={trackData.sections.projects.blurb}
          action={<TrackToggle size="md" />}
        />
        <EntryGrid entries={entries} />
      </Section>
    </main>
  );
}
