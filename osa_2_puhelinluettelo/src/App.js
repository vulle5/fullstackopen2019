import React, { useState } from "react";
import NumberList from "./NumberList";
import AddNumberForm from "./AddNumberForm";
import NumberFilter from "./NumberFilter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", num: "040-123456" },
    { name: "Martti Tienari", num: "040-123456" },
    { name: "Arto Järvinen", num: "040-123456" },
    { name: "Lea Kutvonen", num: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    const newPerson = { name: newName, num: newNumber };
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} on jo luettelossa`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
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
