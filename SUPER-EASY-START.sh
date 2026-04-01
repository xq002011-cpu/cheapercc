#!/bin/bash
# CCBoss Super Easy Start - Everything in One Command

echo "🚀 Setting up CCBoss..."

# 1. Install dependencies (silent)
cd ~/CC/ccboss
npm install --silent > /dev/null 2>&1
npm link > /dev/null 2>&1

# 2. Auto-configure with your existing SkillBoss API key
API_KEY=$(cat ~/.config/skillboss/api-key 2>/dev/null)

if [ -n "$API_KEY" ]; then
  mkdir -p ~/Library/Preferences/ccboss-nodejs
  cat > ~/Library/Preferences/ccboss-nodejs/config.json << EOF
{
  "defaultProvider": "skillboss",
  "defaultModel": "openai/gpt-4.1-mini",
  "apiKeys": {
    "SKILLBOSS_API_KEY": "$API_KEY"
  }
}
EOF
  echo "✅ CCBoss configured with your SkillBoss API key!"
else
  echo "⚠️  No SkillBoss API key found at ~/.config/skillboss/api-key"
  echo "Get one at: https://skillboss.co/console"
  echo "Then run: cb setup"
fi

echo ""
echo "🎉 Done! Try these commands:"
echo ""
echo "  cb ask \"Hello, who are you?\""
echo "  cb ask \"解释量子计算\""
echo "  cb                           # Interactive chat"
echo ""
echo "All shortcuts work: cb, ccb, ccboss, boss"
