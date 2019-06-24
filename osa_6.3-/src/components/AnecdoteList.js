import React from "react";
import { incrementVote } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();

  return (
    <>
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
    </>
  );
};

export default AnecdoteList;
