import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import CountrySearch from "./components/CountrySearch";
import CountryResults from "./components/CountryResults";
import Country from "./components/Country";

const App = () => {
  const [term, setTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [debouncedText] = useDebounce(term, 300);

  useEffect(() => {
    (async () => {
      if (debouncedText.length >= 1) {
        const { data } = await axios.get(
          `https://restcountries.eu/rest/v2/name/${debouncedText}`
        );
        setCountries(data);
        setCurrentCountry(data[0]);
      }
    })();
  }, [debouncedText]);

  const handleInputChange = ({ target }) => setTerm(target.value);

  const handleResultClick = country => {
    setCurrentCountry(country);
  };

  return (
    <div className="App">
      <h1>App</h1>
      <CountrySearch term={term} handleInputChange={handleInputChange} />
      <CountryResults
        countries={countries}
        handleResultClick={handleResultClick}
      />
      <Country country={currentCountry} />
    </div>
  );
};

export default App;
