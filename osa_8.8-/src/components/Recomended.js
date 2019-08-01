import React from 'react';

const Recomended = ({ show, result, books }) => {
  if (!show) {
    return null;
  }

  if (result.loading || books.loading) {
    return <div>loading...</div>;
  }

  const booksFromDb = books.data.allBooks;
  const favoriteGenre = result.data.me.favoriteGenre;

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
          {booksFromDb.map(
            a =>
              a.genres.includes(favoriteGenre) && (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recomended;
