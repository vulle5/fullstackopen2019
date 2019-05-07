import React from "react";

const Anecdote = ({ anecdotes, selected, votes }) => {
  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected]} votes`}</div>
    </>
  );
};

export default Anecdote;
