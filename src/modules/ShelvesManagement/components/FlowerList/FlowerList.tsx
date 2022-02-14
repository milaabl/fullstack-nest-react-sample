import React, { useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IonRow,
  IonCol,
  IonTitle,
  IonCardTitle,
} from '@ionic/react';
import { getShelf } from '../../selectors/shelvesSelectors';
import FlowerCard from '../FlowerCard/FlowerCard';
import { shelfThunk } from '../../thunks/shelvesThunk';
import './FlowerList.scss';
import { FlowerCardData, ShelfCardData } from '../../interfaces';

type PropsType = {
  fetchShelf : (id: string) => any;
  shelf: ShelfCardData | null;
};

const FlowersList = ({ shelf, fetchShelf }: PropsType): JSX.Element | null => {
  const { id } = useParams();
  useEffect(() => {
    fetchShelf(id);
  }, [id, fetchShelf]);

  return shelf && shelf.location ?
    (
      <>
        <h1 className="ion-text-center">Shelf</h1>
        <IonRow className="flowers-list__title">
          <IonCol
            className="ion-text-center"
            size="12">
            <IonCardTitle
              className="flowers-list__title-location">
              {shelf.location}
            </IonCardTitle>
          </IonCol>
        </IonRow>
        <IonRow>
          { shelf.flowers.length ?
            shelf.flowers.map((flower: FlowerCardData, index: number) => (
              <IonCol
                className="flowers-list__container"
                size="12"
                key={flower.id}
                size-sm="6"
                size-md="6"
                size-lg="4"
                size-xs="12">
                <FlowerCard flower={flower} />
              </IonCol>
            )) :
            <IonTitle className="ion-text-center ion-margin-top">No flowers on your shelf</IonTitle>}
        </IonRow>
      </>
    ) : null;
};

const mapStateToProps = (state: any) => ({
  shelf: getShelf(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchShelf: (id: string) => dispatch(shelfThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowersList);
