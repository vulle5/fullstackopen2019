import React from "react";

const CountryResults = ({ countries, handleResultClick }) => {
  return (
    <div>
      {countries.length > 10
        ? "Too many countries"
        : countries.map(country => (
            <div key={country.cioc}>
              {country.name}
              <button onClick={() => handleResultClick(country)}>show</button>
            </div>
          ))}
    </div>
  );
};

export default CountryResults;
