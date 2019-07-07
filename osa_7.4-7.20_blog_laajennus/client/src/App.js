import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { bannerChange } from './reducers/bannerReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LogoutButton from './components/LogoutButton'
import CreateBlog from './components/CreateBlog'
import BannerMessage from './components/BannerMessage'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = ({ user, initializeBlogs, initializeUser }) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      initializeUser(user)
      initializeBlogs()
    }
  }, [initializeBlogs, initializeUser])

  useEffect(() => {
    if (user !== null) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
  }, [user])

  return (
    <div className="App">
      <h2>{user === null ? 'login to application' : 'blogs'}</h2>
      {user !== null && <LogoutButton />}
      <BannerMessage />
      <p>{user !== null && `${user.name} logged in`}</p>

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Togglable buttonLabel={'new note'}>
            <CreateBlog token={user.token} />
          </Togglable>
          <BlogList user={user} />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { bannerChange, initializeBlogs, initializeUser }
)(App)
