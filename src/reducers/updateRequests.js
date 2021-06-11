import { ADD_REQUESTS } from 'actions/pendingRequests';

const initailState = {
  requests: [],
};

const updateRequestReducer = (state = initailState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REQUESTS: {
      return { ...state, requests: [...payload] };
    }
    default:
      return state;
  }
};
export default updateRequestReducer;
