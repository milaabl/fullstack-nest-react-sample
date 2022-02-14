import httpClient from './httpClient';
import sut, { ENDPOINT_USER_PROFILE } from './userProfileService';

jest.mock('@pusher/push-notifications-web', () => ({}));
jest.mock('./httpClient');

describe('userProfileService', () => {
  const user = {
    name: 'Test',
    lastName: 'TestSurname',
    email: 'test@gmail.com',
  };
  describe('#getUserProfile', () => {
    it('should fetch authorised User', async () => {
      httpClient.get.mockReturnValue(Promise.resolve({ data: user }));
      const result = await sut.getUserProfile();
      expect(result).toEqual(user);
      expect(httpClient.get).toHaveBeenCalledWith(ENDPOINT_USER_PROFILE);
    });
  });
});
