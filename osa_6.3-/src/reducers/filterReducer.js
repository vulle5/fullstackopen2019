const initialState = "";

export const filterChange = filter => {
  return {
    type: "SET_FILTER",
    data: filter
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
