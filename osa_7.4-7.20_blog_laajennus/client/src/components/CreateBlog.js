/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'

import { bannerChange } from '../reducers/bannerReducer'
import { initializeBlogs, addBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'

const CreateBlog = ({ token, initializeBlogs, addBlog, bannerChange }) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')

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
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { initializeBlogs, addBlog, bannerChange }
)(CreateBlog)
