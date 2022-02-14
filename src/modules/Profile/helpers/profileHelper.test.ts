import * as sut from './profileHelper';

describe('ProfileFormHelper', () => {
  describe('#isEmailErrorVisible', () => {
    const name = 'Name';
    const lastName = 'LastName';
    it('should show error message if user email is NOT valid', () => {
      const email = 'asdklajsdlad';
      expect(sut.schema.isValidSync({ email, name, lastName })).toBe(false);
    });

    it('should NOT show error message if user email is valid', () => {
      const email = 'valid@email.com';
      expect(sut.schema.isValidSync({ email, name, lastName })).toBe(true);
    });
  });
});
