import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog blog={blog} key={blog.id} user={user} />
        ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps)(BlogList)
