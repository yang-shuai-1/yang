"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/admin/file-upload";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const workSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "只允许小写字母、数字和连字符"),
  category: z.string().min(1, "请选择分类"),
  description: z.string().min(1, "描述不能为空"),
  content: z.string().default(""),
  coverImage: z.string().default(""),
  year: z.coerce.number().int().min(2010).max(2030),
  sortOrder: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  liveUrl: z.string().default(""),
  techStack: z.string().default(""),
});

type WorkFormValues = z.infer<typeof workSchema>;

const CATEGORIES = [
  { value: "web-development", label: "代码项目" },
  { value: "blog", label: "博客日记" },
  { value: "photography", label: "摄影" },
  { value: "other", label: "其他" },
];

interface WorkFormProps {
  defaultValues?: Partial<WorkFormValues>;
  onSubmit: (data: WorkFormValues) => Promise<void>;
  submitLabel?: string;
}

export function WorkForm({
  defaultValues,
  onSubmit,
  submitLabel = "保存",
}: WorkFormProps) {
  const [coverUploading, setCoverUploading] = useState(false);

  const form = useForm<WorkFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(workSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      description: "",
      content: "",
      coverImage: "",
      year: new Date().getFullYear(),
      sortOrder: 0,
      published: true,
      liveUrl: "",
      techStack: "",
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const coverImage = watch("coverImage");

  const handleCoverUpload = async (file: File, base64: string) => {
    setCoverUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, filename: file.name, folder: "works" }),
      });
      const data = await res.json();
      setValue("coverImage", data.url || base64);
      toast.success(data.fallback ? "COS 未配置，已用本地存储" : "封面上传成功");
    } catch {
      setValue("coverImage", base64);
      toast.success("已用本地存储");
    } finally {
      setCoverUploading(false);
    }
  };

  const inputClass =
    "w-full rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors duration-150 focus:border-[var(--accent)] focus:outline-none";
  const labelClass = "block mb-1.5 text-sm font-medium text-[var(--text-primary)]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className={labelClass}>标题</label>
        <input {...register("title")} className={inputClass} placeholder="作品标题" />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={labelClass}>URL 标识</label>
        <input {...register("slug")} className={inputClass} placeholder="my-project" />
        {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>分类</label>
          <select {...register("category")} className={inputClass}>
            <option value="">选择分类</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>
        <div>
          <label className={labelClass}>年份</label>
          <input {...register("year")} type="number" className={inputClass} />
          {errors.year && <p className={errorClass}>{errors.year.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>描述</label>
        <textarea
          {...register("description")}
          className={cn(inputClass, "min-h-[80px] resize-y")}
          placeholder="简要描述作品..."
          rows={3}
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      <div>
        <label className={labelClass}>
          详细内容 <span className="text-[var(--text-tertiary)]">（Markdown，可选）</span>
        </label>
        <textarea
          {...register("content")}
          className={cn(inputClass, "min-h-[200px] resize-y font-mono text-xs")}
          placeholder="## 项目背景&#10;&#10;在这里写详细的项目说明..."
          rows={10}
        />
      </div>

      <div>
        <label className={labelClass}>封面图</label>
        <FileUpload
          onUpload={handleCoverUpload}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
          maxSize={5 * 1024 * 1024}
          label="拖拽图片上传封面"
          uploading={coverUploading}
        />
        <div className="mt-3">
          <input {...register("coverImage")} className={inputClass} placeholder="或直接粘贴图片 URL" />
        </div>
        {coverImage ? (
          <p className="mt-1 text-xs text-[var(--text-tertiary)] truncate">当前: {coverImage}</p>
        ) : (
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">不填则使用默认占位图</p>
        )}
        {errors.coverImage && <p className={errorClass}>{errors.coverImage.message}</p>}
      </div>

      <div>
        <label className={labelClass}>线上地址 <span className="text-[var(--text-tertiary)]">（可选）</span></label>
        <input {...register("liveUrl")} className={inputClass} placeholder="https://example.com" />
      </div>

      <div>
        <label className={labelClass}>技术栈 <span className="text-[var(--text-tertiary)]">（逗号分隔）</span></label>
        <input {...register("techStack")} className={inputClass} placeholder="React, TypeScript, Tailwind" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>排序权重</label>
          <input {...register("sortOrder")} type="number" className={inputClass} />
        </div>
        <div className="flex items-end pb-2.5 gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("published")} className="h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">发布</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">编辑推荐</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting || coverUploading}>
          {isSubmitting ? "保存中..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
