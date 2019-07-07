import React from 'react'
import 'jest-dom/extend-expect'
import { render, waitForElement, cleanup } from '@testing-library/react'
jest.mock('../../services/blogs')
import App from '../../App'

afterEach(cleanup)

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: key => savedItems[key],
  clear: (savedItems = {})
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    const div = component.container.querySelector('.blogDiv')

    expect(div).toBeNull()
  })

  test('if user logged, notes are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('blogs'))

    expect(component.container).toHaveTextContent('Elixir')
    expect(component.container).toHaveTextContent('Java')
    expect(component.container).toHaveTextContent('JavaScript')
  })
})
