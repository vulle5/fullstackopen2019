import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", num: "050-1234567" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
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

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{`${person.name} ${person.num}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
