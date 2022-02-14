import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';

import Header from '../../modules/Header/components/Header';

import './ConfirmEmailPage.scss';

enum Status {
  Success = 'success',
  Fail = 'fail'
}

export default function ConfirmEmailPage({ match }: Record<string, any>): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid className="confirm-email-page__container">
          <IonRow>
            <IonCol size-xl="4" offset-xl="4" size-md="8" offset-md="3" size-sm="10" offset-sm="1" className="ion-margin form-container">
              {match.params.status === Status.Success
                ? <span className="msg success">Email has been confirmed</span>
                : (
                  <span className="msg error">User not found</span>
                )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
