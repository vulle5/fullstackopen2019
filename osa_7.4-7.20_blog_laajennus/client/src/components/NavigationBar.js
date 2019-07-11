import React, { useState } from 'react'
import { connect } from 'react-redux'

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import LogoutButton from './LogoutButton'
import Navigation from './Navigation'
import { useStyles } from '../useStyles'

const NavigationBar = ({ user }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.appBar}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.appBarTitle}
          >
            {user !== null ? user.name : 'Login to application'}
          </Typography>
          {user !== null && <LogoutButton />}
        </Toolbar>
        {user !== null && (
          <Navigation value={value} handleChange={handleChange} />
        )}
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavigationBar)
