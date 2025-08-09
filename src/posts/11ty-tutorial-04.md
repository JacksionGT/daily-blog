---
layout: post.njk
title: 11ty博客教程04：高级功能和性能优化
date: 2025-08-09
description: 为你的 11ty 博客添加高级功能，并学习如何优化性能以提供更好的用户体验
permalink: "/posts/11ty-tutorial-04/"
---

在本系列的最后一篇教程中，我们将介绍如何为博客添加高级功能，以及如何优化网站性能。

## 添加标签系统

### 1. 配置标签集合

在 `.eleventy.js` 中添加：

```javascript
// 创建标签页面
eleventyConfig.addCollection("tagList", function(collection) {
  const tags = new Set();
  collection.getAll().forEach(item => {
    (item.data.tags || []).forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
});
```

### 2. 创建标签页面模板

创建 `src/tags.njk`：

```nunjucks
{% raw %}
---
pagination:
  data: collections.tagList
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
layout: base.njk
---

<h1>标签: {{ tag }}</h1>

<div class="posts-list">
{% set taglist = collections[tag] %}
{% for post in taglist | reverse %}
  <article class="post-item">
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <time>{{ post.date | dateToString }}</time>
  </article>
{% endfor %}
</div>
{% endraw %}
```

## 添加搜索功能

我们可以使用 Lunr.js 实现客户端搜索：

### 1. 生成搜索索引

创建 `src/_data/searchIndex.js`：

```javascript
const lunr = require('lunr');

module.exports = function(collection) {
  const posts = collection.getFilteredByTag("posts");
  
  const index = lunr(function() {
    this.field("title");
    this.field("content");
    this.ref("id");

    posts.forEach((post, idx) => {
      this.add({
        title: post.data.title,
        content: post.template.frontMatter.content,
        id: idx
      });
    });
  });

  return {
    index: index,
    posts: posts.map(post => ({
      title: post.data.title,
      url: post.url,
      date: post.date
    }))
  };
};
```

### 2. 实现搜索界面

```html
<div class="search">
  <input type="text" id="search-input" placeholder="搜索文章...">
  <div id="search-results"></div>
</div>
```

## 性能优化

### 1. 资源优化

在 `.eleventy.js` 中添加：

```javascript
// 压缩 HTML
const htmlmin = require("html-minifier");
eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
  if(outputPath && outputPath.endsWith(".html")) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  }
  return content;
});
```

### 2. 图片优化

使用 11ty 图像插件：

```javascript
const Image = require("@11ty/eleventy-img");

// 添加图片短代码
eleventyConfig.addShortcode("image", async function(src, alt) {
  const metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/"
  });

  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}">`;
    }).join("\n")}
    <img src="${metadata.jpeg[0].url}" alt="${alt}">
  </picture>`;
});
```

## SEO 优化

### 1. 添加元标签

在基础布局中添加：

```html
<meta name="description" content="{{ description or site.description }}">
<meta property="og:title" content="{{ title }} - {{ site.title }}">
<meta property="og:description" content="{{ description or site.description }}">
<link rel="canonical" href="{{ site.url }}{{ page.url }}">
```

### 2. 生成站点地图

安装 `@11ty/eleventy-plugin-sitemap`：

```javascript
const sitemap = require("@11ty/eleventy-plugin-sitemap");
eleventyConfig.addPlugin(sitemap, {
  sitemap: {
    hostname: "https://yourblog.com"
  }
});
```

## 部署准备

### 1. 环境配置

创建 `.env` 文件：

```
SITE_URL=https://yourblog.com
ANALYTICS_ID=UA-XXXXX-Y
```

### 2. 构建脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "build": "npm run clean && eleventy",
    "clean": "rm -rf _site",
    "debug": "DEBUG=* eleventy",
    "serve": "eleventy --serve",
    "production": "NODE_ENV=production eleventy"
  }
}
```

## 部署到 Netlify

1. 创建 `netlify.toml`：

```toml
[build]
  command = "npm run production"
  publish = "_site"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[context.production.environment]
  NODE_VERSION = "16"
```

## 总结

至此，我们已经完成了一个功能完整的 11ty 博客系统，包括：

- ✅ 文章和标签系统
- ✅ 搜索功能
- ✅ 性能优化
- ✅ SEO 优化
- ✅ 部署配置

## 进阶建议

1. 添加评论系统（如 Disqus 或 Utterances）
2. 实现深色模式
3. 添加 RSS 订阅
4. 集成统计分析
5. 实现自动化测试

希望这个系列教程能帮助你建立起自己的 11ty 博客！如果你有任何问题，欢迎在评论区讨论。
