import React from "react";
import { incrementVote, addAnecdote } from "./reducers/anecdoteReducer";

const App = ({ store }) => {
  const anecdotes = store.getState();

  const onFormSubmit = e => {
    e.preventDefault();
    store.dispatch(addAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => store.dispatch(incrementVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
