import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const response = await userService.getUsers()
    dispatch({
      type: 'GET_USERS',
      data: response
    })
  }
}

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data || null
  default:
    return state
  }
}
