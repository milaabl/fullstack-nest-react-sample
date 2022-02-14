import * as sut from './loginActions';
import loginService from '../../../services/loginService';
import redirectService from '../../../services/redirectService';
import userProfileService from '../../../services/userProfileService';
import { AppDispatch } from '../../../store/configureStore';
// eslint-disable-next-line no-duplicate-imports
import { ERROR_WRONG_CREDENTIALS, ERROR_ISSUE_WITH_DB } from './loginActions';
import { loginFailure, loginSuccess } from './loginFormActions';
import { UNAUTHORIZED } from '../../../services/httpClient';

jest.mock('../../../services/loginService');
jest.mock('../../../services/redirectService');
jest.mock('../../../services/userProfileService');
jest.mock('@pusher/push-notifications-web', () => ({}));

describe('LoginActions', () => {
  describe('#login', () => {
    const email = 'correct@email.com';
    const password = 'some-password';
    const userFromBackend = { id: 1, name: 'some-user' };
    const error = { response: { status: 0 } };
    let dispatch: AppDispatch;
    const history = {
      location: {
        pathname: '/login',
      },
    };

    beforeEach(() => {
      jest.resetAllMocks();
      dispatch = jest.fn();
    });

    it('should fetch User information from Backend if User credentials are correct', async () => {
      loginService.login.mockReturnValue(Promise.resolve(userFromBackend));
      await sut.login(email, password, history)(dispatch);
      expect(loginService.login).toHaveBeenCalledWith(email, password);
    });
    it('should redirect to Home page if User credentials are correct', async () => {
      loginService.login.mockReturnValue(Promise.resolve(userFromBackend));
      await sut.login(email, password, history)(dispatch);
      expect(redirectService.redirectToHomePage).toHaveBeenCalledWith(history);
    });
    it('should login User in Application if User credentials are correct', async () => {
      loginService.login.mockReturnValue(Promise.resolve(userFromBackend));
      await sut.login(email, password, history)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginSuccess(userFromBackend));
    });
    it('should NOT redirect to Home page if User credentials are NOT correct', async () => {
      error.response.status = UNAUTHORIZED;
      loginService.login.mockReturnValue(Promise.reject(error));
      await sut.login(email, password)(dispatch);
      expect(redirectService.redirectToHomePage).not.toHaveBeenCalled();
    });
    it(`should show message "Wrong email or password. Check your credentials."
        if User credentials are NOT correct`, async () => {
      error.response.status = UNAUTHORIZED;
      loginService.login.mockReturnValue(Promise.reject(error));
      await sut.login(email, password)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginFailure(ERROR_WRONG_CREDENTIALS));
    });
    it(`should show message "Something went wrong, contact Support."
        if there are some problems on Server`, async () => {
      error.response.status = 500;
      loginService.login.mockReturnValue(Promise.reject(error));
      await sut.login(email, password)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginFailure(ERROR_ISSUE_WITH_DB));
    });
  });
  describe('#initUserProfile', () => {
    const userProfileData = { id: '123', name: 'Test', lastName: 'TestSurname', email: 'test@gmail.com' };
    let dispatch: AppDispatch;
    beforeEach(() => {
      jest.resetAllMocks();
      dispatch = jest.fn();
    });
    it('should fetch User profile', async () => {
      userProfileService.getUserProfile.mockReturnValue(Promise.resolve(userProfileData));
      await sut.initUserProfile()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(loginSuccess(userProfileData));
    });
  });
});
