import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from 'utils';
import Home from './home';

const AppNavigator = () => (
  <Switch>
    <Route path={Routes.home.path} exact component={Home} />
  </Switch>
);
export default AppNavigator;
