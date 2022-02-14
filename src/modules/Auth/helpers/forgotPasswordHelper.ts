/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field'),
});
