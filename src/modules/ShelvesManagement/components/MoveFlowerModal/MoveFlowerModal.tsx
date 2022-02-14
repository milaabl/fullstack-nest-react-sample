import React from 'react';
import { IonButton, IonModal } from '@ionic/react';
import { connect } from 'react-redux';
import { moveOutline } from 'ionicons/icons';
import { getIsShowMoveModal, getshelfFromMove, getshelfToMove, getNameOfFlower } from '../../selectors/UpdateFlowerLocationSelector';
import { AppStateType } from '../../../../reducers/rootReducer';
import { ShelfFromMove, ShelfToMove } from '../../interfaces';
import { MoveFlowerData } from '../../../../services/shelvesService';
import { showMoveFlowerModal } from '../../actions/UpdateFlowerLocationActions';
import { moveFlowerThunk } from '../../thunks/shelvesThunk';
import ButtonWithIcon from '../../../../common/ButtonWithIcon/ButtonWithIcon';
import './MoveFlowerModal.scss';

type PropsType = {
  isShow: boolean;
  shelfFromMove: ShelfFromMove;
  showMoveModal: (isShow: boolean) => any;
  shelfToMove: ShelfToMove;
  moveFlower: (data: MoveFlowerData) => void;
};

function MoveFlowerModal({ isShow, shelfFromMove, showMoveModal, shelfToMove, moveFlower }: PropsType): JSX.Element | null {
  const { shelfFromId, shelfFromLocation, flowerId, nameOfFlower } = shelfFromMove;
  const { shelfToId, shelfToLocation } = shelfToMove;
  const handleShowClick = () => showMoveModal(false);
  const handleMoveFlower = () => moveFlower({ shelfFromId, shelfToId, flowerId });

  return (
    <IonModal
      isOpen={isShow}
      onDidDismiss={handleShowClick}
      cssClass="shelfModal"
      animated
      swipeToClose>
      <h1 className="shelfModal__header">Move Flower</h1>

      <section className="shelfModal__container">
        <h3 className="shelfModal__content move-content">
          Are you sure to move the flower from the shelf
          <br />
          <span className="shelfModal__content--bolder">
            {shelfFromLocation}
            {' '}
          </span>
          to the shelf
          <br />
          <span className="shelfModal__content--bolder">{shelfToLocation}</span>
          ?
        </h3>
        <p className="shelfModal__remark">
          * Flower
          {' '}
          <span className="remark-flower">{nameOfFlower}</span>
          {' '}
          from this shelf will be moved to the chosen shelf
          .
        </p>
      </section>

      <div className="shelfModal__buttons">
        <ButtonWithIcon
          text="move"
          iconName={moveOutline}
          onClick={handleMoveFlower}
          contentColor="white"
          color="warning" />
        <IonButton onClick={handleShowClick} fill="clear" color="dark">Cancel</IonButton>
      </div>
    </IonModal>
  );
}

const mapStateTopProps = (state: AppStateType) => ({
  isShow: getIsShowMoveModal(state),
  shelfFromMove: getshelfFromMove(state),
  shelfToMove: getshelfToMove(state),
  nameFlower: getNameOfFlower(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  showMoveModal: (isShow : boolean) => dispatch(showMoveFlowerModal(isShow)),
  moveFlower: (data: MoveFlowerData) => dispatch(moveFlowerThunk(data)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(MoveFlowerModal);
