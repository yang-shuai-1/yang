# 张三 — 个人网站

基于 Next.js 14 构建的个人品牌网站，具有专业的设计系统和完整的内容管理后台。

## 技术栈

- **前端**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **认证**: NextAuth.js v5 (GitHub OAuth)
- **数据库**: PostgreSQL (Vercel Postgres) + Prisma
- **文件存储**: Cloudflare R2
- **部署**: Vercel

## 设计系统

核心原则：
- **克制** — 只用一条 1px Hairline Rule 做装饰
- **呼吸感** — 基于 8px 阶梯的间距系统 + 68ch 正文宽度
- **温润** — 河石灰配色 + 青瓷绿强调色
- **无阴影** — 卡片 hover 只微移 2px

## 本地开发

```bash
npm install
npx prisma generate
npm run dev
```

## 部署

详细部署步骤见 [DEPLOY.md](./DEPLOY.md)。

## 项目结构

```
src/
├── app/            # Next.js App Router 页面
├── components/     # React 组件
│   ├── ui/         # 基础 UI 组件
│   ├── layout/     # 布局 (导航栏, 页脚)
│   ├── home/       # 首页
│   ├── works/      # 作品集
│   ├── about/      # 关于
│   └── admin/      # 后台管理
├── lib/            # 工具库 (DB, Auth, R2, 内容读取)
├── types/          # TypeScript 类型定义
└── middleware.ts   # 路由保护 (admin)
```
