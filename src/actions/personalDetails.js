import { action } from './common';

export const ADD_PERSONAL_DETAIL = 'ADD_PERSONAL_DETAIL';

export const addPersonalDetail = (personalDetail) =>
  action(ADD_PERSONAL_DETAIL, personalDetail);
