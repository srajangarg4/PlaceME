import { action } from './common';

export const ADD_REQUESTS = 'ADD_REQUESTS';

export const addRequests = (data) => action(ADD_REQUESTS, data);
