import React from "react";
import { incrementVote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = ({ store }) => {
  const anecdotes = store.getState();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => store.dispatch(incrementVote(anecdote.id))}
              >
                vote
              </button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
