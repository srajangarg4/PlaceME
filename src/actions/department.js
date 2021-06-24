import { action } from './common';

export const ADD_DEPARTMENTS = 'ADD_DEPARTMENTS';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';

export const addDepartments = (departments) =>
  action(ADD_DEPARTMENTS, departments);

export const addDepartment = (department) => action(ADD_DEPARTMENT, department);
