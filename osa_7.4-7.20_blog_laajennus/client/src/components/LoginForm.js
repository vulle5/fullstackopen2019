/* eslint-disable no-unused-vars */
import React from 'react'

const LoginForm = ({
  handleLogin,
  username: { reset: a, ...username },
  password: { reset: b, ...password }
}) => {
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

export default LoginForm
