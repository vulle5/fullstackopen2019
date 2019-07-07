import React from 'react'
import { connect } from 'react-redux'

import { initializeUser } from '../reducers/userReducer'

const LogoutButton = ({ initializeUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    initializeUser(null)
  }

  return <button onClick={handleLogout}>logout</button>
}

export default connect(
  null,
  { initializeUser }
)(LogoutButton)
