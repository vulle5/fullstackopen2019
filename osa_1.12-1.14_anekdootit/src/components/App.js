import React, { useState } from "react";

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
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected]} votes`}</div>
      <button onClick={() => handleVoting()}>vote</button>
      <button onClick={() => handleNext()}>next anecdotes</button>
    </>
  );
};

export default App;
