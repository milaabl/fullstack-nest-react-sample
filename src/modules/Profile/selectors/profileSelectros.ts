import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const profileState = (state: AppStateType) => state.profile;

export const getIsSuccess = createSelector(profileState, (reg: any) => reg.isSuccess);

export const getErrorsOnProfileUpdate = createSelector(profileState, (reg: any) => reg.errorsOnProfileUpdate);

export const getErrorOnAvatarUpdate = createSelector(profileState, (reg: any) => reg.errorOnAvatarUpdate);
