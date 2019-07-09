import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsers } from '../reducers/userListReducer'

const UsersView = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div>
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.usersList
  }
}

export default connect(
  mapStateToProps,
  { getUsers }
)(UsersView)
