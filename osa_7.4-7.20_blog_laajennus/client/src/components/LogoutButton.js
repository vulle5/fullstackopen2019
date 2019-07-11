import React from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import { initializeUser } from '../reducers/userReducer'

const LogoutButton = ({ initializeUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    initializeUser(null)
  }

  return <Button color="inherit" onClick={handleLogout}>logout</Button>
}

export default connect(
  null,
  { initializeUser }
)(LogoutButton)
