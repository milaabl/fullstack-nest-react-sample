import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  IonList,
  IonListHeader,
  IonItem,
  IonPopover,
  IonLabel,
} from '@ionic/react';

import { getShelves } from '../../selectors/shelvesSelectors';
import { getIsShowDropdownLocation, getShelfFromMoveId, getEventPopover } from '../../selectors/UpdateFlowerLocationSelector';
import { showDropdownFlowerLocation, showChangeFlowerLocationModal, showBtnFlowerLocation } from '../../actions/UpdateFlowerLocationActions';
import { shelvesThunk } from '../../thunks/shelvesThunk';
import { AppStateType } from '../../../../reducers/rootReducer';
import { ShelfCardData } from '../../interfaces';
import './DropdownFlowerLocation.scss';

type PropsType = {
  shelves: ShelfCardData[];
  isShow: boolean;
  showDropdown: (isShow: boolean) => any;
  eventPopover : Event | undefined;
  fetchShelves : () => any;
  shelfToMove : (shelfToId: string, shelfToLocation: string) => any;
  shelfFromMoveId: string | null;
  showBtnLocation: (isShow: boolean) => any;
};

const DropdownFlowerLocation =
  ({ shelves, isShow, showDropdown, fetchShelves, shelfFromMoveId, shelfToMove, eventPopover, showBtnLocation }
  : PropsType) => {
    useEffect(() => {
      if (!shelves.length) {
        fetchShelves();
      }
      if (shelves.length > 1) {
        showBtnLocation(true);
      } else {
        showBtnLocation(false);
      }
    }, [shelves.length, fetchShelves, showBtnLocation]);

    const handleCheckedShelfClick = (id: string, location: string) => {
      shelfToMove(id, location);
    };

    const getShelvesToShow = () => shelves.filter(shelf => shelf._id !== shelfFromMoveId);

    return (
      <IonPopover
        isOpen={isShow}
        cssClass="moveDropdown"
        event={eventPopover}
        animated
        onDidDismiss={() => showDropdown(false)}>
        <IonList className="moveDropdown__container">
          <IonListHeader className="moveDropdown__header">Choose shelf</IonListHeader>
          { getShelvesToShow().map((shelf, ind) => {
            const { _id, location } = shelf;
            return (
              <IonItem
                button
                mode="ios"
                className="moveDropdown__item"
                key={_id}
                onClick={() => handleCheckedShelfClick(shelf._id, location)}>
                <IonLabel className="moveDropdown__item-label">{ location }</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonPopover>
    );
  };

const mapStateToProps = (state: AppStateType) => ({
  shelves: getShelves(state),
  isShow: getIsShowDropdownLocation(state),
  shelfFromMoveId: getShelfFromMoveId(state),
  eventPopover: getEventPopover(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchShelves: () => dispatch(shelvesThunk()),
  showDropdown: (isShow : boolean) => dispatch(showDropdownFlowerLocation(isShow)),
  shelfToMove: (shelfToId: string, shelfToLocation: string) => dispatch(showChangeFlowerLocationModal(shelfToId, shelfToLocation)),
  showBtnLocation: (isShow: boolean) => dispatch(showBtnFlowerLocation(isShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownFlowerLocation);
