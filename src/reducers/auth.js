import { AUTH_UPDATE, AUTH_REMOVE } from '../actions';
import {
  AUTH_STATE, deleteData, saveData, getData,
} from '../AsyncStorage';
import { Roles } from '../utils';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_UPDATE: {
      if (!action?.payload) {
        return state;
      }
      const { role, token } = action.payload;
      const currentUserRole = !role ? Roles.USER : role;
      const auth = { ...state, role: currentUserRole, token };
      saveData(AUTH_STATE, auth);
      return auth;
    }
    case AUTH_REMOVE:
      deleteData(AUTH_STATE);
      return {};
    default:
      return state;
  }
};

export function getAuth() {
  return getData(AUTH_STATE);
}
export default reducer;