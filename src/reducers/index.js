import { combineReducers } from 'redux';
import user from './user';
import job from './job';
import company from './company';
import personalDetail from './personalDetail';
import academicDetail from './academicDetail';
import document from './documents';
import updateRequest from './updateRequests';
import completedRequest from './completedRequest';
import department from './departments';

const rootReducer = combineReducers({
  user,
  job,
  company,
  personalDetail,
  academicDetail,
  document,
  updateRequest,
  completedRequest,
  department,
});

export default rootReducer;
