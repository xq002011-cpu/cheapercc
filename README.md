# CheaperCC

**Open-source Multi-LLM CLI**

Switch between 100+ AI models anytime. Use cheap models for simple tasks, smart models for complex ones. 95% cost savings, zero vendor lock-in.

---

## 🚀 Quick Start

```bash
# Install
npm install -g cheapercc

# Setup
cc setup

# Start using
cc ask "Hello!"
cc                    # Interactive chat
```

---

## 💡 Why CheaperCC?

**Model Freedom**
- 🔓 Switch between 100+ models anytime
- 💰 Use cheap models ($0.14/1M) for simple tasks
- 🧠 Use smart models ($3/1M) for complex tasks
- 🌐 Access Chinese LLMs (Kimi, DeepSeek, MiniMax) + Western (GPT, Claude, Gemini)

**One API Key, Everything**
- ⚡ 18 providers, 100+ models
- 🎨 Beyond text: Images (Imagen-4), Video (Sora), Audio (ElevenLabs)
- 📦 Open source MIT license
- 🚀 Pay-per-use, no subscriptions

---

## 🔑 Powered by SkillBoss

**SkillBoss** (https://skillboss.co) makes this possible:

- **One API key → 100+ models**: Claude, GPT-5, DeepSeek, Gemini, and more
- **Beyond text**: Image generation (DALL-E, Midjourney), video (Sora), audio (ElevenLabs)
- **Simple pricing**: Pay only for what you use, often cheaper than direct APIs
- **No setup headache**: One key replaces 18 different API keys

Get your key: https://skillboss.co/console

---

## 💰 Cost Examples

| Model | Input (1M tokens) | Output (1M tokens) | Best For |
|-------|-------------------|-------------------|----------|
| **Kimi** | $0.07 | $0.14 | Chinese content, cheap tasks |
| **DeepSeek** | $0.14 | $0.28 | Code, debugging, refactoring |
| **GPT-4** | $2.50 | $10.00 | General tasks |
| **Claude** | $3.00 | $15.00 | Complex reasoning, architecture |

**Use expensive models when you need them. Use cheap models when you don't.**

---

## 📋 Supported Providers

### 🥇 Recommended: SkillBoss
One API key for everything
```bash
cc ask -m anthropic/claude-3.7-sonnet "..."
cc ask -m openai/gpt-5 "..."
cc ask -m deepseek/deepseek-r1 "..."
```

### 🇺🇸 US Providers
- **OpenAI** - GPT-4, GPT-5
- **Anthropic** - Claude 3.5 Sonnet, Haiku, Opus
- **OpenRouter** - Multi-model aggregator
- **AWS Bedrock** - Enterprise cloud
- **Google Gemini** - Gemini 2.0 Flash, 1.5 Pro

### 🇨🇳 Chinese Providers
- **DeepSeek** - DeepSeek R1, Coder (Very cheap!)
- **Kimi (月之暗面)** - Moonshot 8K/32K/128K
- **Zhipu GLM (智谱)** - GLM-4, GLM-4-Flash
- **Baidu Ernie (百度文心)** - Ernie 4.0, 3.5
- **Qwen (通义千问)** - Qwen Max, Plus, Turbo
- And 7 more...

**Total: 18 providers, 100+ models**

---

## ⚡ Usage

### 3 Ways to Run (All Work!)
```bash
cheapercc    # Full command
cheaper      # Short version
cc           # Shortest! (2 characters)
```

### Core Commands
```bash
cc setup              # Configure API keys
cc ask "question"     # Quick question
cc                    # Interactive chat
cc models             # List all models
cc config             # Manage configuration
cc test               # Test connections
cc info               # Show version & config
```

### Advanced Usage
```bash
# Use specific provider
cc chat -p openai -m gpt-4

# Use specific model
cc chat -m deepseek/deepseek-r1

# Custom system prompt
cc chat -s "You are a helpful coding assistant"
```

---

## 🔧 Configuration

Config file location: `~/.config/cheapercc-nodejs/config.json`

**Auto-Detection**: Finds API keys in:
- Environment variables (`SKILLBOSS_API_KEY`, `OPENAI_API_KEY`, etc.)
- Config files (`~/.config/skillboss/api-key`, etc.)

---

## 🎨 Features

✅ **Auto-Detection** - Finds API keys automatically
✅ **Multi-Provider** - Select multiple providers with checkboxes
✅ **Connection Testing** - Tests each provider before saving
✅ **Beautiful CLI** - Colorful, easy-to-use interface
✅ **Markdown Support** - Renders markdown in terminal
✅ **Error Handling** - Clear, helpful error messages
✅ **Multi-Language** - Works with English and Chinese

---

## 📦 Installation

### Method 1: Install from GitHub (Recommended - No npm needed!)
```bash
# Clone the repo
git clone https://github.com/xq002011-cpu/cheapercc.git
cd cheapercc

# Install dependencies
npm install

# Link globally (makes cc command available everywhere)
npm link

# Setup
cc setup
```

### Method 2: Install from npm (Coming soon)
```bash
npm install -g cheapercc
cc setup
```

That's it! Now you can use `cc`, `cheaper`, or `cheapercc` from anywhere.

---

## 🔗 Links

- **SkillBoss Platform**: https://skillboss.co
- **Get API Key**: https://skillboss.co/console
- **Documentation**: https://skillboss.co/docs
- **NPM Package**: https://www.npmjs.com/package/cheapercc

---

## 📋 Takedown Policy

If you believe this project infringes any copyright or trademark, please contact us at **dev@skillboss.co** or open an issue on GitHub. We will respond promptly.

### Contact

- **Email**: dev@skillboss.co
- **GitHub Issues**: https://github.com/SkillBoss-AI/cheapercc/issues

---

## 📝 License

MIT License - Open source and free to use

---

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

**Built with ❤️ by the open-source community**

**Powered by SkillBoss - making AI accessible and affordable for everyone**

---

**TL;DR**: CheaperCC is an open-source multi-LLM CLI. Switch between 100+ models (Kimi, DeepSeek, GPT, Claude, Gemini), save 95% on costs, zero vendor lock-in. Powered by SkillBoss.
