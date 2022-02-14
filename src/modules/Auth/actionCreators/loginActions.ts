import { RouteComponentProps } from 'react-router-dom';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../../../reducers/rootReducer';
import { UNAUTHORIZED } from '../../../services/httpClient';
import { loginSuccess, loginFailure, ActionsTypes, loginUnauthorized } from './loginFormActions';
import loginService from '../../../services/loginService';
import redirectService from '../../../services/redirectService';
import userProfileService from '../../../services/userProfileService';
import { initPushNotifications } from '../../../services/notificationService';

export const ERROR_WRONG_CREDENTIALS = 'Wrong email or password. Check your credentials.';
export const ERROR_ISSUE_WITH_DB = 'Something went wrong, contact Support.';

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export function login(email:string, password:string, history: RouteComponentProps['history']): ThunkType {
  return async (dispatch) => {
    try {
      const user = await loginService.login(email, password);
      dispatch(loginSuccess(user));
      if (history.location.pathname === '/login') {
        redirectService.redirectToHomePage(history);
      }
    } catch (e) {
      const httpCode = e.response.status === UNAUTHORIZED;
      const errorOnLogin = httpCode ? ERROR_WRONG_CREDENTIALS : ERROR_ISSUE_WITH_DB;
      dispatch(loginFailure(errorOnLogin));
    }
  };
}

export function initUserProfile(initNotifications: boolean = false): ThunkType {
  return async (dispatch) => {
    try {
      const user = await userProfileService.getUserProfile();

      if (initNotifications) {
        initPushNotifications(user?.id);
      }

      dispatch(loginSuccess(user));
    } catch (e) {
      if (e.response && e.response.status === 401) {
        dispatch(loginUnauthorized());
      }
    }
  };
}
