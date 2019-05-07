import React from "react";

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return <p>yhteensä {exercises1 + exercises2 + exercises3} tehtävää</p>;
};

export default Total;
