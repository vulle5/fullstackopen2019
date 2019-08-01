import React, { useState, useEffect } from 'react';

const Books = ({ show, result }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(result.data.allBooks);
  }, [result.data.allBooks]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const booksFromDb = result.data.allBooks;
  const genres = [...new Set(booksFromDb.map(b => b.genres).flat())];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() =>
              setBooks(booksFromDb.filter(book => book.genres.includes(genre)))
            }
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
