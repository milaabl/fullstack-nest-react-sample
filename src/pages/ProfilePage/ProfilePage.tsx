import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { IonGrid, IonRow, IonCol, IonPage, IonContent } from '@ionic/react';
import { AppStateType } from '../../reducers/rootReducer';
import Header from '../../modules/Header/components/Header';
import ProfileFormContainer from '../../modules/Profile/containers/ProfileFormContainer';

import './ProfilePage.scss';

type UserProfilePagePropsType = {
  isLoggedIn: undefined | boolean;
};

export function UserProfilePage({ isLoggedIn }: UserProfilePagePropsType): JSX.Element {
  if (isLoggedIn === false) {
    return (<Redirect push to="/login" />);
  }
  return (
    <IonPage>
      <Header />
      <IonContent className="user-profile-page-container">
        <IonGrid>
          <IonRow>
            <IonCol
              size-xl="4"
              offset-xl="4"
              size-md="6"
              offset-md="3"
              size-sm="10"
              offset-sm="1"
              className="ion-margin form-container">
              <h1 className="form-container__header">My account</h1>
              <ProfileFormContainer />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(mapStateToProps)(UserProfilePage);
