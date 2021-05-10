import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavigation from './app';
import AuthNavigation from './auth';
import JobNavigator from './job';
import { ProfileNavigator } from './profile';
import PendingRequest from './pendingRequest';

const ApplicationNavigator = () => {
  return (
    <Router>
      <AuthNavigation />
      <AppNavigation />
      <JobNavigator />
      <ProfileNavigator />
      <Route path="/pendingRequest" exact component={PendingRequest} />
    </Router>
  );
};

export default ApplicationNavigator;
