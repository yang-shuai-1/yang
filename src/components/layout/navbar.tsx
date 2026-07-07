"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { BottomSheet } from "@/components/layout/bottom-sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out",
          scrolled
            ? "glass border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--text-primary)]"
          >
            <HairlineRule className="h-5" variant="accent" />
            <span className="text-base font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-8">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                    {/* Nav dot indicator on hover */}
                    <span className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="rounded-full p-2 text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                aria-label="切换主题"
                title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
              >
                <div className="relative h-5 w-5">
                  <Sun
                    size={20}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      theme === "dark"
                        ? "rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                    )}
                  />
                  <Moon
                    size={20}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      theme === "dark"
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-0 opacity-0"
                    )}
                  />
                </div>
              </button>
            )}
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="打开菜单"
          >
            <span className="block h-px w-5 bg-[var(--text-primary)] transition-transform" />
            <span className="block h-px w-5 bg-[var(--text-primary)] transition-transform" />
          </button>
        </nav>
      </header>

      {/* Mobile bottom sheet */}
      <BottomSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={siteConfig.navItems.map((item) => ({
          label: item.label,
          href: item.href,
        }))}
      />
    </>
  );
}
