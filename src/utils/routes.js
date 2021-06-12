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
  addCompany: {
    path: '/company/add',
  },
  editCompany: {
    path: '/company/edit/',
  },
  search: {
    path: '/search',
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
  jobDetailsBase: {
    path: '/job/detail/',
  },
  jobDetails: {
    path: '/job/detail/:id',
  },
  jobApplicants: {
    path: '/job/applicants',
  },
  jobApplicantDetails: {
    path: '/job/applicants/details',
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
  allUpdateRequests: {
    path: '/update/requests',
  },
};

const CompletedRequestRoutes = {
  updateRequestDetails: {
    path: '/update/requests/details',
  },
  allCompletedUpdateRequests: {
    path: '/update/completed/requests',
  },
  completedUpdateRequestsDetail: {
    path: '/update/completed/request/detail',
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
  ...CompletedRequestRoutes,
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
