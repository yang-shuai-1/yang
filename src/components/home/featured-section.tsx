import { getAllWorks } from "@/lib/works-file";
import { WorkCard } from "@/components/home/featured-works";
import { HairlineRule } from "@/components/layout/hairline-rule";

export async function FeaturedSection() {
  const allWorks = getAllWorks();
  const featuredWorks = allWorks.filter((w) => w.published && (w as { featured?: boolean }).featured);
  if (featuredWorks.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-center gap-4">
          <HairlineRule className="h-6" variant="accent" />
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">编辑推荐</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
