import { createSelector } from 'reselect';

const registrationState = (state: any) => state.registration;

export const isSent = createSelector(
  registrationState,
  (reg: any) => reg.isSent,
);

export const isSuccess = createSelector(
  registrationState,
  (reg: any) => reg.isSuccess,
);

export const errorMsg = createSelector(
  registrationState,
  (reg: any) => reg.errorMsg,
);
