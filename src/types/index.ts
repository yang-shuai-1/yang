export interface WorkFrontmatter {
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  techStack: string[];
  liveUrl?: string;
  year: number;
  sortOrder: number;
  published: boolean;
}

export interface WorkWithContent extends WorkFrontmatter {
  content: string;
}

export type WorkCategory = "all" | "brand-design" | "web-development" | "photography" | "other";

export const CATEGORY_LABELS: Record<string, string> = {
  all: "全部",
  "brand-design": "品牌设计",
  "web-development": "网页开发",
  photography: "摄影",
  other: "其他",
};

export interface TimelineEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}
