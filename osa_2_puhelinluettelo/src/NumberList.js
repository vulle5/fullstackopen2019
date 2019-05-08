import React from "react";

const NumberList = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>{`${person.name} ${person.num}`}</li>
      ))}
    </ul>
  );
};

export default NumberList;
