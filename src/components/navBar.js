import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './icon';

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
    <nav
      className={`navbar navbar-expand-md navbar-dark bg-dark 
      ${className ?? ''}
      
      `}
    >
      <Link className="navbar-brand">{title}</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <Icon className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className={`navbar-nav ${navItemContainerClassName ?? ''}`}>
          <NavItem icon="home" label="Home" toPath="/" />
          <NavItem icon="account_circle" label="Profile" toPath="/" />
          <NavItem icon="work" label="Jobs" toPath="/" />
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
