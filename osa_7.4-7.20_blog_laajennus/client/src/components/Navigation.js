import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'

const Navigation = ({ location }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.includes('blogs')) {
      setValue(0)
    } else {
      setValue(1)
    }
  }, [location.pathname])

  return (
    <div>
      <Tabs value={value}>
        <Tab label="Blogs" component={Link} to="/" />
        <Tab label="Users" component={Link} to="/users" />
      </Tabs>
    </div>
  )
}

export default withRouter(Navigation)
