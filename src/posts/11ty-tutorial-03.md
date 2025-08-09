---
layout: post.njk
title: 11ty博客教程03：模板和布局系统
date: 2025-08-09
description: 掌握 11ty 的模板系统，学习如何创建灵活的页面布局和组件
permalink: "/posts/11ty-tutorial-03/"
---

在这篇教程中，我们将深入探讨 11ty 的模板系统，学习如何创建可复用的布局和组件。

## Nunjucks 模板基础

我们使用 Nunjucks 作为模板引擎，它提供了强大的模板继承和包含功能。

### 基础布局文件

首先看看我们的基础布局文件 `_layouts/base.njk`：

```nunjucks
{% raw %}
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - {{ site.title }}</title>
    <link rel="stylesheet" href="/assets/styles/main.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">首页</a>
            <a href="/posts">文章</a>
        </nav>
    </header>

    <main>
        {{ content | safe }}
    </main>

    <footer>
        <p>&copy; {{ site.year }} {{ site.title }}</p>
    </footer>
</body>
</html>
{% endraw %}
```

### 文章布局

文章布局 `_layouts/post.njk` 继承自基础布局：

```nunjucks
{% raw %}
---
layout: base.njk
---

<article class="post">
    <h1>{{ title }}</h1>
    <time datetime="{{ date | dateToISO }}">
        {{ date | dateToString }}
    </time>
    
    {{ content | safe }}
</article>
{% endraw %}
```

## 组件化开发

### 1. 创建可复用组件

在 `_includes` 目录下创建组件，例如导航组件 `nav.njk`：

```nunjucks
{% raw %}
<nav class="main-nav">
    {% for item in navigation %}
        <a href="{{ item.url }}" 
           {% if page.url == item.url %}class="active"{% endif %}>
            {{ item.title }}
        </a>
    {% endfor %}
</nav>
{% endraw %}
```

### 2. 使用组件

在布局中使用组件：

```nunjucks
{% raw %}
<header>
    {% include "nav.njk" %}
</header>
{% endraw %}
```

## 模板语法详解

### 1. 变量和过滤器

```nunjucks
{% raw %}
{{ variable }}                    {# 显示变量 #}
{{ title | upper }}              {# 使用过滤器 #}
{{ content | safe }}             {# 输出不转义的HTML #}
{% endraw %}
```

### 2. 条件语句

```nunjucks
{% raw %}
{% if user %}
    <h1>{{ user.name }}</h1>
{% else %}
    <h1>未登录</h1>
{% endif %}
{% endraw %}
```

### 3. 循环

```nunjucks
{% raw %}
<ul>
{% for post in collections.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.data.title }}</a>
    </li>
{% endfor %}
</ul>
{% endraw %}
```

### 4. 宏（Macros）

宏是可重用的模板片段，类似函数：

```nunjucks
{% raw %}
{% macro postCard(post) %}
<article class="post-card">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <time>{{ post.date | dateToString }}</time>
</article>
{% endmacro %}

{# 使用宏 #}
{{ postCard(post) }}
{% endraw %}
```

## 实践技巧

### 1. 使用 `eleventy-navigation` 插件

```javascript
// .eleventy.js
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
eleventyConfig.addPlugin(eleventyNavigationPlugin);
```

然后在页面中：

```yaml
---
eleventyNavigation:
  key: 首页
  order: 1
---
```

### 2. 创建面包屑导航

```nunjucks
{% raw %}
{% macro breadcrumbs(page) %}
<nav aria-label="breadcrumb">
    {% set ancestors = page.url | getAncestors %}
    {% for ancestor in ancestors %}
        <a href="{{ ancestor.url }}">{{ ancestor.title }}</a> /
    {% endfor %}
    {{ page.title }}
</nav>
{% endmacro %}
{% endraw %}
```

## 进阶应用

1. **动态生成元数据**：根据页面内容自动生成描述和关键词
2. **响应式图片处理**：使用 11ty 图像插件优化图片
3. **自定义短代码**：创建特殊的内容块

## 下一篇预告

在下一篇教程中，我们将学习：
- 添加评论系统
- 实现搜索功能
- 优化构建过程
- 部署到生产环境
