import React from "react";

const NumberFilter = ({ handleFilter, filter }) => {
  return (
    <>
      rajaa näytettäviä: <input value={filter} onChange={handleFilter} />
    </>
  );
};

export default NumberFilter;
