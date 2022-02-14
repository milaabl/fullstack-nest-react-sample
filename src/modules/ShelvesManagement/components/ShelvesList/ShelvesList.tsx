/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {IonRow, IonCol, IonTitle} from '@ionic/react';
import { ShelfCardData } from '../../interfaces';
import ShelfCard from '../ShelfCard/ShelfCard';
import { shelvesThunk } from '../../thunks/shelvesThunk';
import { getShelves } from '../../selectors/shelvesSelectors';
import './ShelvesList.scss';

const ShelvesList = ({ shelves }: Record<string, any>): JSX.Element | null => {
  if (!shelves.length) {
    return <IonTitle className="ion-text-center ion-margin-top">No shelves has been created yet</IonTitle>
  }

  return (
    <IonRow>
      {
        shelves.map((shelf: ShelfCardData, index: number) => (
          <IonCol
            className="shelves-list__container"
            size="12"
            key={shelf._id}
            size-sm="6"
            size-md="6"
            size-lg="4"
            size-xs="12">
            <Link
              to={`shelf/${shelf._id}`}
              className="shelves-list__link">
              <ShelfCard shelf={shelf} />
            </Link>
          </IonCol>
        ))
      }
    </IonRow>
  );
};

const mapStateToProps = (state: any) => ({
  shelves: getShelves(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchShelves: () => dispatch(shelvesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShelvesList);
