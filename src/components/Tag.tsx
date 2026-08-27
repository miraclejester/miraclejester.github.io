import type { EntryStatus } from "@/data/types";

type TagVariant = "default" | "accent" | "jam" | "status";

interface TagProps {
  label: string;
  variant?: TagVariant;
  status?: EntryStatus;
}

const statusColors: Record<EntryStatus, string> = {
  released: "bg-emerald/12 text-emerald border-emerald/25",
  prototype: "bg-elevated text-fg-muted border-line-strong",
  "in-development": "bg-accent/12 text-accent border-accent/25",
  "live-service": "bg-amber/12 text-amber border-amber/25",
  archived: "bg-elevated text-fg-faint border-line",
};

const variantColors: Record<Exclude<TagVariant, "status">, string> = {
  default: "bg-elevated text-fg-muted border-line",
  accent: "bg-accent/10 text-accent border-accent/25",
  jam: "bg-gold/10 text-gold border-gold/25",
};

export default function Tag({ label, variant = "default", status }: TagProps) {
  const colorClass =
    variant === "status" && status
      ? statusColors[status]
      : variantColors[variant === "status" ? "default" : variant];

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-medium leading-none tracking-tight ${colorClass}`}
    >
      {label}
    </span>
  );
}
