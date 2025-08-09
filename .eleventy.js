module.exports = function(eleventyConfig) {
  // 复制静态文件到输出目录
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // 配置博客文章集合
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md");
  });

  // 添加日期过滤器
  eleventyConfig.addFilter("dateToString", function(date) {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("dateToISO", function(date) {
    return new Date(date).toISOString();
  });
  
  // 设置模板文件目录
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    // 设置模板引擎
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
