import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { colorFillOutline } from 'ionicons/icons';
import { connect } from 'react-redux';
import Header from '../../modules/Header/components/Header';
import FlowerPotSlider from '../../modules/FlowerPotsSlider/FlowerPotsSlider';
import FlowerPotsKeyFeatures from '../../modules/FlowerPotsKeyFeatures/FlowerPotsKeyFeatures';
import ButtonWithIcon from '../../common/ButtonWithIcon/ButtonWithIcon';
import { AppStateType } from '../../reducers/rootReducer';
import './MainPage.scss';

type MainPageType = {
  isLoggedIn: undefined | boolean;
};

function MainPage({ isLoggedIn }: MainPageType): JSX.Element {
  return (
    <IonPage>
      <Header />
      <IonContent className="landing-page-content">
        <h1 className="landing-page-content__header ion-margin-top ion-margin-bottom">
          Blomstergård - Take care of your houseplants flawlessly
          <span className="landing-page-content__header2">Whether it a succulent or a Monstera</span>
        </h1>
        <FlowerPotSlider />
        {isLoggedIn && (
          <ButtonWithIcon
            link="/shelves"
            color="white"
            text="My Shelves"
            iconName={colorFillOutline}
            className="landing-page-content__button ion-padding-end" />
        )}
        <FlowerPotsKeyFeatures />
      </IonContent>
    </IonPage>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(mapStateToProps)(MainPage);
