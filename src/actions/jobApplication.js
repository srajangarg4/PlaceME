import { action } from './common';

export const ADD_JOB_APPLICATION = 'ADD_JOB_APPLICATION';
export const ADD_JOB_APPLICATIONS = 'ADD_JOB_APPLICATIONS';

export const addJobApplication = (jobApplication) =>
  action(ADD_JOB_APPLICATION, jobApplication);
export const addJobApplications = (jobApplications) =>
  action(ADD_JOB_APPLICATIONS, jobApplications);
