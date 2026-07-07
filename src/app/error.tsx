"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center px-6">
          <div className="mx-auto mb-6 h-10 w-px bg-[var(--accent)]" />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            出了点小问题
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
            页面遇到了一些意外情况。别担心，不是什么大问题。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[var(--accent)] px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
            >
              再试一次
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-[6px] bg-transparent px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
