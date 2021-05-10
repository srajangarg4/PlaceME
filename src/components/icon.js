import React from 'react';

const Icon = ({ name, className }) => {
  return <span className={`material-icons ${className ?? ''}`}>{name}</span>;
};

export default Icon;
