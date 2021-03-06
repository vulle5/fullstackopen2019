import React, { useState } from 'react';
import Select from 'react-select';

const Authors = ({ show, result, editAuthor }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const submit = async e => {
    e.preventDefault();

    await editAuthor({
      variables: { name, born }
    });

    setName('');
    setBorn('');
  };

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            options={authors.map(author => ({
              value: author.name,
              label: author.name
            }))}
            onChange={({ value }) => setName(value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
