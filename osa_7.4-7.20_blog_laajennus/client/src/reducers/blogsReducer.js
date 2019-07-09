import blogService from '../services/blogs'

const initialState = []

export const deleteBlog = blog => {
  return async dispatch => {
    const response = await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id: response.id }
    })
  }
}

export const incrementVote = (blog, id) => {
  console.log(blog)
  console.log(id)
  return async dispatch => {
    const response = await blogService.update(blog, id)
    dispatch({
      type: 'INCREMENT',
      data: { id: response.id }
    })
  }
}

export const addBlog = data => {
  return async dispatch => {
    const response = await blogService.create(data)
    dispatch({
      type: 'ADD_BLOG',
      data: response
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: response
    })
  }
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state, { ...action.data }]
  case 'INCREMENT': {
    const id = action.data.id
    const blogToVote = state.find(a => a.id === id)
    const changedBlog = {
      ...blogToVote,
      likes: blogToVote.likes + 1
    }
    return state.map(blog => (blog.id !== id ? blog : changedBlog))
  }
  case 'DELETE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  default:
    return state
  }
}

export default blogReducer
