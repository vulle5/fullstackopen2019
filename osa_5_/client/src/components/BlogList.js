import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog blog={blog} key={blog.id} />
        ))}
    </div>
  );
};

export default BlogList;
