import React from 'react';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router';
import {
  IonGrid, IonContent, IonPage, IonRow, IonCol,
} from '@ionic/react';
import { AppStateType } from '../../reducers/rootReducer';
import Header from '../../modules/Header/components/Header';
import FlowerProfile from '../../modules/ShelvesManagement/components/FowerProfile/FlowerProfile';
import './FlowerPage.scss';

type PropsType = {
  isLoggedIn: undefined | boolean;
};

const FlowerPage = ({ isLoggedIn }: PropsType): JSX.Element => {
  if (isLoggedIn === false) {
    return (<Redirect push to="/login" />);
  }
  return (
    <>
      <IonPage>
        <Header />
        <IonContent>
          <IonGrid class="flower-page__container">
            <IonRow>
              <IonCol>
                <FlowerProfile />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FlowerPage);
