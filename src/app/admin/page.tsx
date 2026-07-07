import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatsCard } from "@/components/admin/stats-card";
import { HairlineRule } from "@/components/layout/hairline-rule";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let worksCount = 0;
  let recentWorks: Awaited<ReturnType<typeof prisma.work.findMany>> = [];
  let resume = null;

  try {
    worksCount = await prisma.work.count();
    recentWorks = await prisma.work.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    });
    resume = await prisma.resume.findUnique({
      where: { id: "default" },
    });
  } catch {
    // DB not available yet — show empty state
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <HairlineRule className="h-5" variant="accent" />
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          仪表盘
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="作品总数" value={worksCount} />
        <StatsCard
          label="已登录用户"
          value={session.user.name || session.user.email || "管理员"}
          subtitle={session.user.email || ""}
        />
        <StatsCard
          label="简历版本"
          value={resume ? "已上传" : "未上传"}
          subtitle={
            resume
              ? `更新于 ${new Date(resume.updatedAt).toLocaleDateString("zh-CN")}`
              : undefined
          }
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-semibold text-[var(--text-secondary)]">
          最近更新的作品
        </h2>
        {recentWorks.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">暂无作品</p>
        ) : (
          <div className="overflow-hidden rounded-[8px] border border-[var(--border-subtle)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
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
                </tr>
              </thead>
              <tbody>
                {recentWorks.map((work) => (
                  <tr
                    key={work.id}
                    className="border-b border-[var(--border-subtle)] last:border-0"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[var(--text-primary)]">
                      {work.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      {work.category}
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
