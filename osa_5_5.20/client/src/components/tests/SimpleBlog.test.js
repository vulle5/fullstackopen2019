import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from '../SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'Testing in react',
  author: 'Me',
  likes: 2
}

test('renders content title, author and likes', () => {
  const { container } = render(<SimpleBlog blog={blog} onClick={() => {}} />)

  expect(container).toHaveTextContent('Testing in react')
  expect(container).toHaveTextContent('Me')

  const div = container.querySelector('.blogLikes')
  expect(div).toHaveTextContent(2)
})

test('like button is called proper amount of times', () => {
  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  fireEvent.click(getByText('like'))
  fireEvent.click(getByText('like'))

  expect(mockHandler.mock.calls.length).toBe(2)
})
