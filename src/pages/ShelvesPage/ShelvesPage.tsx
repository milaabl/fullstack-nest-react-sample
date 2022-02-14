import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IonGrid, IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { AppStateType } from '../../reducers/rootReducer';
import Header from '../../modules/Header/components/Header';
import BasicToast from '../../common/Toast/BasicToast';
import ShelfAddEditModal from '../../modules/ShelvesManagement/components/ShelfAddEditModal/ShelfAddEditModal';
import ShelvesList from '../../modules/ShelvesManagement/components/ShelvesList/ShelvesList';
import Shelves from '../../modules/ShelvesManagement/components/Shelves/Shelves';
import { getIsErrorOnRemove } from '../../modules/ShelvesManagement/selectors/shelvesSelectors';
import RemoveShelfModal from '../../modules/RemoveShelfModal/components/RemoveShelfModal';
import { saveErrorToRemoveShelf } from '../../modules/ShelvesManagement/actions/shelvesActions';
import { shelfAddEditModalOpen } from '../../modules/ShelvesManagement/actions/shelfAddEditModalActions';
import VirtualShelf from '../../modules/ShelvesManagement/components/VirtualShelf/VirtualShefl';
import { shelvesThunk } from '../../modules/ShelvesManagement/thunks/shelvesThunk';

import './ShelvesPage.scss';
import '../../theme/_base.scss';

type PropsType = {
  isErrorOnRemove: boolean;
  saveErrorToRemoveShelf: (error: null | string) => void;
  shelfAddEditModalOpen : (id?: string) => any;
  isLoggedIn: undefined | boolean;
  shelvesThunk: () => void;
};

function ShelvesPage({ isErrorOnRemove, saveErrorToRemoveShelf, shelvesThunk, isLoggedIn, shelfAddEditModalOpen }: PropsType): JSX.Element {
  useEffect(() => {
    shelvesThunk();
  }, [isLoggedIn, shelvesThunk]);

  return (
    <IonPage>
      <Header />
      <IonContent>
        <ShelfAddEditModal />
        <BasicToast
          isOpen={isErrorOnRemove}
          handleOnDidDismiss={() => saveErrorToRemoveShelf(null)}
          message="Smth happen during removing the shelf. Try again later."
          type="warning" />
        <IonGrid class="shelves-page__container">
          <RemoveShelfModal />
          <Shelves />
          <ShelvesList />
          <VirtualShelf />
        </IonGrid>
      </IonContent>
      <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton color="secondary" onClick={() => shelfAddEditModalOpen()}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  isErrorOnRemove: getIsErrorOnRemove(state),
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = {
  saveErrorToRemoveShelf,
  shelfAddEditModalOpen,
  shelvesThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShelvesPage);
