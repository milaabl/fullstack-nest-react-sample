export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: {},
});

export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_FAILURE';
export const forgotPasswordError = (msg: string) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { msg },
});
