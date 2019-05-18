const dummy = blogs => 1;

const totalLikes = blogs => {
  let sum = 0;
  blogs.forEach(blog => {
    sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = blogs => {
  let highestBlog = {
    title: "test",
    author: "test",
    url: "google.com",
    likes: 0,
    id: "5cdffe8ca0e2862fac5c35b7"
  };
  blogs.forEach(blog => {
    if (blog.likes >= highestBlog.likes) {
      Object.assign(highestBlog, blog);
    }
  });
  return highestBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
