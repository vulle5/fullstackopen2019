import React, { useState } from 'react'
import { connect } from 'react-redux'

import { incrementVote, addComment } from '../reducers/blogsReducer'
import { useStyles } from '../useStyles'
import { Button, IconButton, TextField } from '@material-ui/core'
import ThumbUp from '@material-ui/icons/ThumbUp'

const SingleBlog = ({ blog, incrementVote, addComment }) => {
  const [comment, setComment] = useState('')
  const classes = useStyles()

  const onLikeButtonClick = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await incrementVote(newBlog, newBlog.id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async () => {
    try {
      await addComment({ comment: comment }, blog.id)
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.divRoot}>
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
            <IconButton onClick={onLikeButtonClick}>
              <ThumbUp />
            </IconButton>
          </div>
          <div>{`added by ${blog.user.name}`}</div>
          <h3>comments</h3>
          <TextField
            value={comment}
            placeholder="Write comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button onClick={handleComment}>add comment</Button>
          <ul>
            {blog.comments.length !== 0 ? (
              blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
            ) : (
              <li>{'No comments'}</li>
            )}
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
  { incrementVote, addComment }
)(SingleBlog)
