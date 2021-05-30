import { action } from './common';

export const ADD_ACADEMIC_DETAIL = 'ADD_ACADEMIC_DETAIL';

export const addAcademicDetail = (academicDetail) =>
  action(ADD_ACADEMIC_DETAIL, academicDetail);
