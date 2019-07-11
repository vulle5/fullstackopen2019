import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Toolbar, Typography } from '@material-ui/core'
import LogoutButton from './LogoutButton'
import Navigation from './Navigation'
import { useStyles } from '../useStyles'

const AppBar = ({ user }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.appBar}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            AppBar
          </Typography>
          {user !== null && <LogoutButton />}
        </Toolbar>
        <Navigation value={value} handleChange={handleChange} />
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(AppBar)
