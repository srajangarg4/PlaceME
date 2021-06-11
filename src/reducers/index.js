import { combineReducers } from 'redux';
import user from './user';
import job from './job';
import company from './company';
import personalDetail from './personalDetail';
import academicDetail from './academicDetail';
import documents from './documents';
import updateRequests from './updateRequests';

const rootReducer = combineReducers({
  user,
  job,
  company,
  personalDetail,
  academicDetail,
  documents,
  updateRequests,
});
export default rootReducer;
