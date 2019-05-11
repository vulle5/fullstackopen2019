import React from "react";

const CountryResults = ({ countries }) => {
  return (
    <>
      {countries.length > 10
        ? "Too many countries"
        : countries.map(country => (
            <div key={country.cioc}>{country.name}</div>
          ))}
    </>
  );
};

export default CountryResults;
