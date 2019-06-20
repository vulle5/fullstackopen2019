import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type={username.type}
          value={username.value}
          name="Username"
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
