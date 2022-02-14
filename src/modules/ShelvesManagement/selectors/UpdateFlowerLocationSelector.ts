import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getDropdownFlowerLocationState = (state: AppStateType) => state.updateFlowerLocation;

export const getIsShowDropdownLocation = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.isShowDropdown,
);

export const getIsShowMoveModal = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.isShowFlowerMoveModal,
);

export const getshelfFromMove = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.shelfFromMove,
);

export const getshelfToMove = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.shelfToMove,
);

export const getShelfFromMoveId = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.shelfFromMove.shelfFromId,
);

export const getIsErrorOnMoveFlower = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => !!updateFlowerLocation.errorOnMoveFlower,
);

export const getEventPopover = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.eventPopover,
);

export const getIsShowBtnFlowerLocation = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.isShowBtnFlowerLocation,
);

export const getNameOfFlower = createSelector(
  getDropdownFlowerLocationState,
  (updateFlowerLocation) => updateFlowerLocation.shelfFromMove.nameOfFlower,
);
