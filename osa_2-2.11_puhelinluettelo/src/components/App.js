import React, { useState, useEffect } from "react";

import NumberList from "./NumberList";
import AddNumberForm from "./AddNumberForm";
import NumberFilter from "./NumberFilter";
import personService from "../services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    personService.getAll().then(persons => setPersons(persons));
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handlePersonClick = ({ id, name }) => {
    if (window.confirm(`Poistetaanko henkilö ${name}?`)) {
      personService.deletePerson(id).then(() => getPersons());
    }
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
      : personService.create(personObject).then(person => {
          setPersons(persons.concat(person));
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
      <NumberList persons={numsToShow} handlePersonClick={handlePersonClick} />
    </div>
  );
};

export default App;
