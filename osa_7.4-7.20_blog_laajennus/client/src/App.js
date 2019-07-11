import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { bannerChange } from './reducers/bannerReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import blogService from './services/blogs'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import NavigationBar from './components/NavigationBar'

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
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Route exact path="/" render={() => <BlogView />} />
        <Route
          path="/blogs/:id"
          render={({ match }) => <SingleBlog id={match.params.id} />}
        />
        <Route exact path="/users" render={() => <UsersView />} />
        <Route
          path="/users/:id"
          render={({ match }) => <User id={match.params.id} />}
        />
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
