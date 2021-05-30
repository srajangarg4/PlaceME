import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../utils';
import ComponentResolver from './componentResolver';
import { Login, Signup } from './auth';
import { StudentDashboard, StudentProfile } from './app/student';
import { TPODashboard } from './app/tpo';
import Home from './app/home';
import { formSections } from './app/profile/utils';
import { AllJobs, JobDescription } from './app/job';
import { UserService } from 'placeme-services/lib';
import { fetchUserDetail } from '../middleware/auth';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ApplicationNavigator = () => {
  const history = useHistory();
  useEffect(() => {
    UserService.firebaseRef.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await fetchUserDetail(user.email);
      } else {
        history.push('/login');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        component={ComponentResolver({ studentComponent: JobDescription })}
      />
      <Route component={ComponentResolver({})} />
    </Switch>
  );
};

export default ApplicationNavigator;
