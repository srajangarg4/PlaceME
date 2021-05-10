import { AUTH_UPDATE, AUTH_REMOVE } from '../actions';

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_UPDATE: {
      break;
    }
    case AUTH_REMOVE:
     
      return {};
    default:
      return state;
  }
};

export default authReducer;