import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AUTH_STATE, getData } from '../AsyncStorage';
import AppNavigation from './app';
import AuthNavigation from './auth';
import Middleware from './middleware';
import { updateAuth } from '../actions';
import JobNavigator from './job';
import { ProfileNavigator } from './profile';
import PendingRequest from './pendingRequest';

const modules = { middleware: 'middleware', auth: 'auth', app: 'app' };

const ApplicationNavigator = () => {
  const dispatch = useDispatch();

  const [module, setModule] = useState(modules.middleware);
  // @ts-ignore
  const auth = useSelector((state) => state.auth);

  const checkLogin = useCallback(() => {
    let data = { ...auth };
    if (!auth?.token) {
      console.log('Token not found');
      data = getData(AUTH_STATE);
      dispatch(updateAuth(data));
    }
    if (data?.token) {
      console.log('token', data.token);
      setModule(modules.app);
    } else {
      setModule(modules.auth);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  console.log('moudule', module);
  return (
    <Router>
      {module === modules.middleware && <Middleware />}
      {module === modules.app && <AppNavigation />}
      {module === modules.auth && <AuthNavigation />}
      <JobNavigator />
      <ProfileNavigator />
      <Route path="/pendingRequest" exact component={PendingRequest} />
    </Router>
  );
};

export default ApplicationNavigator;
