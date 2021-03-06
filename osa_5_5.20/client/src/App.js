import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import { useField } from './hooks/index'
import BlogList from './components/BlogList'
import LogoutButton from './components/LogoutButton'
import CreateBlog from './components/CreateBlog'
import BannerMessage from './components/BannerMessage'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [bannerMessage, setBannerMessage] = useState(null)
  const [bannerType, setBannerType] = useState('success')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      fetchBlogs()
    }
  }, [])

  const fetchBlogs = async () => {
    try {
      const blogsFromDb = await blogService.getAll()
      setBlogs(blogsFromDb)
    } catch (error) {
      console.log(error)
      return 'Failed to get blogs'
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    const { value: nameValue } = username
    const { value: passValue } = password

    try {
      const user = await loginService.login({
        username: nameValue,
        password: passValue
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setTimeout(() => {
        setBannerMessage(null)
      }, 5000)
      setBannerMessage('Wrong username or password')
      setBannerType('error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const onCreate = (title, author) => {
    setTimeout(() => {
      setBannerMessage(null)
    }, 5000)
    setBannerMessage(`a new blog ${title} by ${author} added`)
    setBannerType('success')
  }

  return (
    <div className="App">
      <h2>{user === null ? 'login to application' : 'blogs'}</h2>
      {user !== null && <LogoutButton onLogout={handleLogout} />}
      <BannerMessage message={bannerMessage} type={bannerType} />
      <p>{user !== null && `${user.name} logged in`}</p>

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      ) : (
        <>
          <Togglable buttonLabel={'new note'}>
            <CreateBlog
              token={user.token}
              onCreate={onCreate}
              fetchBlogs={fetchBlogs}
            />
          </Togglable>
          <BlogList blogs={blogs} fetchBlogs={fetchBlogs} user={user} />
        </>
      )}
    </div>
  )
}

export default App
