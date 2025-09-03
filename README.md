# SVG 图标服务

一个基于 Express 的动态 SVG 图标服务，支持实时生成和自定义图标样式。

## 功能特性

- 🎨 内置 10+ 常用图标
- 🔧 支持动态参数：颜色、大小、填充样式、描边宽度等
- 🚀 高性能 SVG 生成
- 💾 智能缓存支持
- 🌐 CORS 支持，可在前端直接使用

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务将在 `http://localhost:3000` 启动

## API 接口

### 获取图标

```
GET /icon?icon={iconName}&color={color}&size={size}&filled={filled}&strokeWidth={strokeWidth}
```

#### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | string | 必需 | 图标名称 |
| `color` | string | `#000000` | 图标颜色（支持 hex、颜色名称） |
| `size` | number | `24` | 图标尺寸（像素） |
| `filled` | boolean | `false` | 是否填充样式 |
| `strokeWidth` | number | `2` | 描边宽度 |
| `strokeLinecap` | string | `round` | 描边端点样式 |
| `strokeLinejoin` | string | `round` | 描边连接样式 |

#### 使用示例

```bash
# 基础用法
curl "http://localhost:3000/icon?icon=home"

# 自定义颜色和大小
curl "http://localhost:3000/icon?icon=home&color=%23ff5722&size=32"

# 描边样式
curl "http://localhost:3000/icon?icon=user&filled=false&strokeWidth=1&color=blue"

# 填充样式
curl "http://localhost:3000/icon?icon=heart&filled=true&color=red&size=48"
```

### 获取可用图标列表

```
GET /icons
```

返回所有可用的图标名称和路径信息。

### 健康检查

```
GET /health
```

检查服务状态。

## 内置图标

- `home` - 首页图标
- `user` - 用户图标
- `search` - 搜索图标
- `heart` - 心形图标
- `star` - 星形图标
- `settings` - 设置图标
- `arrow` - 箭头图标
- `close` - 关闭图标
- `menu` - 菜单图标
- `download` - 下载图标

## 前端使用示例

### HTML 直接使用

```html
<!-- 基础用法 -->
<img src="http://localhost:3000/icon?icon=home" alt="首页">

<!-- 自定义样式 -->
<img src="http://localhost:3000/icon?icon=heart&color=red&size=32&filled=true" alt="心形">
```

### JavaScript 动态生成

```javascript
function getIcon(iconName, options = {}) {
  const params = new URLSearchParams({
    icon: iconName,
    ...options
  });
  
  return `http://localhost:3000/icon?${params.toString()}`;
}

// 使用示例
const iconUrl = getIcon('home', {
  color: '#ff5722',
  size: 32,
  filled: true
});

const img = document.createElement('img');
img.src = iconUrl;
document.body.appendChild(img);
```

### React 组件

```jsx
import React from 'react';

const Icon = ({ name, color = '#000', size = 24, filled = false, ...props }) => {
  const params = new URLSearchParams({
    icon: name,
    color,
    size: size.toString(),
    filled: filled.toString()
  });
  
  return (
    <img 
      src={`http://localhost:3000/icon?${params}`}
      alt={name}
      width={size}
      height={size}
      {...props}
    />
  );
};

// 使用示例
<Icon name="home" color="#ff5722" size={32} />
<Icon name="heart" color="red" filled={true} size={48} />
```

## 部署说明

### 环境变量

- `PORT` - 服务端口（默认：3000）

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 扩展图标库

可以通过修改 `server.js` 中的 `iconLibrary` 对象来添加更多图标：

```javascript
const iconLibrary = {
  // 现有图标...
  newIcon: {
    path: "M...", // SVG 路径数据
    viewBox: "0 0 24 24" // 视图框
  }
};
```

## 许可证

MIT
