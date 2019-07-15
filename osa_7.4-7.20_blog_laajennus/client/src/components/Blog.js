import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ThumbUp from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  initializeBlogs,
  deleteBlog,
  incrementVote
} from '../reducers/blogsReducer'
import { useStyles } from '../useStyles'

const Blog = ({ blog, user, initializeBlogs, deleteBlog, incrementVote }) => {
  const classes = useStyles()

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
    <>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{
            content: classes.blogSummary
          }}
        >
          <Typography className={classes.blogHeading}>
            <Link to={`/blogs/${blog.id}`} id="blog-title">
              {blog.title}
              <Typography
                style={{
                  fontStyle: 'italic',
                  display: 'inline-block',
                  marginLeft: '4px'
                }}
                component="span"
              >
                {`by ${blog.author}`}
              </Typography>
            </Link>
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {blog.url}
          </Typography>
          <div className={classes.likeButtonDiv}>
            <Typography className={classes.likes}>{blog.likes}</Typography>
            <IconButton onClick={onLikeButtonClick} size="small">
              <ThumbUp />
            </IconButton>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.likes}>{`Added by ${
            blog.user.username
          }`}</Typography>
          {blog.user.username === user.username ? (
            <Button
              onClick={onRemoveButtonClick}
              color="secondary"
              className={classes.button}
            >
              Remove
              <DeleteIcon className={classes.deleteIcon} />
            </Button>
          ) : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

export default connect(
  null,
  { initializeBlogs, deleteBlog, incrementVote }
)(Blog)
