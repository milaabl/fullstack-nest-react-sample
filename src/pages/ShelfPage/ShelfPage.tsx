import React from 'react';
import { connect } from 'react-redux';
import {
  IonGrid,
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { AppStateType } from '../../reducers/rootReducer';
import Header from '../../modules/Header/components/Header';
import FlowersList from '../../modules/ShelvesManagement/components/FlowerList/FlowerList';
import '../ShelvesPage/ShelvesPage.scss';
import DropdownFlowerLocation from '../../modules/ShelvesManagement/components/DropdownFlowerLocation/DropdownFlowerLocation';
import MoveFlowerModal from '../../modules/ShelvesManagement/components/MoveFlowerModal/MoveFlowerModal';
import { getIsErrorOnMoveFlower } from '../../modules/ShelvesManagement/selectors/UpdateFlowerLocationSelector';
import { errorToMoveFlower } from '../../modules/ShelvesManagement/actions/UpdateFlowerLocationActions';
import FlowerModal from '../../modules/ShelvesManagement/components/FlowerModal/FlowerModal';
import { flowerModalOpen, flowerModalClose } from '../../modules/ShelvesManagement/actions/flowerModalActions';
import { getSuccessMessage, getErrorMessage } from '../../modules/ShelvesManagement/selectors/flowersModalSelectors';
import BasicToast from '../../common/Toast/BasicToast';
import { errorUploadFlowerImage } from '../../modules/ShelvesManagement/actions/uploadImageActions';
import { getFlowerWateringError, getErrorMsgUploadImgFlower, getIsErrorOnRemoveFlower } from '../../modules/ShelvesManagement/selectors/shelvesSelectors';
import { setWateringError } from '../../modules/ShelvesManagement/actions/flowerWateringActions';
import RemoveFlowerModal from '../../modules/RemoveFlowerModal/components/RemoveFlowerModal';
import './ShelfPage.scss';
import { Redirect } from 'react-router';

type PropsType = {
  isErrorOnMove: boolean;
  errorToMoveFlower: (error: null | string) => void;
  toastSuccessMessage: string;
  toastErrorMessage: string;
  flowerModalOpen: () => void;
  flowerWateringError: string;
  setWateringError: (error: string) => void;
  errorMsgUploadImgFlower: string | null;
  errorUploadFlowerImage: (error: string | null) => void;
  flowerModalClose: () => void;
  errorOnRemoveFlower: string;
  isLoggedIn: undefined | boolean;
};

function ShelfPage ({
  isErrorOnMove,
  errorToMoveFlower,
  toastSuccessMessage,
  toastErrorMessage,
  flowerModalOpen,
  flowerWateringError,
  setWateringError,
  errorMsgUploadImgFlower,
  errorUploadFlowerImage,
  flowerModalClose,
  errorOnRemoveFlower,
  isLoggedIn,
}: PropsType): JSX.Element {
  if (isLoggedIn === false) {
    return (<Redirect push to="/login" />);
  }
  return (
    <>
      <BasicToast
        message={toastSuccessMessage || toastErrorMessage}
        type={toastSuccessMessage ? 'success' : 'danger'}
        isOpen={!!toastSuccessMessage || !!toastErrorMessage}
        handleOnDidDismiss={flowerModalClose}
        duration={2000}/>
      <BasicToast
        message={flowerWateringError}
        type="warning"
        isOpen={!!flowerWateringError}
        handleOnDidDismiss={() => setWateringError('')}
        duration={2000}/>
      <BasicToast
        message="Smth happen during updating your image flower. Try again later."
        type="warning"
        isOpen={!!errorMsgUploadImgFlower}
        handleOnDidDismiss={() => errorUploadFlowerImage('')}
        duration={2000}/>
      <BasicToast
        isOpen={!!errorOnRemoveFlower}
        message={errorOnRemoveFlower}
        type="warning"
        duration={5000}/>
      <RemoveFlowerModal/>
      <FlowerModal/>
      <IonPage>
        <Header/>
        <IonContent>
          <IonGrid class="shelf-page__container">
            <DropdownFlowerLocation/>
            <MoveFlowerModal/>
            <BasicToast
              isOpen={isErrorOnMove}
              handleOnDidDismiss={() => errorToMoveFlower(null)}
              message="Smth happen during moving your flower from the shelf. Try again later."
              type="warning"/>
            <FlowersList/>
          </IonGrid>
        </IonContent>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="secondary" onClick={() => flowerModalOpen()}>
            <IonIcon icon={addOutline}/>
          </IonFabButton>
        </IonFab>
      </IonPage>
    </>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  isErrorOnMove: getIsErrorOnMoveFlower(state),
  toastSuccessMessage: getSuccessMessage(state),
  toastErrorMessage: getErrorMessage(state),
  flowerWateringError: getFlowerWateringError(state),
  errorMsgUploadImgFlower: getErrorMsgUploadImgFlower(state),
  errorOnRemoveFlower: getIsErrorOnRemoveFlower(state),
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = {
  errorToMoveFlower,
  flowerModalOpen,
  flowerModalClose,
  setWateringError,
  errorUploadFlowerImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShelfPage);
