import React from 'react';
import { IonButton, IonModal } from '@ionic/react';
import { connect } from 'react-redux';
import { trashOutline } from 'ionicons/icons';
import { getIsShowModalToRemoveShelf, getShelfToRemove } from '../../ShelvesManagement/selectors/shelvesSelectors';
import { AppStateType } from '../../../reducers/rootReducer';
import { showModalToRemoveShelf } from '../../ShelvesManagement/actions/shelvesActions';
import { ShelfToRemoveType } from '../../ShelvesManagement/reducers/shelvesReducer';
import { removeShelf } from '../../ShelvesManagement/thunks/shelvesThunk';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';

type PropsType = {
  isShow: boolean;
  shelf: ShelfToRemoveType;
  showModalToRemoveShelf: (isShow: boolean, id?: string | undefined) => any;
  removeShelf: (id: string | null) => void;
};

function RemoveShelfModal({ isShow, shelf, showModalToRemoveShelf, removeShelf }: PropsType) {
  const { id, location } = shelf;
  const handleShowClick = () => showModalToRemoveShelf(false);
  const handleRemoveClick = () => removeShelf(id);
  return (
    <IonModal
      isOpen={isShow}
      onDidDismiss={handleShowClick}
      cssClass="shelfModal"
      animated
      swipeToClose>
      <h1 className="shelfModal__header">Remove Shelf</h1>

      <section className="shelfModal__container">
        <h3 className="shelfModal__content">
          Are you sure to remove the shelf
          <br />
          <span className="shelfModal__content--bolder">{location}</span>
          ?
        </h3>
        <p className="shelfModal__remark">
          * Flowers from this shelf will be moved to the virtual shelf.
        </p>
      </section>

      <div className="shelfModal__buttons">
        <ButtonWithIcon
          text="remove"
          iconName={trashOutline}
          onClick={handleRemoveClick}
          contentColor="white"
          color="danger" />
        <IonButton onClick={handleShowClick} fill="clear" color="dark">Cancel</IonButton>
      </div>
    </IonModal>
  );
}

const mapStateTopProps = (state: AppStateType) => ({
  isShow: getIsShowModalToRemoveShelf(state),
  shelf: getShelfToRemove(state),
});

const mapDispatchToProps = {
  showModalToRemoveShelf,
  removeShelf,
};
export default connect(mapStateTopProps, mapDispatchToProps)(RemoveShelfModal);
