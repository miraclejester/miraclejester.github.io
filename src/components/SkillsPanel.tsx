import type { AboutData } from "@/data/types";
import Tag from "./Tag";

interface SkillsPanelProps {
  skills: AboutData["skills"];
}

export default function SkillsPanel({ skills }: SkillsPanelProps) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 sm:p-7">
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-fg-faint">
        Skills
      </h3>
      <div className="flex flex-col gap-6">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-fg">{group}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Tag key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
