"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/works/lightbox";

export interface WorkGridItem {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  year: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  "brand-design": "品牌设计",
  "web-development": "网页开发",
  photography: "摄影",
  other: "其他",
};

interface WorkCardProps {
  work: WorkGridItem;
  priority?: boolean;
}

export function WorkCard({ work, priority }: WorkCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imageSrc =
    work.coverImage?.startsWith("/") ||
    work.coverImage?.startsWith("http")
      ? work.coverImage
      : `/images/placeholder-1.svg`;

  const placeholders = [
    "/images/placeholder-1.svg",
    "/images/placeholder-2.svg",
    "/images/placeholder-3.svg",
  ];
  const fallbackSrc =
    placeholders[Math.abs(work.slug.length) % placeholders.length];

  return (
    <>
      <article
        className={cn(
          "group rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden",
          "transition-all duration-300 ease-out",
          "hover:translate-y-[-2px]",
          "relative",
          "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 after:ease-out",
          "hover:after:w-[2px]"
        )}
      >
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative block w-full aspect-[4/3] overflow-hidden bg-[var(--bg-elevated)] cursor-zoom-in"
          aria-label={`查看 ${work.title} 的大图`}
        >
          <Image
            src={imageSrc}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            priority={priority}
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== fallbackSrc) {
                img.src = fallbackSrc;
              }
            }}
          />
        </button>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <span>{CATEGORY_LABELS[work.category] || work.category}</span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              /
            </span>
            <span>{work.year}</span>
          </div>

          <Link href={`/works/${work.slug}`} className="mt-2 block">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug transition-colors duration-150 hover:text-[var(--accent)]">
              {work.title}
            </h3>
          </Link>
        </div>
      </article>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={imageSrc}
        alt={work.title}
      />
    </>
  );
}

interface WorkGridProps {
  works: WorkGridItem[];
}

export function WorkGrid({ works }: WorkGridProps) {
  if (works.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto mb-4 h-10 w-px bg-[var(--border-subtle)]" />
        <p className="text-sm text-[var(--text-tertiary)]">
          该分类暂无作品
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((work, i) => (
        <WorkCard key={work.slug} work={work} priority={i < 3} />
      ))}
    </div>
  );
}
