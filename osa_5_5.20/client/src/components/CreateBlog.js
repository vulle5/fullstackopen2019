/* eslint-disable no-unused-vars */
import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'

const CreateBlog = ({ token, onCreate, fetchBlogs }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      blogService.setToken(token)
      await blogService.create(blogObject)
      onCreate(title.value, author.value)
      resetTitle()
      resetAuthor()
      resetUrl()
      await fetchBlogs()
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

export default CreateBlog
