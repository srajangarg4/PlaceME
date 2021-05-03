import Role from './roles';

const Screens = {
  jobDescription: {
    path: '/jobDetail',
  },
  personalDetailsForm: {
    path: '/personalDetails',
  },
  dashboard: {
    path: '/dashboard',
  },
  login: {
    path: '/login',
    roles: [Role.ANY],
  },
  signup: {
    path: '/signup',
    roles: [Role.ANY],
  },
  middleware: {
    path: 'Middleware',
    roles: [Role.ANY],
  },
  home: {
    path: '/',
    roles: [Role.ANY],
  },
  busSearchResult: {
    path: '/bus/searchResult',
    roles: [Role.ANY],
  },
  busDetail: {
    path: '/bus/detail',
    roles: [Role.ANY],
  },
  busByOperator: {
    path: '/operator/buses',
  },
  booking: {
    path: '/booking',
    roles: [Role.USER],
  },
  bookingDetail: {
    path: '/booking/detail',
    roles: [Role.USER],
  },
  editBooking: {
    path: '/booking/edit',
    roles: [Role.USER],
  },
  pendingBookings: {
    path: '/booking/pending',
  },
  prevBookings: {
    path: '/booking/previous',
    roles: [Role.USER],
  },
  profile: {
    path: '/profile',
    roles: [Role.USER],
  },
  editProfile: {
    path: '/profile/edit',
    roles: [Role.USER],
  },
  busForm: {
    path: '/bus/edit',
  },
  busRouteForm: {
    path: '/busRoute/edit',
  },
  routeForm: {
    path: '/route/edit',
  },
  stopForm: {
    path: '/stop/edit',
  },
};

export default Screens;
