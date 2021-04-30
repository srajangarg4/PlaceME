import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../utils';
import Signup from './signup';
import Login from './login';

const AppNavigator = () => (
  <Switch>
    <Route path={Routes.login.path} exact component={Login} />
    <Route path={Routes.signup.path} exact component={Signup} />
  </Switch>
);
export default AppNavigator;