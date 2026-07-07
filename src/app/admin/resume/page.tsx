"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { FileUpload } from "@/components/admin/file-upload";
import { formatDate, formatFileSize } from "@/lib/utils";
import { toast } from "sonner";

interface ResumeData {
  id: string;
  filename: string;
  path: string;
  size: number;
  mimeType: string;
  updatedAt: string;
  versions?: {
    id: string;
    filename: string;
    size: number;
    createdAt: string;
  }[];
}

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchResume = useCallback(async () => {
    try {
      const res = await fetch("/api/resume");
      if (res.ok) {
        const data = await res.json();
        setResume(data);
      }
    } catch (error) {
      console.error("Failed to fetch resume:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // Step 1: Get presigned URL
      const presignedRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          folder: "resume",
        }),
      });

      if (!presignedRes.ok) {
        if (presignedRes.status === 401) {
          toast.error("登录已过期");
          return;
        }
        throw new Error("Failed to get upload URL");
      }

      const { presignedUrl, publicUrl } = await presignedRes.json();

      // Step 2: Upload file to R2
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) throw new Error("Upload to R2 failed");

      // Step 3: Save metadata
      const saveRes = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          path: publicUrl,
          size: file.size,
          mimeType: file.type,
        }),
      });

      if (saveRes.ok) {
        const data = await saveRes.json();
        setResume(data);
        toast.success("简历已上传");
        fetchResume();
      } else {
        toast.error("保存元数据失败");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("上传失败，请重试");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <HairlineRule className="h-5" variant="accent" />
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          简历管理
        </h1>
      </div>

      {/* Current resume */}
      <div className="mb-8 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
          当前简历
        </h2>
        {loading ? (
          <p className="text-sm text-[var(--text-tertiary)]">加载中...</p>
        ) : resume ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText size={32} className="text-[var(--text-tertiary)]" />
              <div>
                <p className="font-medium text-[var(--text-primary)]">
                  {resume.filename}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  {formatFileSize(resume.size)} · 更新于{" "}
                  {formatDate(new Date(resume.updatedAt))}
                </p>
              </div>
            </div>
            {resume.path && (
              <a href={resume.path} download target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-2" />
                  预览
                </Button>
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-tertiary)]">尚未上传简历</p>
        )}
      </div>

      {/* Upload */}
      <div className="max-w-md">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
          上传新简历
        </h2>
        <FileUpload
          onUpload={handleUpload}
          accept={{ "application/pdf": [".pdf"] }}
          label="拖拽 PDF 文件到此处，或点击上传"
          uploading={uploading}
        />
      </div>

      {/* Version history */}
      {resume?.versions && resume.versions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
            更新记录
          </h2>
          <div className="overflow-x-auto rounded-[8px] border border-[var(--border-subtle)]">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                    文件名
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                    大小
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                    上传时间
                  </th>
                </tr>
              </thead>
              <tbody>
                {resume.versions.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-[var(--border-subtle)] last:border-0"
                  >
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)]">
                      {v.filename}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      {formatFileSize(v.size)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      {formatDate(new Date(v.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
