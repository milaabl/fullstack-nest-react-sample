import * as Yup from 'yup';

export const flowerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required field')
    .min(3, '3 symbols min')
    .max(128, '128 symbols max'),
  description: Yup.string()
    .max(128, '128 symbols max'),
  wateringRule: Yup.number()
    .positive()
    .integer()
    .required('Required field'),
  nextWateringAt: Yup.date(),
});
