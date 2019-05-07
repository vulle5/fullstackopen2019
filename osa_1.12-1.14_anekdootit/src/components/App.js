import React, { useState } from "react";
import Button from "./Button";
import Anecdote from "./Anecdote";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(5).fill(0));

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * Math.floor(5)));
  };

  const handleVoting = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button title="vote" onClick={handleVoting} />
      <Button title="next anecdotes" onClick={handleNext} />
      <h2>Anecdote with most votes</h2>
      <Anecdote
        anecdotes={anecdotes}
        selected={votes.indexOf(Math.max(...votes))}
        votes={votes}
      />
    </>
  );
};

export default App;
