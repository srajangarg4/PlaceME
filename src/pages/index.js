import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from 'utils';
import ComponentResolver from './componentResolver';
import { Login, Signup } from './auth';
import { StudentDashboard, StudentProfile } from './app/student';
import { TPODashboard } from './app/tpo';
import Home from './app/home';
import { formSections } from './app/profile/utils';
import { AllJobs, JobDescription, JobForm } from './app/job';
import { UserService } from 'placeme-services/lib';
import { fetchUserDetail } from 'middleware/auth';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AllCompletedRequests, AllUpdateRequests, UpdateRequestDetails } from './app/updateRequest';
import { CompanyDetails, CompanyForm } from './app/company';
import { JobApplicantDeatils, JobApplicants } from './app/job/jobApplicants';
import Companies from './app/company/companies';
import SearchPage from './app/searchPage';

const ApplicationNavigator = () => {
  const history = useHistory();
  useEffect(() => {
    UserService.firebaseRef.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await fetchUserDetail(user.email);
      } else {
        history.push('/');
      }
    });
  }, [history]);

  return (
    <Switch>
      <Route
        path={Routes.login.path}
        exact
        component={ComponentResolver({ defaultComponent: Login })}
      />
      <Route
        exact
        path={Routes.signup.path}
        component={ComponentResolver({ defaultComponent: Signup })}
      />
      <Route
        exact
        path={Routes.dashboard.path}
        component={ComponentResolver({
          studentComponent: StudentDashboard,
          tpoComponent: TPODashboard,
          defaultComponent: Home,
        })}
      />
      <Route
        exact
        path={Routes.profile.path}
        component={ComponentResolver({
          studentComponent: () => (
            <StudentProfile section={formSections.general} />
          ),
        })}
      />
      <Route
        exact
        path={Routes.academicDetail.path}
        component={ComponentResolver({
          studentComponent: () => (
            <StudentProfile section={formSections.academics} />
          ),
        })}
      />
      <Route
        exact
        path={Routes.personalDetail.path}
        component={ComponentResolver({
          studentComponent: () => (
            <StudentProfile section={formSections.personal} />
          ),
        })}
      />
      <Route
        exact
        path={Routes.documents.path}
        component={ComponentResolver({
          studentComponent: () => (
            <StudentProfile section={formSections.documents} />
          ),
        })}
      />
      <Route
        exact
        path={Routes.allJobs.path}
        component={ComponentResolver({
          studentComponent: AllJobs,
          tpoComponent: AllJobs,
        })}
      />
      <Route
        exact
        path={Routes.jobDetails.path}
        component={ComponentResolver({
          studentComponent: JobDescription,
          tpoComponent: JobDescription,
        })}
      />
      <Route
        exact
        path={Routes.addNewJob.path}
        component={ComponentResolver({ studentComponent: JobForm })}
      />
      <Route
        exact
        path={Routes.allUpdateRequests.path}
        component={ComponentResolver({
          studentComponent: AllUpdateRequests,
          tpoComponent: AllUpdateRequests,
        })}
      />
      <Route
        exact
        path={Routes.updateRequestDetails.path + '/:id'}
        component={ComponentResolver({
          studentComponent: UpdateRequestDetails,
          tpoComponent: UpdateRequestDetails,
        })}
      />
      <Route
        exact
        path={Routes.addCompany.path}
        component={ComponentResolver({
          tpoComponent: CompanyForm,
        })}
      />
      <Route
        exact
        path={Routes.search.path}
        component={ComponentResolver({
          tpoComponent: SearchPage,
        })}
      />
      <Route
        exact
        path={Routes.companyDetails.path + '/:id'}
        component={ComponentResolver({
          tpoComponent: CompanyDetails,
        })}
      />
      <Route
        exact
        path={Routes.jobApplicants.path}
        component={ComponentResolver({
          tpoComponent: JobApplicants,
          studentComponent: JobApplicants,
        })}
      />
      <Route
        exact
        path={`${Routes.jobApplicantDetails.path}/:id`}
        component={ComponentResolver({
          tpoComponent: JobApplicantDeatils,
          studentComponent: JobApplicantDeatils,
        })}
      />
      <Route
        exact
        path={Routes.companies.path}
        component={ComponentResolver({
          tpoComponent: Companies,
        })}
      />
      <Route
        exact
        path={Routes.allCompletedUpdateRequests.path}
        component={ComponentResolver({
          studentComponent: AllCompletedRequests,
        })}
      />
      <Route component={ComponentResolver({})} />
    </Switch>
  );
};

export default ApplicationNavigator;
