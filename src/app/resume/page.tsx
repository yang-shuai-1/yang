import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { PottedPlant } from "@/components/decorations/potted-plant";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { Mail, Phone, MapPin, Download, Edit } from "lucide-react";

function readResumeData() {
  try {
    const file = path.join(process.cwd(), "content", "resume.json");
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch { return null; }
}
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  location: string;
  summary: string;
  avatarUrl: string;
  education: Array<{ school: string; degree: string; time: string; desc?: string }>;
  experience: Array<{ role: string; org: string; time: string; desc: string }>;
  projects: Array<{ name: string; tech: string; time: string; desc: string; url?: string }>;
  skills: string[];
  pdfFilename: string;
  pdfPath: string;
}

const DEFAULT_DATA: ResumeData = {
  name: "小杨同学",
  title: "计算机科学与技术 · 本科在读",
  email: "",
  phone: "",
  github: "",
  location: "",
  summary: "计算机专业本科生，热爱全栈开发和 AI 技术。热衷于用代码解决实际问题，有良好的自学能力和团队协作精神。",
  avatarUrl: "/images/avatar-placeholder.svg",
  education: [
    { school: "某高校", degree: "计算机科学与技术 · 本科", time: "2023 — 至今" },
  ],
  experience: [
    {
      role: "开源贡献者",
      org: "GitHub",
      time: "2024",
      desc: "向热门 Python 开源项目提交了多个 PR 并被合并，修复了 API 文档生成器的编码问题和内存泄漏 bug。",
    },
    {
      role: "黑客松一等奖",
      org: "校园黑客马拉松",
      time: "2024",
      desc: "48 小时内带领团队用 Next.js + LangChain 搭建了 AI 学习助手，在 30 支队伍中获第一名。",
    },
  ],
  projects: [
    {
      name: "AI 学习助手",
      tech: "Next.js · LangChain · PostgreSQL · Prisma",
      time: "2024",
      desc: "一个基于 RAG 的智能学习工具，支持 PDF 上传问答、知识点提取和自动生成学习笔记。",
    },
    {
      name: "个人博客系统",
      tech: "Next.js · MDX · Tailwind CSS · Vercel",
      time: "2023",
      desc: "自建技术博客，支持 Markdown/MDX、代码高亮、全文搜索和 RSS 订阅，已发布 30+ 篇文章。",
    },
    {
      name: "校园二手交易平台",
      tech: "React · Node.js · MongoDB · WebSocket",
      time: "2024",
      desc: "一个实时校园二手交易平台，支持在线聊天、商品搜索、订单管理和商家评价系统。",
    },
  ],
  skills: [
    "Python", "TypeScript", "React / Next.js", "Node.js",
    "PostgreSQL / MySQL", "MongoDB", "Docker", "Git",
    "Linux", "数据结构与算法", "机器学习基础", "RESTful API 设计",
  ],
  pdfFilename: "",
  pdfPath: "",
};

export default async function ResumePage() {
  let resumeData = DEFAULT_DATA;
  let isAdmin = false;

  try {
    isAdmin = await isAuthenticated();

    const dbData = readResumeData();

    if (dbData) {
      resumeData = {
        name: dbData.name || DEFAULT_DATA.name,
        title: dbData.title || DEFAULT_DATA.title,
        email: dbData.email || "",
        phone: dbData.phone || "",
        github: dbData.github || "",
        location: dbData.location || "",
        summary: dbData.summary || DEFAULT_DATA.summary,
        avatarUrl: dbData.avatarUrl || DEFAULT_DATA.avatarUrl,
        education: (dbData.education as ResumeData["education"]) || DEFAULT_DATA.education,
        experience: (dbData.experience as ResumeData["experience"]) || DEFAULT_DATA.experience,
        projects: (dbData.projects as ResumeData["projects"]) || DEFAULT_DATA.projects,
        skills: (dbData.skills as string[]) || DEFAULT_DATA.skills,
        pdfFilename: dbData.pdfFilename || "",
        pdfPath: dbData.pdfPath || "",
      };
    }
  } catch {
    // DB not available — use defaults
  }

  const sectionTitle = (title: string) => (
    <div className="flex items-center gap-3 mb-5">
      <HairlineRule className="h-4" variant="accent" />
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back + Edit */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              &larr; 返回
            </Link>
            {isAdmin && (
              <Link href="/admin/resume">
                <Button variant="outline" size="sm">
                  <Edit size={14} className="mr-2" />
                  编辑简历
                </Button>
              </Link>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shrink-0 relative">
              {resumeData.avatarUrl ? (
                <Image src={resumeData.avatarUrl} alt={resumeData.name} fill className="object-cover" sizes="96px" />
              ) : (
                <div className="flex items-center justify-center h-full text-2xl text-[var(--text-tertiary)]">
                  {resumeData.name[0]}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-[var(--text-primary)]">{resumeData.name}</h1>
              <p className="text-[var(--text-secondary)] mt-1">{resumeData.title}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-[var(--text-secondary)]">
                {resumeData.email && (
                  <span className="flex items-center gap-1.5"><Mail size={13} />{resumeData.email}</span>
                )}
                {resumeData.phone && (
                  <span className="flex items-center gap-1.5"><Phone size={13} />{resumeData.phone}</span>
                )}
                {resumeData.location && (
                  <span className="flex items-center gap-1.5"><MapPin size={13} />{resumeData.location}</span>
                )}
                {resumeData.github && (
                  <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--accent)]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <section className="mb-10">
              {sectionTitle("个人简介")}
              <p className="text-[var(--text-secondary)] leading-relaxed">{resumeData.summary}</p>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section className="mb-10">
              {sectionTitle("教育背景")}
              <div className="space-y-4">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                    <div>
                      <span className="font-semibold text-[var(--text-primary)]">{edu.school}</span>
                      <span className="text-[var(--text-secondary)] ml-2">{edu.degree}</span>
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">{edu.time}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section className="mb-10">
              {sectionTitle("经历")}
              <div className="space-y-6">
                {resumeData.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                      <span className="font-semibold text-[var(--text-primary)]">{exp.role}</span>
                      <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">{exp.time}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">{exp.org}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section className="mb-10">
              {sectionTitle("项目经历")}
              <div className="space-y-6">
                {resumeData.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {proj.url ? (
                          <a href={proj.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                            {proj.name}
                          </a>
                        ) : proj.name}
                      </span>
                      <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">{proj.time}</span>
                    </div>
                    <p className="text-xs text-[var(--accent)] mt-0.5">{proj.tech}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <section className="mb-10">
              {sectionTitle("技能")}
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center rounded-[4px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* PDF Download */}
          <div className="mt-12 flex justify-center">
            {resumeData.pdfPath ? (
              <a href={resumeData.pdfPath} download target="_blank" rel="noopener noreferrer">
                <Button variant="primary">
                  <Download size={16} className="mr-2" />下载 PDF 简历
                </Button>
              </a>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)]">暂未上传 PDF 版本，可在管理后台上传</p>
            )}
          </div>
        </div>
      </main>
      <PottedPlant />
      <ScrollToTop />
      <Footer />
    </>
  );
}
