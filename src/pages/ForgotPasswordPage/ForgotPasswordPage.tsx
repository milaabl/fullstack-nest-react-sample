import React from 'react';
import { IonGrid, IonRow, IonCol, IonPage, IonContent } from '@ionic/react';
import ForgotPassForm from '../../modules/Auth/components/ForgotPasswordForm';
import Header from '../../modules/Header/components/Header';

import './ForgotPasswordPage.scss';

export default function ForgotPasswordPage(): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid className="forgot-password-page-container">
          <IonRow>
            <IonCol
              size-xl="4"
              offset-xl="4"
              size-md="6"
              offset-md="3"
              size-sm="10"
              offset-sm="1"
              className="ion-margin form-container">
              <h1 className="form-container__header">
                Forgot My Password
              </h1>
              <ForgotPassForm />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
