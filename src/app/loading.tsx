export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-5 w-px bg-[var(--accent)]" />
        <p className="text-sm text-[var(--text-tertiary)]">加载中...</p>
      </div>
    </div>
  );
}
