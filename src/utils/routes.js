//Not Used Yet
const JobAppliactionRoutes = {
  jobApplicationDetails: { path: '/job/application/detail' },
  jobApplications: { path: '/job/application/all' },
};

const CompanyRoutes = {
  companyDetails: { path: '/company/details/' },
  companies: { path: '/companies' },
  addCompany: { path: '/company/add' },
  editCompany: { path: '/company/edit/' },
  search: { path: '/search' },
};

//Not Using Yet StudentRoutes
const StudentRoutes = {
  studentDetails: { path: '/student/details' },
  students: { path: '/students' },
};

const JobRoutes = {
  updateJob: { path: '/job/edit/' },
  addNewJob: { path: '/job/new' },
  allJobs: { path: '/jobs' },
  jobDetail: { path: '/job/detail/' },
};

const UpdateRequestRoutes = {
  updateRequestDetail: { path: '/update/requests/detail/' },
  allUpdateRequests: { path: '/update/requests' },
};

const CompletedRequestRoutes = {
  allCompletedUpdateRequests: { path: '/update/completed/requests' },
  completedUpdateRequestsDetail: { path: '/update/completed/request/detail/' },
};

const DepartmentRoutes = {
  addDepartment: { path: '/department/add' },
  departmentDetails: { path: '/department/' },
};

const AuthRoutes = {
  login: { path: '/login' },
  signup: { path: '/signup' },
};

const ProfileRoutes = {
  profile: { path: '/profile' },
  personalDetail: { path: '/profile/personaldetail' },
  academicDetail: { path: '/profile/academicdetail' },
  documents: { path: '/profile/documents' },
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
  ...DepartmentRoutes,
  dashboard: { path: '/' },
  middleware: { path: 'Middleware' },
  default: { path: '/' },
};

export default Route;
