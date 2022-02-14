import { ThunkAction } from 'redux-thunk';
import loginService from '../../../services/loginService';

export const USER_LOGOUT = 'user-logout';
export type UserLogoutType = {
  type: typeof USER_LOGOUT;
};

export const userLogoutAction = (): UserLogoutType => ({ type: USER_LOGOUT });

type LogoutActionsTypes = UserLogoutType;
type ThunkType = ThunkAction<Promise<void>, null, unknown, LogoutActionsTypes>;

export const userLogout = (): ThunkType => async (dispatch) => {
  try {
    await loginService.logout();
    dispatch(userLogoutAction());
    // eslint-disable-next-line no-empty
  } catch (e) {}
};
