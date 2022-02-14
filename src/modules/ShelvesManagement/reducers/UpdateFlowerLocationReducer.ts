import { ActionTypes } from '../actions/UpdateFlowerLocationTypes';
import { ShelfFromMove, ShelfToMove } from '../interfaces/index';

export interface State {
  isShowDropdown: boolean;
  eventPopover: Event | undefined;
  shelfFromMove: ShelfFromMove;
  isShowFlowerMoveModal: boolean;
  shelfToMove: ShelfToMove;
  isShowBtnFlowerLocation: boolean;
  errorOnMoveFlower: null | string;
}

const initialState : State = {
  isShowDropdown: false,
  shelfFromMove: {
    flowerId: '',
    shelfFromId: '',
    shelfFromLocation: '',
    nameOfFlower: '',
  },
  isShowFlowerMoveModal: false,
  shelfToMove: {
    shelfToId: '',
    shelfToLocation: '',
  },
  eventPopover: undefined,
  isShowBtnFlowerLocation: false,
  errorOnMoveFlower: null,
};

export default function dropdownFlowerLocationReducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.showDropdownFlowerLocation:
      return {
        ...state,
        isShowDropdown: action.isShow,
        eventPopover: action.eventPopover,
        shelfFromMove: {
          ...state.shelfFromMove,
          flowerId: action.flowerId,
          shelfFromId: action.shelfFromId,
          shelfFromLocation: action.shelfFromLocation,
          nameOfFlower: action.nameOfFlower,
        },
      };
    case ActionTypes.showMoveFlowerModal:
      return {
        ...state,
        isShowFlowerMoveModal: action.isShow,
      };
    case ActionTypes.setShelfToMoveAction:
      return {
        ...state,
        shelfToMove: {
          ...state.shelfToMove,
          shelfToId: action.shelfToId,
          shelfToLocation: action.shelfToLocation,
        },
      };
    case ActionTypes.showBtnFlowerLocation:
      return {
        ...state,
        isShowBtnFlowerLocation: action.isShow,
      };
    case ActionTypes.errorToMoveFlower:
      return {
        ...state,
        errorOnMoveFlower: action.error,
      };
    default: {
      return state;
    }
  }
}
