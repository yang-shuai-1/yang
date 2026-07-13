import { isAuthenticated } from "@/lib/auth";
import { getAllWorks } from "@/lib/works-file";
import { StatsCard } from "@/components/admin/stats-card";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const allWorks = getAllWorks();
  const published = allWorks.filter((w) => w.published);
  const recent = allWorks.slice(0, 5);

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <HairlineRule className="h-5" variant="accent" />
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">仪表盘</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="作品总数" value={allWorks.length} subtitle={`${published.length} 已发布`} />
        <StatsCard label="分类" value={new Set(allWorks.map((w) => w.category)).size} />
        <StatsCard label="推荐" value={allWorks.filter((w) => (w as { featured?: boolean }).featured).length} />
      </div>
      <div className="mt-10">
        <h2 className="mb-4 text-sm font-semibold text-[var(--text-secondary)]">全部作品</h2>
        {allWorks.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">暂无作品</p>
        ) : (
          <div className="overflow-x-auto rounded-[8px] border border-[var(--border-subtle)]">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">标题</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">分类</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-tertiary)]">状态</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((w) => (
                  <tr key={w.slug} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-[var(--text-primary)]">{w.title}</td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{w.category}</td>
                    <td className="px-4 py-3"><span className={`inline-flex rounded-[4px] px-2 py-0.5 text-xs ${w.published ? "bg-[var(--accent-subtle)] text-[var(--accent)]" : "bg-[var(--bg-elevated)] text-[var(--text-tertiary)]"}`}>{w.published ? "已发布" : "草稿"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
