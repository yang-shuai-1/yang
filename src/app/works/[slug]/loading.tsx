export default function WorkDetailLoading() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 animate-pulse">
        <div className="h-4 w-20 rounded bg-[var(--bg-elevated)]" />
        <div className="mt-10 flex items-center gap-4">
          <div className="h-6 w-px bg-[var(--border-subtle)]" />
          <div className="h-4 w-32 rounded bg-[var(--bg-elevated)]" />
        </div>
        <div className="mt-4 h-10 w-3/4 rounded bg-[var(--bg-elevated)]" />
        <div className="mt-4 h-6 w-full rounded bg-[var(--bg-elevated)]" />
        <div className="mt-12 aspect-[16/9] w-full rounded-[8px] bg-[var(--bg-surface)]" />
      </div>
    </div>
  );
}
