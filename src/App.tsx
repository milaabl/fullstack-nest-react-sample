import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setupConfig, isPlatform } from '@ionic/core';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { initUserProfile } from './modules/Auth/actionCreators/loginActions';
import { isMobile } from './reducers/appReducer';

import './theme/main.scss';
import Spinner from './common/Spinner/components/Spinner';

import { UserProfilePage } from './pages/ProfilePage/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage/ConfirmEmailPage';
import MainPage from './pages/MainPage/MainPage';
import ShelvesPage from './pages/ShelvesPage/ShelvesPage';
import ShelfPage from './pages/ShelfPage/ShelfPage';
import FlowerPage from './pages/FlowerPage/FlowerPage';

const getConfig = () => (isPlatform('mobile')
  ? { animated: true }
  : { animated: false });

setupConfig(getConfig());

type PropsType = {
  initUserProfile: (initNotifications: boolean) => void;
  isMobile: (isMobile: boolean) => void;
};

export const App: React.FC<PropsType> = ({ initUserProfile, isMobile }: PropsType) => {
  useEffect(() => {
    initUserProfile(true);
    isMobile(isPlatform('mobile'));
  }, [initUserProfile, isMobile]);
  return (
    <IonApp>
      <Spinner />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/confirm-email/:status" component={ConfirmEmailPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={UserProfilePage} />
          <Route path="/shelves" component={ShelvesPage} />
          <Route path="/shelf/:id" component={ShelfPage} />
          <Route path="/flower/:id" component={FlowerPage} />
          <Route exact path="/" component={MainPage} />
          <Redirect to="/" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const mapDispatchToProps = {
  initUserProfile,
  isMobile,
};

export default connect(null, mapDispatchToProps)(App);
