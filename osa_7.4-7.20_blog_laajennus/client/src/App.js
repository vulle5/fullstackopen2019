import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { bannerChange } from './reducers/bannerReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'

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
      <p>{user !== null && `${user.name} logged in`}</p>
      <Router>
        <Route exact path="/" render={() => <BlogView />} />
        <Route path="/users" render={() => <UsersView />} />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { bannerChange, initializeBlogs, initializeUser }
)(App)
