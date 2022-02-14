import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  name: Yup.string()
    .required('Required field'),
  lastName: Yup.string()
    .required('Required field'),
  password: Yup.string()
    .required('Required field')
    .min(8, '8 symbols min')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_+(){}[\]:;.~<>|-]).{8,}$/,
      'At least one uppercase letter, one lowercase letter, one numeric digit and one special character',
    ),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
});

export default schema;
