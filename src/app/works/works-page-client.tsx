"use client";

import { useState } from "react";
import { FilterBar } from "@/components/works/filter-bar";
import { WorkGrid, type WorkGridItem } from "@/components/works/work-grid";

interface WorksPageClientProps {
  works?: WorkGridItem[];
  categories?: string[];
}

export function WorksPageClient({
  works: initialWorks = [],
  categories: initialCategories = ["all"],
}: WorksPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // 在客户端从服务端传入的数据进行过滤
  // (实际部署时数据来自 markdown 文件，这里用 props 接收)
  const filteredWorks =
    activeCategory === "all"
      ? initialWorks
      : initialWorks.filter((w) => w.category === activeCategory);

  return (
    <>
      <FilterBar
        categories={initialCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="mt-10">
        <WorkGrid works={filteredWorks} />
      </div>
    </>
  );
}
