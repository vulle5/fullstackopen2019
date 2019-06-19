import React from 'react'
import 'jest-dom/extend-expect'
import { render, waitForElement, cleanup } from '@testing-library/react'
jest.mock('../../services/blogs')
import App from '../../App'

afterEach(cleanup)

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
})
