import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Role, Routes } from 'utils';
import Icon from './icon';
import { logout } from 'actions/user';
import { UserService } from 'placeme-services/lib';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';

const navOptions = {
  [Role.STUDENT]: [
    {
      icon: 'account_circle',
      label: 'Profile',
      toPath: Routes.profile.path,
    },
    {
      icon: 'work',
      label: 'Jobs',
      toPath: Routes.allJobs.path,
      exact: true,
    },

    {
      icon: 'pending_actions',
      label: 'Update Requests',
      toPath: Routes.allUpdateRequests.path,
    },
    {
      icon: 'how_to_reg',
      label: 'Completed Update Requests',
      toPath: Routes.allCompletedUpdateRequests.path,
    },
    {
      icon: 'logout',
      label: 'Logout',
      onClick: async () => {
        const { successful } = await UserService.logout();
        if (successful) {
          dispatch(logout());
        }
      },
    },
  ],
  [Role.TPO]: [
    {
      icon: 'work',
      label: 'Jobs',
      toPath: Routes.allJobs.path,
      exact: true,
    },

    {
      icon: 'pending_actions',
      label: 'Pending Requests',
      toPath: Routes.allUpdateRequests.path,
    },
    {
      icon: 'business',
      label: 'Companies',
      toPath: Routes.companies.path,
    },
    {
      icon: 'logout',
      label: 'Logout',
      onClick: async () => {
        const { successful } = await UserService.logout();
        if (successful) {
          dispatch(logout());
        }
      },
    },
  ],
};

const Navbar = ({
  links,
  title,
  leftIcon,
  forRole,
  className,
  navItemContainerClassName,
}) => {
  const user = useSelector((state) => state.user);
  const { role } = { ...user };
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
          {navOptions[role].map((option, index) => (
            <NavItem {...option} key={index.toString()} />
          ))}
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  forRole: Role.STUDENT,
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
