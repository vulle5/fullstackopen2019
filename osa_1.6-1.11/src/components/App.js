import React, { useState } from "react";

import Button from "./Button";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button title="hyvä" handleOnClick={() => setGood(good + 1)} />
      <Button title="neutraali" handleOnClick={() => setNeutral(neutral + 1)} />
      <Button title="huono" handleOnClick={() => setBad(bad + 1)} />
      <h2>Statistiikka</h2>
      <p>{`hyvä ${good}`}</p>
      <p>{`neutraali ${neutral}`}</p>
      <p>{`huono ${bad}`}</p>
    </div>
  );
};

export default App;
