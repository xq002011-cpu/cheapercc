#!/bin/bash

# CCBoss 安装测试脚本

echo "🧪 CCBoss 安装测试"
echo "==================="
echo ""

# 检查 Node.js
echo "1️⃣ 检查 Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js: $(node --version)"
else
    echo "   ❌ 未安装 Node.js"
    exit 1
fi

# 检查 npm
echo "2️⃣ 检查 npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm: $(npm --version)"
else
    echo "   ❌ 未安装 npm"
    exit 1
fi

# 安装依赖
echo "3️⃣ 安装依赖..."
npm install
if [ $? -eq 0 ]; then
    echo "   ✅ 依赖安装成功"
else
    echo "   ❌ 依赖安装失败"
    exit 1
fi

# Link 到全局
echo "4️⃣ Link 到全局..."
npm link 2>/dev/null || sudo npm link
if [ $? -eq 0 ]; then
    echo "   ✅ Link 成功"
else
    echo "   ❌ Link 失败"
    exit 1
fi

# 测试所有命令别名
echo "5️⃣ 测试命令别名..."

commands=("ccboss" "ccb" "cb" "boss")
for cmd in "${commands[@]}"; do
    if command -v $cmd &> /dev/null; then
        echo "   ✅ $cmd - 可用"
    else
        echo "   ❌ $cmd - 不可用"
        exit 1
    fi
done

# 测试版本命令
echo "6️⃣ 测试版本命令..."
version=$(ccboss --version 2>&1)
if [ $? -eq 0 ]; then
    echo "   ✅ 版本: $version"
else
    echo "   ❌ 版本命令失败"
fi

# 测试帮助命令
echo "7️⃣ 测试帮助命令..."
ccboss --help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ 帮助命令正常"
else
    echo "   ❌ 帮助命令失败"
fi

echo ""
echo "✅ 所有测试通过！"
echo ""
echo "🎉 CCBoss 已成功安装！"
echo ""
echo "下一步："
echo "   1. 运行 'ccboss setup' 或 'ccb setup' 配置 API keys"
echo "   2. 运行 'ccboss' 或 'ccb' 或 'cb' 开始对话"
echo ""
echo "快捷命令："
echo "   ccboss  - 完整命令"
echo "   ccb     - 短命令（推荐）"
echo "   cb      - 超短命令"
echo "   boss    - 酷炫命令"
echo ""
