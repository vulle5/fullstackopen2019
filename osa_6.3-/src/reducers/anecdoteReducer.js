const getId = () => (100000 * Math.random()).toFixed(0);

// Action creators
export const incrementVote = id => {
  return {
    type: "INCREMENT",
    data: { id }
  };
};

export const addAnecdote = content => {
  return {
    type: "ADD_ANECDOTE",
    data: { content: content, id: getId(), votes: 0 }
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
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
