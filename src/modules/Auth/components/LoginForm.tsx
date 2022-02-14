import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { IonButton, IonInput, IonItem, IonLabel, IonRouterLink } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';
import { schema } from '../helpers/loginHelper';

import './LoginForm.scss';

type PropsType = {
  login: (email: string, password: string, history: any) => Promise<void>;
  errorOnLogin: string | null;
  history: any;
};

export type MyFormValuesType = {
  email: string;
  password: string;
};

const Input = ({ field, type, labelName }: FieldAttributes<any>) => (
  <IonItem className="login-page-form__input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput type={type} onIonChange={field.onChange} {...field} autocomplete="off" />
  </IonItem>
);

export const LoginForm: React.FC<PropsType> = ({ login, errorOnLogin, history }: PropsType): JSX.Element => {
  const initialValues: MyFormValuesType = {
    email: '',
    password: '',
  };

  async function handleOnSubmit(values: MyFormValuesType) {
    const { email, password } = values;
    await login(email, password, history);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleOnSubmit}>
        {({ handleSubmit, errors, touched, isSubmitting }) => (
          <Form className="login-page-form" noValidate>
            <Field name="email" component={Input} type="email" labelName="Email" />
            {errors.email && touched.email && <div className="ion-margin-start ion-margin-bottom error">{errors.email}</div>}
            <Field name="password" component={Input} type="password" labelName="Password" />
            {errors.password && touched.password &&
            <div className="ion-margin-start ion-margin-bottom error">{errors.password}</div>}
            <div className="ion-margin-horizontal">
              <IonRouterLink className="ion-float-end" href="forgot-password">Forgot password?</IonRouterLink>
            </div>
            <IonButton disabled={isSubmitting} className="login-page-form__button" expand="block" onClick={() => handleSubmit()}>Sign In</IonButton>
            <Link to="/registration" className="login-page-form__link ion-margin-start">Not a member yet? Sign up.</Link>
          </Form>
        )}
      </Formik>
      {errorOnLogin && <div className="ion-margin-start ion-margin-bottom error">{errorOnLogin}</div>}
    </>
  );
};
