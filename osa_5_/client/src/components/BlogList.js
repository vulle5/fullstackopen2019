import React, { useEffect } from "react";
import Blog from "./Blog";

const BlogList = ({ fetchBlogs, blogs }) => {
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div>
      {blogs.map(blog => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default BlogList;
