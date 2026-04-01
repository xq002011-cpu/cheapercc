# CCBoss NPM 发布指南

## 📦 准备发布到 npm

### 前置条件

1. **npm 账号**
   ```bash
   # 如果没有账号，先注册
   npm adduser

   # 如果已有账号，登录
   npm login

   # 验证登录状态
   npm whoami
   ```

2. **检查包名可用性**
   ```bash
   npm view ccboss
   # 如果显示 "npm ERR! 404" 说明包名可用
   ```

### 发布前检查清单

- [ ] 所有功能测试通过
- [ ] README.md 完整
- [ ] package.json 信息正确
- [ ] .npmignore 配置正确
- [ ] 版本号更新
- [ ] git 仓库干净（无未提交改动）

## 🚀 发布步骤

### 1. 更新版本号

```bash
# 补丁版本（bug 修复）1.0.0 -> 1.0.1
npm version patch

# 小版本（新功能）1.0.0 -> 1.1.0
npm version minor

# 大版本（破坏性更新）1.0.0 -> 2.0.0
npm version major
```

### 2. 测试本地安装

```bash
# 在项目目录
npm link

# 在其他目录测试
cd ~
ccboss --version
ccb setup
```

### 3. 发布到 npm

```bash
# 发布到 npm
npm publish

# 如果包名被占用，可以发布到 scope
npm publish --access public
```

### 4. 验证发布

```bash
# 等待几分钟，然后验证
npm view ccboss

# 尝试全局安装
npm install -g ccboss

# 测试
ccboss --version
```

## 📋 发布检查表

### 代码质量
- [ ] 所有命令都能正常运行
- [ ] 没有明显的 bug
- [ ] 错误处理完整
- [ ] 依赖版本正确

### 文档完整性
- [ ] README.md 包含安装说明
- [ ] QUICK_START.md 清晰易懂
- [ ] SHORTCUTS.md 列出所有快捷命令
- [ ] 所有链接都有效

### package.json 配置
- [ ] name: "ccboss"
- [ ] version: 正确的版本号
- [ ] description: 清晰的描述
- [ ] keywords: 完整的关键词
- [ ] repository: GitHub 仓库 URL
- [ ] bugs: Issues URL
- [ ] homepage: 项目主页
- [ ] license: "MIT"
- [ ] bin: 所有命令别名配置

### 文件结构
```
ccboss/
├── bin/
│   └── ccboss.js        ✓ 可执行
├── src/
│   ├── index.js         ✓ 主入口
│   ├── llm-providers.js ✓ 提供商配置
│   ├── llm-adapter.js   ✓ 适配器
│   └── commands/        ✓ 所有命令
├── package.json         ✓ 配置正确
├── README.md            ✓ 完整文档
├── QUICK_START.md       ✓ 快速指南
├── SHORTCUTS.md         ✓ 快捷命令
├── LICENSE              ✓ MIT 许可
└── .npmignore           ✓ 忽略文件
```

## 🔄 更新已发布的包

### 修复 bug

```bash
# 1. 修复代码
# 2. 提交改动
git add .
git commit -m "fix: 修复 xxx 问题"

# 3. 更新版本（自动创建 git tag）
npm version patch

# 4. 推送到 GitHub
git push && git push --tags

# 5. 发布新版本
npm publish
```

### 添加新功能

```bash
git add .
git commit -m "feat: 添加 xxx 功能"
npm version minor
git push && git push --tags
npm publish
```

## 📊 发布后监控

### 查看下载量

```bash
npm view ccboss

# 或访问
https://www.npmjs.com/package/ccboss
```

### 查看用户反馈

- GitHub Issues
- npm 评论
- 社交媒体

## 🚨 发布注意事项

### 不要发布的内容
- [ ] node_modules/
- [ ] 测试文件
- [ ] 开发配置
- [ ] 个人 API keys
- [ ] .env 文件

### 安全检查
```bash
# 检查将要发布的文件
npm pack --dry-run

# 或实际打包查看
npm pack
tar -xzf ccboss-1.0.0.tgz
ls package/
```

## 📖 版本管理策略

### 语义化版本 (Semver)

格式: `MAJOR.MINOR.PATCH`

- **MAJOR**: 破坏性更新（不兼容的 API 变更）
- **MINOR**: 新功能（向后兼容）
- **PATCH**: Bug 修复（向后兼容）

### 示例

```
1.0.0 -> 1.0.1   # 修复 bug
1.0.1 -> 1.1.0   # 添加新提供商支持
1.1.0 -> 2.0.0   # 重大架构变更
```

## 🎯 发布后推广

### 1. 社交媒体
- [ ] Twitter 发推
- [ ] Reddit r/programming
- [ ] Hacker News
- [ ] Product Hunt

### 2. 中文社区
- [ ] V2EX 分享
- [ ] 掘金发文
- [ ] 知乎回答
- [ ] 微博推广

### 3. 技术博客
- [ ] 写技术博客介绍
- [ ] Medium 文章
- [ ] Dev.to 帖子

## 🔧 常见问题

### Q: 包名已被占用怎么办？

```bash
# 方案 1: 使用 scoped package
npm publish @yourusername/ccboss --access public

# 方案 2: 改名
# 在 package.json 中修改 name 字段
```

### Q: 发布失败：403 Forbidden

```bash
# 重新登录
npm logout
npm login

# 检查权限
npm whoami
```

### Q: 如何撤回已发布的版本？

```bash
# 24小时内可以撤回
npm unpublish ccboss@1.0.0

# 注意：撤回有限制，慎用！
```

## ✅ 完整发布命令

```bash
# 一键发布脚本
cd ~/CC/ccboss

# 1. 测试
npm test  # 如果有测试

# 2. 登录 npm
npm login

# 3. 更新版本
npm version patch  # 或 minor/major

# 4. 发布
npm publish

# 5. 推送到 GitHub
git push && git push --tags

# 6. 验证
npm view ccboss
```

## 🎉 首次发布完整流程

```bash
# 确保在项目目录
cd ~/CC/ccboss

# 登录 npm
npm login

# 检查包名
npm view ccboss  # 应该返回 404

# 发布
npm publish

# 验证
npm install -g ccboss
ccboss --version

# 成功！🎉
```

---

**准备好了吗？运行 `npm publish` 让全世界使用 CCBoss！🚀**
