# 网站自定义指南

本指南包含如何修改字体、图片、视频尺寸以及使用本地资源的方法。

## 目录

1. [字体自定义](#字体自定义)
2. [图片尺寸调整](#图片尺寸调整)
3. [视频尺寸调整](#视频尺寸调整)
4. [使用本地字体资源](#使用本地字体资源)
5. [使用本地图片资源](#使用本地图片资源)
6. [使用本地视频资源](#使用本地视频资源)

---

## 字体自定义

### 修改字体大小

在 `styles.css` 文件中找到对应的元素，修改 `font-size` 属性。

**示例：修改项目标题字体大小**

```css
/* styles.css 第141行 */
.project-info h3 {
    font-size: 1.5rem;  /* 修改这个值 */
    margin-bottom: 0.5rem;
}
```

**常用字体大小参考：**
- `0.8rem` - 小字
- `1rem` - 正常（16px）
- `1.5rem` - 较大（24px）
- `2rem` - 大标题（32px）
- `3rem` - 超大标题（48px）

### 修改字体类型

**方法1：使用Google Fonts（当前方式）**

在 `styles.css` 文件顶部修改：

```css
/* 导入其他字体 */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
    font-family: 'Roboto', sans-serif;
}
```

**方法2：使用系统字体**

```css
body {
    font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}
```

**常用中文字体：**
- `'Microsoft YaHei'` - 微软雅黑
- `'PingFang SC'` - 苹方
- `'Noto Sans SC'` - 思源黑体

---

## 图片尺寸调整

### 修改项目卡片缩略图尺寸

在 `styles.css` 中找到 `.project-thumbnail`：

```css
/* styles.css 第115行 */
.project-thumbnail {
    width: 356px;      /* 修改宽度 */
    height: 200px;     /* 修改高度 */
    overflow: hidden;
    flex-shrink: 0;
}
```

**常用尺寸参考：**
- 16:9 比例：356x200px、400x225px、480x270px
- 4:3 比例：300x225px、400x300px
- 1:1 比例：200x200px、300x300px

### 修改项目详情页截图尺寸

```css
/* styles.css 第185行 */
.project-images img {
    width: 100%;
    height: 300px;     /* 修改高度 */
    object-fit: cover;
    border-radius: 8px;
}
```

### 修改标签图片尺寸

```css
/* styles.css 第156行 */
.project-tag img {
    height: 30px;      /* 修改高度，宽度自适应 */
    object-fit: contain;
}
```

### 修改封面背景图尺寸

封面背景图会自动填满整个屏幕，但可以通过CSS调整显示方式：

```css
/* styles.css 第68行 */
.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;     /* cover: 填满裁剪 | contain: 完整显示 */
    position: absolute;
    top: 0;
    left: 0;
}
```

---

## 视频尺寸调整

### 修改项目详情页视频尺寸

在 `project1.html`、`project2.html` 等文件中修改：

```html
<!-- 修改 width 和 height -->
<div class="video-container">
    <iframe 
        width="100%" 
        height="450"      <!-- 修改高度 -->
        src="https://www.youtube.com/embed/..." 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
```

**常用视频比例：**
- 16:9：高度 = 宽度 × 0.5625
- 4:3：高度 = 宽度 × 0.75

### 修改视频容器样式

```css
/* styles.css 第175行 */
.video-container {
    margin-bottom: 3rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;      /* 添加最大宽度限制 */
    margin-left: auto;
    margin-right: auto;
}
```

---

## 使用本地字体资源

### 步骤1：准备字体文件

将字体文件放入项目文件夹，建议创建 `fonts` 文件夹：

```
Simone_Game/
├── fonts/
│   ├── custom-font.woff2
│   └── custom-font.woff
└── ...
```

### 步骤2：在CSS中引入本地字体

```css
/* styles.css 顶部添加 */
@font-face {
    font-family: 'CustomFont';
    src: url('fonts/custom-font.woff2') format('woff2'),
         url('fonts/custom-font.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/* 使用字体 */
body {
    font-family: 'CustomFont', sans-serif;
}
```

### 步骤3：删除Google Fonts导入（可选）

如果不再使用Google Fonts，删除这一行：

```css
/* 删除这一行 */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
```

---

## 使用本地图片资源

### 目录结构

```
Simone_Game/
├── images/
│   ├── Background.jpg          # 封面背景图
│   ├── project1-thumb.jpg      # 项目1缩略图
│   ├── project2-thumb.jpg      # 项目2缩略图
│   ├── project3-thumb.jpg      # 项目3缩略图
│   ├── project4-thumb.jpg      # 项目4缩略图
│   ├── tag1.png                # 项目1标签
│   ├── tag2.png                # 项目2标签
│   ├── tag3.png                # 项目3标签
│   ├── tag4.png                # 项目4标签
│   ├── project1-1.jpg          # 项目1截图1
│   ├── project1-2.jpg          # 项目1截图2
│   ├── project2-1.jpg          # 项目2截图1
│   ├── project2-2.jpg          # 项目2截图2
│   ├── project3-1.jpg          # 项目3截图1
│   ├── project3-2.jpg          # 项目3截图2
│   ├── project4-1.jpg          # 项目4截图1
│   └── project4-2.jpg          # 项目4截图2
└── ...
```

### 图片格式建议

| 图片类型 | 推荐格式 | 建议尺寸 | 文件大小 |
|---------|---------|---------|---------|
| 封面背景图 | JPG/PNG | 1920x1080 | < 500KB |
| 项目缩略图 | JPG/PNG | 356x200 (16:9) | < 200KB |
| 项目截图 | JPG/PNG | 1280x720 | < 300KB |
| 标签图片 | PNG | 高度30px，宽度自适应 | < 50KB |

### 替换图片步骤

1. 将图片文件放入 `images` 文件夹
2. 确保文件名与HTML中引用的文件名一致
3. 刷新浏览器查看效果

---

## 使用本地视频资源

### 步骤1：准备视频文件

创建 `videos` 文件夹：

```
Simone_Game/
├── videos/
│   ├── project1-video.mp4
│   ├── project2-video.mp4
│   └── ...
└── ...
```

### 步骤2：修改HTML使用本地视频

**替换前的YouTube嵌入代码：**

```html
<div class="video-container">
    <iframe 
        width="100%" 
        height="450"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
```

**替换后的本地视频代码：**

```html
<div class="video-container">
    <video width="100%" height="450" controls>
        <source src="videos/project1-video.mp4" type="video/mp4">
        您的浏览器不支持视频播放。
    </video>
</div>
```

### 视频格式建议

| 格式 | 兼容性 | 推荐度 |
|-----|-------|-------|
| MP4 (H.264) | 所有浏览器 | ⭐⭐⭐⭐⭐ |
| WebM | 现代浏览器 | ⭐⭐⭐⭐ |
| OGG | Firefox/Chrome | ⭐⭐⭐ |

**提供多格式支持（最佳实践）：**

```html
<video width="100%" height="450" controls>
    <source src="videos/project1-video.mp4" type="video/mp4">
    <source src="videos/project1-video.webm" type="video/webm">
    <source src="videos/project1-video.ogv" type="video/ogg">
    您的浏览器不支持视频播放。
</video>
```

### 视频属性说明

```html
<video 
    width="100%"           <!-- 宽度 -->
    height="450"           <!-- 高度 -->
    controls               <!-- 显示播放控件 -->
    autoplay               <!-- 自动播放（可选） -->
    muted                  <!-- 静音（可选） -->
    loop                   <!-- 循环播放（可选） -->
    poster="thumbnail.jpg" <!-- 封面图（可选） -->
>
```

---

## 快速检查清单

### 修改字体
- [ ] 确定字体来源（Google Fonts / 本地 / 系统字体）
- [ ] 修改 `styles.css` 中的 `font-family`
- [ ] 调整 `font-size` 到合适大小
- [ ] 测试不同设备的显示效果

### 修改图片
- [ ] 准备合适尺寸的图片
- [ ] 放入 `images` 文件夹
- [ ] 确保文件名正确
- [ ] 调整CSS中的尺寸（如需要）

### 修改视频
- [ ] 准备视频文件（推荐MP4格式）
- [ ] 放入 `videos` 文件夹
- [ ] 修改HTML中的视频代码
- [ ] 测试播放功能

---

## 常见问题

**Q: 图片显示不出来怎么办？**
A: 检查：1) 文件名是否正确 2) 文件是否在images文件夹 3) 文件格式是否正确

**Q: 字体加载很慢怎么办？**
A: 使用本地字体或系统字体，避免网络加载

**Q: 视频无法播放怎么办？**
A: 检查：1) 视频格式是否为MP4 2) 文件路径是否正确 3) 文件是否损坏

**Q: 如何压缩图片/视频？**
A: 使用在线工具：
- 图片：[TinyPNG](https://tinypng.com/)、[Squoosh](https://squoosh.app/)
- 视频：[HandBrake](https://handbrake.fr/)、[FFmpeg](https://ffmpeg.org/)
