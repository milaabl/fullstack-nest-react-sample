import { createSelector } from 'reselect';

const forgotPasswordState = (state: any) => state.forgotPassword;

export const isSent = createSelector(forgotPasswordState, (reg: any) => reg.isSent);

export const isSuccess = createSelector(forgotPasswordState, (reg: any) => reg.isSuccess);

export const errorMsg = createSelector(forgotPasswordState, (reg: any) => reg.errorMsg);
