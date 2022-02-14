/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IonCard,
  IonRow, IonCol,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonIcon } from '@ionic/react';
import { people, leaf, close, pencilOutline } from 'ionicons/icons';
import MdStar from 'react-ionicons/lib/MdStar';
import Rating from 'react-rating';
import { ShelfCardData } from '../../interfaces';
import { showModalToRemoveShelf } from '../../actions/shelvesActions';
import { AppStateType } from '../../../../reducers/rootReducer';
import { getUserId } from '../../../Auth/selectors/loginSelectors';
import { shelfAddEditModalOpen } from '../../actions/shelfAddEditModalActions';
import { getImage } from '../../helpers/uploadImageHelper';

import './ShelfCard.scss';
import Plant from '../../../../assets/plant.jpeg';

const colors : any = {
  emptyColor: '#737373',
  fullColor: '#488aff',
};

const starRating : any = {
  emptySymbol: <MdStar color={colors.emptyColor} />,
  fullSymbol: <MdStar color={colors.fullColor} />,
  fractions: 2,
  onChange: (newValue : any) => {
    console.log(`new value is ${newValue}`);
  },
};

type PropsType = {
  shelf: ShelfCardData;
  showModalToRemoveShelf: (isShow: boolean, id?: string, location?: string) => void;
  userId: string | undefined | null;
  shelfAddEditModalOpen: (id: string) => void;
};

const ShelfCard = ({ shelf, showModalToRemoveShelf, userId, shelfAddEditModalOpen }: PropsType): JSX.Element | null => {
  const { location, users, flowers, _id, ownerId, picturePath } = shelf;
  const { emptySymbol, fullSymbol, fractions, onChange } = starRating;
  const [isOwner, checkOwner] = useState(false);

  useEffect(() => {
    checkOwner(ownerId === userId);
  },[ownerId, userId]);

  if (!_id) {
    return null;
  }

  const getImageShelf = () => getImage(picturePath, Plant);

  const preventDefaultLink = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
  };

  const handleShowModalToRemoveShelf = () => showModalToRemoveShelf(true, _id, location);
  return (
    <IonCard className="shelf-card shelf-card__container">
      {isOwner && (
        <section className="shelf-card__action-buttons" role="presentation" onClick={preventDefaultLink}>
          <IonIcon
            icon={pencilOutline}
            className="card-icon card-icon--withBlurredBackground"
            onClick={() => shelfAddEditModalOpen(_id)} />
          <IonIcon
            icon={close}
            className="card-icon card-icon--withBlurredBackground"
            onClick={handleShowModalToRemoveShelf} />
        </section>
      )}
      <div className="shelf-card__container-image">
        <img src={getImageShelf()} alt="shelf" />
      </div>
      <IonCardHeader>
        <IonCardTitle>
          {location}
        </IonCardTitle>
      </IonCardHeader>
      <IonRow className="rating ion-margin">
        <IonCol
          size="8"
          className="ion-text-start">
          <Rating
            emptySymbol={emptySymbol}
            fullSymbol={fullSymbol}
            fractions={fractions}
            onChange={onChange} />
        </IonCol>
        <IonCol
          size="2"
          className="">
          <div className="icons__wrapper">
            <IonIcon icon={people} className="icons__wrapper-icon" />
            <IonLabel className="icons__wrapper-label">{users.length}</IonLabel>
          </div>
        </IonCol>
        <IonCol
          className=""
          size="2">
          <div className="icons__wrapper">
            <IonIcon icon={leaf} class="icons__wrapper-icon" />
            <IonLabel className="icons__wrapper-label">{flowers.length}</IonLabel>
          </div>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  userId: getUserId(state),
});

const mapDispatchToProps = {
  shelfAddEditModalOpen,
  showModalToRemoveShelf,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShelfCard);
