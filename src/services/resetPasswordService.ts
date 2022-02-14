import instance from './httpClient';

export type ResetPasswordData = {
  password: string;
  passwordRepeat: string;
  token: string;
};

const ENDPOINT_RESET_PASSWORD = '/auth/reset-password';

export async function resetPassword(data: ResetPasswordData): Promise<any> {
  const newData = { ...data };
  delete newData.passwordRepeat;
  return instance.post(ENDPOINT_RESET_PASSWORD, newData);
}
