/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';
import { schema } from '../helpers/resetPasswordHelper';

import { isSuccess, errorMsg } from '../selectors/resetPasswordSelectros';
import { resetPasswordSuccess, resetPasswordError } from '../actionCreators/resetPasswordActions';
import { ResetPasswordData, resetPassword } from '../../../services/resetPasswordService';

export const resetPasswordThunk = (regData: any) => async (dispatch: any) => {
  try {
    await resetPassword(regData);
    dispatch(resetPasswordSuccess());
  } catch ({ response, message }) {
    dispatch(resetPasswordError(response ? response.data.message : message));
  }
};

const Input = ({ field, type, labelName }: FieldAttributes<any>) => (
  <IonItem className="item-input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput type={type} onIonChange={field.onChange} {...field} />
  </IonItem>
);

const ResetPasswordForm: React.FC = ({ isSent, isSuccess, errorMsg, onResetPassword }: Record<string, any>): JSX.Element => {
  const initialValues: ResetPasswordData = {
    password: '',
    passwordRepeat: '',
    token: useLocation().pathname.split('/')[2],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onResetPassword(values);
      }}>
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <Form noValidate>
          <IonGrid>
            <IonRow>
              <IonCol>
                <Field name="password" component={Input} type="password" labelName="New Password" />
              </IonCol>
            </IonRow>
            {errors.password && touched.password && (
              <IonRow>
                <IonCol>
                  <IonText className="ion-margin-horizontal error">
                    {errors.password}
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol>
                <Field name="passwordRepeat" component={Input} type="password" labelName="Repeat Password" />
              </IonCol>
            </IonRow>
            {errors.passwordRepeat && touched.passwordRepeat && (
              <IonRow>
                <IonCol>
                  <IonText className="ion-margin-horizontal error">
                    {errors.passwordRepeat}
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            {isSubmitting && (
              <IonRow>
                <IonCol>
                  {isSuccess ? (
                    <IonText className="ion-margin-horizontal success">
                      New Password saved.
                    </IonText>
                  ) : (
                    <IonText className="ion-margin-horizontal error">
                      Oops, something went wrong:
                      {errorMsg}
                    </IonText>
                  )}
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
          <IonButton className="button" disabled={isSubmitting} expand="block" onClick={() => handleSubmit()}>
            Save password
          </IonButton>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  isSuccess: isSuccess(state),
  errorMsg: errorMsg(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  onResetPassword: (data: ResetPasswordData) => dispatch(resetPasswordThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
