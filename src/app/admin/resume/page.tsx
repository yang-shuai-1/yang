"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Save, Plus, Trash2, ArrowUp, ArrowDown, Upload, FileText, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { FileUpload } from "@/components/admin/file-upload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/utils";

type JsonArray = Array<Record<string, string>>;

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  location: string;
  summary: string;
  avatarUrl: string;
  education: JsonArray;
  experience: JsonArray;
  projects: JsonArray;
  skills: string[];
  pdfFilename: string;
  pdfPath: string;
  pdfSize: number;
}

const DEFAULT = {
  name: "小杨同学",
  title: "计算机科学与技术 · 本科在读",
  email: "",
  phone: "",
  github: "",
  location: "",
  summary: "",
  avatarUrl: "",
  education: [] as JsonArray,
  experience: [] as JsonArray,
  projects: [] as JsonArray,
  skills: [] as string[],
  pdfFilename: "",
  pdfPath: "",
  pdfSize: 0,
};

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeData>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const fetchResume = useCallback(async () => {
    try {
      const res = await fetch("/api/resume");
      if (res.ok) {
        const data = await res.json();
        if (data) setResume({ ...DEFAULT, ...data, skills: Array.isArray(data.skills) ? data.skills : [] });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchResume(); }, [fetchResume]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });
      if (res.ok) {
        toast.success("简历已保存");
        fetchResume();
      } else if (res.status === 401) {
        toast.error("登录已过期");
      } else {
        toast.error("保存失败");
      }
    } catch {
      toast.error("网络错误");
    } finally {
      setSaving(false);
    }
  };

  // Upload helpers — Base64 stored in DB, no external service needed
  const handleAvatarUpload = async (_file: File, base64: string) => {
    setUploadingAvatar(true);
    setResume((prev) => ({ ...prev, avatarUrl: base64 }));
    toast.success("头像已就绪");
    setUploadingAvatar(false);
  };

  const handlePdfUpload = async (_file: File, base64: string) => {
    setUploadingPdf(true);
    setResume((prev) => ({ ...prev, pdfPath: base64, pdfFilename: _file.name, pdfSize: _file.size }));
    toast.success("PDF 已就绪");
    setUploadingPdf(false);
  };

  // Array helpers
  const updateField = (key: keyof ResumeData, value: unknown) => setResume((prev) => ({ ...prev, [key]: value }));

  const addItem = (key: "education" | "experience" | "projects", template: Record<string, string>) => {
    setResume((prev) => ({ ...prev, [key]: [...(prev[key] as JsonArray), { ...template }] }));
  };
  const removeItem = (key: "education" | "experience" | "projects", index: number) => {
    setResume((prev) => ({ ...prev, [key]: (prev[key] as JsonArray).filter((_, i) => i !== index) }));
  };
  const updateItem = (key: "education" | "experience" | "projects", index: number, field: string, value: string) => {
    setResume((prev) => {
      const arr = [...(prev[key] as JsonArray)];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };
  const moveItem = (key: "education" | "experience" | "projects", index: number, direction: "up" | "down") => {
    setResume((prev) => {
      const arr = [...(prev[key] as JsonArray)];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, [key]: arr };
    });
  };

  const inputClass = "w-full rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none";
  const labelClass = "block mb-1 text-xs font-medium text-[var(--text-secondary)]";
  const sectionClass = "rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5";

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        <p className="text-sm text-[var(--text-tertiary)]">加载中...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HairlineRule className="h-5" variant="accent" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">简历编辑</h1>
        </div>
        <div className="flex gap-3">
          <a href="/resume" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm"><FileText size={14} className="mr-2" />预览</Button>
          </a>
          <Button onClick={handleSave} disabled={saving}>
            <Save size={14} className="mr-2" />{saving ? "保存中..." : "保存"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-6">
          {/* Basic info */}
          <div className={sectionClass}>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">基本信息</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={labelClass}>姓名</label><input className={inputClass} value={resume.name} onChange={(e) => updateField("name", e.target.value)} /></div>
              <div><label className={labelClass}>头衔</label><input className={inputClass} value={resume.title} onChange={(e) => updateField("title", e.target.value)} /></div>
              <div><label className={labelClass}>邮箱</label><input className={inputClass} value={resume.email} onChange={(e) => updateField("email", e.target.value)} /></div>
              <div><label className={labelClass}>电话</label><input className={inputClass} value={resume.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
              <div><label className={labelClass}>GitHub URL</label><input className={inputClass} value={resume.github} onChange={(e) => updateField("github", e.target.value)} placeholder="https://github.com/username" /></div>
              <div><label className={labelClass}>所在地</label><input className={inputClass} value={resume.location} onChange={(e) => updateField("location", e.target.value)} /></div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>个人简介</label>
              <textarea className={cn(inputClass, "min-h-[80px] resize-y")} value={resume.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} />
            </div>
          </div>

          {/* Skills */}
          <div className={sectionClass}>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">技能标签（逗号分隔）</h2>
            <input
              className={inputClass}
              value={resume.skills.join(", ")}
              onChange={(e) => updateField("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              placeholder="Python, TypeScript, React, ..."
            />
            <div className="flex flex-wrap gap-1.5 mt-3">
              {resume.skills.map((s) => (
                <span key={s} className="inline-flex items-center rounded-[3px] bg-[var(--accent-subtle)] px-2 py-0.5 text-xs text-[var(--accent)]">{s}</span>
              ))}
            </div>
          </div>

          {/* Array sections */}
          {(["education", "experience", "projects"] as const).map((key) => {
            const labels: Record<string, string> = { education: "教育背景", experience: "经历", projects: "项目经历" };
            const templates: Record<string, Record<string, string>> = {
              education: { school: "", degree: "", time: "", desc: "" },
              experience: { role: "", org: "", time: "", desc: "" },
              projects: { name: "", tech: "", time: "", desc: "", url: "" },
            };
            return (
              <div key={key} className={sectionClass}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">{labels[key]}</h2>
                  <Button variant="outline" size="sm" onClick={() => addItem(key, templates[key])}>
                    <Plus size={12} className="mr-1" />添加
                  </Button>
                </div>
                <div className="space-y-4">
                  {(resume[key] as JsonArray).map((item, i) => (
                    <div key={i} className="rounded-[6px] border border-[var(--border-subtle)] p-4 bg-[var(--bg-base)]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[var(--text-tertiary)]">#{i + 1}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => moveItem(key, i, "up")} className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]" title="上移"><ArrowUp size={12} /></button>
                          <button onClick={() => moveItem(key, i, "down")} className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]" title="下移"><ArrowDown size={12} /></button>
                          <button onClick={() => removeItem(key, i)} className="p-1 text-[var(--text-tertiary)] hover:text-red-500" title="删除"><Trash2 size={12} /></button>
                        </div>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {Object.keys(templates[key]).map((field) => (
                          <div key={field} className={field === "desc" || field === "url" ? "sm:col-span-2" : ""}>
                            <label className={labelClass}>{field}</label>
                            {field === "desc" ? (
                              <textarea className={cn(inputClass, "min-h-[60px] resize-y")} value={item[field] || ""} onChange={(e) => updateItem(key, i, field, e.target.value)} rows={2} />
                            ) : (
                              <input className={inputClass} value={item[field] || ""} onChange={(e) => updateItem(key, i, field, e.target.value)} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {(resume[key] as JsonArray).length === 0 && (
                    <p className="text-xs text-[var(--text-tertiary)] text-center py-4">暂无内容，点击「添加」</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar */}
          <div className={sectionClass}>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">头像</h2>
            {resume.avatarUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--bg-elevated)] mx-auto mb-4 border border-[var(--border-subtle)]">
                <img src={resume.avatarUrl} alt="头像" className="w-full h-full object-cover" />
              </div>
            )}
            <FileUpload onUpload={handleAvatarUpload} accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }} maxSize={2 * 1024 * 1024} label="拖拽上传头像" uploading={uploadingAvatar} />
            {resume.avatarUrl && (
              <p className="mt-2 text-xs text-[var(--text-tertiary)] truncate">{resume.avatarUrl}</p>
            )}
          </div>

          {/* PDF Upload */}
          <div className={sectionClass}>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">PDF 简历</h2>
            {resume.pdfFilename && (
              <div className="flex items-center gap-3 mb-4 p-3 rounded-[6px] bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                <FileText size={16} className="text-[var(--accent)] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[var(--text-primary)] truncate">{resume.pdfFilename}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{formatFileSize(resume.pdfSize)}</p>
                </div>
                {resume.pdfPath && (
                  <a href={resume.pdfPath} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <Download size={14} className="text-[var(--text-secondary)] hover:text-[var(--accent)]" />
                  </a>
                )}
              </div>
            )}
            <FileUpload onUpload={handlePdfUpload} accept={{ "application/pdf": [".pdf"] }} maxSize={5 * 1024 * 1024} label="拖拽上传 PDF" uploading={uploadingPdf} />
          </div>
        </div>
      </div>
    </div>
  );
}
