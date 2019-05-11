import React, { useState, useEffect } from "react";

import NumberList from "./NumberList";
import AddNumberForm from "./AddNumberForm";
import NumberFilter from "./NumberFilter";
import personService from "../services/persons";
import BannerMessage from "./BannerMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerType, setBannerType] = useState("success");

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
      personService
        .deletePerson(id)
        .then(() => getPersons())
        .catch(error => {
          setBannerType("error");
          setBannerMessage(
            `Henkilö '${name}' on jo valitettavasti poistettu palvelimelta`
          );
          setTimeout(() => {
            setBannerMessage(null);
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const personObject = {
      name: newName,
      num: newNumber
    };

    if (persons.some(person => person.name === personObject.name)) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        const updatePerson = persons.find(
          person => person.name === personObject.name
        );
        personService
          .update(updatePerson.id, personObject)
          .then(() => getPersons());
      }
    } else {
      personService.create(personObject).then(person => {
        setBannerType("success");
        setBannerMessage(`Lisätty ${person.name}`);
        setTimeout(() => {
          setBannerMessage(null);
        }, 5000);
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const numsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <BannerMessage message={bannerMessage} type={bannerType} />
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
