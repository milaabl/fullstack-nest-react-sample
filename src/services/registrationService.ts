import instance from './httpClient';
import { RegistrationData } from '../modules/Registration/interfaces';

const ENDPOINT_REGISTRATION = '/auth/registration';

export default async function registration(data: RegistrationData): Promise<any> {
  return instance.post(ENDPOINT_REGISTRATION, data);
}
