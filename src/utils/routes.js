const JobAppliactionRoutes = {
  jobApplicationDetails: {
    path: '/job/application/detail',
  },
  jobApplications: {
    path: '/job/application/all',
  },
};

const CompanyRoutes = {
  companyDetails: {
    path: '/company/details',
  },
  companies: {
    path: '/companies',
  },
};

const StudentRoutes = {
  studentDetails: {
    path: '/student/details',
  },
  students: {
    path: '/students',
  },
};

const JobRoutes = {
  jobBase: {
    path: '/job',
  },
  newJob: {
    path: '/job/new',
  },
  updateJob: {
    path: '/job/edit',
  },
  addNewJob: {
    path: '/job/new',
  },
  allJobs: {
    path: '/jobs',
  },
  jobDetails: {
    path: '/job/:id',
  },
};

const UpdateRequestRoutes = {
  newUpdateRequest: {
    path: '/update/requests/new',
  },
  editUpdateRequest: {
    path: '/update/requests/edit',
  },
  updateRequestDetails: {
    path: '/update/requests/details',
  },
};

const AuthRoutes = {
  login: {
    path: '/login',
  },
  signup: {
    path: '/signup',
  },
};

const ProfileRoutes = {
  profile: {
    path: '/profile',
  },
  personalDetail: {
    path: '/profile/personaldetail',
  },
  academicDetail: {
    path: '/profile/academicDetail',
  },
  documents: {
    path: '/profile/documents',
  },
};

const Route = {
  ...JobAppliactionRoutes,
  ...CompanyRoutes,
  ...StudentRoutes,
  ...JobRoutes,
  ...UpdateRequestRoutes,
  ...AuthRoutes,
  ...ProfileRoutes,
  dashboard: {
    path: '/',
  },
  middleware: {
    path: 'Middleware',
  },
  default: {
    path: '/',
  },
};

export default Route;
