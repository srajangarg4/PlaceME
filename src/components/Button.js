import React from 'react';

const Button = ({ onClick, text, className, expand, ...extraProps }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary ${expand ? 'btn-block' : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
