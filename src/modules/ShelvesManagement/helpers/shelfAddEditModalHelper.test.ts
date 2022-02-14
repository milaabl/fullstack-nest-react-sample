import * as sut from './shelfAddEditModalHelper';

describe('ShelfAddEditModalHelper', () => {
  describe('#isLocationErrorVisible', () => {
    it('should show error message if Location is NOT valid', () => {
      const location = 'lo';
      expect(sut.schema.isValidSync({ location })).toBe(false);
    });

    it('should NOT show error message if Location is valid', () => {
      const location = 'Kitchen';
      expect(sut.schema.isValidSync({ location })).toBe(true);
    });
  });
});
