import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import Header from '../../modules/Header/components/Header';
import ResetPasswordForm from '../../modules/Auth/components/ResetPasswordForm';

import './ResetPasswordPage.scss';

export default function ResetPasswordPage(): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid className="reset-password-page-container">
          <IonRow>
            <IonCol
              size-xl="4"
              offset-xl="4"
              size-md="8"
              offset-md="3"
              size-sm="10"
              offset-sm="1"
              className="ion-margin form-container">
              <h1 className="form-container__header">
                Password Reset
              </h1>
              <ResetPasswordForm />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
