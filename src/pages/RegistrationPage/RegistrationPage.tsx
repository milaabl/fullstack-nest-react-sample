import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import Header from '../../modules/Header/components/Header';
import RegistrationForm from '../../modules/Registration/components/RegistrationForm';

import './RegistrationPage.scss';

export default function RegistrationPage(): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid className="registration-page__container">
          <IonRow>
            <IonCol size-xl="4" offset-xl="4" size-md="8" offset-md="3" size-sm="10" offset-sm="1" className="ion-margin form-container">
              <h1 className="form-container__header">Sign up</h1>
              <RegistrationForm />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
