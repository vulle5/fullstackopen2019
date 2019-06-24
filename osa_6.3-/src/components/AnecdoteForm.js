import React from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = ({ store }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    store.dispatch(addAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
