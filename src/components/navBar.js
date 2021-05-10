import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '.';
import '../gradients.css';

const Navbar = ({
  links,
  title,
  leftIcon,
  className,
  navItemContainerClassName,
}) => {
  const [state, setstate] = useState({ isNavOpen: true });
  const toogle = () => {
    setstate({ isNavOpen: !state.isNavOpen });
  };
  return (
    <nav className="navbar bg-dark navbar-expand-md">
      <div className="container">
        <div className="navbar-toggler" onClick={state.isNavOpen} />
        <Link className="navbar-brand mr-auto nav-link">
          <h3>PlaceME</h3>
        </Link>
        <div className="navbar navbar-collapse" hidden={state.isNavOpen}>
          <div className="nav navbar">
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
    </nav>
  );
};

const NavItem = ({ className, label, icon, toPath }) => (
  <div className="nav-item text-light">
    <NavLink className="nav-link d-flex align-items-center" to={toPath}>
      <Icon name={icon} />
      <span>{label}</span>
    </NavLink>
  </div>
);

export default Navbar;
