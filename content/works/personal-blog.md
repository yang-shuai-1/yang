---
title: "个人技术博客 — 从零搭建全栈博客系统"
slug: "personal-blog"
category: "web-development"
description: "自建技术博客，支持 MDX 写作、代码高亮、全文搜索、RSS 订阅和暗色模式。部署在 Vercel 上，使用 Next.js + Contentlayer 构建。"
coverImage: "/images/placeholder-2.svg"
images:
  - "/images/placeholder-2.svg"
  - "/images/placeholder-3.svg"
techStack:
  - "Next.js"
  - "MDX"
  - "Tailwind CSS"
  - "Contentlayer"
  - "Vercel"
liveUrl: "https://github.com"
year: 2024
sortOrder: 2
published: true
---

## 为什么自建博客

用过 Hexo、Hugo、Notion，但都觉得不够灵活——想要自定义的排版、想要特定的代码高亮主题、想要自己的数据统计。最终决定自己造一个。

## 技术选型

- **Next.js App Router**：ISR 增量静态生成，文章更新后自动重新构建
- **MDX**：在 Markdown 中直接使用 React 组件，可以做交互式的代码演示
- **Contentlayer**：类型安全的内容管理，自动生成 TypeScript 类型
- **Tailwind CSS**：自定义设计系统，响应式排版

## 功能亮点

- 全文搜索（基于 FlexSearch）
- 代码块语法高亮 + 行号 + 一键复制
- 标签分类和归档页面
- RSS 自动生成
- 阅读统计和阅读时间预估
- 深色模式自动切换

目前已发布 30+ 篇技术文章，涵盖 React、Node.js、Python、算法等主题。
