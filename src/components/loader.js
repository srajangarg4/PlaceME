import React from 'react';

const Loader = ({ className }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={`spinner-border ${className ?? ''}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
