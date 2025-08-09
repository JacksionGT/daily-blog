---
layout: post.njk
title: git代码同步
date: 2025-08-09
description: 创建了一个github仓库后，如何进行本地与远程的git代码同步
permalink: "/posts/{{ page.fileSlug }}/"
---

# 本地空项目
```sh
echo "# daily-blog" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:JacksionGT/daily-blog.git
git push -u origin main
```

# 本地已存在项目
```sh
git remote add origin git@github.com:JacksionGT/daily-blog.git
git branch -M main
git push -u origin main
```