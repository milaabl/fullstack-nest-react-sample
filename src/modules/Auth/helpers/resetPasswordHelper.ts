/* eslint-disable space-before-function-paren */
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  password: Yup.string()
    .required('Required field')
    .min(8, '8 symbols min')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_+(){}[\]:;.~<>|-]).{8,}$/,
      'At least one uppercase letter, one lowercase letter, one numeric digit and one special character',
    ),
  passwordRepeat: Yup.string()
    .required('Required field')
    .test(
      'passwords-match', 'Passwords must match',
      function (value) {
        return this.parent.password === value;
      },
    ),
});
