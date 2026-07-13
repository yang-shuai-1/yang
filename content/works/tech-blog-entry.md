---
title: "我的 AI 学习之路 — 从零到第一个 Agent"
slug: "ai-learning-journey"
category: "blog"
description: "记录我过去三个月学习 AI Agent 开发的完整历程：从 LangChain 入门到构建第一个能自动写代码的智能体，踩过的坑和收获都在这里。"
coverImage: "/images/placeholder-2.svg"
images:
  - "/images/placeholder-2.svg"
techStack:
  - "Python"
  - "LangChain"
  - "OpenAI"
  - "Vector DB"
liveUrl: ""
year: 2024
sortOrder: 5
published: true
---

## 起点：为什么想学 AI Agent

2024 年初，ChatGPT 已经火了一年，但大多数人只是把它当作一个聊天工具。我好奇的是：能不能让 AI 不只是"回答"，而是"做事情"？这个想法让我踏入了 AI Agent 的世界。

## 第一个月：信息过载

刚开始的体验是压倒性的——LangChain、AutoGPT、CrewAI、Semantic Kernel……太多框架、太多概念。我犯的第一个错误是想一次性理解所有东西。

后来我调整了策略：**先跑起来，再理解**。我选了一个最简单的任务——让 GPT 帮我自动整理 GitHub Issues，分类并打标签。

## 第二个月：第一个能用的 Agent

随着对 LangChain 工具的熟悉，我开始构建一个更实用的 Agent：自动代码审查助手。它能：

- 读取 GitHub PR 的 diff
- 检查代码风格、潜在 bug、安全漏洞
- 生成结构化的审查报告
- 直接以 Comment 形式提交到 PR

这个 Agent 在几个开源项目中试用后，真的找到了几个隐藏的 bug。那是我第一次感受到 AI 不是玩具。

## 第三个月：反思和笔记

现在我正在做一些反思整理：

1. Agent 的可靠性是第一位的——一个不可靠的 Agent 比没有更糟
2. 提示词工程是 Agent 的核心，框架只是脚手架
3. 最好的学习方式是做项目，不是看教程
4. RAG + Agent 的组合是最实用的技术路线

## 后续计划

接下来想探索的方向：多 Agent 协作、长期记忆、工具调用的可靠性优化。
