import { action } from './common';

export const ADD_DEPARTMENTS = 'ADD_DEPARTMENTS';

export const addDepartments = (departments) =>
  action(ADD_DEPARTMENTS, departments);
