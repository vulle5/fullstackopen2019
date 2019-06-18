import React, { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, fetchBlogs }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: "thin",
    padding: "8px",
    margin: "8px 0px 8px 0px"
  };

  const [isVisible, setIsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const onLikeButtonClick = async e => {
    e.stopPropagation();
    const newBlog = blog;
    newBlog.likes++;
    try {
      setLikes(likes + 1);
      await blogServices.update(newBlog, newBlog.id);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveButtonClick = async e => {
    e.stopPropagation();
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogServices.deleteBlog(blog.id);
        await fetchBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyle} onClick={() => setIsVisible(!isVisible)}>
      {blog.title} {blog.author}
      {isVisible ? (
        <>
          <br />
          {blog.url}
          <br />
          {`${likes} likes`} <button onClick={onLikeButtonClick}>like</button>
          <br />
          {`Added by ${blog.user.username}`}
          <br />
          <button onClick={onRemoveButtonClick}>remove</button>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
