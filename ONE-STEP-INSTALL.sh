#!/bin/bash
# CCBoss One-Step Install & Test

echo "🚀 Installing CCBoss..."
cd ~/CC/ccboss
npm install --silent > /dev/null 2>&1
npm link > /dev/null 2>&1

echo "✅ CCBoss installed!"
echo ""
echo "📝 To use CCBoss, you need an API key from one of these:"
echo ""
echo "Option 1: SkillBoss (100+ models, 1 key) → https://skillboss.co/console"
echo "Option 2: Kimi (Free, Chinese) → https://platform.moonshot.cn"
echo "Option 3: OpenAI (GPT-4/5) → https://platform.openai.com"
echo ""
echo "Then run: cb setup"
echo ""
echo "Commands:"
echo "  cb                    # Start chat"
echo "  cb ask 'question'     # Quick question"
echo "  cb setup              # Configure"
echo ""
