import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Button } from '@material-ui/core'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Paper style={{ display: 'inline-block', marginLeft: '8px' }}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained">
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <Button
          onClick={toggleVisibility}
          style={{ margin: '0 8px 8px 8px' }}
          color="secondary"
        >
          cancel
        </Button>
      </div>
    </Paper>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
