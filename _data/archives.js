module.exports = (data) => {
  const posts = data.collections.post || [];
  const structure = {};

  posts.forEach(post => {
    const year = post.date.getFullYear();
    const month = post.date.toLocaleString('default', { month: 'long' });

    if (!structure[year]) structure[year] = {};
    if (!structure[year][month]) structure[year][month] = [];

    structure[year][month].push(post);
  });

  return structure;
};
