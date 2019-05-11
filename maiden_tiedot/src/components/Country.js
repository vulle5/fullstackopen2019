import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      {!Array.isArray(country) ? (
        <>
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
        </>
      ) : (
        "Search and select country"
      )}
    </div>
  );
};

export default Country;
