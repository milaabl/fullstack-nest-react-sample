/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { IonButton, IonInput, IonItem, IonLabel, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { FieldAttributes } from 'formik/dist/Field';
import { schema } from '../helpers/forgotPasswordHelper';

import { isSent, isSuccess, errorMsg } from '../selectors/forgotPasswordSelectros';
import { forgotPasswordSuccess, forgotPasswordError } from '../actionCreators/forgotPasswordActions';
import { ForgotPasswordData, forgotPassword } from '../../../services/forgotPasswordService';

export const forgotPasswordThunk = (regData: any) => async (dispatch: any) => {
  try {
    await forgotPassword(regData);
    dispatch(forgotPasswordSuccess());
  } catch ({ response, message }) {
    dispatch(forgotPasswordError(response ? response.data.message : message));
  }
};

const Input = ({ field, type, labelName }: FieldAttributes<any>) => (
  <IonItem className="item-input">
    <IonLabel position="floating">{labelName}</IonLabel>
    <IonInput type={type} onIonChange={field.onChange} {...field} />
  </IonItem>
);

const ForgotPasswordForm: React.FC = ({ isSent, isSuccess, errorMsg, onForgotPassword }: Record<string, any>): JSX.Element => {
  const initialValues: ForgotPasswordData = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onForgotPassword(values);
      }}>
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <Form noValidate>
          <IonGrid>
            <IonRow>
              <IonCol>
                <Field
                  name="email"
                  component={Input}
                  type="email"
                  labelName="Email" />
              </IonCol>
            </IonRow>

            {errors.email && touched.email && (
              <IonRow>
                <IonCol>
                  <IonText className="ion-margin-horizontal error">
                    {errors.email}
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            {isSent && (
              <IonRow>
                <IonCol>
                  {isSuccess ? (
                    <IonText className="ion-margin-horizontal success">
                      Send link completed. Check your email please
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
          <IonButton
            className="button"
            disabled={isSubmitting}
            expand="block"
            onClick={() => handleSubmit()}>
            SEND ME
          </IonButton>
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
  onForgotPassword: (data: ForgotPasswordData) => dispatch(forgotPasswordThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
