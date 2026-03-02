module.exports = {
  urltest: "https://mydomain.com"
};

module.exports = {
  url: process.env.ELEVENTY_ENV === 'production' 
    ? "https://yourdomain.com" 
    : "http://localhost:8080"
};