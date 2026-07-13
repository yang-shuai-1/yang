---
title: "校园二手交易平台 — 全栈实战项目"
slug: "campus-secondhand"
category: "web-development"
description: "一个为校园打造的实时二手交易平台。支持在线聊天、商品搜索、订单管理和卖家评价系统。React + Node.js + MongoDB + WebSocket。"
coverImage: "/images/placeholder-3.svg"
images:
  - "/images/placeholder-3.svg"
  - "/images/placeholder-1.svg"
techStack:
  - "React"
  - "Node.js"
  - "Express"
  - "MongoDB"
  - "Socket.io"
  - "JWT"
liveUrl: "https://github.com"
year: 2024
sortOrder: 3
published: true
---

## 项目起因

学校的二手交易长期依赖 QQ 群和微信群——信息杂乱、无法搜索、交易纠纷难以处理。我想做一个让信息更有序的交易平台。

## 技术架构

- **前端**：React + React Router + Zustand 状态管理
- **后端**：Node.js + Express + JWT 认证
- **数据库**：MongoDB + Mongoose ODM
- **实时通信**：Socket.io 实现买家卖家实时聊天
- **图片存储**：Multer + Sharp 压缩 + 本地存储（后续迁移到云存储）

## 核心功能

- 商品发布（多图上传 + 分类 + 价格）
- 关键词搜索 + 分类筛选 + 排序
- 在线聊天（实时消息、未读提醒）
- 订单管理（待确认/进行中/已完成）
- 卖家评价系统（评分 + 评论）
- 个人中心（发布的/卖出的/买到的）

## 上线数据

在校内上线两周后，注册用户 300+，日均活跃 50+，累计发布商品 200+。
