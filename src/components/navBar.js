import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [state, setstate] = useState({ isNavOpen: true });
  const toogle = () => {
    setstate({ isNavOpen: !state.isNavOpen });
  };
  return (
    <div className="navbar bg-dark navbar-expand-md">
      <div className="container">
        <div className="navbar-toggler" onClick={state.isNavOpen} />
        <Link className="navbar-brand mr-auto">
          <h3>PlaceME</h3>
        </Link>
        <div className="navbar navbar-collapse" hidden={state.isNavOpen}>
          <div className="nav navbar" style={{ color: 'white' }}>
            <div className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <span className="material-icons">home</span>Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <span className="material-icons">home</span>Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <span className="material-icons">home</span>Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <span className="material-icons">home</span>Home
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <span className="material-icons">home</span>Home
              </NavLink>
            </div>
          </div>
          <div className="nav navbar ml-auto">
            <div className="nav-item">
              <button className="btn btn-danger button-outline d-flex align-items-center">
                <span className="material-icons">logout</span>Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
