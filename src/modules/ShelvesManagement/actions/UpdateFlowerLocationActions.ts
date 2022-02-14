import { Dispatch } from 'redux';
import { ActionTypes } from './UpdateFlowerLocationTypes';

export interface ShowDropdownFlowerLocationAction {
  type: ActionTypes.showDropdownFlowerLocation;
  isShow: boolean;
  flowerId? : string;
  shelfFromId?: string;
  shelfFromLocation?: string;
  nameOfFlower? : string;
  eventPopover?: Event | undefined;
}
export interface ShowMoveFlowerModalAction {
  type: ActionTypes.showMoveFlowerModal;
  isShow: boolean;
}
export interface SetShelfToMoveAction {
  type: ActionTypes.setShelfToMoveAction;
  shelfToId: string;
  shelfToLocation: string;
}

export interface ErrorToMoveFlowerAction {
  type: ActionTypes.errorToMoveFlower;
  error: null | string;
}
export interface ShowBtnFlowerLocationAction {
  type: ActionTypes.showBtnFlowerLocation;
  isShow: boolean;
}

export const showDropdownFlowerLocation = (
  isShow: boolean,
  flowerId?: string,
  shelfFromId?: string,
  shelfFromLocation?: string,
  nameOfFlower?: string,
  eventPopover?: Event | undefined,
): ShowDropdownFlowerLocationAction => ({
  type: ActionTypes.showDropdownFlowerLocation,
  isShow,
  flowerId,
  shelfFromId,
  shelfFromLocation,
  nameOfFlower,
  eventPopover,
});

export const showMoveFlowerModal = (isShow: boolean): ShowMoveFlowerModalAction => ({
  type: ActionTypes.showMoveFlowerModal,
  isShow,
});

export const setShelfToMove = (shelfToId: string, shelfToLocation: string) : SetShelfToMoveAction => ({
  type: ActionTypes.setShelfToMoveAction,
  shelfToId,
  shelfToLocation,
});

export const showChangeFlowerLocationModal = (shelfToId: string, shelfToLocation: string) => async (dispatch: Dispatch) => {
  dispatch(showMoveFlowerModal(true));
  dispatch(setShelfToMove(shelfToId, shelfToLocation));
};

export const errorToMoveFlower = (error: null | string): ErrorToMoveFlowerAction => ({
  type: ActionTypes.errorToMoveFlower,
  error,
});

export const showBtnFlowerLocation = (isShow: boolean): ShowBtnFlowerLocationAction => ({
  type: ActionTypes.showBtnFlowerLocation,
  isShow,
});

export type ActionsFlowerMoveTypes =
  ShowDropdownFlowerLocationAction |
  ShowMoveFlowerModalAction |
  ErrorToMoveFlowerAction |
  SetShelfToMoveAction |
  ShowBtnFlowerLocationAction;
