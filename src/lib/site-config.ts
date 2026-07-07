/**
 * 站点配置 — 修改此文件即可更新全站信息
 */
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "张三",
  title: process.env.NEXT_PUBLIC_SITE_TITLE || "产品设计师",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "七年深耕数字产品设计，相信好的设计应该像呼吸一样自然——不被察觉，却不可或缺。",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "张三的个人作品集网站。七年数字产品设计经验，专注于创造自然、克制的用户体验。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  socialLinks: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com",
    email: process.env.NEXT_PUBLIC_EMAIL || "hello@example.com",
  },

  navItems: [
    { label: "作品", href: "/works" },
    { label: "关于", href: "/about" },
    { label: "简历", href: "/about#resume" },
    { label: "联系", href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "hello@example.com"}` },
  ],
} as const;
