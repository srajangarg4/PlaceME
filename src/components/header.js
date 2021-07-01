import React from 'react';
import 'gradients.css';

const Header = ({ children }) => {
  return (
    <div className="jumbotron light-blue" style={{ borderRadius: '0px' }}>
      <div className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <div className="row">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
