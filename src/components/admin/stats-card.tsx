import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export function StatsCard({ label, value, subtitle }: StatsCardProps) {
  return (
    <div className="rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
      <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">{subtitle}</p>
      )}
    </div>
  );
}
