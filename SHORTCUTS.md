# CCBoss 快捷命令指南

## 🚀 所有可用的快捷命令

CCBoss 提供了多个快捷命令别名，让你打字更快！

### 主命令（4 个别名）

| 命令 | 说明 | 示例 |
|------|------|------|
| `ccboss` | 完整命令 | `ccboss chat` |
| `ccb` | 短命令（推荐） | `ccb chat` |
| `cb` | 超短命令 | `cb chat` |
| `boss` | 酷炫命令 | `boss ask "hi"` |

所有命令功能完全相同，选择你喜欢的！

## 📋 常用命令速查

### 启动对话

```bash
ccboss          # 启动交互式对话
ccb             # 同上（短命令）
cb              # 同上（超短）
boss            # 同上（酷炫）
```

### 配置和设置

```bash
ccb setup       # 配置 API keys
ccb config      # 查看配置
ccb info        # 查看系统信息
ccb test        # 测试连接
```

### 快速提问

```bash
ccb ask "你的问题"
cb ask "React Hooks 怎么用？"
boss ask "什么是量子计算？"
```

### 模型管理

```bash
ccb models      # 查看所有可用模型
ccb models -p skillboss  # 查看特定提供商的模型
```

### 使用特定模型

```bash
# 使用完整命令
ccboss chat --provider kimi --model moonshot-v1-128k

# 使用短命令（推荐）
ccb chat -p kimi -m moonshot-v1-128k

# 使用超短命令
cb chat -p skillboss -m gpt-5

# 使用酷炫命令
boss chat -p deepseek -m deepseek-coder
```

### 自定义 System Prompt

```bash
ccb chat --system "你是一个 Python 专家"
cb chat -s "你是一个前端工程师"
boss chat -s "你是一个诗人"
```

## 🎯 推荐工作流

### 日常使用（最短路径）

```bash
# 1. 快速提问
cb ask "今天的任务是什么？"

# 2. 开始对话
cb

# 3. 切换模型（在需要时）
cb chat -p kimi
```

### 开发工作流

```bash
# 1. 代码助手模式
cb chat -s "你是一个代码专家"

# 2. 使用代码模型
cb chat -p deepseek -m deepseek-coder

# 3. 快速代码问题
cb ask "如何优化这个算法？"
```

### 文档分析工作流

```bash
# 使用长文本模型
cb chat -p kimi -m moonshot-v1-128k

# 然后粘贴长文档分析
```

## ⚡ 超级快捷方式

### Shell 别名（可选）

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
# CCBoss 快捷别名
alias ask='cb ask'
alias ai='cb'
alias chat='cb chat'

# 特定模型快捷方式
alias kimi='cb chat -p kimi -m moonshot-v1-128k'
alias gpt='cb chat -p skillboss -m gpt-5'
alias claude='cb chat -p skillboss -m bedrock/claude-4-5-sonnet'
alias code='cb chat -p deepseek -m deepseek-coder'
```

然后：

```bash
source ~/.zshrc  # 或 ~/.bashrc

# 现在可以使用：
ask "你的问题"
ai                    # 启动对话
kimi                  # 直接启动 Kimi
gpt                   # 直接启动 GPT-5
claude                # 直接启动 Claude
code                  # 代码助手
```

## 📝 完整命令参考

### 基础命令

```bash
ccb                      # 启动默认对话
ccb chat                 # 同上
ccb setup                # 配置向导
ccb ask <question>       # 快速提问
ccb models               # 列出所有模型
ccb test                 # 测试所有连接
ccb config --list        # 查看配置
ccb info                 # 系统信息
ccb --version            # 版本号
ccb --help               # 帮助
```

### Chat 命令选项

```bash
ccb chat [options]

Options:
  -m, --model <model>        指定模型
  -p, --provider <provider>  指定提供商
  -s, --system <prompt>      系统 prompt
```

### Ask 命令

```bash
ccb ask <question> [options]

Options:
  -m, --model <model>        指定模型
  -p, --provider <provider>  指定提供商
```

## 🎨 对话中的命令

在交互式对话中：

```
/exit 或 /quit   - 退出对话
/clear           - 清空对话历史
/help            - 显示帮助
```

## 💡 使用技巧

### 1. 组合使用短命令和选项

```bash
# 不好：太长
ccboss chat --provider skillboss --model gpt-5

# 好：简洁
cb chat -p skillboss -m gpt-5

# 更好：如果是默认配置，直接
cb
```

### 2. 快速切换提供商

```bash
cb chat -p kimi      # 长文本
cb chat -p deepseek  # 代码
cb chat -p skillboss -m gemini-2.5-flash  # 快速
```

### 3. 不同场景使用不同命令

```bash
# 正式工作
ccboss chat

# 日常使用
ccb

# 快速测试
cb

# 炫酷演示
boss
```

## 🚀 最常用的 5 个命令

```bash
1. cb                   # 启动对话（最常用）
2. cb ask "问题"        # 快速提问
3. cb setup             # 配置
4. cb models            # 查看模型
5. cb chat -p kimi      # 切换提供商
```

## 📚 更多资源

- **README.md** - 完整功能文档
- **QUICK_START.md** - 快速开始指南
- **GitHub Issues** - 报告问题

---

**记住：所有 `ccboss` 命令都可以用 `ccb`、`cb` 或 `boss` 替代！**
