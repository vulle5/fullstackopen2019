import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>
        population: {new Intl.NumberFormat().format(country.population)}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" height="96" />
    </div>
  );
};

export default Country;
