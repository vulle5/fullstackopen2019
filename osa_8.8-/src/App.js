import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recomended from './components/Recomended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token');
    token && setToken(token);
  }, []);

  const client = new useApolloClient();

  const ALL_AUTHORS = gql`
    {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `;

  const ALL_BOOKS = gql`
    query allBooks($genre: String) {
      allBooks(genre: $genre) {
        title
        author {
          name
          born
        }
        published
        genres
      }
    }
  `;

  const ME = gql`
    {
      me {
        username
        favoriteGenre
      }
    }
  `;

  const ADD_BOOK = gql`
    mutation addBook(
      $title: String!
      $author: String!
      $published: Int!
      $genres: [String!]!
    ) {
      addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ) {
        title
        author {
          id
          name
        }
        published
        genres
      }
    }
  `;

  const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
      editAuthor(name: $name, setBornTo: $born) {
        name
        born
      }
    }
  `;

  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
  `;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const whoami = useQuery(ME);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [login] = useMutation(LOGIN, {
    onError: () => console.log('Error login in')
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recomended')}>recomended</button>
        )}
        <button onClick={token ? () => logout() : () => setPage('login')}>
          {token ? 'logout' : 'login'}
        </button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={books}
        client={client}
        ALL_BOOKS={ALL_BOOKS}
      />

      <NewBook show={page === 'add'} addBook={addBook} client={client} />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={token => setToken(token)}
      />

      <Recomended
        show={page === 'recomended'}
        result={whoami}
        client={client}
        ALL_BOOKS={ALL_BOOKS}
      />
    </div>
  );
};

export default App;
