import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{`${value} ${text === "positiivisia" ? "%" : ""}`}</td>
    </tr>
  );
};

export default Statistic;
