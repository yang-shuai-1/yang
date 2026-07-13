"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  all: "全部",
  "web-development": "代码项目",
  blog: "博客日记",
  photography: "摄影",
  other: "其他",
};

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150",
            activeCategory === category
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          {CATEGORY_LABELS[category] || category}
          {activeCategory === category && (
            <motion.div
              layoutId="filter-underline"
              className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 bg-[var(--accent)]"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
