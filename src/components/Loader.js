import React from 'react';

const Loader = ({ className }) => {
  return (
    <div className={`spinner-border ${className ?? ''}`} role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
