import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import CreateBlog from "./components/CreateBlog";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("wrong credentials");
      // setErrorMessage('wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const fetchBlogs = async () => {
    try {
      const blogsFromDb = await blogService.getAll();
      setBlogs(blogsFromDb);
    } catch (error) {
      console.log(error);
      return "Failed to get blogs";
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <div className="App">
      <h2>{user === null ? "login to application" : "blogs"}</h2>
      {user !== null && <LogoutButton onLogout={handleLogout} />}
      <p>{user !== null && `${user.name} logged in`}</p>

      {user === null ? (
        loginForm()
      ) : (
        <>
          <CreateBlog token={user.token} fetchBlogs={fetchBlogs} />
          <BlogList fetchBlogs={fetchBlogs} blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;
