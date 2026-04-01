# CCBoss 更新日志

## ✨ 最新更新（2026-04-01）

### 🚀 快捷命令支持

现在 CCBoss 支持 **4 个命令别名**！

| 命令 | 说明 | 示例 |
|------|------|------|
| `ccboss` | 完整命令 | `ccboss setup` |
| `ccb` | 短命令（推荐）⭐ | `ccb chat` |
| `cb` | 超短命令 | `cb ask "hi"` |
| `boss` | 酷炫命令 | `boss` |

**所有命令功能完全相同！选择你喜欢的！**

```bash
# 这些都可以！
ccboss
ccb
cb
boss

# 快速提问也支持
ccb ask "你的问题"
cb ask "React 怎么用？"
boss ask "什么是 AI？"
```

### 📦 NPM 安装支持

现在可以通过 npm 直接安装！

```bash
# 全局安装（最简单）
npm install -g ccboss

# 验证
ccboss --version

# 配置
ccboss setup

# 开始使用
ccb
```

**3 种安装方式：**

1. **npm 全局安装**（推荐）
   ```bash
   npm install -g ccboss
   ```

2. **从源码安装**
   ```bash
   cd ~/CC/ccboss
   npm install && npm link
   ```

3. **一键安装脚本**
   ```bash
   cd ~/CC/ccboss && ./install.sh
   ```

### 📚 新增文档

| 文档 | 说明 |
|------|------|
| **SHORTCUTS.md** | 完整快捷命令指南 |
| **PUBLISH.md** | NPM 发布完整指南 |
| **UPDATES.md** | 本文件 - 更新日志 |

### 🔧 配置优化

- ✅ 添加 `.npmignore` - 发布时排除不必要文件
- ✅ 更新 `package.json` - 支持多个命令别名
- ✅ 添加 `postinstall` 钩子 - 安装后提示
- ✅ 优化 npm scripts - 更方便的开发命令

### 📖 文档更新

- ✅ README.md - 添加 npm 安装说明
- ✅ README.md - 添加快捷命令说明
- ✅ QUICK_START.md - 更新安装步骤
- ✅ QUICK_START.md - 添加快捷命令示例

## 🎯 使用示例

### 最简单的工作流

```bash
# 1. 安装
npm install -g ccboss

# 2. 配置
ccb setup

# 3. 使用
cb

# 完成！只需要 3 个命令！
```

### 日常使用

```bash
# 启动对话（使用最短命令）
cb

# 快速提问
cb ask "今天要做什么？"

# 切换模型
cb chat -p kimi

# 查看可用模型
cb models

# 测试连接
cb test
```

### Shell 别名（可选）

在 `~/.zshrc` 或 `~/.bashrc` 中添加：

```bash
# CCBoss 快捷别名
alias ask='cb ask'
alias ai='cb'

# 特定模型
alias kimi='cb chat -p kimi -m moonshot-v1-128k'
alias gpt='cb chat -p skillboss -m gpt-5'
alias claude='cb chat -p skillboss -m bedrock/claude-4-5-sonnet'
```

## 📊 功能对比

### 更新前 vs 更新后

| 功能 | 更新前 | 更新后 |
|------|--------|--------|
| **命令别名** | 1 个 (`ccboss`) | 4 个 (`ccboss`, `ccb`, `cb`, `boss`) |
| **安装方式** | 源码安装 | npm / 源码 / 脚本 |
| **最短命令** | 6 字符 | 2 字符 (`cb`) |
| **发布文档** | ❌ | ✅ PUBLISH.md |
| **快捷指南** | ❌ | ✅ SHORTCUTS.md |

## 🚀 性能提升

### 打字效率提升

```
之前: ccboss ask "问题"     (17 个字符)
现在: cb ask "问题"         (11 个字符)
节省: 35% 的输入！

之前: ccboss chat -p kimi   (21 个字符)
现在: cb chat -p kimi       (15 个字符)
节省: 29% 的输入！
```

### 记忆负担降低

- 只需记住 **`cb`** 这 2 个字母
- 或者记住 **`ccb`** 这 3 个字母
- 比 `ccboss` 简单太多！

## 📈 下一步计划

### 即将到来的功能

- [ ] 代码助手模式完善
- [ ] Agent 子任务支持
- [ ] 对话历史保存
- [ ] 多会话管理
- [ ] 插件系统
- [ ] 更多提供商支持

### 长期规划

- [ ] Web UI
- [ ] VS Code 插件
- [ ] API Server 模式
- [ ] 团队协作功能

## 🎉 升级指南

### 如果你已经安装了旧版本

```bash
# 方式 1: 通过 npm 升级（推荐）
npm update -g ccboss

# 方式 2: 重新安装
npm uninstall -g ccboss
npm install -g ccboss

# 方式 3: 从源码更新
cd ~/CC/ccboss
git pull  # 如果是 git 仓库
npm install
npm link
```

### 迁移到快捷命令

不需要任何改动！旧命令依然可用：

```bash
# 旧方式（依然可用）
ccboss setup
ccboss chat
ccboss ask "问题"

# 新方式（更快）
ccb setup
ccb chat
cb ask "问题"

# 随你选择！
```

## 💡 使用技巧

### 1. 养成使用短命令的习惯

```bash
# 不要这样（太长）
ccboss chat --provider kimi --model moonshot-v1-128k

# 这样更好（简洁）
cb chat -p kimi -m moonshot-v1-128k

# 最佳（如果是默认配置）
cb
```

### 2. 为常用操作创建 shell 别名

```bash
# 在 ~/.zshrc 中添加
alias ask='cb ask'
alias ai='cb'

# 然后可以这样用
ask "你的问题"
ai  # 启动对话
```

### 3. 在脚本中使用

```bash
#!/bin/bash
# 自动化脚本

# 使用 CCBoss 生成代码
cb ask "生成一个快速排序算法" > sort.py

# 使用 CCBoss 分析日志
cb ask "分析这个错误: $(cat error.log)"
```

## 🌟 用户反馈

如果你喜欢这些更新，请：

- ⭐ GitHub Star
- 📢 分享给朋友
- 💬 提供反馈
- 🐛 报告 bug

## 📝 变更日志

### v1.0.1 (即将发布)

- ✅ 添加快捷命令支持 (`ccb`, `cb`, `boss`)
- ✅ 支持 npm 全局安装
- ✅ 新增 SHORTCUTS.md 文档
- ✅ 新增 PUBLISH.md 发布指南
- ✅ 优化安装流程
- ✅ 更新所有文档

### v1.0.0 (当前版本)

- ✅ 支持 15+ LLM 提供商
- ✅ 支持 100+ AI 模型
- ✅ 交互式 setup 向导
- ✅ 实时对话模式
- ✅ 快速提问功能
- ✅ 完整文档

---

**感谢使用 CCBoss！🎉**

有任何问题或建议，欢迎提 Issue！
