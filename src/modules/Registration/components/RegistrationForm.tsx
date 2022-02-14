/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';

import { isSent, isSuccess, errorMsg } from '../selectors';
import { registrationThunk } from '../thunks';
import schema from '../helpers/RegistrationFormHelper';
import { RegistrationData } from '../interfaces';

import './RegistrationForm.scss';

const Input = ({ field, type, labelName }: FieldAttributes<any>) => (
  <IonItem className="registration-page-form__input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput type={type} onIonChange={field.onChange} {...field} />
  </IonItem>
);

const RegistrationForm: React.FC = ({ isSent, isSuccess, errorMsg, onRegister }: Record<string, any>): JSX.Element => {
  const initialValues: RegistrationData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    avatarPath: null,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  if (isSent) {
    return (
      <div className="registration-page-response">
        {isSuccess
          ? <span className="msg success">Registration completed. Check your email please</span>
          : (
            <span className="msg error">
              Oops, something went wrong:
              {errorMsg}
            </span>
          )}
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onRegister(values);
      }}>
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <Form className="registration-page-form" noValidate>
          <IonGrid>
            <IonRow>
              <IonCol>
                <Field name="email" component={Input} type="email" labelName="Email" />
                {errors.email &&
                touched.email &&
                <div className="ion-margin-start ion-margin-bottom error">{errors.email}</div>}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <Field name="name" component={Input} type="text" labelName="Name" />
                {errors.name && touched.name && <div className="ion-margin-start ion-margin-bottom error">{errors.name}</div>}
              </IonCol>
              <IonCol>
                <Field name="lastName" component={Input} type="text" labelName="Last Name" />
                {errors.lastName &&
                touched.lastName &&
                <div className="ion-margin-start ion-margin-bottom error">{errors.lastName}</div>}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <Field name="password" component={Input} type="password" labelName="Password" />
                {errors.password &&
                touched.password &&
                <div className="ion-margin-start ion-margin-bottom error">{errors.password}</div>}
              </IonCol>
              <IonCol>
                <Field name="passwordRepeat" component={Input} type="password" labelName="Repeat Password" />
                {errors.passwordRepeat &&
                touched.passwordRepeat &&
                <div className="ion-margin-start ion-margin-bottom error">{errors.passwordRepeat}</div>}
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButton disabled={isSubmitting} expand="block" onClick={() => handleSubmit()}>Register</IonButton>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  isSent: isSent(state),
  isSuccess: isSuccess(state),
  errorMsg: errorMsg(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  onRegister: (data: RegistrationData) => dispatch(registrationThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
