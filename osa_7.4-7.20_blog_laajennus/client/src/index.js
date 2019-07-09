import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import App from './App'
import './index.css'
import bannerReducer from './reducers/bannerReducer'
import blogReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'

const reducer = combineReducers({
  banner: bannerReducer,
  blogs: blogReducer,
  user: userReducer,
  usersList: userListReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
