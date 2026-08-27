interface SectionHeaderProps {
  title: string;
  blurb?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
  /** optional right-hand slot, e.g. a "View all" link */
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  blurb,
  id,
  as: Heading = "h2",
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <Heading id={id} className="text-fg">
          {title}
        </Heading>
        {blurb && (
          <p className="max-w-[58ch] text-base leading-relaxed text-fg-muted">
            {blurb}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 sm:pb-1">{action}</div>}
    </div>
  );
}
