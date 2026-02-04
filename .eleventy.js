const { DateTime } = require("luxon"); // 11ty usually comes with luxon

module.exports = function(eleventyConfig) {
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

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};

