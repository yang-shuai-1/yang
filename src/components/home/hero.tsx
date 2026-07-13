import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="flex min-h-[90vh] items-center">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="mb-8 h-10 w-px bg-[var(--accent)]" />

        <h1 className="font-display text-[var(--text-primary)]">
          我是{siteConfig.name}，
          <br />
          一个
          <span className="text-[var(--accent)]">{siteConfig.title}</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed">
          {siteConfig.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/works"
            className="inline-flex h-10 items-center rounded-[6px] bg-transparent px-5 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)]"
          >
            浏览作品
            <span className="ml-2 text-[var(--accent)]">&rarr;</span>
          </Link>
          <Link
            href="/resume"
            className="inline-flex h-10 items-center rounded-[6px] border border-[var(--border-subtle)] bg-transparent px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
          >
            查看简历
          </Link>
        </div>
      </div>
    </section>
  );
}
