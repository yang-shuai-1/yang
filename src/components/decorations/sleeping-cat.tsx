"use client";

export function SleepingCat() {
  return (
    <div className="fixed bottom-4 right-4 z-0 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.04]" aria-hidden="true">
      <svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: "gentleFloat 8s ease-in-out infinite" }}>
        {/* Body */}
        <ellipse cx="80" cy="100" rx="55" ry="30" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-[var(--text-primary)]" />
        {/* Head */}
        <circle cx="55" cy="75" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-[var(--text-primary)]" />
        {/* Ears */}
        <polygon points="38,52 32,35 48,48" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--text-primary)]" />
        <polygon points="70,48 76,28 62,42" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-[var(--text-primary)]" />
        {/* Closed eyes */}
        <path d="M44 72 Q50 68 56 72" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" className="text-[var(--text-primary)]" />
        <path d="M60 72 Q66 68 72 72" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" className="text-[var(--text-primary)]" />
        {/* Nose */}
        <circle cx="58" cy="78" r="2" fill="currentColor" className="text-[var(--text-primary)]" />
        {/* Tail */}
        <path d="M130 95 Q145 80 140 60 Q138 50 145 45" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-[var(--text-primary)]" />
        {/* Zzz */}
        <text x="95" y="55" className="text-[var(--text-primary)]" fontSize="14" fontFamily="sans-serif" opacity="0.5">z</text>
        <text x="108" y="45" className="text-[var(--text-primary)]" fontSize="16" fontFamily="sans-serif" opacity="0.35">z</text>
        <text x="122" y="35" className="text-[var(--text-primary)]" fontSize="18" fontFamily="sans-serif" opacity="0.2">z</text>
      </svg>
      <style jsx>{`
        @keyframes gentleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
    </div>
  );
}
