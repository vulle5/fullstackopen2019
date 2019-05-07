import React from "react";

const Total = ({ part1, part2, part3 }) => {
  return (
    <p>
      yhteensä {part1.exercises + part2.exercises + part3.exercises} tehtävää
    </p>
  );
};

export default Total;
