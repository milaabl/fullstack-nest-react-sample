export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: {},
});

export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_FAILURE';
export const resetPasswordError = (msg: string) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { msg },
});
