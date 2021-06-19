import { action } from './common';

export const ADD_COMPANY = 'ADD_COMPANY';
export const ADD_COMPANIES = 'ADD_COMPANIES';
export const ADD_LIMITED_COMPANIES = 'ADD_LIMITED_COMPANIES';

export const addCompany = (company) => action(ADD_COMPANY, company);
export const addCompanies = (companies) => action(ADD_COMPANIES, companies);
export const addLimitedCompanies = (companies) =>
  action(ADD_LIMITED_COMPANIES, companies);
