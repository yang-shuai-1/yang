interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillTagsProps {
  skills: Skill[];
  variant?: "bars" | "tags";
}

export function SkillTags({ skills, variant = "bars" }: SkillTagsProps) {
  if (variant === "tags") {
    return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)]"
          >
            {skill.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {skill.name}
            </span>
            <span className="text-xs text-[var(--text-tertiary)]">
              {skill.level}%
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-[var(--border-subtle)]">
            <div
              className="h-1 rounded-full bg-[var(--accent)] transition-all duration-500 ease-out"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
