import React from 'react';
import { IonButton, IonModal } from '@ionic/react';
import { connect } from 'react-redux';
import { trashOutline } from 'ionicons/icons';
import { getIsShowModalToRemoveFlower, getFlowerToRemove } from '../../ShelvesManagement/selectors/shelvesSelectors';
import { AppStateType } from '../../../reducers/rootReducer';
import { showModalToRemoveFlower } from '../../ShelvesManagement/actions/shelvesActions';
import { FlowerToRemoveType } from '../../ShelvesManagement/reducers/shelvesReducer';
import { removeFlower } from '../../ShelvesManagement/thunks/shelvesThunk';
import ButtonWithIcon from '../../../common/ButtonWithIcon/ButtonWithIcon';

type PropsType = {
  isShow: boolean;
  flower: FlowerToRemoveType;
  showModalToRemoveFlower: (isShow: boolean, flowerId?: string, name?: string) => any;
  removeFlower: (flowerId?: string) => void;
};

function RemoveFlowerModal({ isShow, flower, showModalToRemoveFlower, removeFlower }: PropsType) {
  const { flowerId, name } = flower;
  const handleShowClick = () => showModalToRemoveFlower(false);
  const handleRemoveClick = () => removeFlower(flowerId);
  return (
    <IonModal
      isOpen={isShow}
      onDidDismiss={handleShowClick}
      cssClass="flowerModal"
      animated
      swipeToClose>
      <h1 className="flowerModal__header">Remove Flower</h1>

      <section className="flowerModal__container">
        <h3 className="flowerModal__content">
          Are you sure to remove the flower
          <br />
          <span className="flowerModal__content--bolder">{name}</span>
          ?
        </h3>
        <p className="flowerModal__remark">
          * This flower will be moved to the archive.
        </p>
      </section>

      <div className="flowerModal__buttons">
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
  isShow: getIsShowModalToRemoveFlower(state),
  flower: getFlowerToRemove(state),
});

const mapDispatchToProps = {
  showModalToRemoveFlower,
  removeFlower,
};
export default connect(mapStateTopProps, mapDispatchToProps)(RemoveFlowerModal);
