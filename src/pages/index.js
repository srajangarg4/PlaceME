import React, { useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Roles, Routes } from '../utils';
import ComponentResolver from './componentResolver';
import { Login, Signup } from './auth';
import { StudentDashboard, StudentProfile } from './app/student';
import { TPODashboard } from './app/tpo';
import Home from './app/home';
import { formSections } from './app/profile/utils';
import { AllJobs, JobDescription } from './app/job';
import { useDatabase } from '../hooks';
import {
  AcademicDetailService,
  PersonalDetailService,
} from 'placeme-services/lib';
import { useDispatch } from 'react-redux';
import { addPersonalDetail } from '../actions/personalDetails';
import { addAcademicDetail } from '../actions/academicDetails';

const fetchPersonalAndAcademicDetail = async (user) => {
  const personalDetailService = new PersonalDetailService();
  const personalDetailResult = await personalDetailService.get(user);
  const academicDetailService = new AcademicDetailService();
  const academicDetailResult = await academicDetailService.get(user);
  return {
    successful:
      personalDetailResult.successful && academicDetailResult.successful,
    result: {
      personalDetail: personalDetailResult.result,
      academicDetail: academicDetailResult.result,
    },
    error: personalDetailResult.error ?? academicDetailResult.error,
  };
};

const ApplicationNavigator = () => {
  console.log('Rednder pura');
  const user = useSelector((state) => state.user);
  const personalAndAcademicDatabase = useDatabase(() =>
    fetchPersonalAndAcademicDetail('17egjcs161@gitjaipur.com'),
  );
  const dispatch = useDispatch();

  const checkLogin = useCallback(() => {
    return !!user;
  }, [user]);

  useEffect(() => {
    if (user.role === Roles.STUDENT) {
      personalAndAcademicDatabase.callDatabase((data) => {
        const { personalDetail, academicDetail } = data;
        dispatch(addPersonalDetail(personalDetail));
        dispatch(addAcademicDetail(academicDetail));
      });
    }
  }, [checkLogin]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default ApplicationNavigator;
