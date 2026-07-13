---
title: "AI 学习助手 — RAG 智能问答系统"
slug: "ai-learning-assistant"
category: "web-development"
description: "一个基于 RAG（检索增强生成）的智能学习工具，支持 PDF 上传自动问答、知识点提取和自动生成学习笔记，使用 Next.js + LangChain 构建。"
coverImage: "/images/placeholder-1.svg"
images:
  - "/images/placeholder-1.svg"
  - "/images/placeholder-2.svg"
techStack:
  - "Next.js"
  - "TypeScript"
  - "LangChain"
  - "PostgreSQL"
  - "Prisma"
  - "OpenAI API"
liveUrl: "https://github.com"
year: 2024
sortOrder: 1
published: true
---

## 项目背景

在学习过程中，我经常需要阅读大量 PDF 论文和教材。传统的"全文搜索"效率很低——你找到关键词，但找不到答案。我决定做一个能真正"理解"文档内容的工具。

## 技术实现

- 使用 LangChain 的 `RecursiveCharacterTextSplitter` 做文档切片
- 基于 OpenAI Embeddings + PostgreSQL pgvector 做向量存储
- 实现了语义搜索 + 关键词搜索的混合检索策略
- 前端用 Next.js App Router + Server Actions，支持流式响应

## 核心功能

- PDF 拖拽上传，自动解析和向量化存储
- 自然语言问答，精准定位原文出处
- 自动提取关键概念生成思维导图
- 支持多文档对话，跨文档检索

## 收获

这个项目让我深入理解了 RAG 的完整链路——从文档处理、向量化、检索到生成。也踩了很多坑：中文分词对检索精度的影响、chunk size 的调优、流式输出的实现等。
