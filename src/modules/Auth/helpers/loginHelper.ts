import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  password: Yup.string()
    .required('Required field'),
});

export type UserType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatarPath: string;
  notificationTime: string;
  timeZone: string;
};
