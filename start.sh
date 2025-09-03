#!/bin/bash

echo "🚀 启动 SVG 图标服务..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动服务
echo "🌟 服务启动中..."
echo "📖 访问 http://localhost:3000 查看使用说明"
echo "🎨 访问 http://localhost:3000/icon?icon=home&color=%23ff5722&size=32 查看示例"
echo "🔄 按 Ctrl+C 停止服务"
echo ""

npm start
