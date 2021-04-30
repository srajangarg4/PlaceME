import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducers';
import { logout } from './actions';
import logger from 'redux-logger';

const initialState = {};


const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger),
);


export const logoutAction = () => store.dispatch(logout());

export const getAuth = () => (
  store.getState()?.auth
);

export const { dispatch } = store;

export default store;
