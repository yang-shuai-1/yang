"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "仪表盘", href: "/admin", icon: LayoutDashboard },
  { label: "作品管理", href: "/admin/works", icon: Briefcase },
  { label: "简历管理", href: "/admin/resume", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="flex-1 px-3 py-4">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const footer = (
    <div className="border-t border-[var(--border-subtle)] p-3">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
      >
        <LogOut size={16} />
        退出登录
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 text-[var(--text-secondary)] lg:hidden"
        aria-label="打开菜单"
      >
        <Menu size={18} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-56 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="h-5 w-px bg-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            管理后台
          </span>
        </div>
        {nav}
        {footer}
      </aside>

      {/* Mobile sidebar — slides from left */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-56 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-transform duration-300 ease-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-5 w-px bg-[var(--accent)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              管理后台
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-[4px] p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="关闭菜单"
          >
            <X size={16} />
          </button>
        </div>
        {nav}
        {footer}
      </aside>
    </>
  );
}
