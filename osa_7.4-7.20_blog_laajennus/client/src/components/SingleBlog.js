import React from 'react'
import { connect } from 'react-redux'

import { incrementVote } from '../reducers/blogsReducer'

const SingleBlog = ({ blog, incrementVote }) => {
  const onLikeButtonClick = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await incrementVote(newBlog, newBlog.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${blog.url}`}
          >
            {blog.url}
          </a>
          <div>
            {`has ${blog.likes} likes`}
            <button onClick={onLikeButtonClick}>like</button>
          </div>
          <div>{`added by ${blog.user.name}`}</div>
          <h3>comments</h3>
          <ul>
            {blog.comment !== 0
              ? blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
              : 'No comments'}
          </ul>
        </>
      ) : null}
    </div>
  )
}

const getBlog = (id, blogs) => {
  return blogs.length !== 0 ? blogs.find(blog => blog.id === id) : null
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: getBlog(ownProps.id, state.blogs)
  }
}

export default connect(
  mapStateToProps,
  { incrementVote }
)(SingleBlog)
