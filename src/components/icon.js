import React from 'react';

const Icon = ({ name, className }) => {
  return (
    <span className={`material-icons mx-1 ${className ?? ''}`}>{name}</span>
  );
};

export default Icon;
