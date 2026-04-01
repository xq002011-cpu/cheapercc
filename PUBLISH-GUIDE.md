# CheaperCC - 发布指南（给远硕）

## 📦 项目信息

**Package**: `cheapercc`
**Version**: 1.0.0
**Tagline**: "Cheaper Claude Code Alternative"
**GitHub**: https://github.com/yourusername/cheapercc (待创建)

---

## 🚀 发布步骤（远硕执行）

### 1. 克隆代码
```bash
git clone https://github.com/yourusername/cheapercc
cd cheapercc
```

### 2. 安装依赖
```bash
npm install
```

### 3. 测试本地运行
```bash
npm link
cc --version   # 应该显示 1.0.0
cc info        # 查看配置
```

### 4. 发布到 npm
```bash
npm login
# 用你的 npm 账号登录

npm publish
# 如果要求 2FA，使用：
# npm publish --otp=123456
```

---

## ✅ 发布后验证

```bash
# 全局安装测试
npm install -g cheapercc

# 测试命令
cc --version
cheaper --version
cheapercc --version

# 测试 setup
cc setup
```

---

## 📝 Package 详情

### package.json 关键信息
```json
{
  "name": "cheapercc",
  "version": "1.0.0",
  "description": "Cheaper Claude Code Alternative - Access 100+ LLMs from one CLI. Open source, multi-provider, 95% cost savings.",
  "bin": {
    "cheapercc": "bin/ccboss.js",
    "cheaper": "bin/ccboss.js",
    "cc": "bin/ccboss.js"
  },
  "keywords": [
    "ai", "agent", "cli", "llm", "claude", "gpt",
    "skillboss", "cheaper", "cheapercc", "coding-assistant"
  ]
}
```

### 3 个命令都可用
- `cc` - 最短（2 字符）
- `cheaper` - 中等长度
- `cheapercc` - 完整名称

---

## 🎯 核心价值

1. **Cheaper**: 95% cost savings (vs Claude Code)
2. **Multi-LLM**: 100+ models (Claude, GPT-5, DeepSeek, Gemini)
3. **No Lock-in**: Switch providers anytime
4. **Powered by SkillBoss**: One API key for everything

---

## 🛡️ 法律保护

已添加完整的 Fair Use 章节到 README:
- ✅ Comparative advertising (合法)
- ✅ Zero Anthropic code
- ✅ No trademark infringement
- ✅ Contact info for concerns

---

## 🔗 相关链接

- **SkillBoss**: https://skillboss.co
- **API Console**: https://skillboss.co/console
- **Documentation**: https://skillboss.co/docs

---

## 📞 发布后通知

发布成功后，告诉小银：

```
✅ cheapercc 已发布到 npm
📦 Package: https://www.npmjs.com/package/cheapercc
📖 README: 包含完整的 SkillBoss 介绍和 Fair Use 保护
🚀 用户可以直接 npm install -g cheapercc 使用
```

---

## ⚠️ 注意事项

1. **不要修改版本号** - 已经是 1.0.0
2. **不要修改 package.json** - 所有配置已完成
3. **确保 node_modules 不在 git** - 已在 .gitignore
4. **发布前运行 npm publish --dry-run** - 检查没问题

---

## 🧪 预发布检查清单

- [ ] `npm install` 成功
- [ ] `npm link` 成功
- [ ] `cc --version` 显示 1.0.0
- [ ] `cc info` 显示正确的 banner
- [ ] `npm publish --dry-run` 无报错
- [ ] 有 npm 账号且已登录
- [ ] 发布成功后通知小银

---

**准备就绪！直接 npm publish 即可。**
