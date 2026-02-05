const { DateTime } = require("luxon"); // 11ty usually comes with luxon

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("css"); 

  // Date formatting filter
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

    // Read Time Filter
  eleventyConfig.addFilter("readTime", (content) => {
    const wordsPerMinute = 200;
    // Strip HTML tags to get a clean word count
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  });


  // 3. Grouping Filter (Fixes the "undefined post" error)
  // This replaces the logic that was previously in _data/archives.js
  eleventyConfig.addFilter("groupByYearMonth", function(posts) {
    const structure = {};
    
    // Ensure we have a collection to work with
    const postList = posts || [];

    postList.forEach(post => {
      if (!post.date) return;
      
      const year = post.date.getFullYear();
      const month = post.date.toLocaleString('default', { month: 'long' });

      if (!structure[year]) structure[year] = {};
      if (!structure[year][month]) structure[year][month] = [];

      structure[year][month].push(post);
    });
    
    return structure;
  });


eleventyConfig.addFilter("groupTagsByPath", function(allTags, collections) {
    const tree = {};

    Object.keys(allTags).forEach(tag => {
      // Skip the built-in 'all' and 'post' tags
      if (tag === 'all' || tag === 'post') return;

      const parts = tag.split('/');
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = { _posts: [], _children: {} };
        }
        
        // If it's the leaf node (the end of the path), add the posts
        if (index === parts.length - 1) {
          current[part]._posts = collections[tag] || [];
        }
        current = current[part]._children;
      });
    });

    return tree;
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};

