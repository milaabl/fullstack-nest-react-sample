import { UserType } from '../helpers/loginHelper';

export const LOGIN_SUCCESS = 'login/success';
type LoginSuccessType = {
  type: typeof LOGIN_SUCCESS;
  user: UserType;
};

export const LOGIN_FAILURE = 'login/failure';
type LoginFailureType = {
  type: typeof LOGIN_FAILURE;
  errorOnLogin: string;
};

export const LOGIN_UNAUTHORIZED = 'login/unauthorized';
type LoginUnauthorizedType = {
  type: typeof LOGIN_UNAUTHORIZED;
};

export const UPDATE_USER_SUCCESS = 'update-user/success';
export type UpdateUserType = {
  type: typeof UPDATE_USER_SUCCESS;
  user: UserType;
};

export type ActionsTypes = LoginSuccessType | LoginFailureType | UpdateUserType | LoginUnauthorizedType;

export const loginSuccess = (user: UserType): LoginSuccessType => ({ type: LOGIN_SUCCESS, user });
export const loginUnauthorized = (): LoginUnauthorizedType => ({ type: LOGIN_UNAUTHORIZED });
export const loginFailure = (errorOnLogin: string): LoginFailureType => ({ type: LOGIN_FAILURE, errorOnLogin });
export const updateUserSuccess = (user: any): UpdateUserType => ({ type: UPDATE_USER_SUCCESS, user });
