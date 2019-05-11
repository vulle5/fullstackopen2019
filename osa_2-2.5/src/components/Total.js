import React from "react";

const Total = ({ course: { parts } }) => {
  const total = parts.map(part => part.exercises).reduce((a, c) => a + c);

  return <p>{`yhteensä ${total} tehtävää`}</p>;
};

export default Total;
