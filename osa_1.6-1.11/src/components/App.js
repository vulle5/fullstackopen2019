import React, { useState } from "react";

import Button from "./Button";
import Statistics from "./Statistics";

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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
