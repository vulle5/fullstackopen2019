import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import CountrySearch from "./components/CountrySearch";
import CountryResults from "./components/CountryResults";
import Country from "./components/Country";

const App = () => {
  const [term, setTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [debouncedText] = useDebounce(term, 300);

  useEffect(() => {
    (async () => {
      if (debouncedText.length >= 1) {
        const { data } = await axios.get(
          `https://restcountries.eu/rest/v2/name/${debouncedText}`
        );
        setCountries(data);
      }
    })();
  }, [debouncedText]);

  const handleInputChange = ({ target }) => setTerm(target.value);

  return (
    <div className="App">
      <h1>App</h1>
      <CountrySearch term={term} handleInputChange={handleInputChange} />
      {countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        <CountryResults countries={countries} />
      )}
    </div>
  );
};

export default App;
