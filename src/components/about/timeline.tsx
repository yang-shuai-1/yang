interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 h-full w-px bg-[var(--border-subtle)]" />

      <div className="space-y-12">
        {entries.map((entry, index) => (
          <div key={index} className="relative pl-8">
            {/* Dot */}
            <div className="absolute left-[-3.5px] top-1.5 h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />

            {/* Year */}
            <span className="text-sm font-semibold text-[var(--accent)]">
              {entry.year}
            </span>

            {/* Title & org */}
            <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
              {entry.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {entry.organization}
            </p>

            {/* Description */}
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-none">
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
