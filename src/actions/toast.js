import { action } from './common';

export const ADD_TOAST = 'ADD_TOAST';

export const addToast = (toast) => action(ADD_TOAST, toast);
