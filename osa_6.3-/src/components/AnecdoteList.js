import React from "react";
import { incrementVote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  closeNotification
} from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState();

  const onVoteClick = anecdote => {
    store.dispatch(incrementVote(anecdote.id));
    store.dispatch(showNotification(anecdote.content));
    setTimeout(() => store.dispatch(closeNotification()), 5000);
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => onVoteClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
