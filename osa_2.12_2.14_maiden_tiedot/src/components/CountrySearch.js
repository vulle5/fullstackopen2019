import React from "react";

const CountrySearch = ({ term, handleInputChange }) => {
  return (
    <>
      find countries: <input value={term} onChange={handleInputChange} />
    </>
  );
};

export default CountrySearch;
