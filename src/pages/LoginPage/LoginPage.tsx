import React from 'react';
import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonIcon } from '@ionic/react';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import Header from '../../modules/Header/components/Header';
import LoginFormContainer from '../../modules/Auth/containers/LoginFormContainer';

import './LoginPage.scss';

const URL_GOOGLE = `${process.env.REACT_APP_API_ENDPOINT}/api/auth/google`;
const URL_FACEBOOK = `${process.env.REACT_APP_API_ENDPOINT}/api/auth/facebook`;

export default function LoginPage(): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent className="login-page__content">
        <IonGrid className="login-page__container">
          <IonRow>
            <IonCol
              className="ion-margin form-container"
              size-xl="4"
              offset-xl="4"
              size-md="6"
              offset-md="3"
              size-sm="10"
              offset-sm="1">
              <h1 className="form-container__header">Sign In to your account</h1>
              <div className="login-page__btn-container ion-padding">
                <a className="login-page__btn login-page__btn--google" href={URL_GOOGLE}>
                  <IonIcon className="login-page__icon login-page__icon--greyed" icon={logoGoogle} />
                  <span>Google</span>
                </a>
                <a className="login-page__btn login-page__btn--fb" href={URL_FACEBOOK}>
                  <IonIcon className="login-page__icon" icon={logoFacebook} />
                  <span>Facebook</span>
                </a>
              </div>
              <span className="login-page__divider ion-padding-start ion-padding-end ion-padding-bottom">or</span>
              <LoginFormContainer />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
