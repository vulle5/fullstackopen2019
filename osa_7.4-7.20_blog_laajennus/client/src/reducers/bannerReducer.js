const initialState = []

export const bannerChange = (message, type) => {
  if (type && message) {
    return {
      type: 'SET_BANNER',
      data: [type, message]
    }
  } else {
    return {
      type: 'SET_BANNER',
      data: []
    }
  }
}

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BANNER':
    return action.data
  default:
    return state
  }
}

export default bannerReducer
