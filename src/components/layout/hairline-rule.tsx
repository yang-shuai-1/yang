import { cn } from "@/lib/utils";

interface HairlineRuleProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
  variant?: "accent" | "subtle";
}

export function HairlineRule({
  className,
  orientation = "vertical",
  variant = "accent",
}: HairlineRuleProps) {
  return (
    <div
      className={cn(
        orientation === "vertical" ? "w-px" : "h-px w-full",
        variant === "accent" ? "bg-[var(--accent)]" : "bg-[var(--border-subtle)]",
        className
      )}
      aria-hidden="true"
    />
  );
}
