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
    likes: -1
  };
  blogs.forEach(blog => {
    if (blog.likes >= highestBlog.likes) {
      Object.assign(highestBlog, blog);
    }
  });
  return highestBlog;
};

const mostBlogs = blogs => {
  let mostBlogs = { author: "", blogs: "" };
  var mostBlogsAmount = 1;
  var currentHigh = 0;
  var authorWithMostBlogs;
  let authors = [];

  blogs.forEach(blog => {
    authors.push(blog.author);
  });

  for (var i = 0; i < authors.length; i++) {
    for (var j = i; j < authors.length; j++) {
      if (authors[i] == authors[j]) currentHigh++;
      if (mostBlogsAmount < currentHigh) {
        mostBlogsAmount = currentHigh;
        authorWithMostBlogs = authors[i];
      }
    }
    currentHigh = 0;
  }

  Object.assign(mostBlogs, {
    author: authorWithMostBlogs,
    blogs: mostBlogsAmount
  });

  return mostBlogs;
};

const mostLikes = blogs => {
  let mostLikes = { author: "", likes: "" };
  let listOfLikes = [];

  blogs.forEach(blog => {
    listOfLikes.push(blog.likes);
  });

  let objectWithMostLikes = blogs.find(
    blog => Math.max(...listOfLikes) === blog.likes
  );

  Object.assign(mostLikes, {
    author: objectWithMostLikes.author,
    likes: Math.max(...listOfLikes)
  });

  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
