import React from "react";

const Total = ({ course: { parts } }) => {
  const calcTotal = parts => {
    let total = 0;
    parts.map(part => (total += part.exercises));
    return total;
  };

  return <p>{`yhteensä ${calcTotal(parts)} tehtävää`}</p>;
};

export default Total;
