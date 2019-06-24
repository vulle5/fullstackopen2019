const notificationReducer = (state = "Testi", action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "OPEN":
      return state;
    case "CLOSE":
      return state;
    default:
      return state;
  }
};

export default notificationReducer;
