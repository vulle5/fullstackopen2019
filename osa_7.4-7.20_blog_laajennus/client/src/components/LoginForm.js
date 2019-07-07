/* eslint-disable no-unused-vars */
import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'

import { bannerChange } from '../reducers/bannerReducer'
import { initializeUser } from '../reducers/userReducer'

const LoginForm = ({ bannerChange, initializeUser }) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    const { value: nameValue } = username
    const { value: passValue } = password

    try {
      await initializeUser(null, {
        username: nameValue,
        password: passValue
      })
    } catch (exception) {
      console.log(exception)
      bannerChange('Wrong username or password', 'error')
      setTimeout(() => {
        bannerChange([])
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default connect(
  null,
  { initializeUser, bannerChange }
)(LoginForm)
