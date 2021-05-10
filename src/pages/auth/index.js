import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../utils';
import Signup from './signup';
import Login from './login';
import PersonalDetailsFrom from './personalDetailsForm';
import Dashboard from './dashboard';
import Home from '../app/home';

const AppNavigator = () => (
  <Switch>
    <Route path={Routes.login.path} exact component={Login} />
    <Route path={Routes.signup.path} exact component={Signup} />
    <Route
      path={Routes.personalDetailsForm.path}
      exactcomponent={PersonalDetailsFrom}
    />
    <Route path={Routes.dashboard.path} exact component={Dashboard} />
  </Switch>
);
export default AppNavigator;
