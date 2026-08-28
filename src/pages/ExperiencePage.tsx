import { useMemo } from "react";
import { sortedEntries } from "@/data/types";
import { useTrack, useTrackData } from "@/context/TrackContext";
import Section from "@/components/Section";
import EntryGrid from "@/components/EntryGrid";
import SectionHeader from "@/components/SectionHeader";
import TrackToggle from "@/components/TrackToggle";

export default function ExperiencePage() {
  const { track } = useTrack();
  const trackData = useTrackData();
  const entries = useMemo(() => sortedEntries("experience", track), [track]);

  return (
    <main id="main-content">
      <Section labelledBy="experience-heading">
        <SectionHeader
          as="h1"
          id="experience-heading"
          title={trackData.sections.experience.title}
          blurb={trackData.sections.experience.blurb}
          action={<TrackToggle size="md" />}
        />
        <EntryGrid entries={entries} />
      </Section>
    </main>
  );
}
