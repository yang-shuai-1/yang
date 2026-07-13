import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { WorksPageClient } from "./works-page-client";
import { getAllWorks, getAllCategories } from "@/lib/works-file";

export default function WorksPage() {
  const allWorks = getAllWorks();
  const publishedWorks = allWorks.filter((w) => w.published);
  const categories = getAllCategories();

  const works = publishedWorks.map((w) => ({
    title: w.title, slug: w.slug, category: w.category,
    coverImage: w.coverImage, year: w.year,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-4">
            <HairlineRule className="h-6" variant="accent" />
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">作品集</h1>
          </div>
          <WorksPageClient works={works} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
