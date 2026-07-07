export default function AboutLoading() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 animate-pulse">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-6 w-px bg-[var(--border-subtle)]" />
          <div className="h-8 w-24 rounded bg-[var(--bg-elevated)]" />
        </div>
        <div className="flex gap-10">
          <div className="w-[280px] shrink-0 aspect-[3/4] rounded-[8px] bg-[var(--bg-surface)]" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-48 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-full rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-5/6 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-4/6 rounded bg-[var(--bg-elevated)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
