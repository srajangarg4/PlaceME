import { useSelector } from 'react-redux';
import { Roles } from 'utils';
import PageNotFound from './pageNotFound';

const ComponentResolver = ({
  studentComponent,
  tpoComponent,
  defaultComponent,
}) => {
  const user = useSelector((state) => state.user);
  const role = user?.role;
  switch (role) {
    case Roles.TPO:
      return tpoComponent ?? PageNotFound;
    case Roles.STUDENT:
      return studentComponent ?? PageNotFound;
    default:
      return defaultComponent ?? PageNotFound;
  }
};
export default ComponentResolver;
