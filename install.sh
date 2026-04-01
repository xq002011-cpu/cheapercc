#!/bin/bash

# CCBoss 一键安装脚本

set -e

echo "🚀 CCBoss 安装脚本"
echo "=================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 需要 Node.js (>= 18.0.0)"
    echo "   请先安装 Node.js: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 需要 npm"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"
echo ""

# 进入项目目录
cd ~/CC/ccboss

# 安装依赖
echo "📦 安装依赖..."
npm install

# Link 到全局
echo "🔗 Link 到全局..."
if npm link 2>/dev/null; then
    echo "✅ Link 成功"
else
    echo "⚠️  需要 sudo 权限"
    sudo npm link
fi

echo ""
echo "✅ 安装完成！"
echo ""
echo "🎉 下一步："
echo "   1. 运行 'ccboss setup' 配置 API keys"
echo "   2. 运行 'ccboss' 开始对话"
echo ""
echo "📚 更多信息："
echo "   - README.md - 完整文档"
echo "   - QUICK_START.md - 快速开始"
echo ""
