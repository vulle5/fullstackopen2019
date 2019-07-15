import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from '@material-ui/core'

import { bannerChange } from '../reducers/bannerReducer'
import { initializeBlogs, addBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'
import { useStyles } from '../useStyles'

const CreateBlog = ({ token, initializeBlogs, addBlog, bannerChange }) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')
  const classes = useStyles()

  const onCreate = (title, author) => {
    bannerChange(`a new blog ${title} by ${author} added`, 'success')
    setTimeout(() => {
      bannerChange([])
    }, 5000)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      blogService.setToken(token)
      await addBlog(blogObject)
      onCreate(title.value, author.value)
      resetTitle()
      resetAuthor()
      resetUrl()
      await initializeBlogs()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.divRoot}>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input {...title} placeholder="Title" id="title" />
        </div>
        <div>
          <Input {...author} placeholder="Author" id="author" />
        </div>
        <div>
          <Input {...url} placeholder="URL" id="url" />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  }
}

export default connect(
  mapStateToProps,
  { initializeBlogs, addBlog, bannerChange }
)(CreateBlog)
