import { LOGIN, LOGOUT } from 'actions';

const userReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOGIN: {
      const newState = { ...state, ...payload };
      return !payload ? state : newState;
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
