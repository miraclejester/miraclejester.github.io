import type { Entry } from "@/data/types";
import EntryCard from "./EntryCard";

interface EntryGridProps {
  entries: Entry[];
}

export default function EntryGrid({ entries }: EntryGridProps) {
  if (entries.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
