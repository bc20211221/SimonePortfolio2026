# 图片和视频替换指南

## 目录结构

已为您创建了 `images` 和 `videos` 文件夹，用于存放您的项目图片和视频。

```
Simone_Game/
├── images/                    # 存放所有图片
│   ├── Background.jpg          # 首页封面背景图
│   ├── project1-thumb.jpg      # 项目1缩略图
│   ├── project2-thumb.jpg      # 项目2缩略图
│   ├── project3-thumb.jpg      # 项目3缩略图
│   ├── project4-thumb.jpg      # 项目4缩略图
│   ├── tag1.png                # 项目1标签
│   ├── tag2.png                # 项目2标签
│   ├── tag3.png                # 项目3标签
│   ├── tag4.png                # 项目4标签
│   ├── project1-1.jpg         # 项目1截图1
│   ├── project1-2.jpg         # 项目1截图2
│   ├── project2-1.jpg         # 项目2截图1
│   ├── project2-2.jpg         # 项目2截图2
│   ├── project3-1.jpg         # 项目3截图1
│   ├── project3-2.jpg         # 项目3截图2
│   ├── project4-1.jpg         # 项目4截图1
│   └── project4-2.jpg         # 项目4截图2
├── videos/                    # 存放所有视频
│   ├── project1-video.mp4     # 项目1视频
│   ├── project2-video.mp4     # 项目2视频
│   ├── project3-video.mp4     # 项目3视频
│   ├── project4-video.mp4     # 项目4视频
│   └── project4-video-2.mp4  # 项目4第二个视频
└── ...
```

## 步骤1：准备图片

将您的图片文件放入 `images` 文件夹中，建议使用以下命名：

### 首页项目卡片缩略图（16:9比例）
- `Background.jpg` - 首页封面背景图
- `project1-thumb.jpg` - 方块冒险项目缩略图
- `project2-thumb.jpg` - 迷宫探索项目缩略图
- `project3-thumb.jpg` - 星际射击项目缩略图
- `project4-thumb.jpg` - 幻想之旅项目缩略图

### 项目标签图片（16:9比例）
- `tag1.png` - 项目1标签
- `tag2.png` - 项目2标签
- `tag3.png` - 项目3标签
- `tag4.png` - 项目4标签

### 关于我部分图片
- `avatar.png` - 个人头像（建议尺寸：200x200像素，圆形）

### 项目详情页截图（16:9比例）
- `project1-1.jpg` - 方块冒险截图1
- `project1-2.jpg` - 方块冒险截图2
- `project2-1.jpg` - 迷宫探索截图1
- `project2-2.jpg` - 迷宫探索截图2
- `project3-1.jpg` - 星际射击截图1
- `project3-2.jpg` - 星际射击截图2
- `project4-1.jpg` - 幻想之旅截图1
- `project4-2.jpg` - 幻想之旅截图2

## 步骤2：修改HTML文件中的图片路径

### 修改 index.html（首页）

找到并替换以下图片路径：

**封面背景图：**
```html
<!-- 原来 -->
<h1 class="pixel-title">游戏项目作品集</h1>
<p class="pixel-subtitle">GAME PORTFOLIO</p>

<!-- 替换为 -->
<img src="images/Background.jpg" alt="Background" class="hero-image">
```

**项目1缩略图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3D%20game%20scene%20with%20colorful%20blocks%20and%20platforms&image_size=landscape_16_9" alt="项目1">

<!-- 替换为 -->
<img src="images/project1-thumb.jpg" alt="方块冒险">
```

**项目2缩略图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20puzzle%20game%20with%20maze%20and%20collectible%20items&image_size=landscape_16_9" alt="项目2">

<!-- 替换为 -->
<img src="images/project2-thumb.jpg" alt="迷宫探索">
```

**项目3缩略图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20shooter%20game%20with%20spaceship%20and%20asteroids&image_size=landscape_16_9" alt="项目3">

<!-- 替换为 -->
<img src="images/project3-thumb.jpg" alt="星际射击">
```

**项目4缩略图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20RPG%20game%20with%20magic%20and%20swords&image_size=landscape_16_9" alt="项目4">

<!-- 替换为 -->
<img src="images/project4-thumb.jpg" alt="幻想之旅">
```

### 修改 project1.html（方块冒险）

**项目截图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3D%20game%20character%20jumping%20on%20blocks&image_size=landscape_16_9" alt="游戏截图1">
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3D%20game%20level%20with%20obstacles&image_size=landscape_16_9" alt="游戏截图2">

<!-- 替换为 -->
<img src="images/project1-1.jpg" alt="游戏截图1">
<img src="images/project1-2.jpg" alt="游戏截图2">
```

**导航缩略图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20puzzle%20game%20with%20maze%20and%20collectible%20items&image_size=landscape_16_9" alt="迷宫探索">

<!-- 替换为 -->
<img src="images/project2-thumb.jpg" alt="迷宫探索">
```

### 修改 project2.html（迷宫探索）

**项目截图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20maze%20game%20with%20collectible%20items&image_size=landscape_16_9" alt="游戏截图1">
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20game%20character%20in%20maze&image_size=landscape_16_9" alt="游戏截图2">

<!-- 替换为 -->
<img src="images/project2-1.jpg" alt="游戏截图1">
<img src="images/project2-2.jpg" alt="游戏截图2">
```

**导航缩略图：**
```html
<!-- 上一个项目 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3D%20game%20scene%20with%20colorful%20blocks%20and%20platforms&image_size=landscape_16_9" alt="方块冒险">
<!-- 替换为 -->
<img src="images/project1-thumb.jpg" alt="方块冒险">

<!-- 下一个项目 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20shooter%20game%20with%20spaceship%20and%20asteroids&image_size=landscape_16_9" alt="星际射击">
<!-- 替换为 -->
<img src="images/project3-thumb.jpg" alt="星际射击">
```

### 修改 project3.html（星际射击）

**项目截图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spaceship%20shooting%20lasers%20in%20space&image_size=landscape_16_9" alt="游戏截图1">
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epic%20space%20battle%20with%20asteroids&image_size=landscape_16_9" alt="游戏截图2">

<!-- 替换为 -->
<img src="images/project3-1.jpg" alt="游戏截图1">
<img src="images/project3-2.jpg" alt="游戏截图2">
```

**导航缩略图：**
```html
<!-- 上一个项目 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2D%20puzzle%20game%20with%20maze%20and%20collectible%20items&image_size=landscape_16_9" alt="迷宫探索">
<!-- 替换为 -->
<img src="images/project2-thumb.jpg" alt="迷宫探索">

<!-- 下一个项目 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20RPG%20game%20with%20magic%20and%20swords&image_size=landscape_16_9" alt="幻想之旅">
<!-- 替换为 -->
<img src="images/project4-thumb.jpg" alt="幻想之旅">
```

### 修改 project4.html（幻想之旅）

**项目截图：**
```html
<!-- 原来 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20castle%20with%20magic%20effects&image_size=landscape_16_9" alt="游戏截图1">
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hero%20character%20with%20sword%20and%20magic&image_size=landscape_16_9" alt="游戏截图2">

<!-- 替换为 -->
<img src="images/project4-1.jpg" alt="游戏截图1">
<img src="images/project4-2.jpg" alt="游戏截图2">
```

**导航缩略图：**
```html
<!-- 上一个项目 -->
<img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20shooter%20game%20with%20spaceship%20and%20asteroids&image_size=landscape_16_9" alt="星际射击">
<!-- 替换为 -->
<img src="images/project3-thumb.jpg" alt="星际射击">
```

## 图片格式建议

- **格式**：推荐使用 JPG、PNG 或 WebP 格式
- **尺寸**：
  - 封面背景图：建议 1920x1080 像素（16:9比例）
  - 缩略图：建议 356x200 像素（16:9比例）
  - 项目截图：建议 1280x720 像素（16:9比例）
  - 标签图片：高度30px，宽度自适应
- **文件大小**：建议单个图片不超过 500KB，以提高加载速度

## 视频替换指南

### 步骤1：准备视频文件

将您的视频文件放入 `videos` 文件夹中，建议使用以下命名：

- `project1-video.mp4` - 项目1视频
- `project2-video.mp4` - 项目2视频
- `project3-video.mp4` - 项目3视频
- `project4-video.mp4` - 项目4视频

### 步骤2：视频格式建议

| 格式 | 兼容性 | 推荐度 |
|-----|-------|-------|
| MP4 (H.264) | 所有浏览器 | ⭐⭐⭐⭐⭐ |
| WebM | 现代浏览器 | ⭐⭐⭐⭐ |
| OGG | Firefox/Chrome | ⭐⭐⭐ |

**推荐使用 MP4 格式**，兼容性最好。

### 步骤3：视频尺寸建议

- **分辨率**：建议 1280x720 (720p) 或 1920x1080 (1080p)
- **宽高比**：16:9
- **文件大小**：建议单个视频不超过 50MB

### 步骤4：视频已自动配置

所有项目详情页的视频代码已自动配置为使用本地视频：

```html
<div class="video-container">
    <video width="100%" height="450" controls>
        <source src="videos/project1-video.mp4" type="video/mp4">
        您的浏览器不支持视频播放。
    </video>
</div>
```

### 步骤5：替换视频

1. 将您的视频文件放入 `videos` 文件夹
2. 确保文件名与HTML中引用的文件名一致（如 `project1-video.mp4`）
3. 刷新浏览器查看效果

### 视频属性说明

您可以根据需要添加以下属性：

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

### 提供多格式支持（最佳实践）

如果需要更好的兼容性，可以提供多种格式：

```html
<video width="100%" height="450" controls>
    <source src="videos/project1-video.mp4" type="video/mp4">
    <source src="videos/project1-video.webm" type="video/webm">
    <source src="videos/project1-video.ogv" type="video/ogg">
    您的浏览器不支持视频播放。
</video>
```

### 视频压缩工具推荐

如果视频文件过大，可以使用以下工具压缩：

- **HandBrake**：https://handbrake.fr/ - 免费开源，功能强大
- **FFmpeg**：https://ffmpeg.org/ - 命令行工具，适合批量处理
- **Online Video Converter**：在线转换工具

## 快速替换方法

如果您使用支持查找和替换的编辑器（如 VS Code），可以：

1. 打开所有 HTML 文件
2. 使用 Ctrl+H 打开查找和替换
3. 查找：`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image`
4. 替换为：`images`
5. 然后手动调整每个图片的具体文件名

## 注意事项

- 确保图片和视频文件名与 HTML 中的引用完全一致（包括大小写）
- 如果图片或视频无法显示，请检查文件路径是否正确
- 建议使用相对路径（如 `images/xxx.jpg` 或 `videos/xxx.mp4`）而不是绝对路径
- 视频文件较大时，建议先压缩再上传