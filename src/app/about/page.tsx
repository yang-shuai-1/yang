import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { Timeline } from "@/components/about/timeline";
import { SkillTags } from "@/components/about/skill-tags";
import { PottedPlant } from "@/components/decorations/potted-plant";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Download } from "lucide-react";

const TIMELINE_ENTRIES = [
  {
    year: "2024 — 至今",
    title: "独立产品设计师",
    organization: "Freelance",
    description:
      "为科技初创公司提供品牌设计和产品体验咨询服务。已完成 8 个品牌全案和 3 个 SaaS 产品从零到一的设计。",
  },
  {
    year: "2021 — 2024",
    title: "高级产品设计师",
    organization: "ByteDance / 字节跳动",
    description:
      "负责飞书文档核心编辑体验的设计与迭代，主导了 v3.0 版本的信息架构重组，将用户任务完成率提升了 23%。",
  },
  {
    year: "2019 — 2021",
    title: "UI/UX 设计师",
    organization: "某设计咨询公司",
    description:
      "参与多个金融科技产品的设计交付，涵盖移动端、Web 端和设计系统搭建。建立了公司内部的设计组件库。",
  },
  {
    year: "2017 — 2019",
    title: "视觉设计专业 / 硕士",
    organization: "中央美术学院",
    description:
      "研究方向为数字界面中的信息层级与视觉注意力的关系。毕业作品获学院优秀创作奖。",
  },
];

const SKILLS = [
  { name: "产品设计", level: 92 },
  { name: "用户研究", level: 85 },
  { name: "交互设计", level: 90 },
  { name: "视觉设计", level: 88 },
  { name: "Figma", level: 95 },
  { name: "前端基础 (React/HTML/CSS)", level: 70 },
  { name: "设计系统", level: 87 },
  { name: "动效设计", level: 65 },
];

const SKILL_TAGS = [
  { name: "Figma", level: 95 },
  { name: "Sketch", level: 85 },
  { name: "Adobe Illustrator", level: 78 },
  { name: "After Effects", level: 65 },
  { name: "Principle", level: 72 },
  { name: "React", level: 60 },
  { name: "HTML & CSS", level: 75 },
  { name: "TypeScript", level: 50 },
  { name: "用户访谈", level: 88 },
  { name: "可用性测试", level: 82 },
  { name: "信息架构", level: 85 },
  { name: "Design Tokens", level: 80 },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 flex items-center gap-4">
            <HairlineRule className="h-6" variant="accent" />
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
              关于
            </h1>
          </div>

          {/* Photo + Bio — 非对称布局 */}
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
            <div className="sm:w-[280px] shrink-0">
              <div className="aspect-[3/4] w-full relative rounded-[8px] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <Image
                  src="/images/avatar-placeholder.svg"
                  alt={siteConfig.name}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-display text-2xl text-[var(--text-primary)]">
                你好，我是{siteConfig.name}
              </h2>
              <div className="mt-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  我是一名{siteConfig.title}，目前作为独立创作者与科技公司合作。
                  我的工作横跨品牌设计、数字产品体验和设计系统搭建——
                  但无论媒介如何变化，我始终关注一个核心问题：
                  <strong className="text-[var(--text-primary)] font-semibold">
                    信息如何以最自然的方式被人感知和理解
                  </strong>
                  。
                </p>
                <p>
                  我信仰"少即是多"，但更信仰"少是因为思考得多"。
                  每一个被省略的元素背后，都有一个被充分思考过的理由。
                  好的设计不是装饰，是空气——它存在，但你不会特意注意到它。
                </p>
                <p>
                  不工作时，我会带着胶片相机在城市中漫游，拍摄那些被忽略的角落。
                  这些影像和我的设计共享同一种美学：安静、克制、有呼吸感。
                </p>
              </div>
            </div>
          </div>

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
          <section className="mt-20">
            <div className="mb-8 flex items-center gap-3">
              <HairlineRule className="h-5" variant="accent" />
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                核心技能
              </h2>
            </div>
            <SkillTags skills={SKILLS} variant="bars" />
          </section>

          {/* Tools */}
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <HairlineRule className="h-5" variant="subtle" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                工具与技术
              </h2>
            </div>
            <SkillTags skills={SKILL_TAGS} variant="tags" />
          </section>

          {/* Resume download */}
          <section id="resume" className="mt-20">
            <div className="flex items-center justify-between rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  下载简历
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  PDF 格式
                </p>
              </div>
              <a href="/resume.pdf" download>
                <Button variant="primary">
                  <Download size={16} className="mr-2" />
                  下载 PDF
                </Button>
              </a>
            </div>
          </section>
        </div>
      </main>
      <PottedPlant />
      <ScrollToTop />
      <Footer />
    </>
  );
}
