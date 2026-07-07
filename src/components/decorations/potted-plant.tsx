"use client";

export function PottedPlant() {
  return (
    <div
      className="fixed bottom-6 left-6 z-0 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.04]"
      style={{ animation: "gentleFloat 6s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <svg
        width="140"
        height="180"
        viewBox="0 0 140 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pot */}
        <path
          d="M50 165 L55 145 L85 145 L90 165 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-[var(--text-primary)]"
        />
        <line
          x1="48"
          y1="155"
          x2="92"
          y2="155"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--text-primary)]"
        />
        {/* Stem */}
        <line
          x1="70"
          y1="145"
          x2="70"
          y2="110"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--text-primary)]"
        />
        {/* Leaves */}
        <ellipse
          cx="55"
          cy="125"
          rx="18"
          ry="8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          transform="rotate(-30 55 125)"
          className="text-[var(--text-primary)]"
        />
        <ellipse
          cx="85"
          cy="118"
          rx="18"
          ry="8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          transform="rotate(25 85 118)"
          className="text-[var(--text-primary)]"
        />
        <ellipse
          cx="70"
          cy="108"
          rx="14"
          ry="6"
          stroke="currentColor"
          strokeWidth="1"
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
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
