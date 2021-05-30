import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Routes } from '../utils';
import Icon from './icon';
import { logout } from '../actions/user';
import { UserService } from 'placeme-services/lib';

const Navbar = ({
  links,
  title,
  leftIcon,
  className,
  navItemContainerClassName,
}) => {
  // const [state, setstate] = useState({ isNavOpen: true });
  const dispatch = useDispatch();
  // const toogle = () => {
  //   setstate({ isNavOpen: !state.isNavOpen });
  // };
  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark bg-dark 
      ${className ?? ''}
      
      `}
    >
      <Link className="navbar-brand" to="/">
        PlaceMe
      </Link>
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
          <NavItem
            icon="home"
            label="Home"
            toPath={Routes.dashboard.path}
            exact={true}
          />
          <NavItem
            icon="account_circle"
            label="Profile"
            toPath={Routes.profile.path}
          />
          <NavItem
            icon="work"
            label="Jobs"
            toPath={Routes.allJobs.path}
            exact={true}
          />
          <NavItem
            icon="work"
            label="Logout"
            onClick={async () => {
              const { successful } = await UserService.logout();
              if (successful) {
                dispatch(logout());
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ className, label, icon, toPath, exact, onClick }) => (
  <div className="nav-item text-light">
    {onClick ? (
      <button
        className="nav-link btn d-flex align-items-center"
        onClick={onClick}
      >
        <Icon name={icon} />
        {label}
      </button>
    ) : (
      <NavLink
        className="nav-link d-flex align-items-center"
        to={toPath}
        exact={exact ?? false}
      >
        <Icon name={icon} />
        {label}
      </NavLink>
    )}
  </div>
);

export default Navbar;
