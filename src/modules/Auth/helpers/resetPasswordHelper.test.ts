import * as sut from './resetPasswordHelper';

describe('ResetPasswordFormHelper', () => {
  describe('#isPasswordErrorVisible', () => {
    it('should show error message if user password is NOT valid', () => {
      const password = 'asdklajsdlad';
      const passwordRepeat = 'asdklajsdlad';
      expect(sut.schema.isValidSync({ password, passwordRepeat })).toBe(false);
    });

    it('should NOT show error message if user password is valid', () => {
      const password = 'ER34uy76*';
      const passwordRepeat = 'ER34uy76*';
      expect(sut.schema.isValidSync({ password, passwordRepeat })).toBe(true);
    });
  });
});
