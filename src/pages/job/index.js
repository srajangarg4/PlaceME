import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../utils';
import AddNewJob from '../auth/addNewJob';
import TpoDashboard from '../auth/tpoDashboard';
import JobDescription from './jobDescription';

const JobNavigator = () => (
  <Switch>
    <Route path={Routes.jobDescription.path} exact component={JobDescription} />
    <Route path={Routes.addNewJob.path} exact component={AddNewJob} />
    <Route path={Routes.tpoDashboard.path} exact component={TpoDashboard} />
  </Switch>
);

export default JobNavigator;
