import * as sut from './loginHelper';

describe('LoginFormHelper', () => {
  describe('#isEmailErrorVisible', () => {
    const password = 'some-password';

    it('should show error message if user email is NOT valid', () => {
      const email = 'asdklajsdlad';
      expect(sut.schema.isValidSync({ email, password })).toBe(false);
    });

    it('should NOT show error message if user email is valid', () => {
      const email = 'valid@email.com';
      expect(sut.schema.isValidSync({ email, password })).toBe(true);
    });
  });
});
