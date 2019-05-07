import React from "react";

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  let avg = (bad / good) * 100 || 0;
  let positive = (good / total) * 100 || 0;

  return (
    <>
      <h2>Statistiikka</h2>
      <p>{`hyvä ${good}`}</p>
      <p>{`neutraali ${neutral}`}</p>
      <p>{`huono ${bad}`}</p>
      <p>{`yhteensä ${total}`}</p>
      <p>{`keskiarvo ${avg}`}</p>
      <p>{`positiivista ${positive}%`}</p>
    </>
  );
};

export default Statistics;
