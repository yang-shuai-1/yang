import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { getWorkBySlug, getAllWorks } from "@/lib/works";
import { getWorkBySlugFromDB, getAllWorksFromDB } from "@/lib/works-db";
import type { WorkWithContent } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  let work = await getWorkBySlugFromDB(slug);
  if (!work) work = getWorkBySlug(slug);
  if (!work) return { title: "作品未找到" };
  return { title: work.title, description: work.description };
}

const CATEGORY_LABELS: Record<string, string> = {
  "brand-design": "品牌设计",
  "web-development": "网页开发",
  photography: "摄影",
  other: "其他",
};

export default async function WorkDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let work: (WorkWithContent & { _fromDB?: boolean }) | null =
    await getWorkBySlugFromDB(slug);
  const fromDB = !!work;
  if (!work) work = getWorkBySlug(slug);
  if (!work) notFound();

  const dbWorks = await getAllWorksFromDB();
  const allWorks = dbWorks.length > 0 ? dbWorks : getAllWorks();
  const currentIndex = allWorks.findIndex((w) => w.slug === slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork =
    currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  const heroImage =
    work.coverImage?.startsWith("/") || work.coverImage?.startsWith("http")
      ? work.coverImage
      : `/images/placeholder-1.svg`;

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={16} />
            返回作品集
          </Link>

          <header className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <HairlineRule className="h-6" variant="accent" />
              <div>
                <span className="text-sm text-[var(--text-tertiary)]">
                  {CATEGORY_LABELS[work.category] || work.category} /{" "}
                  {work.year}
                </span>
              </div>
            </div>
            <h1 className="font-display text-[var(--text-primary)]">
              {work.title}
            </h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-none">
              {work.description}
            </p>
          </header>

          {/* Hero image */}
          <div className="mt-12 aspect-[16/9] w-full relative rounded-[8px] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <Image
              src={heroImage}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="mt-12 max-w-none">
            {work.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const { node, ...rest } =
                      props as Record<string, unknown>;
                    return (
                      <h2
                        className="mt-12 mb-4 text-2xl font-semibold text-[var(--text-primary)]"
                        {...rest}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const { node, ...rest } =
                      props as Record<string, unknown>;
                    return (
                      <h3
                        className="mt-8 mb-3 text-xl font-semibold text-[var(--text-primary)]"
                        {...rest}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children, ...props }) => {
                    const { node, ...rest } =
                      props as Record<string, unknown>;
                    return (
                      <p
                        className="my-4 text-[var(--text-primary)] leading-relaxed"
                        {...rest}
                      >
                        {children}
                      </p>
                    );
                  },
                  ul: ({ children, ...props }) => {
                    const { node, ...rest } =
                      props as Record<string, unknown>;
                    return (
                      <ul
                        className="my-4 list-disc pl-6 space-y-2 text-[var(--text-primary)]"
                        {...rest}
                      >
                        {children}
                      </ul>
                    );
                  },
                  strong: ({ children, ...props }) => {
                    const { node, ...rest } =
                      props as Record<string, unknown>;
                    return (
                      <strong
                        className="font-semibold text-[var(--text-primary)]"
                        {...rest}
                      >
                        {children}
                      </strong>
                    );
                  },
                }}
              >
                {work.content}
              </ReactMarkdown>
            ) : fromDB ? (
              <p className="text-[var(--text-secondary)] leading-relaxed">
                详细内容可在管理后台编辑补充。
              </p>
            ) : null}
          </div>

          {/* Tech stack */}
          {work.techStack.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {work.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Live URL */}
          {work.liveUrl && (
            <div className="mt-8">
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                <ExternalLink size={16} />
                查看线上版本
              </a>
            </div>
          )}

          {/* Prev / Next */}
          <nav className="mt-20 flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
            {prevWork ? (
              <Link
                href={`/works/${prevWork.slug}`}
                className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <div>
                  <span className="block text-xs text-[var(--text-tertiary)]">
                    上一项
                  </span>
                  <span className="font-medium">{prevWork.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextWork ? (
              <Link
                href={`/works/${nextWork.slug}`}
                className="group flex items-center gap-3 text-right text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <div>
                  <span className="block text-xs text-[var(--text-tertiary)]">
                    下一项
                  </span>
                  <span className="font-medium">{nextWork.title}</span>
                </div>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
