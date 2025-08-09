---
layout: post.njk
title: Moonlight串流时仅播放远程音频的解决方案
date: 2025-08-09
description: 解决使用Sunshine和Moonlight串流时，PC端和设备端同时播放声音的问题
permalink: "/posts/{{ page.fileSlug }}/"
---


## 问题背景

最近我在使用PC端的Sunshine和平板端的Moonlight进行串流时遇到了一个烦人的问题。当我躺在卧室想要用平板看剧时，发现PC和平板会同时播放声音，这显然不是我想要的效果。

## 问题分析与解决方案探索

首先，我开始寻找只在平板端播放声音的解决方法。通过搜索，我发现了一个有趣的[帖子](https://tieba.baidu.com/p/8478272420)，其中提到了Steam streaming Speakers这个功能。

经过检查，我发现我的电脑上并没有Steam streaming Speakers这个选项，只有一个默认扬声器。这让我产生了一个想法：既然系统没有提供专门的串流音频设备，那么我们可以通过安装虚拟扬声器来解决这个问题。

## 解决方案实施

经过搜索，我找到了一个名为Virtual Audio Cable（VAC）的软件，具体版本是V4.66。这个软件可以帮助我们创建虚拟音频设备。

### 具体步骤：

1. 下载并安装Virtual Audio Cable V4.66软件
2. 安装完成后，系统中会出现一个新的虚拟扬声器设备
3. 将这个【虚拟扬声器】设置为系统的默认扬声器

完成以上设置后，当使用Moonlight串流时，音频就只会在平板端播放了。

终于能够愉快地追剧了。