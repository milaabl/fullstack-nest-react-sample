/* eslint-disable space-before-function-paren */
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  location: Yup.string()
    .required('Required field')
    .min(3, '3 symbols min')
    .max(128, '128 symbols max'),
  description: Yup.string()
    .max(128, '128 symbols max'),
});
