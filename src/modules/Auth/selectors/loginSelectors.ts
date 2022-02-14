import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getLoginState = (state: AppStateType) => state.login;

export const getUser = createSelector(getLoginState, (login) => login.user);

export const getUserAvatarPath = createSelector(getUser, (user) => user && user.avatarPath);

export const getUserNameAndSurname = createSelector(getUser, (user) => user && `${user.name} ${user.lastName}`);

export const getUserId = createSelector(getUser, (user) => user && user.id);

export const getErrorOnLogin = createSelector(getLoginState, (login) => login.errorOnLogin);
