import React from 'react';

function Input({ error, errorMessage, ...extraProps }) {
  return (
    <div>
      <Input {...extraProps} />
      {error && <span>{errorMessage}</span>}
    </div>
  );
}

export default Input;
