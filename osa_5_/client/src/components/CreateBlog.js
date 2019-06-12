import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ token, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url
    };

    try {
      blogService.setToken(token);
      await blogService.create(blogObject);
      setTitle("");
      setAuthor("");
      setURL("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
