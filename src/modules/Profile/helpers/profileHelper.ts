import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field'),
  name: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
});

export type ProfileValuesType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  notificationTime: string;
  timeZone: string;
  avatarPath: string;
};

export type notification12TimeType = {
  hours: string;
  minutes: string;
  meridiem: string;
};
