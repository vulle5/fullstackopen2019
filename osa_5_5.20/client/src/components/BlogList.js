import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, fetchBlogs, user }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog blog={blog} key={blog.id} fetchBlogs={fetchBlogs} user={user} />
        ))}
    </div>
  )
}

export default BlogList
