import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  console.log(blogs);
  return (
    <div>
      {blogs.map(blog => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default BlogList;
