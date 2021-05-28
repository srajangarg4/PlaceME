import { combineReducers } from 'redux';
import user from './user';
import job from './job';
import company from './company';
import personalDetail from './personalDetail';
import academicDetail from './academicDetail';

const rootReducer = combineReducers({
  user,
  job,
  company,
  personalDetail,
  academicDetail,
});
export default rootReducer;
