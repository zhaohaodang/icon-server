# 🚀 快速开始指南

## 一键启动

```bash
# 克隆项目后，直接运行启动脚本
./start.sh
```

## 手动启动

```bash
# 1. 安装依赖
npm install

# 2. 启动服务
npm start
```

## 🎯 立即体验

服务启动后，访问以下链接：

- **主页**: http://localhost:3000
- **演示页面**: http://localhost:3000 (自动显示)
- **健康检查**: http://localhost:3000/health

## 🎨 图标示例

### 基础用法
```
http://localhost:3000/icon?icon=home
```

### 自定义样式
```
http://localhost:3000/icon?icon=home&color=%23ff5722&size=32
http://localhost:3000/icon?icon=user&filled=false&strokeWidth=1&color=blue
```

### 填充样式
```
http://localhost:3000/icon?icon=heart&filled=true&color=red&size=48
```

## 📱 前端集成

### HTML 直接使用
```html
<img src="http://localhost:3000/icon?icon=home&color=blue&size=32" alt="首页">
```

### JavaScript 动态生成
```javascript
function getIcon(name, options = {}) {
  const params = new URLSearchParams({
    icon: name,
    ...options
  });
  return `http://localhost:3000/icon?${params}`;
}

// 使用
const iconUrl = getIcon('home', { color: '#ff5722', size: 32 });
```

## 🔧 可用参数

| 参数 | 说明 | 默认值 | 示例 |
|------|------|--------|------|
| `icon` | 图标名称 | 必需 | `home`, `user`, `heart` |
| `color` | 图标颜色 | `#000000` | `red`, `%23ff5722` |
| `size` | 图标尺寸 | `24` | `32`, `48`, `64` |
| `filled` | 是否填充 | `false` | `true`, `false` |
| `strokeWidth` | 描边宽度 | `2` | `1`, `3`, `5` |

## 🎯 内置图标

- `home` - 首页
- `user` - 用户
- `search` - 搜索
- `heart` - 心形
- `star` - 星形
- `settings` - 设置
- `arrow` - 箭头
- `close` - 关闭
- `menu` - 菜单
- `download` - 下载

## 🚨 常见问题

### 端口被占用
```bash
# 修改端口
PORT=3001 npm start
```

### 图标不显示
- 检查图标名称是否正确
- 确认服务是否启动
- 查看浏览器控制台错误

### 性能优化
- 服务已内置缓存（1小时）
- 建议在生产环境使用 CDN
- 可配置反向代理缓存

## 📚 更多信息

查看 [README.md](./README.md) 获取完整文档。
