import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_USER_SUCCESS,
  LOGIN_UNAUTHORIZED,
} from '../actionCreators/loginFormActions';
import { USER_LOGOUT } from '../actionCreators/logoutActions';
import { UserType } from '../helpers/loginHelper';
import { convertFromMinutesTo24Format } from '../../../utils/timeUtils';

const initialState = {
  user: null as UserType | null,
  errorOnLogin: null as string | null,
  isLoggedIn: undefined as undefined | boolean,
};
export type InitialStateType = typeof initialState;

export default function loginReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user } = action;
      const userToSave = {
        ...user,
        notificationTime: convertFromMinutesTo24Format(user.notificationTime),
      };
      return {
        ...state,
        user: userToSave,
        errorOnLogin: null,
        isLoggedIn: true,
      };
    }
    case LOGIN_UNAUTHORIZED: {
      return {
        ...state,
        errorOnLogin: null,
        isLoggedIn: false,
      };
    }
    case LOGIN_FAILURE: {
      const { errorOnLogin } = action;
      return {
        ...state,
        user: null,
        errorOnLogin,
        isLoggedIn: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}
