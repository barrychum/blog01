const { DateTime } = require("luxon"); // 11ty usually comes with luxon

module.exports = function(eleventyConfig) {
  // Date formatting filter
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
