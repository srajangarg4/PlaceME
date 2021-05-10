import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../utils';
import Profile from './profile';

export { default as Profile } from './profile';

export const ProfileNavigator = () => (
  <Switch>
    <Route path={Routes.profile.path} component={Profile} />
  </Switch>
);
