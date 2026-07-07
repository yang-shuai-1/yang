# 部署指南

## 一、Vercel 部署

### 1.1 连接仓库
1. 在 [vercel.com](https://vercel.com) 注册账号
2. 点击 "New Project" → 导入 Git 仓库
3. 选择框架预设 "Next.js"

### 1.2 构建设置
- **Build Command**: `npx prisma generate && next build`（已配置在 vercel.json）
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Region**: 选择 `Hong Kong (hkg1)` 以获得最佳国内访问速度

### 1.3 环境变量
在 Vercel 项目 Settings → Environment Variables 中添加：

```
DATABASE_URL          = postgresql://... (Vercel Postgres 提供)
AUTH_SECRET           = openssl rand -base64 32 生成
GITHUB_CLIENT_ID      = GitHub OAuth App Client ID
GITHUB_CLIENT_SECRET  = GitHub OAuth App Client Secret
R2_ACCOUNT_ID         = Cloudflare 账户 ID
R2_ACCESS_KEY_ID      = R2 API Token Access Key
R2_SECRET_ACCESS_KEY  = R2 API Token Secret
R2_BUCKET_NAME        = personal-website
R2_PUBLIC_URL         = https://cdn.example.com (绑定到 R2 的自定义域名)
NEXT_PUBLIC_SITE_URL  = https://your-domain.com
```

---

## 二、数据库配置

### 2.1 创建 Vercel Postgres
1. 在 Vercel Dashboard → Storage → 创建 Postgres 数据库
2. 选择免费层（1GB 存储 / 256MB 内存）
3. 创建后 Vercel 会自动注入 `DATABASE_URL` 环境变量

### 2.2 运行数据库迁移
```bash
# 本地迁移（需先配置 .env.local 中的 DATABASE_URL）
npx prisma migrate dev --name init

# 生产环境迁移（通过 Vercel CLI）
npx vercel env pull .env.production
npx prisma migrate deploy
```

---

## 三、Cloudflare R2 配置

### 3.1 创建 R2 存储桶
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单 → R2 → 创建存储桶
3. 名称填写 `personal-website`
4. 选择区域（建议 `APAC`）

### 3.2 创建 API Token
1. R2 页面 → Manage R2 API Tokens
2. 创建 token → 权限选择 "Object Read & Write"
3. 复制 Access Key ID 和 Secret Access Key
4. 将凭证填入 Vercel 环境变量

### 3.3 绑定自定义域名（可选但推荐）
1. 在 R2 存储桶 Settings → Public Access → 开启 R2.dev 域名（测试用）
2. 绑定自定义域名（如 `cdn.example.com`）：
   - 添加自定义域名
   - 在域名 DNS 中添加 CNAME 记录指向 R2 endpoint

### 3.4 CORS 配置
```json
[
  {
    "AllowedOrigins": ["https://your-domain.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 四、GitHub OAuth 配置

### 4.1 创建 OAuth App
1. GitHub → Settings → Developer settings → OAuth Apps
2. New OAuth App:
   - **Homepage URL**: `https://your-domain.com`
   - **Callback URL**: `https://your-domain.com/api/auth/callback/github`
3. 生成 Client Secret
4. 将 Client ID 和 Secret 填入 Vercel 环境变量

### 4.2 管理员权限控制
- NextAuth 只允许登录，不公开注册
- 如需限制特定 GitHub 用户才能访问后台，在 middleware 中增加白名单检查

---

## 五、DNS 配置

### 5.1 将域名指向 Vercel
1. Vercel Dashboard → 项目 → Settings → Domains
2. 添加你的域名（如 `example.com`）
3. 在域名 DNS 中添加：
   ```
   CNAME  @     cname.vercel-dns.com
   CNAME  www   cname.vercel-dns.com
   ```
4. Vercel 自动申请和管理 SSL 证书

### 5.2 CDN 加速（国内优化）
如果主要受众在国内，建议在 DNS 前套一层腾讯云 CDN：
1. 在腾讯云 CDN 中添加域名
2. 源站指向 Vercel 提供的域名
3. 开启 HTTPS 和 HTTP/2
4. 缓存规则：静态资源缓存 7 天，HTML 不缓存

---

## 六、CI/CD

- **自动部署**: `git push main` → Vercel 自动构建 + 部署
- **预览部署**: 每个 PR 自动生成预览 URL（如 `xxx-git-feature-xxx.vercel.app`）
- **回滚**: Vercel Dashboard 一键回滚到任意历史部署

---

## 七、首次部署检查清单

- [ ] Vercel 项目创建并连接仓库
- [ ] Vercel Postgres 创建完成
- [ ] `npx prisma migrate deploy` 执行成功
- [ ] Cloudflare R2 存储桶创建完成
- [ ] R2 API Token 配置完成
- [ ] GitHub OAuth App 创建完成
- [ ] 所有环境变量已在 Vercel 中配置
- [ ] 域名 DNS 解析生效
- [ ] HTTPS 证书自动签发
- [ ] 首页正常访问
- [ ] `/works` 作品页正常
- [ ] `/about` 关于页正常
- [ ] `/admin` 跳转到登录页
- [ ] GitHub 登录后进入后台
- [ ] 文件上传功能正常
- [ ] 简历下载正常

---

## 八、本地开发

```bash
# 安装依赖
npm install

# 生成 Prisma Client
npx prisma generate

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```
