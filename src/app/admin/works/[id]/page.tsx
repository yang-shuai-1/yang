"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WorkForm } from "@/components/admin/work-form";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { toast } from "sonner";

export default function EditWorkPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [work, setWork] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWork = useCallback(async () => {
    try {
      const res = await fetch(`/api/works/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("作品未找到");
        } else {
          setError("加载失败，请重试");
        }
        return;
      }
      const data = await res.json();
      setWork({
        ...data,
        techStack: Array.isArray(data.techStack)
          ? data.techStack.join(", ")
          : "",
        liveUrl: data.liveUrl || "",
      });
    } catch {
      setError("网络错误，请检查连接");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWork();
  }, [fetchWork]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      techStack: data.techStack
        ? (data.techStack as string)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    };

    const res = await fetch(`/api/works/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("作品已更新");
      router.push("/admin/works");
      router.refresh();
    } else if (res.status === 401) {
      toast.error("登录已过期，请重新登录");
      router.push("/admin/login");
    } else {
      toast.error("更新失败，请重试");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-5 w-px bg-[var(--accent)]" />
        <p className="text-sm text-[var(--text-tertiary)]">加载中...</p>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div>
        <Link
          href="/admin/works"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={16} />
          返回列表
        </Link>
        <p className="mt-4 text-sm text-[var(--text-tertiary)]">
          {error || "作品未找到"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/works"
          className="rounded-[4px] p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <HairlineRule className="h-5" variant="accent" />
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          编辑作品
        </h1>
      </div>

      <div className="max-w-2xl">
        <WorkForm
          defaultValues={work}
          onSubmit={handleSubmit}
          submitLabel="更新作品"
        />
      </div>
    </div>
  );
}
