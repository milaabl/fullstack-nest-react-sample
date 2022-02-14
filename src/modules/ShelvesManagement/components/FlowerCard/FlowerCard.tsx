import React from 'react';
import {
  IonCard,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardContent,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeSharp, locationSharp, pencilOutline } from 'ionicons/icons';
import FlowerCardButtonsList from './FlowerCardButtonsList';
import {
  getWateringOverdueText,
  checkIsMissedWatering,
  getDifference,
} from './helpers/flowerCardHelper';
import { getIsFlowerWatering, getShelf } from '../../selectors/shelvesSelectors';
import { FlowerCardData, ShelfCardData } from '../../interfaces';
import { showDropdownFlowerLocation } from '../../actions/UpdateFlowerLocationActions';
import { getIsShowBtnFlowerLocation } from '../../selectors/UpdateFlowerLocationSelector';
import { AppStateType } from '../../../../reducers/rootReducer';
import { getUserId } from '../../../Auth/selectors/loginSelectors';
import { checkIfOwnerOfShelf } from '../../helpers/shelfCardHelper';
import PhotoInput from '../../../../common/PhotoInput/PhotoInput';
import { uploadFlowerImage } from '../../thunks/shelvesThunk';
import { flowerModalOpen } from '../../actions/flowerModalActions';
import { showModalToRemoveFlower } from '../../actions/shelvesActions';
import Cactus from '../../../../assets/Cactus.jpg';
import { getImage } from '../../helpers/uploadImageHelper';

import './FlowerCard.scss';

type PropsType = {
  flower: FlowerCardData;
  isFlowerWatering: boolean;
  showDropdownFlowerLocation: (
    isShow: boolean,
    flowerid: string,
    shelfIdFrom: string,
    location: string,
    nameOfFlower: string,
    eventPopover: Event | undefined) => void;
  shelf: ShelfCardData | any;
  userId: string | undefined | null;
  isShowBtnFlowerLocation: boolean;
  uploadFlowerImage: (file: Blob, shelfId?: string | undefined, flowerId?: string | undefined) => void;
  flowerModalOpen: (flower: FlowerCardData) => void;
  showModalToRemoveFlower: (isShow: boolean, flowerId?: string, name?: string) => void;
};

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const FlowerCard = ({
  flower,
  isFlowerWatering,
  shelf,
  userId,
  isShowBtnFlowerLocation,
  showDropdownFlowerLocation,
  uploadFlowerImage,
  flowerModalOpen,
  showModalToRemoveFlower,
}: PropsType): JSX.Element | null => {
  const { name, nextWateringAt, id, picturePath } = flower;
  const { _id, location, ownerId } = shelf;
  const waterOverdue = getDifference(nextWateringAt);
  const isMissedWatering = checkIsMissedWatering(waterOverdue);
  const localNextWateringAt = new Date(nextWateringAt).toLocaleString(undefined, dateOptions);
  const IS_OWNER_OF_SHELF = checkIfOwnerOfShelf(ownerId, userId);
  const getImageFlower = (): string => getImage(picturePath, Cactus);

  return (
    <IonCard className="flower-card flower-card__container">
      {isFlowerWatering && <div className="flower-card--blurred"><div /></div>}
      <div className="flower-card__container-image">
        {IS_OWNER_OF_SHELF && (
          <>
            <PhotoInput uploadImage={uploadFlowerImage} shelfId={_id} flowerId={id} />
            <div className="flower-card__icons">
              { isShowBtnFlowerLocation && (
                <IonIcon
                  className="card-icon card-icon--withBlurredBackground"
                  icon={locationSharp}
                  onClick={(e) => { showDropdownFlowerLocation(true, id, _id, location, name, e.nativeEvent); }} />
              )}
              <IonIcon
                icon={pencilOutline}
                className="card-icon card-icon--withBlurredBackground"
                onClick={() => flowerModalOpen(flower)} />
              <IonIcon
                icon={closeSharp}
                className="card-icon card-icon--withBlurredBackground"
                onClick={() => showModalToRemoveFlower(true, id, name)} />
            </div>
          </>
        )}
        <Link
          to={`/flower/${flower.id}`}>
          <img src={getImageFlower()} alt="flower" />
        </Link>
      </div>
      <IonCardHeader>
        <IonCardTitle>
          {name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="flower-card-statistic">
        <div className="flower-card-statistic__block">
          Next Watering at&nbsp;
          <span className="flower-card-statistic__block--bold">
            {localNextWateringAt}
          </span>
        </div>
        {isMissedWatering && <div>{`Overdue: ${getWateringOverdueText(waterOverdue)}`}</div>}
      </IonCardContent>
      <IonRow className="flower-action-buttons">
        <FlowerCardButtonsList flower={flower} isMissedWatering={isMissedWatering} flowerId={flower.id} />
      </IonRow>
    </IonCard>
  );
};

const mapStateToProps = (state: AppStateType, props: any) => ({
  isFlowerWatering: getIsFlowerWatering(state, props),
  userId: getUserId(state),
  shelf: getShelf(state),
  isShowBtnFlowerLocation: getIsShowBtnFlowerLocation(state),
});

const mapDispatchToProps = {
  showDropdownFlowerLocation,
  uploadFlowerImage,
  flowerModalOpen,
  showModalToRemoveFlower,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowerCard);
