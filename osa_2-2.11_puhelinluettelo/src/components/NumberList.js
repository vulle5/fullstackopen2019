import React, { Fragment } from "react";

const NumberList = ({ persons, handlePersonClick }) => {
  return (
    <ul>
      {persons.map(person => (
        <Fragment key={person.id}>
          <li>{`${person.name} ${person.num}`}</li>
          <button onClick={() => handlePersonClick(person)}>poista</button>
        </Fragment>
      ))}
    </ul>
  );
};

export default NumberList;
