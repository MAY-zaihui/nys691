# 部署指南

## Supabase 配置详细步骤

### 1. 创建 Supabase 项目
1. 访问 [https://supabase.com](https://supabase.com)
2. 注册/登录账户
3. 点击 "New Project"
4. 选择组织，输入项目名称
5. 设置数据库密码
6. 选择地区（推荐选择 Southeast Asia）
7. 点击 "Create new project"

### 2. 获取项目配置
1. 项目创建完成后，进入项目仪表板
2. 点击左侧菜单 "Settings" > "API"
3. 复制以下信息：
   - Project URL
   - anon public key

### 3. 配置数据库表
在 Supabase 控制台中：

#### 方法一：SQL 编辑器
1. 点击左侧菜单 "SQL Editor"
2. 点击 "New query"
3. 依次复制粘贴并执行以下 SQL 文件内容：
   - `supabase/migrations/001_create_profiles.sql`
   - `supabase/migrations/002_create_projects.sql`
   - `supabase/migrations/003_create_contacts.sql`

#### 方法二：表编辑器
1. 点击左侧菜单 "Table Editor"
2. 点击 "Create a new table"
3. 按照以下结构创建表：

**profiles 表：**
- id: UUID (主键，默认值: gen_random_uuid())
- name: text (非空)
- title: text (可为空)
- bio: text (可为空)
- avatar: text (可为空)
- skills: text[] (数组，可为空)
- created_at: timestamp (默认值: now())
- updated_at: timestamp (默认值: now())

**projects 表：**
- id: UUID (主键，默认值: gen_random_uuid())
- title: text (非空)
- description: text (可为空)
- image: text (可为空)
- technologies: text[] (数组，可为空)
- category: text (默认值: 'web')
- demo_url: text (可为空)
- github_url: text (可为空)
- created_at: timestamp (默认值: now())
- updated_at: timestamp (默认值: now())

**contacts 表：**
- id: UUID (主键，默认值: gen_random_uuid())
- name: text (非空)
- email: text (非空)
- subject: text (非空)
- message: text (非空)
- created_at: timestamp (默认值: now())

### 4. 配置 RLS (Row Level Security)
为了安全，建议启用 RLS：

```sql
-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 创建策略（允许所有读取，允许插入联系方式）
CREATE POLICY "Allow read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow read access" ON contacts FOR SELECT USING (true);
CREATE POLICY "Allow insert contacts" ON contacts FOR INSERT WITH CHECK (true);
```

## Netlify 部署详细步骤

### 1. 准备 GitHub 仓库
1. 将代码推送到 GitHub 仓库
2. 确保包含所有必要文件
3. 确保 `.gitignore` 已正确配置

### 2. Netlify 配置
1. 访问 [https://netlify.com](https://netlify.com)
2. 注册/登录账户
3. 点击 "New site from Git"
4. 选择 "GitHub" 并授权
5. 选择要部署的仓库

### 3. 构建设置
在 Netlify 构建设置中：
- Build command: `npm run build`
- Publish directory: `build`
- Node version: `18`

### 4. 环境变量配置
在 Netlify 控制台中：
1. 点击 "Site settings" > "Build & deploy" > "Environment"
2. 添加以下环境变量：
   ```
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 5. 部署和测试
1. 点击 "Deploy site"
2. 等待部署完成
3. 测试所有页面功能
4. 验证数据库连接

## 本地开发环境设置

### 1. 环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm start
```

## 常见问题解决

### Supabase 连接问题
1. **检查 URL 格式**: 确保包含 `https://`
2. **检查 API Key**: 确保使用 anon key，不是 service_role key
3. **CORS 问题**: 在 Supabase 设置中允许所有来源（开发环境）

### Netlify 部署问题
1. **构建失败**: 检查 `package.json` 中的构建脚本
2. **404 错误**: 确认 `netlify.toml` 中的重定向规则
3. **环境变量**: 确认 Netlify 中的环境变量配置正确

### 样式问题
1. **Tailwind 不生效**: 检查 `tailwind.config.js` 和 `postcss.config.js`
2. **生产环境样式丢失**: 确认 `src/index.css` 中的 Tailwind 指令

## 性能优化建议

### 前端优化
1. 使用 React.memo 优化组件渲染
2. 图片懒加载和优化
3. 代码分割和动态导入

### 数据库优化
1. 添加适当的索引
2. 限制查询字段
3. 使用缓存策略

### 部署优化
1. 启用 Netlify 缓存
2. 配置 CDN
3. 压缩静态资源

## 监控和维护

### 错误监控
1. 使用 Supabase 日志监控数据库错误
2. 使用 Netlify 构建日志检查部署问题
3. 添加前端错误监控

### 备份策略
1. Supabase 自动备份
2. Git 代码版本管理
3. 定期导出重要数据

---

如遇到部署问题，请检查：
1. 环境变量配置
2. 网络连接
3. 权限设置
4. 构建日志