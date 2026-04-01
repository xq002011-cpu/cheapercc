#!/bin/bash
# CCBoss Zero-Step Setup - Completely Automatic

clear
echo "🤖 CCBoss Auto Setup..."
echo ""

cd ~/CC/ccboss

# Install silently
npm install --silent > /dev/null 2>&1
npm link > /dev/null 2>&1

# Auto-detect API key
API_KEY=$(cat ~/.config/skillboss/api-key 2>/dev/null)

if [ -z "$API_KEY" ]; then
  # Try other locations
  API_KEY=$(grep SKILLBOSS_API_KEY ~/.zshrc ~/.bashrc 2>/dev/null | head -1 | cut -d'"' -f2)
fi

if [ -n "$API_KEY" ]; then
  # Auto-configure
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

  echo "✅ Done! Testing..."
  echo ""

  # Test it works
  cb ask "say hi" 2>/dev/null

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🎉 CCBoss is ready!"
  echo ""
  echo "Try: cb ask \"你好\""
  echo "Or:  cb              (interactive chat)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "❌ No API key found."
  echo ""
  echo "Get one at: https://skillboss.co/console"
  echo "Then paste it:"
  read -p "API Key: " USER_KEY

  mkdir -p ~/Library/Preferences/ccboss-nodejs
  cat > ~/Library/Preferences/ccboss-nodejs/config.json << EOF
{
  "defaultProvider": "skillboss",
  "defaultModel": "openai/gpt-4.1-mini",
  "apiKeys": {
    "SKILLBOSS_API_KEY": "$USER_KEY"
  }
}
EOF

  echo ""
  echo "✅ Configured! Testing..."
  cb ask "say hi"

  echo ""
  echo "🎉 Done! Try: cb"
fi
