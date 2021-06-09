import { LOGIN, LOGOUT } from 'actions';
import { Roles } from 'utils';

const userReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN: {
      const newState = { ...state, ...payload, role: Roles.TPO };
      return !payload ? state : newState;
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
