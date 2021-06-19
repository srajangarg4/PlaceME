import {
  ADD_COMPLETED_REQUEST,
  ADD_COMPLETED_REQUESTS,
} from 'actions/completedRequest';

const initialState = {
  requests: {},
  hasAlreadyFetchedRequests: false,
};

const completedRequestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_COMPLETED_REQUESTS:
      payload?.forEach(({ id, data }) => {
        state = {
          ...state,
          requests: { ...state.requests, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedRequests: true };
    case ADD_COMPLETED_REQUEST:
      const { id, data } = payload;
      return {
        ...state,
        requests: { ...state.requests, [id]: data },
      };
    default:
      return state;
  }
};

export default completedRequestReducer;
