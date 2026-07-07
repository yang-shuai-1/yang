import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { WorkFrontmatter, WorkWithContent } from "@/types";

const worksDirectory = path.join(process.cwd(), "content/works");

export function getAllWorkSlugs(): string[] {
  if (!fs.existsSync(worksDirectory)) return [];
  const filenames = fs.readdirSync(worksDirectory);
  return filenames
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getWorkBySlug(slug: string): WorkWithContent | null {
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || slug,
    slug: data.slug || slug,
    category: data.category || "other",
    description: data.description || "",
    coverImage: data.coverImage || "",
    images: data.images || [],
    techStack: data.techStack || [],
    liveUrl: data.liveUrl ?? undefined,
    year: data.year || new Date().getFullYear(),
    sortOrder: data.sortOrder || 0,
    published: data.published !== false,
    content,
  };
}

export function getAllWorks(): WorkWithContent[] {
  const slugs = getAllWorkSlugs();
  const works = slugs
    .map((slug) => getWorkBySlug(slug))
    .filter((w): w is WorkWithContent => w !== null && w.published);

  return works.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return b.year - a.year;
  });
}

export function getWorksByCategory(category: string): WorkWithContent[] {
  const works = getAllWorks();
  if (category === "all") return works;
  return works.filter((w) => w.category === category);
}

export function getAllCategories(): string[] {
  const works = getAllWorks();
  const categories = new Set(works.map((w) => w.category));
  return ["all", ...Array.from(categories)];
}
