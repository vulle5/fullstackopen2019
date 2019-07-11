import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'

const Navigation = ({ value, handleChange }) => {
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Blogs" component={Link} to="/" />
        <Tab label="Users" component={Link} to="/users" />
      </Tabs>
    </div>
  )
}

export default Navigation
