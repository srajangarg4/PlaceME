import { action } from './common';

export const ADD_COMPLETED_REQUESTS = 'ADD_COMPLETED_REQUESTS';
export const ADD_COMPLETED_REQUEST = 'ADD_COMPLETED_REQUEST';

export const addCompletedRequests = (data) =>
  action(ADD_COMPLETED_REQUESTS, data);
export const addCompletedRequest = (data) =>
  action(ADD_COMPLETED_REQUEST, data);
