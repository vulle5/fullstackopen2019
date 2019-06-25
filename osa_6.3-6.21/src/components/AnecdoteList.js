import React from "react";
import { connect } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  closeNotification
} from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const onVoteClick = anecdote => {
    props.incrementVote(anecdote);
    props.setNotification(`You voted ${anecdote.content}`, 5);
  };

  return (
    <>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVoteClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const filterAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter));
};

const mapStateToProps = state => {
  console.log(state);

  return {
    visibleAnecdotes: filterAnecdotes(state),
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementVote: value => {
      dispatch(incrementVote(value));
    },
    setNotification: (value, seconds) => {
      dispatch(setNotification(value, seconds));
    },
    closeNotification: () => {
      dispatch(closeNotification());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
