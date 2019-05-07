import React from "react";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const part1 = {
    name: "Reactin perusteet",
    exercises: 10
  };
  const part2 = {
    name: "Tiedonvälitys propseilla",
    exercises: 7
  };
  const part3 = {
    name: "Komponenttien tila",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
