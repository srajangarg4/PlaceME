import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UserService } from 'placeme-services/lib';
import { Routes } from 'utils';
import ComponentResolver from './componentResolver';
import { Signup } from './auth';
import { StudentDashboard, StudentProfile } from './app/student';
import { TPODashboard } from './app/tpo';
import Home from './app/home';
import { formSections } from './app/profile/utils';
import { AllJobs, JobDescription, JobForm, EditJob } from './app/job';
import { onStartup } from 'middleware';
import {
  AllCompletedRequests,
  AllUpdateRequests,
  UpdateRequestDetails,
} from './app/updateRequest';
import {
  CompanyDetails,
  CompanyForm,
  EditCompany,
  Companies,
} from './app/company';
import { AddDepartment, DepartmentDetail } from './app/department';

const ApplicationNavigator = () => {
  const history = useHistory();
  useEffect(() => {
    UserService.firebaseRef.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await onStartup(user.email);
      } else {
        history.push(Routes.default.path);
      }
    });
  }, [history]);

  return (
    <Switch>
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
        path={Routes.jobDetail.path + ':id'}
        component={ComponentResolver({
          studentComponent: JobDescription,
          tpoComponent: JobDescription,
        })}
      />
      <Route
        exact
        path={Routes.addNewJob.path}
        component={ComponentResolver({ tpoComponent: JobForm })}
      />
      <Route
        exact
        path={Routes.updateJob.path + ':id'}
        component={ComponentResolver({ tpoComponent: EditJob })}
      />
      <Route
        exact
        path={Routes.allUpdateRequests.path}
        component={ComponentResolver({
          studentComponent: AllUpdateRequests,
          tpoComponent: AllUpdateRequests,
          hodComponent: AllUpdateRequests,
        })}
      />
      <Route
        exact
        path={Routes.updateRequestDetail.path + ':id'}
        component={ComponentResolver({
          studentComponent: UpdateRequestDetails,
          tpoComponent: UpdateRequestDetails,
          hodComponent: UpdateRequestDetails,
        })}
      />
      <Route
        exact
        path={Routes.addCompany.path}
        component={ComponentResolver({ tpoComponent: CompanyForm })}
      />
      <Route
        exact
        path={Routes.companyDetails.path + ':id'}
        component={ComponentResolver({ tpoComponent: CompanyDetails })}
      />
      <Route
        exact
        path={Routes.companies.path}
        component={ComponentResolver({ tpoComponent: Companies })}
      />
      <Route
        exact
        path={Routes.allCompletedUpdateRequests.path}
        component={ComponentResolver({
          studentComponent: AllCompletedRequests,
        })}
      />
      <Route
        exact
        path={Routes.addDepartment.path}
        component={ComponentResolver({ tpoComponent: AddDepartment })}
      />
      <Route
        exact
        path={Routes.departmentDetails.path + ':id'}
        component={ComponentResolver({ tpoComponent: DepartmentDetail })}
      />
      <Route
        exact
        path={Routes.editCompany.path + ':id'}
        component={ComponentResolver({ tpoComponent: EditCompany })}
      />
      <Route component={ComponentResolver({})} />
    </Switch>
  );
};

export default ApplicationNavigator;
