import anecdoteService from "../services/anecdotes";

// Action creators
export const incrementVote = anecdote => {
  return async dispatch => {
    await anecdoteService.update(anecdote);
    dispatch({
      type: "INCREMENT",
      data: { id: anecdote.id }
    });
  };
};

export const addAnecdote = data => {
  return async dispatch => {
    const response = await anecdoteService.createNew(data);
    dispatch({
      type: "ADD_ANECDOTE",
      data: response
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: response
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "INCREMENT":
      const id = action.data.id;
      const anecdoteToVote = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case "ADD_ANECDOTE":
      return [...state, { ...action.data }];
    default:
      return state;
  }
};

export default anecdoteReducer;
