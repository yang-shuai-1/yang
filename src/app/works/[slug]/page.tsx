import { notFound, redirect } from "next/navigation";
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
import { getWorkBySlug, getAllWorks } from "@/lib/works-file";
import { getUserFromCookie } from "@/lib/user-auth";

const GATED = ["photography", "blog"];
const CATEGORY_LABELS: Record<string, string> = {
  "web-development": "代码项目", blog: "博客日记", photography: "摄影", other: "其他",
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "作品未找到" };
  return { title: work.title, description: work.description };
}

export default async function WorkDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  if (GATED.includes(work.category)) {
    const user = await getUserFromCookie();
    if (!user) redirect(`/auth/login?from=/works/${slug}`);
  }

  const allWorks = getAllWorks().filter((w) => w.published);
  const currentIndex = allWorks.findIndex((w) => w.slug === slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  const heroImage = work.coverImage || `/images/placeholder-1.svg`;

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          <Link href="/works" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={16} />返回作品集
          </Link>
          <header className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <HairlineRule className="h-6" variant="accent" />
              <span className="text-sm text-[var(--text-tertiary)]">{CATEGORY_LABELS[work.category] || work.category} / {work.year}</span>
            </div>
            <h1 className="font-display text-[var(--text-primary)]">{work.title}</h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-none">{work.description}</p>
          </header>
          <div className="mt-12 aspect-[16/9] w-full relative rounded-[8px] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <Image src={heroImage} alt={work.title} fill sizes="768px" className="object-cover" priority unoptimized={heroImage.startsWith("data:")} />
          </div>
          {work.content ? (
            <div className="mt-12 max-w-none prose-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="my-4 text-[var(--text-primary)] leading-relaxed">{children}</p>,
                  h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-semibold">{children}</h2>,
                  h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold">{children}</h3>,
                  ul: ({ children }) => <ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>,
                }}>
                {work.content}
              </ReactMarkdown>
            </div>
          ) : null}
          {work.techStack.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {work.techStack.map((t) => (<span key={t} className="inline-flex items-center rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)]">{t}</span>))}
              </div>
            </div>
          )}
          {work.liveUrl && (
            <div className="mt-8"><a href={work.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"><ExternalLink size={16} />查看线上版本</a></div>
          )}
          <nav className="mt-20 flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
            {prevWork ? (<Link href={`/works/${prevWork.slug}`} className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /><div><span className="block text-xs text-[var(--text-tertiary)]">上一项</span><span className="font-medium">{prevWork.title}</span></div></Link>) : <div />}
            {nextWork ? (<Link href={`/works/${nextWork.slug}`} className="group flex items-center gap-3 text-right text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><div><span className="block text-xs text-[var(--text-tertiary)]">下一项</span><span className="font-medium">{nextWork.title}</span></div><ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>) : <div />}
          </nav>
        </article>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
