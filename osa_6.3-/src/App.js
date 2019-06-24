import React, { useEffect } from "react";
import { connect } from "react-redux";
import anecdoteService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = props => {
  useEffect(() => {
    anecdoteService.getAll().then(notes => props.initializeAnecdotes(notes));
  }, [props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);
