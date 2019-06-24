import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const onFormSubmit = e => {
    e.preventDefault();
    props.addAnecdote(e.target.anecdote.value);
    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(
  null,
  { addAnecdote }
)(AnecdoteForm);
