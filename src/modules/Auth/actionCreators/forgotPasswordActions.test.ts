import {
  forgotPasswordSuccess,
  forgotPasswordError,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './forgotPasswordActions';

describe('forgotPasswordActions', () => {
  describe('forgotPasswordSuccess', () => {
    it('should return success action', () => {
      expect(forgotPasswordSuccess())
        .toEqual({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: {},
        });
    });
  });

  describe('forgotPasswordError', () => {
    it('should return error action', () => {
      expect(forgotPasswordError('errorMessage'))
        .toEqual({
          type: FORGOT_PASSWORD_ERROR,
          payload: { msg: 'errorMessage' },
        });
    });
  });
});
