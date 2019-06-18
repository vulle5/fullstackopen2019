import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import CreateBlog from "./components/CreateBlog";
import BannerMessage from "./components/BannerMessage";
import Togglable from "./components/Togglable";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerType, setBannerType] = useState("success");
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
      setTimeout(() => {
        setBannerMessage(null);
      }, 5000);
      setBannerMessage("Wrong username or password");
      setBannerType("error");
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

  const onCreate = (title, author) => {
    setTimeout(() => {
      setBannerMessage(null);
    }, 5000);
    setBannerMessage(`a new blog ${title} by ${author} added`);
    setBannerType("success");
  };

  return (
    <div className="App">
      <h2>{user === null ? "login to application" : "blogs"}</h2>
      {user !== null && <LogoutButton onLogout={handleLogout} />}
      <BannerMessage message={bannerMessage} type={bannerType} />
      <p>{user !== null && `${user.name} logged in`}</p>

      {user === null ? (
        loginForm()
      ) : (
        <>
          <Togglable buttonLabel={"new note"}>
            <CreateBlog token={user.token} onCreate={onCreate} />
          </Togglable>
          <BlogList fetchBlogs={fetchBlogs} blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;
