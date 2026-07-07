import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-10 w-px bg-[var(--accent)]" />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            页面未找到
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            您访问的页面不存在或已被移除。
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            &larr; 返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
