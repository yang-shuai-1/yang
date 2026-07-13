import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  work: {
    title: string;
    category: string;
    description: string;
    coverImage: string;
    year: number;
    slug: string;
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "web-development": "代码项目",
  blog: "博客日记",
  photography: "摄影",
  other: "其他",
};

export function WorkCard({ work }: WorkCardProps) {
  const imageSrc =
    work.coverImage?.startsWith("/") ||
    work.coverImage?.startsWith("http")
      ? work.coverImage
      : `/images/placeholder-1.svg`;

  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <article
        className={cn(
          "rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden",
          "transition-all duration-300 ease-out",
          "hover:translate-y-[-2px]",
          // Card hover accent border — left border glows
          "relative",
          "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 after:ease-out",
          "hover:after:w-[2px]"
        )}
      >
        {/* 封面图 */}
        <div className="aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)] relative">
          <Image
            src={imageSrc}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </div>

        {/* 信息 */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <span>{CATEGORY_LABELS[work.category] || work.category}</span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              /
            </span>
            <span>{work.year}</span>
          </div>

          <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)] leading-snug">
            {work.title}
          </h3>

          <p className="mt-1.5 text-sm text-[var(--text-secondary)] line-clamp-2 leading-normal">
            {work.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
