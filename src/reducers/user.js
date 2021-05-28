import { LOGIN, LOGOUT } from '../actions';
import { Roles } from '../utils';

const userReducer = (
  state = {
    role: Roles.STUDENT,
  },
  action,
) => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN: {
      return !payload ? state : { ...state, ...payload };
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
