---
layout: post.njk
title: 11ty博客教程01：项目初始化和基础概念
date: 2025-08-09
description: 了解 11ty 静态站点生成器的基本概念，并学习如何初始化一个新的博客项目
permalink: "/posts/11ty-tutorial-01/"
---

在开始构建我们的博客之前，让我们先了解一下 11ty（Eleventy）是什么，以及为什么选择它作为我们的静态站点生成器。

## 什么是 11ty？

11ty 是一个简单但功能强大的静态站点生成器。它的特点包括：

- 零配置开箱即用
- 支持多种模板语言（我们使用 Nunjucks）
- 数据级联系统
- 快速构建速度
- 灵活的目录结构

## 项目初始化

首先，我们需要创建一个新项目并安装必要的依赖：

```bash
# 创建项目目录
mkdir my-11ty-blog
cd my-11ty-blog

# 初始化 npm 项目
npm init -y

# 安装 11ty
npm install @11ty/eleventy --save-dev
```

## 基础目录结构

11ty 推荐的目录结构如下：

```
.
├── src/                    # 源文件目录
│   ├── _includes/         # 可重用的模板片段
│   ├── _layouts/          # 页面布局模板
│   ├── assets/           # 静态资源
│   │   └── styles/      # 样式文件
│   └── posts/            # 博客文章
└── .eleventy.js          # 11ty 配置文件
```

## 重要概念解释

### 1. 模板引擎

我们的项目使用 Nunjucks 作为模板引擎。它提供了强大的模板继承和包含功能。示例：

```nunjucks
{% raw %}
{% extends "base.njk" %}

{% block content %}
  <h1>{{ title }}</h1>
{% endblock %}
{% endraw %}
```

### 2. Front Matter

每个页面或文章都可以包含 YAML 格式的 Front Matter，用于定义页面的元数据：

```yaml
---
title: 文章标题
date: 2025-08-09
layout: post.njk
---
```

### 3. 布局（Layouts）

布局文件定义了页面的基本结构，位于 `_layouts` 目录。我们可以在 Front Matter 中指定使用哪个布局。

## 下一步

在下一篇文章中，我们将详细介绍如何配置 11ty，包括：
- 创建基础配置文件
- 设置数据文件
- 配置静态资源处理

记住：11ty 的理念是"简单优于复杂"。它提供了合理的默认配置，同时保持了高度的可定制性。
