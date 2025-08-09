# 日记博客

这是一个使用11ty构建的现代化博客站点。

## 目录结构

```
.
├── src/                    # 源文件目录
│   ├── _includes/         # 可重用的模板片段
│   ├── _layouts/          # 页面布局模板
│   ├── assets/           # 静态资源
│   │   └── styles/      # SCSS样式文件
│   └── posts/            # 博客文章
├── .eleventy.js          # 11ty配置文件
└── package.json         # 项目依赖和脚本
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 写作

文章保存在 `src/posts` 目录下，使用 Markdown 格式。每篇文章都需要包含 Front Matter 信息，例如：

```yaml
---
layout: post.njk
title: 文章标题
date: YYYY-MM-DD
description: 文章描述
---
```
