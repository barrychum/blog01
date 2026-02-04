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

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};

