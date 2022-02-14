import {
  registrationSuccess,
  registrationError,
} from '../actions/registrationActions';
import registration from '../../../services/registrationService';

export const registrationThunk = (regData: any) => async (dispatch: any) => {
  try {
    await registration(regData);
    dispatch(registrationSuccess());
  } catch ({ response, message }) {
    dispatch(registrationError(response ? response.data.message : message));
  }
};
