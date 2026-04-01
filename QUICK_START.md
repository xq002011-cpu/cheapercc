# CCBoss 快速开始指南

## ⚡ 3 分钟上手

### 安装方式（3 选 1）

#### 方式 1: npm 全局安装（最简单）⭐

```bash
npm install -g ccboss
```

#### 方式 2: 从源码安装

```bash
cd ~/CC/ccboss
npm install && npm link
```

#### 方式 3: 一键脚本

```bash
cd ~/CC/ccboss && ./install.sh
```

### 配置 API Keys

```bash
ccboss setup
# 或使用短命令
ccb setup
```

### 开始使用！

```bash
# 启动对话（4 种方式任选）
ccboss          # 完整命令
ccb             # 短命令（推荐）⭐
cb              # 超短命令
boss            # 酷炫命令

# 快速提问
cb ask "你的问题"
```

**Setup 向导会引导你：**
1. 选择地区（中国/国际）
2. 选择要配置的 AI 提供商
3. 输入 API keys
4. 测试连接
5. 选择默认模型

### 第四步：开始使用！

```bash
# 启动对话
ccboss

# 或快速提问
ccboss ask "什么是 AI？"
```

## 🎯 推荐配置（首次使用）

### 方案 A：使用 SkillBoss（最简单）⭐

**优势：** 一个 API key 访问所有模型

```bash
1. 访问 https://skillboss.co/console
2. 注册账号并获取 API key
3. 在 setup 中选择 SkillBoss
4. 输入 API key
5. 完成！可以使用 100+ 模型
```

**推荐模型：**
- `bedrock/claude-4-5-sonnet` - 最强
- `gpt-5` - OpenAI 最新
- `gemini-2.5-flash` - 快速
- `deepseek/deepseek-r1` - 推理

### 方案 B：国产模型（免费额度）

**推荐组合：**

1. **Kimi (月之暗面)** - 长文本
   - 访问: https://platform.moonshot.cn
   - 免费额度：1M tokens
   - 擅长：长文档分析

2. **智谱 GLM-4** - 综合能力
   - 访问: https://open.bigmodel.cn
   - 免费额度：100M tokens
   - 擅长：中文对话

3. **通义千问** - 阿里云
   - 访问: https://dashscope.aliyun.com
   - 免费额度：多
   - 擅长：企业应用

### 方案 C：国际模型（付费）

**推荐组合：**

1. **OpenAI GPT-4** - 综合最强
2. **Anthropic Claude** - 长文本
3. **Google Gemini** - 快速

## 📋 常见场景示例

### 场景 1：代码助手

```bash
# 使用 DeepSeek Coder
ccboss chat --provider deepseek --model deepseek-coder --system "你是一个 Python 专家"

# 然后问：
"写一个二分查找算法"
"如何优化这段代码？"
"解释这个错误"
```

### 场景 2：文档分析

```bash
# 使用 Kimi (长文本)
ccboss chat --provider kimi --model moonshot-v1-128k

# 然后：
"分析这篇论文的主要观点..."
"总结这个 PDF 的内容..."
```

### 场景 3：快速提问

```bash
ccboss ask "什么是量子计算？"
ccboss ask "React 和 Vue 的区别" --provider skillboss --model gpt-5
```

## 🔧 进阶配置

### 切换默认模型

```bash
# 方法 1: 重新运行 setup
ccboss setup

# 方法 2: 使用 --model 参数
ccboss chat --model gemini-2.5-flash

# 方法 3: 修改配置文件
# macOS/Linux: ~/.config/ccboss/config.json
```

### 添加更多提供商

```bash
# 随时重新运行 setup 添加新的提供商
ccboss setup
```

### 测试所有连接

```bash
ccboss test
```

## 🐛 故障排除

### 问题 1: npm link 失败

```bash
# 使用 sudo (macOS/Linux)
sudo npm link

# 或使用本地运行
npm start
```

### 问题 2: API Key 无效

```bash
# 重新配置
ccboss setup

# 或测试特定提供商
ccboss test
```

### 问题 3: 找不到 ccboss 命令

```bash
# 检查 npm global bin 路径
npm config get prefix

# 确保该路径在 PATH 中
echo $PATH

# 或使用完整路径
$(npm config get prefix)/bin/ccboss
```

### 问题 4: 国内网络问题

**推荐使用国产模型：**
- Kimi (月之暗面)
- 智谱 GLM
- 通义千问
- 豆包

**或使用 SkillBoss（有国内节点）**

## 📚 更多资源

- **README.md** - 完整文档
- **GitHub Issues** - 报告问题
- **SkillBoss Docs** - https://skillboss.co/docs

## ✅ 验证安装

运行以下命令验证一切正常：

```bash
# 1. 检查命令可用
which ccboss

# 2. 检查版本
ccboss --version

# 3. 检查配置
ccboss info

# 4. 测试连接
ccboss test

# 5. 快速提问
ccboss ask "测试成功！"
```

如果所有命令都正常运行，恭喜！你已成功安装 CCBoss 🎉

---

**下一步：** 阅读 [README.md](./README.md) 了解所有功能
