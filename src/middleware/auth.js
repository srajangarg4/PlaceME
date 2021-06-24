import {
  AcademicDetailService,
  PersonalDetailService,
  UserService,
} from 'placeme-services/lib';
import { Role } from 'utils';
import { dispatch } from 'store';
import { login, addPersonalDetail, addAcademicDetail } from 'actions';

export const onStartup = async (email) => {
  const { successful, result } = await UserService.getUserDetail(email);
  if (successful) {
    dispatch(login(result));
    const { role } = result;
    switch (role) {
      case Role.STUDENT:
        const personalDetailService = new PersonalDetailService();
        const { successful: pdSuccess, result: pdResult } =
          await personalDetailService.get(email);
        if (pdSuccess) {
          const newDB = new Date(pdResult.data.dob?.toDate());
          pdResult.data.dob = newDB;
          dispatch(addPersonalDetail(pdResult));
        }
        const academicDetailService = new AcademicDetailService();
        const { successful: adSuccess, result: adResult } =
          await academicDetailService.get(email);
        if (adSuccess) {
          dispatch(addAcademicDetail(adResult));
        }
        break;
      default:
        break;
    }
  }
};
