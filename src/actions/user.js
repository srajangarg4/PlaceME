import { emptyAction, action } from './common';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ACADEMIC_DETAILS = 'UPDATE_ACADEMIC_DETAILS';
export const UPDATE_PERSONAL_DETAILS = 'UPDATE_PERSONAL_DETAILS';
export const UPDATE_ACCOUNT_DETAILS = 'UPDATE_ACCOUNT_DETAILS';

export const login = (authData) => action(LOGIN, authData);
export const logout = () => emptyAction(LOGOUT);
