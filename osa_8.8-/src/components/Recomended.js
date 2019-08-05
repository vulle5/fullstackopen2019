import React, { useState, useEffect } from 'react';

const Recomended = ({ show, result, client, ALL_BOOKS }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      if (!result.loading) {
        const { data } = await client.query({
          query: ALL_BOOKS,
          variables: { genre: result.data.me.favoriteGenre }
        });
        setBooks(data.allBooks);
      }
    })();
  }, [ALL_BOOKS, client, result]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recomended</h2>
      <p>Books that are recomended to you</p>
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
    </div>
  );
};

export default Recomended;
