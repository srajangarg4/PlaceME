import { HttpMethods } from '../utils/httpUtils';

const { GET } = HttpMethods;
export const AUTH_UPDATE = 'AUTH_UPDATE';
export const AUTH_REMOVE = 'AUTH_REMOVE';
export const APICALL = 'APICALL';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_REMOVE = 'USER_REMOVE';

export const emptyAction = (type) => ({ type });
export const action = (type, payload) => ({ type, payload });

export const updateAuth = (auth) => action(AUTH_UPDATE, auth);
export const removeAuth = () => emptyAction(AUTH_REMOVE);

export const apiRequest = (request, success, failure) =>
  action(APICALL, {
    request,
    success,
    failure,
  });
export const makeApiCall = (endPoint, method, payload, resolve, reject) => ({
  request: {
    endPoint,
    method,
    payload,
  },
  success: {
    resolve,
  },
  failure: {
    reject,
  },
});
export const apiCall = (endPoint, resolve, reject, method = GET, data) => {
  const api = makeApiCall(endPoint, method, data, resolve, reject);
  const { request, success, failure } = api;
  return apiRequest(request, success, failure);
};
