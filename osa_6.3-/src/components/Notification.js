import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  const visible = props.notification === "" && { display: "none" };

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return (
    <div style={{ ...style, ...visible }}>{`You voted '${
      props.notification
    }'`}</div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
