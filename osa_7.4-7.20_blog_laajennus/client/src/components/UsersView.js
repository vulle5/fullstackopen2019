import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsers } from '../reducers/userListReducer'
import { useStyles } from '../useStyles'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'

const UsersView = ({ users, getUsers }) => {
  const classes = useStyles()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div className={classes.divRoot}>
      <h2>Users</h2>
      <Table className="user-table" style={{ maxWidth: '500px' }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            ? users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))
            : null}
        </TableBody>
      </Table>
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
