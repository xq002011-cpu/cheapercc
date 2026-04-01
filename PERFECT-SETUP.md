# CCBoss - Perfect Setup for All Providers

## 🎯 One Command Setup - Auto-Detects Everything!

```bash
cb setup
```

**That's it!** CCBoss auto-detects API keys from:
- `~/.config/skillboss/api-key`
- Environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.)
- AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

## 📋 What You'll See:

```
🚀 CCBoss Quick Setup

✓ Found 2 API keys automatically!

Choose providers to configure:

◯ ⭐ SkillBoss (100+ models, 1 key) ✓ detected
◯ OpenAI (GPT-4, GPT-5)
◯ Anthropic (Claude) ✓ detected
◯ Kimi (月之暗面, Free)
◯ DeepSeek (R1, Cheap)
◯ AWS Bedrock (Enterprise)

Select providers (Space to select, Enter to continue):
```

**Just press Enter!** It uses what it detected.

Or **uncheck/check** others you want.

## 🔑 Supported Providers (6 Top Ones):

| Provider | Models | Why Use It |
|----------|--------|------------|
| **⭐ SkillBoss** | 100+ models | One API key for everything! |
| **OpenAI** | GPT-4, GPT-5 | Latest OpenAI models |
| **Anthropic** | Claude 3.5 Sonnet | Best reasoning |
| **Kimi** | Moonshot 128K | Free, long context |
| **DeepSeek** | R1, Coder | Cheap, great code |
| **AWS Bedrock** | Claude, Llama | Enterprise, secure |

## 💡 Example Flows:

### Flow 1: Already Have SkillBoss
```bash
cb setup
# ✓ Found 1 API key automatically!
# [Press Enter]
# Testing SkillBoss... ✓
# ✅ Setup Complete!
# ? Start chatting now? (Y/n) y
```

**Done in 5 seconds!**

### Flow 2: Have Multiple Providers
```bash
cb setup
# ✓ Found 3 API keys automatically!
# ☑ SkillBoss ✓ detected
# ☑ OpenAI ✓ detected
# ☑ Anthropic ✓ detected
# ☐ Kimi
# ☐ DeepSeek
# ☐ AWS Bedrock
# [Press Enter]
# Testing all... ✓✓✓
# Choose default provider: (Use arrows)
#   ❯ SkillBoss (recommended)
#     OpenAI
#     Anthropic
```

**Pick your favorite, done!**

### Flow 3: No API Keys Yet
```bash
cb setup
# Choose providers to configure:
# [Check SkillBoss]
# [Press Enter]
#
# 📝 SkillBoss API
#    Get key: https://skillboss.co/console
#
# SkillBoss API API key: [paste here]
# Testing SkillBoss... ✓
# ✅ Setup Complete!
```

**Still super easy!**

## 🔐 Where to Get API Keys:

| Provider | Get Key Here | Cost |
|----------|--------------|------|
| SkillBoss | https://skillboss.co/console | Pay-as-you-go |
| OpenAI | https://platform.openai.com/api-keys | Pay-as-you-go |
| Anthropic | https://console.anthropic.com/settings/keys | Pay-as-you-go |
| Kimi | https://platform.moonshot.cn/console/api-keys | **Free tier!** |
| DeepSeek | https://platform.deepseek.com/api_keys | Very cheap |
| AWS Bedrock | https://console.aws.amazon.com/iam | Enterprise |

## 🎨 Advanced Setup (15+ Providers):

Want ALL providers (Kimi, 智谱, 通义, 豆包, 混元, etc.)?

```bash
cb setup --advanced
```

This shows the full wizard with:
- 15+ providers
- Region selection (China vs International)
- Full configuration options
- Model selection

## 🚀 After Setup:

```bash
cb ask "Hello!"                    # Quick question
cb ask "解释量子计算"               # Chinese works!
cb                                 # Interactive chat
cb chat -p openai -m gpt-5         # Use specific model
cb models                          # List all models
```

## ⚡ All Shortcuts Work:

```bash
cb                    # 2 characters (fastest!)
ccb                   # 3 characters
ccboss                # Full command
boss                  # Cool name
```

---

## 🎯 Perfect Setup Summary:

1. Run `cb setup`
2. Auto-detects your keys
3. Press Enter (or check what you want)
4. Tests connections
5. Done!

**Literally 3 steps, 10 seconds, works perfectly.** 🎉

---

**Want to change providers later?**

```bash
cb setup              # Run again, add/remove providers
```

**Want to see config?**

```bash
cb config             # View current settings
```

**That's everything!** CCBoss now supports all major providers with perfect auto-detection. 🚀
