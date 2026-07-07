"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { toast } from "sonner";

interface Work {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  published: boolean;
  sortOrder: number;
  updatedAt: string;
}

export default function AdminWorksPage() {
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Work | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchWorks = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/works");
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setWorks(data);
    } catch {
      setError("加载失败，请刷新页面重试");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/works/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWorks((prev) => prev.filter((w) => w.id !== deleteTarget.id));
        toast.success("作品已删除");
        router.refresh();
      } else if (res.status === 401) {
        toast.error("登录已过期");
        router.push("/admin/login");
      } else {
        toast.error("删除失败");
      }
    } catch {
      toast.error("网络错误");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const CATEGORY_LABELS: Record<string, string> = {
    "brand-design": "品牌设计",
    "web-development": "网页开发",
    photography: "摄影",
    other: "其他",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HairlineRule className="h-5" variant="accent" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            作品管理
          </h1>
        </div>
        <Link href="/admin/works/new">
          <Button>
            <Plus size={16} className="mr-2" />
            新增作品
          </Button>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-3 py-8">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          <p className="text-sm text-[var(--text-tertiary)]">加载中...</p>
        </div>
      ) : error ? (
        <div className="rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">{error}</p>
          <Button variant="ghost" className="mt-3" onClick={fetchWorks}>
            重新加载
          </Button>
        </div>
      ) : works.length === 0 ? (
        <div className="rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-12 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            暂无作品，点击右上角创建第一个
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[8px] border border-[var(--border-subtle)]">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                <th className="w-8 px-4 py-3" />
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                  标题
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                  分类
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                  年份
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">
                  状态
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[var(--text-tertiary)]">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr
                  key={work.id}
                  className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-surface)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <GripVertical
                      size={14}
                      className="text-[var(--text-tertiary)] cursor-grab"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                    {work.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                    {CATEGORY_LABELS[work.category] || work.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                    {work.year}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-[4px] px-2 py-0.5 text-xs ${
                        work.published
                          ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                          : "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]"
                      }`}
                    >
                      {work.published ? "已发布" : "草稿"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(`/admin/works/${work.id}`)
                        }
                        className="rounded-[4px] p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label={`编辑 ${work.title}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(work)}
                        className="rounded-[4px] p-1.5 text-[var(--text-tertiary)] hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label={`删除 ${work.title}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation */}
      <DeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="确认删除"
        description={`确定要删除「${deleteTarget?.title}」吗？此操作不可撤销。`}
        loading={deleting}
      />
    </div>
  );
}
