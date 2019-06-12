import React, { useState, useEffect, useCallback } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = useCallback(async () => {
    try {
      const blogsFromDb = await blogService.getAll();
      setBlogs(blogsFromDb);
    } catch (error) {
      console.log(error);
      return "Failed to get blogs";
    }
  }, []);

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
