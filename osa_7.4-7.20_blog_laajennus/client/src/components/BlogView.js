import React from 'react'
import { connect } from 'react-redux'

import BlogList from './BlogList'
import CreateBlog from './CreateBlog'
import BannerMessage from './BannerMessage'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const BlogView = ({ user }) => {
  return (
    <>
      <BannerMessage />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Togglable buttonLabel={'new note'}>
            <CreateBlog />
          </Togglable>
          <BlogList />
        </>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BlogView)
