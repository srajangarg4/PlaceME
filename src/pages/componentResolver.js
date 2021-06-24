import { useSelector } from 'react-redux';
import { Role } from 'utils';
import PageNotFound from './pageNotFound';

const ComponentResolver = ({
  studentComponent,
  tpoComponent,
  defaultComponent,
}) => {
  const user = useSelector((state) => state.user);
  const role = user?.role;
  switch (role) {
    case Role.TPO:
      return tpoComponent ?? PageNotFound;
    case Role.STUDENT:
      return studentComponent ?? PageNotFound;
    default:
      return defaultComponent ?? PageNotFound;
  }
};
export default ComponentResolver;
