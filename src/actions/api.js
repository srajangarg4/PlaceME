import { HttpMethods } from '../utils';
import { action } from './common';

const { GET } = HttpMethods;

export const APICALL = 'APICALL';

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
