/**
 * 基于本地文件的作品管理 — 不依赖任何远程数据库
 * 后台增删改直接操作 content/works/*.md
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { WorkWithContent } from "@/types";

const WORKS_DIR = path.join(process.cwd(), "content/works");

// 确保目录存在
if (!fs.existsSync(WORKS_DIR)) {
  fs.mkdirSync(WORKS_DIR, { recursive: true });
}

export function getAllWorks(): WorkWithContent[] {
  if (!fs.existsSync(WORKS_DIR)) return [];
  const files = fs.readdirSync(WORKS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(WORKS_DIR, f), "utf-8");
    const { data, content } = matter(raw);
    return {
      title: data.title || "",
      slug: data.slug || f.replace(".md", ""),
      category: data.category || "other",
      description: data.description || "",
      coverImage: data.coverImage || "",
      images: data.images || [],
      techStack: data.techStack || [],
      liveUrl: data.liveUrl ?? undefined,
      featured: data.featured || false,
      year: data.year || new Date().getFullYear(),
      sortOrder: data.sortOrder || 0,
      published: data.published !== false,
      content,
    };
  }).sort((a, b) => b.sortOrder - a.sortOrder || b.year - a.year);
}

export function getWorkBySlug(slug: string): WorkWithContent | null {
  const filePath = path.join(WORKS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    title: data.title || slug,
    slug,
    category: data.category || "other",
    description: data.description || "",
    coverImage: data.coverImage || "",
    images: data.images || [],
    techStack: data.techStack || [],
    liveUrl: data.liveUrl ?? undefined,
    featured: data.featured || false,
    year: data.year || new Date().getFullYear(),
    sortOrder: data.sortOrder || 0,
    published: data.published !== false,
    content,
  };
}

export function saveWork(work: WorkWithContent): void {
  const filePath = path.join(WORKS_DIR, `${work.slug}.md`);
  const frontmatter: Record<string, unknown> = {
    title: work.title,
    slug: work.slug,
    category: work.category,
    description: work.description,
    coverImage: work.coverImage || "",
    images: work.images || [],
    techStack: work.techStack || [],
    liveUrl: work.liveUrl || "",
    featured: work.featured || false,
    year: work.year,
    sortOrder: work.sortOrder || 0,
    published: work.published !== false,
  };
  const yaml = matter.stringify(work.content || "", frontmatter);
  fs.writeFileSync(filePath, yaml, "utf-8");
}

export function deleteWork(slug: string): boolean {
  const filePath = path.join(WORKS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

export function getAllCategories(): string[] {
  const works = getAllWorks();
  const cats = new Set(works.filter((w) => w.published).map((w) => w.category));
  return ["all", ...Array.from(cats)];
}
