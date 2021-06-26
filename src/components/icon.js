import React from 'react';

const Icon = ({ name, className, size }) => {
  return (
    <span style={{fontSize: size}} className={`material-icons mx-1 small ${className ?? ''}`}>
      {name}
    </span>
  );
};



export default Icon;
