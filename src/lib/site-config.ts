/**
 * 站点配置 — 修改此文件即可更新全站信息
 */
export const siteConfig = {
  name: "小杨同学",
  title: "计算机专业学生",
  tagline:
    "热爱 coding 与摄影，喜欢把想法变成可运行的产品。正在探索 AI、全栈开发和计算机视觉的交叉领域。",
  description:
    "小杨同学的个人网站。一个计算机专业学生的作品集、博客和技术分享空间。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  socialLinks: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com",
    bilibili: process.env.NEXT_PUBLIC_BILIBILI_URL || "",
    email: process.env.NEXT_PUBLIC_EMAIL || "hello@example.com",
  },

  navItems: [
    { label: "作品", href: "/works" },
    { label: "关于", href: "/about" },
    { label: "简历", href: "/resume" },
    { label: "联系", href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "hello@example.com"}` },
  ],

  // 简历页面配置
  resume: {
    headline: "计算机科学与技术 · 本科在读",
    photoUrl: "/images/avatar-placeholder.svg",
  },
} as const;
