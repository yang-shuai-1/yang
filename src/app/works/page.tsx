import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { WorksPageClient } from "./works-page-client";
import { getAllWorks } from "@/lib/works";
import { getAllWorksFromDB, getWorksCategoriesFromDB } from "@/lib/works-db";

export const dynamic = "force-dynamic";

export default async function WorksPage() {
  // DB-first: admin 修改后实时生效；DB 不可用时回退到 markdown
  let dbWorks = await getAllWorksFromDB();
  const dbCategories = await getWorksCategoriesFromDB();

  if (dbWorks.length === 0) {
    // 回退到 markdown 文件
    dbWorks = getAllWorks();
  }

  const categories =
    dbCategories.length > 1
      ? dbCategories
      : ["all", ...new Set(dbWorks.map((w) => w.category))];

  const works = dbWorks.map((w) => ({
    title: w.title,
    slug: w.slug,
    category: w.category,
    coverImage: w.coverImage,
    year: w.year,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-4">
            <HairlineRule className="h-6" variant="accent" />
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              作品集
            </h1>
          </div>
          <WorksPageClient works={works} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
