import instance from './httpClient';

export type ForgotPasswordData = {
  email: string;
};

const ENDPOINT_FORGOT_PASSWORD = '/auth/forgot-password';

export async function forgotPassword(data: ForgotPasswordData): Promise<any> {
  return instance.post(ENDPOINT_FORGOT_PASSWORD, data);
}
