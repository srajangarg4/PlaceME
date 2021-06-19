import { action } from './common';

export const ADD_JOB = 'ADD_JOB';
export const ADD_JOBS = 'ADD_JOBS';
export const ADD_LIMITED_JOBS = 'ADD_LIMITED_JOBS';

export const addJobs = (jobs) => action(ADD_JOBS, jobs);
export const addJob = (job) => action(ADD_JOB, job);
export const addLimitedJobs = (jobs) => action(ADD_LIMITED_JOBS, jobs);
