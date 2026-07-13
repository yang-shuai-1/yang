import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { Timeline } from "@/components/about/timeline";
import { SkillTags } from "@/components/about/skill-tags";
import { PottedPlant } from "@/components/decorations/potted-plant";
import { GeometricBuddy } from "@/components/decorations/geometric-buddy";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Download, Code, Camera, BookOpen } from "lucide-react";
import Link from "next/link";

const TIMELINE_ENTRIES = [
  {
    year: "2023 — 至今",
    title: "计算机科学与技术 · 本科",
    organization: "某高校",
    description:
      "主修数据结构、操作系统、计算机网络、机器学习等核心课程。课余自学全栈开发，参与开源项目，研究 AI Agent 和 RAG 应用。",
  },
  {
    year: "2024",
    title: "黑客松一等奖",
    organization: "校园黑客马拉松",
    description:
      "48 小时内和团队从零搭建了一个 AI 驱动的学习助手，用 Next.js + LangChain + PostgreSQL 技术栈，在 30 支队伍中获第一名。",
  },
  {
    year: "2024",
    title: "开源贡献者",
    organization: "GitHub",
    description:
      "向一个热门的 Python 开源项目提交了 4 个 PR 被合并，修复了 API 文档生成器的中文路径编码问题和内存泄漏 bug。",
  },
  {
    year: "2023",
    title: "个人博客上线",
    organization: "自建",
    description:
      "用 Next.js 和 MDX 搭建技术博客，记录学习过程中的思考和踩坑经验。至今已发布 30+ 篇文章，月均 PV 2000+。",
  },
];

const SKILLS = [
  { name: "Python", level: 85 },
  { name: "TypeScript / JavaScript", level: 80 },
  { name: "React / Next.js", level: 78 },
  { name: "数据结构与算法", level: 75 },
  { name: "机器学习 / AI", level: 65 },
  { name: "Linux / 运维", level: 60 },
  { name: "摄影 / Lightroom", level: 72 },
  { name: "数据库 (PostgreSQL/MySQL)", level: 68 },
];

const TOOLS = [
  { name: "Next.js", level: 78 },
  { name: "Python", level: 85 },
  { name: "VS Code / Neovim", level: 82 },
  { name: "Git & GitHub", level: 80 },
  { name: "Docker", level: 55 },
  { name: "Tailwind CSS", level: 75 },
  { name: "Prisma / SQLAlchemy", level: 68 },
  { name: "LangChain", level: 55 },
  { name: "Figma", level: 50 },
  { name: "Lightroom", level: 70 },
];

const INTERESTS = [
  { icon: Code, label: "全栈开发", desc: "TypeScript · Python · Next.js" },
  { icon: BookOpen, label: "技术写作", desc: "博客 · 笔记 · 知识分享" },
  { icon: Camera, label: "摄影", desc: "街拍 · 胶片 · 后期" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                &larr; 返回
              </Link>
            </div>
          </div>

          {/* Photo + Bio */}
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <div className="sm:w-[240px] shrink-0">
              <div className="aspect-[3/4] w-full relative rounded-[8px] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Image
                  src="/images/avatar-placeholder.svg"
                  alt={siteConfig.name}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="font-display text-3xl text-[var(--text-primary)]">
                {siteConfig.name}
              </h1>
              <p className="mt-1 text-[var(--text-secondary)]">
                {siteConfig.title}
              </p>
              <div className="mt-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  我是一名计算机专业的学生，对编程和创造有着近乎痴迷的热爱。
                  课余时间不是在写代码就是在学新东西——从全栈 Web 开发到 AI Agent，
                  从摄影构图到胶片冲洗，我对一切"可以创造的东西"都充满好奇。
                </p>
                <p>
                  我相信代码不止是工具，更是一种表达和创造的语言。
                  每一个项目对我来说都是一次实验：尝试新的架构、探索不同的技术方案、
                  把自己的想法变成别人也能使用的产品。
                </p>
                <p>
                  除了写代码，我还喜欢背着相机在城市里漫游，捕捉那些不经意的光影瞬间。
                  写博客是我整理思路的方式——把学到的东西讲清楚，也是一种学习。
                </p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <section className="mt-16">
            <div className="grid gap-4 sm:grid-cols-3">
              {INTERESTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
                  >
                    <Icon size={22} className="text-[var(--accent)] mb-3" />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-20">
            <div className="mb-8 flex items-center gap-3">
              <HairlineRule className="h-5" variant="accent" />
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                经历
              </h2>
            </div>
            <Timeline entries={TIMELINE_ENTRIES} />
          </section>

          {/* Skills */}
          <section className="mt-16">
            <div className="mb-8 flex items-center gap-3">
              <HairlineRule className="h-5" variant="accent" />
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                技能
              </h2>
            </div>
            <SkillTags skills={SKILLS} variant="bars" />
          </section>

          {/* Tools */}
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <HairlineRule className="h-5" variant="subtle" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                工具箱
              </h2>
            </div>
            <SkillTags skills={TOOLS} variant="tags" />
          </section>

          {/* Resume link */}
          <section className="mt-20">
            <div className="flex items-center justify-between rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  完整简历
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  查看详细简历或下载 PDF 版本
                </p>
              </div>
              <Link href="/resume">
                <Button variant="primary">
                  <Download size={16} className="mr-2" />
                  查看简历
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <PottedPlant />
      <GeometricBuddy />
      <ScrollToTop />
      <Footer />
    </>
  );
}
