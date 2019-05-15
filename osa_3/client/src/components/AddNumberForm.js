import React from "react";

const AddNumberForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit()}>
      <div>
        nimi: <input value={newName} onChange={handleNameChange()} />
      </div>
      <div>
        numero: <input value={newNumber} onChange={handleNumberChange()} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

export default AddNumberForm;
