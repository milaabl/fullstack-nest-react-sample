import {
  resetPasswordSuccess,
  resetPasswordError,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './resetPasswordActions';

describe('resetPasswordActions', () => {
  describe('resetPasswordSuccess', () => {
    it('should return success action', () => {
      expect(resetPasswordSuccess())
        .toEqual({
          type: RESET_PASSWORD_SUCCESS,
          payload: {},
        });
    });
  });

  describe('resetPasswordError', () => {
    it('should return error action', () => {
      expect(resetPasswordError('errorMessage'))
        .toEqual({
          type: RESET_PASSWORD_ERROR,
          payload: { msg: 'errorMessage' },
        });
    });
  });
});
