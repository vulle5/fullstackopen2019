import React from "react";

const Notification = ({ store }) => {
  const { notification } = store.getState();
  const visible = notification === "" && { display: "none" };

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return (
    <div style={{ ...style, ...visible }}>{`You voted '${notification}'`}</div>
  );
};

export default Notification;
