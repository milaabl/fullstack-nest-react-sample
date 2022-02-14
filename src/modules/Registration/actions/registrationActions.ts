export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const registrationSuccess = () => ({
  type: REGISTRATION_SUCCESS,
  payload: {},
});

export const REGISTRATION_ERROR = 'REGISTRATION_FAILURE';
export const registrationError = (msg: string) => ({
  type: REGISTRATION_ERROR,
  payload: { msg },
});
