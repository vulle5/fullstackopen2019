import loginService from '../services/login'

const initialState = null

export const initializeUser = (user, config) => {
  if (user) {
    return {
      type: 'INIT_USER',
      data: user
    }
  } else if (config) {
    return async dispatch => {
      const response = await loginService.login(config)
      console.log(response)
      dispatch({
        type: 'INIT_USER',
        data: response
      })
    }
  } else {
    return {
      type: 'INIT_USER',
      data: null
    }
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer
