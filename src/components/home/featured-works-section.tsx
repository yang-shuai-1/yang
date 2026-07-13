import Link from "next/link";
import { getAllWorks } from "@/lib/works-file";
import { WorkCard } from "@/components/home/featured-works";
import { HairlineRule } from "@/components/layout/hairline-rule";

export async function FeaturedWorks() {
  const allWorks = getAllWorks();
  const publishedWorks = allWorks.filter((w) => w.published);
  const works = publishedWorks.slice(0, 3);

  if (works.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-[var(--text-tertiary)]">暂无作品展示</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-center gap-4">
          <HairlineRule className="h-6" variant="accent" />
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            精选作品
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>

        {allWorks.filter((w) => w.published).length > 3 && (
          <div className="mt-10 text-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
            >
              查看全部作品
              <span>&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
