import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import { useStyles } from '../useStyles'

const BlogList = ({ blogs, user }) => {
  const classes = useStyles()

  return (
    <div className={classes.blogListRoot}>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog blog={blog} user={user} key={blog.id} />
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
