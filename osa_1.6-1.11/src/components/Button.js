import React from "react";

const Button = ({ title, handleOnClick }) => {
  return <button onClick={handleOnClick}>{title}</button>;
};

export default Button;
