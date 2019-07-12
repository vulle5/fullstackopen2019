/* eslint-disable no-unused-vars */
import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'

import { bannerChange } from '../reducers/bannerReducer'
import { initializeUser } from '../reducers/userReducer'
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper
} from '@material-ui/core'
import { useStyles } from '../useStyles'

const LoginForm = ({ bannerChange, initializeUser }) => {
  const [username] = useField('text')
  const [password] = useField('password')
  const classes = useStyles()

  const handleLogin = async event => {
    event.preventDefault()
    const { value: nameValue } = username
    const { value: passValue } = password

    try {
      await initializeUser(null, {
        username: nameValue,
        password: passValue
      })
    } catch (exception) {
      console.log(exception)
      bannerChange('Wrong username or password', 'error')
      setTimeout(() => {
        bannerChange([])
      }, 5000)
    }
  }
  return (
    <Paper
      className={classes.divRoot}
      style={{ display: 'inline-block', padding: '8px' }}
    >
      <form onSubmit={handleLogin} style={{ display: 'grid' }}>
        <FormControl>
          <InputLabel>Username</InputLabel>
          <Input {...username} label="username" />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input {...password} label="password" />
        </FormControl>
        <Button className={classes.button} variant="contained" type="submit">
          login
        </Button>
      </form>
    </Paper>
  )
}

export default connect(
  null,
  { initializeUser, bannerChange }
)(LoginForm)
