import {
  registrationSuccess,
  registrationError,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
} from './registrationActions';

describe('registrationActions', () => {
  describe('registrationSuccess', () => {
    it('should return success action', () => {
      expect(registrationSuccess())
        .toEqual({
          type: REGISTRATION_SUCCESS,
          payload: {},
        });
    });
  });

  describe('registrationError', () => {
    it('should return error action', () => {
      expect(registrationError('errorMessage'))
        .toEqual({
          type: REGISTRATION_ERROR,
          payload: { msg: 'errorMessage' },
        });
    });
  });
});
