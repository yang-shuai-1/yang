"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WorkForm } from "@/components/admin/work-form";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { toast } from "sonner";

export default function NewWorkPage() {
  const router = useRouter();

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      techStack: data.techStack
        ? (data.techStack as string)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
      images: [],
    };

    const res = await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("作品已创建");
      router.push("/admin/works");
      router.refresh();
    } else if (res.status === 401) {
      toast.error("登录已过期，请重新登录");
      router.push("/admin/login");
    } else {
      const body = await res.json().catch(() => ({}));
      toast.error(body.error || "创建失败，请重试");
    }
  };

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
          新增作品
        </h1>
      </div>

      <div className="max-w-2xl">
        <WorkForm onSubmit={handleSubmit} submitLabel="创建作品" />
      </div>
    </div>
  );
}
