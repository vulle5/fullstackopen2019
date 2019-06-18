import React, { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    border: "solid",
    borderWidth: "thin",
    padding: "8px",
    margin: "8px 0px 8px 0px"
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={blogStyle} onClick={() => setIsVisible(!isVisible)}>
      {blog.title} {blog.author}
      {isVisible ? (
        <>
          <br />
          {blog.url}
          <br />
          {`${blog.likes} likes`} <button>like</button>
          <br />
          {`Added by ${blog.user.username}`}
        </>
      ) : null}
    </div>
  );
};

export default Blog;
