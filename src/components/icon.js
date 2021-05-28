import React from 'react';

const Icon = ({ name, className }) => {
  return (
    <span className={`material-icons px-1 ${className ?? ''}`}>{name}</span>
  );
};

export default Icon;
