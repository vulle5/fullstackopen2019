import React from 'react'
import { connect } from 'react-redux'

const User = ({ blogs, name }) => {
  return (
    <div>
      {blogs.length !== 0 ? (
        <>
          <h2>{name}</h2>
          <h3>added blogs</h3>
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

const makeBlogs = (id, blogs) =>
  blogs ? blogs.filter(blog => blog.user.id === id) : null

const getName = (id, blogs) => {
  if (blogs.length !== 0) {
    const {
      user: { name }
    } = blogs.find(blog => blog.user.id === id)
    return name
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: makeBlogs(ownProps.id, state.blogs),
    name: getName(ownProps.id, state.blogs)
  }
}

export default connect(mapStateToProps)(User)
