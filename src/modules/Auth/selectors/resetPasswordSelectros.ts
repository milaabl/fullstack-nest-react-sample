import { createSelector } from 'reselect';

const resetPasswordState = (state: any) => state.resetPassword;

export const isSuccess = createSelector(resetPasswordState, (reg: any) => reg.isSuccess);

export const errorMsg = createSelector(resetPasswordState, (reg: any) => reg.errorMsg);
