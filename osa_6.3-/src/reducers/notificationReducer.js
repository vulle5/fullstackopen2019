const initialState = "";

export const showNotification = message => {
  return {
    type: "OPEN",
    data: message
  };
};

export const closeNotification = () => {
  return {
    type: "CLOSE"
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN":
      return action.data;
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
