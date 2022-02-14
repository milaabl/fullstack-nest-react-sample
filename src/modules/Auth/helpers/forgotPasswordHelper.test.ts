import * as sut from './forgotPasswordHelper';

describe('ForgotPasswordFormHelper', () => {
  describe('#isEmailErrorVisible', () => {
    it('should show error message if user email is NOT valid', () => {
      const email = 'asdklajsdlad';
      expect(sut.schema.isValidSync({ email })).toBe(false);
    });

    it('should NOT show error message if user email is valid', () => {
      const email = 'valid@email.com';
      expect(sut.schema.isValidSync({ email })).toBe(true);
    });
  });
});
