import { action } from './common';

export const ADD_UPDATE_REQUESTS = 'ADD_UPDATE_REQUESTS';
export const ADD_LIMITED_UPDATE_REQUESTS = 'ADD_LIMITED_UPDATE_REQUESTS';
export const ADD_UPDATE_REQUEST = 'ADD_UPDATE_REQUEST';
export const REMOVE_UPDATE_REQUEST = 'REMOVE_UPDATE_REQUEST';

export const addUpdateRequests = (data) => action(ADD_UPDATE_REQUESTS, data);
export const addLimitedUpdateRequests = (data) =>
  action(ADD_LIMITED_UPDATE_REQUESTS, data);
export const addUpdateRequest = (data) => action(ADD_UPDATE_REQUEST, data);
export const removeUpdateRequest = (id) => action(REMOVE_UPDATE_REQUEST, id);
