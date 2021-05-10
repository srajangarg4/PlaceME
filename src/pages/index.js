import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavigation from './app';
import AuthNavigation from './auth';
import JobNavigator from './job';

const ApplicationNavigator = () => {
  return (
    <Router>
      <AuthNavigation />
      <AppNavigation />
      <JobNavigator />
    </Router>
  );
};

export default ApplicationNavigator;
