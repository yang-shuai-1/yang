"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function BottomSheet({ open, onClose, items }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const delta = currentY.current - startY.current;
    if (delta > 80) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/20 transition-opacity duration-300 ease-out md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 rounded-t-[16px] bg-[var(--bg-base)] px-6 pb-10 pt-6 shadow-none transition-transform duration-300 ease-out md:hidden",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[var(--border-strong)]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[var(--text-secondary)]"
          aria-label="关闭菜单"
        >
          <X size={20} />
        </button>

        {/* Nav items */}
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-[6px] px-4 py-3.5 text-lg font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
