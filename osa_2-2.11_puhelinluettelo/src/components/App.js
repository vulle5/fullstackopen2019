import React, { useState, useEffect } from "react";

import NumberList from "./NumberList";
import AddNumberForm from "./AddNumberForm";
import NumberFilter from "./NumberFilter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3001/persons");
      setPersons(data);
    })();
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const personObject = {
      name: newName,
      num: newNumber
    };

    const newPerson = { name: newName, num: newNumber };
    persons.some(person => person.name === newPerson.name)
      ? alert(`${newName} on jo luettelossa`)
      : axios
          .post("http://localhost:3001/persons", personObject)
          .then(response => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
          });
  };

  const numsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <NumberFilter filter={filter} handleFilter={handleFilter} />
      <h2>lisää</h2>
      <AddNumberForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={() => handleNameChange}
        handleNumberChange={() => handleNumberChange}
        handleSubmit={() => handleSubmit}
      />
      <h2>Numerot</h2>
      <NumberList persons={numsToShow} />
    </div>
  );
};

export default App;
