---
layout: post.njk
title: 11ty博客教程02：配置文件和数据管理
date: 2025-08-09
description: 深入了解 11ty 的配置系统，学习如何管理全局数据和自定义过滤器
permalink: "/posts/11ty-tutorial-02/"
---

在上一篇文章中，我们了解了 11ty 的基础概念。现在，让我们深入了解如何配置 11ty 项目，以及如何管理数据。

## .eleventy.js 配置文件

这是 11ty 的核心配置文件，让我们逐步解析其内容：

```javascript
module.exports = function(eleventyConfig) {
  // 复制静态资源
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // 配置博客文章集合
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md");
  });

  // 添加自定义过滤器
  eleventyConfig.addFilter("dateToString", function(date) {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // 返回配置对象
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};
```

让我们详细解释每个部分：

### 1. 静态资源处理

```javascript
eleventyConfig.addPassthroughCopy("src/assets");
```

这行代码告诉 11ty 将 `src/assets` 目录下的所有文件原样复制到输出目录。这对于处理图片、CSS 和 JavaScript 文件很有用。

### 2. 集合（Collections）

集合是 11ty 中一个强大的概念，它允许你将相关内容组织在一起：

```javascript
eleventyConfig.addCollection("posts", function(collection) {
  return collection.getFilteredByGlob("src/posts/**/*.md");
});
```

这段代码创建了一个名为 "posts" 的集合，包含了 `src/posts` 目录下所有的 Markdown 文件。

### 3. 过滤器（Filters）

过滤器用于在模板中转换数据：

```javascript
eleventyConfig.addFilter("dateToString", function(date) {
  return new Date(date).toLocaleDateString('zh-CN');
});
```

现在我们可以在模板中这样使用：`{{ date | dateToString }}`

## 数据管理

11ty 提供了强大的数据级联系统，数据可以来自多个源：

### 1. 全局数据文件

在 `src/_data` 目录下的文件会自动成为全局数据。例如 `site.js`：

```javascript
module.exports = {
  title: "我的博客",
  description: "使用11ty构建的个人博客",
  url: "http://localhost:8080",
  year: new Date().getFullYear()
};
```

这些数据在所有模板中都可以通过 `site` 对象访问：`{{ site.title }}`

### 2. Front Matter 数据

每个页面的 Front Matter 中的数据仅对该页面可用：

```yaml
---
title: 页面标题
date: 2025-08-09
---
```

### 3. 目录数据文件

可以为整个目录创建默认数据。例如 `src/posts/posts.json`：

```json
{
  "layout": "post.njk",
  "tags": "posts"
}
```

## 实践练习

尝试添加一个新的过滤器，用于：
1. 截取文章摘要（前 150 个字符）
2. 格式化日期为"x天前"的形式

## 下一篇预告

在下一篇教程中，我们将学习如何：
- 创建响应式布局
- 添加语法高亮
- 实现标签系统
- 创建分页导航
