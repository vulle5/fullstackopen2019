import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const handleChange = e => {
    setNewName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newPerson = { name: newName };
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} on jo luettelossa`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName('')
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={handleSubmit} >
        <div>
          nimi: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )

};

export default App
