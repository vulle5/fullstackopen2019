import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  initializeBlogs,
  deleteBlog,
  incrementVote
} from '../reducers/blogsReducer'

const Blog = ({ blog, user, initializeBlogs, deleteBlog, incrementVote }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 'thin',
    padding: '8px',
    margin: '8px 0px 8px 0px'
  }
  const [isVisible, setIsVisible] = useState(false)

  const onLikeButtonClick = async e => {
    e.stopPropagation()
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await incrementVote(newBlog, newBlog.id)
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveButtonClick = async e => {
    e.stopPropagation()
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await deleteBlog(blog.id)
        await initializeBlogs()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={blogStyle}
      onClick={() => setIsVisible(!isVisible)}
      className="blogDiv"
    >
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      {isVisible ? (
        <>
          <br />
          {blog.url}
          <br />
          {`${blog.likes} likes`}{' '}
          <button onClick={onLikeButtonClick}>like</button>
          <br />
          {`Added by ${blog.user.username}`}
          <br />
          {blog.user.username === user.username ? (
            <button onClick={onRemoveButtonClick}>remove</button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default connect(
  null,
  { initializeBlogs, deleteBlog, incrementVote }
)(Blog)
