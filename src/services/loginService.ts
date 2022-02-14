import httpClient from './httpClient';
import { UserType } from '../modules/Auth/helpers/loginHelper';
import { initPushNotifications } from './notificationService';

const ENDPOINT_LOGIN = '/auth/login';
const ENDPOINT_LOGOUT = '/auth/logout';

async function login(email: string, password: string): Promise<UserType> {
  const body = { email, password };
  const response = await httpClient.post(ENDPOINT_LOGIN, body);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data } = response;
  initPushNotifications(data.id);
  return data;
}

async function logout(): Promise<number> {
  const response = await httpClient.get(ENDPOINT_LOGOUT);

  initPushNotifications(null);

  return response && response.status;
}

export default {
  login,
  logout,
};
