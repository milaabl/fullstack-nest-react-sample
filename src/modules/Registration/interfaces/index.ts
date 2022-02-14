export type RegistrationData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat?: string;
  avatarPath: string | null;
  timeZone: string;
};
