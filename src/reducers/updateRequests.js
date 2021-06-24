import {
  ADD_LIMITED_UPDATE_REQUESTS,
  ADD_UPDATE_REQUEST,
  ADD_UPDATE_REQUESTS,
  REMOVE_UPDATE_REQUEST,
} from 'actions/pendingRequests';

const initialState = {
  requests: {},
  hasAlreadyFetchedRequests: false,
};

const updateRequestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_UPDATE_REQUESTS: {
      payload?.forEach(({ id, data }) => {
        state = {
          ...state,
          requests: { ...state.requests, [id]: data },
        };
      });
      return { ...state, hasAlreadyFetchedRequests: true };
    }
    case ADD_UPDATE_REQUEST: {
      const { id, data } = payload;
      return {
        ...state,
        requests: { ...state.requests, [id]: data },
      };
    }
    case ADD_LIMITED_UPDATE_REQUESTS: {
      payload?.forEach(({ data, id }) => {
        state = {
          ...state,
          requests: { ...state.requests, [id]: data },
        };
      });
      return { ...state };
    }
    case REMOVE_UPDATE_REQUEST: {
      const id = payload;
      delete state.requests?.[id];
      return { ...state };
    }
    default:
      return state;
  }
};
export default updateRequestReducer;
