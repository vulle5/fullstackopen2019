import React, { useState } from "react";

import Button from "./Button";
import Statistic from "./Statistic";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let total = good + bad + neutral;
  let avg = (bad / good) * 100 || 0;
  let positive = (good / total) * 100 || 0;

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button title="hyvä" handleOnClick={() => setGood(good + 1)} />
      <Button title="neutraali" handleOnClick={() => setNeutral(neutral + 1)} />
      <Button title="huono" handleOnClick={() => setBad(bad + 1)} />
      <h2>Statistiikka</h2>
      {good || bad || neutral !== 0 ? (
        <>
          <Statistic text="hyvä" value={good} />
          <Statistic text="neutraali" value={neutral} />
          <Statistic text="huono" value={bad} />
          <Statistic text="yhteensä" value={total} />
          <Statistic text="keskiarvo" value={avg} />
          <Statistic text="positiivisia" value={positive} />
        </>
      ) : (
        "Ei yhtään palautetta annettu"
      )}
    </div>
  );
};

export default App;
