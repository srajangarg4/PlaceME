import React from 'react';

const dropdownButton = () => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item">
          Action
        </button>
        <button className="dropdown-item">
          Another action
        </button>
        <button className="dropdown-item" >
          Something else here
        </button>
      </div>
    </div>
  );
};

export default dropdownButton;
