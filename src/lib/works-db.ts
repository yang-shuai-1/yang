import { prisma } from "@/lib/db";
import type { WorkWithContent } from "@/types";

export async function getAllWorksFromDB(): Promise<WorkWithContent[]> {
  try {
    const works = await prisma.work.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { year: "desc" }],
    });

    return works.map((w) => ({
      title: w.title,
      slug: w.slug,
      category: w.category,
      description: w.description,
      content: w.content || "",
      coverImage: w.coverImage,
      images: w.images,
      techStack: w.techStack,
      liveUrl: w.liveUrl ?? undefined,
      year: w.year,
      sortOrder: w.sortOrder,
      published: w.published,
    }));
  } catch {
    return [];
  }
}

export async function getWorkBySlugFromDB(
  slug: string
): Promise<WorkWithContent | null> {
  try {
    const w = await prisma.work.findUnique({ where: { slug } });
    if (!w) return null;

    return {
      title: w.title,
      slug: w.slug,
      category: w.category,
      description: w.description,
      content: w.content || "",
      coverImage: w.coverImage,
      images: w.images,
      techStack: w.techStack,
      liveUrl: w.liveUrl ?? undefined,
      year: w.year,
      sortOrder: w.sortOrder,
      published: w.published,
    };
  } catch {
    return null;
  }
}

export async function getWorksCategoriesFromDB(): Promise<string[]> {
  try {
    const works = await prisma.work.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
    });
    return ["all", ...works.map((w) => w.category)];
  } catch {
    return ["all"];
  }
}
