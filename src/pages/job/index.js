import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../utils';
import JobDescription from './jobDescription';

const JobNavigator = () => (
  <Switch>
    <Route path={Routes.jobDescription.path} exact component={JobDescription} />
  </Switch>
);

export default JobNavigator;
