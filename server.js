const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 静态文件服务
app.use(express.static('public'));

// 内置图标库
const iconLibrary = {
  home: {
    path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    viewBox: "0 0 24 24"
  },
  user: {
    path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    viewBox: "0 0 24 24"
  },
  search: {
    path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    viewBox: "0 0 24 24"
  },
  heart: {
    path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    viewBox: "0 0 24 24"
  },
  star: {
    path: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    viewBox: "0 0 24 24"
  },
  settings: {
    path: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    viewBox: "0 0 24 24"
  },
  arrow: {
    path: "M13 7l5 5m0 0l-5 5m5-5H6",
    viewBox: "0 0 24 24"
  },
  close: {
    path: "M6 18L18 6M6 6l12 12",
    viewBox: "0 0 24 24"
  },
  menu: {
    path: "M4 6h16M4 12h16M4 18h16",
    viewBox: "0 0 24 24"
  },
  download: {
    path: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
    viewBox: "0 0 24 24"
  }
};

// 生成 SVG 图标的函数
function generateSVG(iconName, options = {}) {
  const icon = iconLibrary[iconName];
  if (!icon) {
    return null;
  }

  const {
    size = 24,
    color = '#000000',
    filled = false,
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round'
  } = options;

  const fill = filled ? color : 'none';
  const stroke = filled ? 'none' : color;

  return `<svg width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${icon.path}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}"/>
</svg>`;
}

// 图标路由
app.get('/icon', (req, res) => {
  const { icon, size, color, filled, strokeWidth, strokeLinecap, strokeLinejoin } = req.query;
  
  if (!icon) {
    return res.status(400).json({ error: '缺少 icon 参数' });
  }

  if (!iconLibrary[icon]) {
    return res.status(404).json({ error: `图标 '${icon}' 不存在` });
  }

  const options = {
    size: size ? parseInt(size) : 24,
    color: color || '#000000',
    filled: filled === 'true',
    strokeWidth: strokeWidth ? parseFloat(strokeWidth) : 2,
    strokeLinecap: strokeLinecap || 'round',
    strokeLinejoin: strokeLinejoin || 'round'
  };

  const svg = generateSVG(icon, options);
  
  if (!svg) {
    return res.status(500).json({ error: '生成 SVG 失败' });
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 缓存1小时
  res.send(svg);
});

// 获取可用图标列表
app.get('/icons', (req, res) => {
  const icons = Object.keys(iconLibrary).map(name => ({
    name,
    path: iconLibrary[name].path,
    viewBox: iconLibrary[name].viewBox
  }));
  
  res.json({
    count: icons.length,
    icons
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    message: 'SVG 图标服务',
    version: '1.0.0',
    endpoints: {
      '/icon': '获取图标 (GET /icon?icon=home&color=%23ff5722&size=32)',
      '/icons': '获取可用图标列表',
      '/health': '健康检查'
    },
    examples: [
      'http://localhost:3000/icon?icon=home&color=%23ff5722&size=32',
      'http://localhost:3000/icon?icon=user&filled=false&strokeWidth=1&color=blue'
    ]
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

app.listen(PORT, () => {
  console.log(`🚀 SVG 图标服务已启动在 http://localhost:${PORT}`);
  console.log(`📖 访问 http://localhost:${PORT} 查看使用说明`);
  console.log(`🎨 可用图标: ${Object.keys(iconLibrary).join(', ')}`);
});
