# 游戏项目作品集

这是一个静态网页作品集，展示了游戏开发项目。

## 如何运行

### 方法1：使用浏览器直接打开

1. 找到 `index.html` 文件
2. 双击打开，浏览器会直接加载页面

### 方法2：使用本地服务器（推荐）

由于浏览器的安全限制，直接打开HTML文件可能会导致某些功能无法正常工作。推荐使用本地服务器运行：

#### 使用Node.js（推荐）
```bash
# 方法1：使用内置服务器
node server.js

# 方法2：使用http-server
npm install -g http-server
http-server
```

#### 使用Python（如果已安装）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用PHP（如果已安装）
```bash
php -S localhost:8000
```

启动服务器后，在浏览器中访问 `http://localhost:8000` 即可查看网站。

## 项目结构

- `index.html` - 首页，展示项目列表
- `project1.html` - 方块冒险项目详情
- `project2.html` - 迷宫探索项目详情
- `project3.html` - 星际射击项目详情
- `project4.html` - 幻想之旅项目详情
- `styles.css` - 样式文件
- `script.js` - JavaScript文件
- `server.js` - Node.js服务器文件

## 功能特点

- 响应式设计，适配不同屏幕尺寸
- 项目卡片悬停效果
- 像素字体风格的封面
- 项目详情页的视频播放
- 项目间的导航功能