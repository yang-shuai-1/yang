"use client";

export function GeometricBuddy() {
  return (
    <div
      className="fixed bottom-8 right-6 z-0 pointer-events-none select-none opacity-[0.05] dark:opacity-[0.03]"
      style={{ animation: "gentleFloat 7s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Friendly circle head */}
        <circle
          cx="60"
          cy="55"
          r="30"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-[var(--text-primary)]"
        />
        {/* Eyes */}
        <circle cx="50" cy="50" r="3" fill="currentColor" className="text-[var(--text-primary)]" />
        <circle cx="70" cy="50" r="3" fill="currentColor" className="text-[var(--text-primary)]" />
        {/* Smile */}
        <path
          d="M50 62 Q60 72 70 62"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="text-[var(--text-primary)]"
        />
        {/* Body — triangle */}
        <polygon
          points="60,85 30,120 90,120"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-[var(--text-primary)]"
        />
      </svg>
      <style jsx>{`
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
}
