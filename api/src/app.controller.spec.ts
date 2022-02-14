import { AppController } from './app.controller';

describe('AppController', () => {
  let sut: any;

  beforeEach(() => {
    sut = new AppController();
  });

  describe('getHealth', () => {
    it('should return a string containing "OK"', () => {
      expect(sut.getHealth())
        .toContain('OK');
    });
  })
});
