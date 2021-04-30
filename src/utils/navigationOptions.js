import Roles from './roles';
import { removeAuth } from '../actions';
import { dispatch } from '../store';
import Routes from './routes';

const AnnonymousAuthNavigations = [
  { name: 'Login', link: Routes.login.path },
  { name: 'Register', link: Routes.signup.path },
];
const AuthUserNavigations = [
  { name: 'View Profile', link: Routes.profile.path },
  { name: 'Edit Profile', link: Routes.editProfile.path },
  {
    name: 'Logout',
    onClick: () => {
      dispatch(removeAuth());
    },
  },
];

const AnnonymousNavigation = [
  {
    name: 'Home',
    link: Routes.home.path,
  },
];

const UserNavigationOptions = [
  { name: 'Past Bookings', link: Routes.booking.path },
];

const OperatorNavigation = [
  {
    name: 'Bus',
    link: Routes.busByOperator.path,
  },
  {
    name: 'Pending bookings',
    link: Routes.pendingBookings.path,
  },
];

const OperatorAuthOptions = [
  { name: 'Add operator', link: Routes.profile.path },
  ...AuthUserNavigations,

];

const authOptiosForRole = {
  [Roles.OPERATOR]: OperatorAuthOptions,
  [Roles.USER]: AuthUserNavigations,
};

export const getAuthOptions = (isAuthenticated, role) => (
  isAuthenticated ? authOptiosForRole[role] : AnnonymousAuthNavigations
);

export const getMenuOptions = (role) => {
  let result = [...AnnonymousNavigation];
  if (role) {
    result = [...result, ...UserNavigationOptions];
  }
  if (role === Roles.OPERATOR) {
    // @ts-ignore
    result = [...result, ...OperatorNavigation];
  }
  return result;
};
