import React, { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: "thin",
    padding: "8px",
    margin: "8px 0px 8px 0px"
  };

  const [isVisible, setIsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const onButtonClick = async e => {
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

  return (
    <div style={blogStyle} onClick={() => setIsVisible(!isVisible)}>
      {blog.title} {blog.author}
      {isVisible ? (
        <>
          <br />
          {blog.url}
          <br />
          {`${likes} likes`} <button onClick={onButtonClick}>like</button>
          <br />
          {`Added by ${blog.user.username}`}
        </>
      ) : null}
    </div>
  );
};

export default Blog;
