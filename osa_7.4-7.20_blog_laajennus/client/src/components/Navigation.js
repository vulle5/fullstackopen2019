import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import LogoutButton from './LogoutButton'

const Navigation = ({ user }) => {
  return (
    <div>
      <nav className="crumbs">
        <ol>
          <li className="crumb">
            <Link to="">blogs</Link>
          </li>
          <li className="crumb">
            <Link to="">users</Link>
          </li>
          <li className="crumb">{user !== null && `${user.name} logged in`}</li>
          <li className="crumb">{user !== null && <LogoutButton />}</li>
        </ol>
      </nav>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Navigation)
