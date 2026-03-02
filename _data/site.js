module.exports = {
  urltest: "https://mydomain.com"
};

module.exports = {
  url: process.env.ELEVENTY_ENV === 'local' 
    ? "http://localhost:8080" 
    : "https://blog.britbuzz.uk"
};