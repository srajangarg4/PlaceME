import {
  AcademicDetailService,
  PersonalDetailService,
  UserService,
} from 'placeme-services/lib';
import { Roles } from 'utils';
import { dispatch } from 'store';
import { login, addPersonalDetail, addAcademicDetail } from 'actions';

export const fetchUserDetail = async (email) => {
  const { successful, result } = await UserService.getUserDetail(email);
  if (successful) {
    dispatch(login(result));
    const { role } = result;
    switch (role) {
      case Roles.STUDENT:
        const personalDetailService = new PersonalDetailService();
        const { successful: pdSuccess, result: pdResult } =
          await personalDetailService.get(email);
        const academicDetailService = new AcademicDetailService();
        const { successful: adSuccess, result: adResult } =
          await academicDetailService.get(email);
        if (pdSuccess && adSuccess) {
          dispatch(addPersonalDetail(pdResult));
          dispatch(addAcademicDetail(adResult));
        }
        break;
      default:
        break;
    }
  }
};
