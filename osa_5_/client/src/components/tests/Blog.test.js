import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

afterEach(cleanup)

let component
const blog = {
  title: 'Testing in react',
  author: 'Me',
  likes: 2,
  user: { username: 'Vulle' }
}

beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      fetchBlogs={() => {}}
      user={{ user: { username: 'Vulle' } }}
    />
  )
})

test('by default blog div only shows author and title', () => {
  expect(component.container).not.toHaveTextContent('Added by')
  expect(component.container).not.toHaveTextContent('likes')
})

test('clicking blog div expands it and shows likes and user', () => {
  const div = component.container.querySelector('.blogDiv')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent('Added by')
  expect(component.container).toHaveTextContent('likes')
})
