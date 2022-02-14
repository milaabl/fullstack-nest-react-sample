/* eslint-disable no-underscore-dangle */
import { ShelfCardData } from '../interfaces';
import { ActionTypes } from '../actions/shelvesTypes';
import {
  SHOW_MODAL_TO_REMOVE_SHELF, SAVE_ERROR_TO_REMOVE_SHELF, INIT_SHELF, ADD_FlOWER_TO_SHELF, UPDATE_FLOWER,
  SHOW_MODAL_TO_REMOVE_FLOWER, SAVE_ERROR_TO_REMOVE_FLOWER, FETCH_VIRTUAL_SHELF,
} from '../actions/shelvesActions';
import { Flower } from '../../../../api/src/flowers/interfaces';
import { IS_FLOWER_WATERING, SET_WATERING_ERROR } from '../actions/flowerWateringActions';
import { UploadImageActionTypes } from '../actions/uploadImageTypes';

export type ShelfToRemoveType = {
  id: null | string;
  location: null | string;
};

export type FlowerToRemoveType = {
  // shelfId?: string;
  flowerId?: string;
  name?: string;
};

export interface State {
  shelves: ShelfCardData[];
  wateringFlowers: any;
  errorMsg: null | string;
  shelf: any | null;
  isShowModalToRemoveShelf: boolean;
  shelfToRemove: ShelfToRemoveType;
  errorOnRemove: null | string;
  flowerWateringError: string;
  successMsgUploadImgShelf : null | string;
  errorOnUploadImgShelf: null | string;
  isSubmittedUploadImgShelf: boolean;
  errorOnUploadImageFlower: null | string;
  isShowModalToRemoveFlower: boolean;
  flowerToRemove: FlowerToRemoveType;
  errorOnRemoveFlower: string;
  virtualShelf: ShelfCardData | null;
}

const initialState : State = {
  shelves: [],
  wateringFlowers: {},
  errorMsg: null,
  shelf: null,
  isShowModalToRemoveShelf: false,
  shelfToRemove: {
    id: null,
    location: null,
  },
  errorOnRemove: null,
  flowerWateringError: '',
  successMsgUploadImgShelf: null,
  errorOnUploadImgShelf: null,
  isSubmittedUploadImgShelf: false,
  errorOnUploadImageFlower: null,
  isShowModalToRemoveFlower: false,
  flowerToRemove: {
    flowerId: undefined,
    name: undefined,
  },
  errorOnRemoveFlower: '',
  virtualShelf: null,
};

export default function shelvesReducer(state = initialState, action: any): State {
  switch (action.type) {
    case INIT_SHELF:
      return {
        ...state,
        shelf: null,
      };
    case ActionTypes.fetchShelvesSuccess:
      return {
        ...state,
        shelves: [...action.payload],
      };
    case ActionTypes.fetchShelvesError:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    case ActionTypes.fetchShelfSuccess:
      return {
        ...state,
        shelf: action.payload,
      };

    case SHOW_MODAL_TO_REMOVE_SHELF:
      return {
        ...state,
        isShowModalToRemoveShelf: action.isShow,
        shelfToRemove: {
          id: action.id ? action.id : null,
          location: action.location ? action.location : null,
        },
      };

    case SAVE_ERROR_TO_REMOVE_SHELF:
      return {
        ...state,
        errorOnRemove: action.error,
      };

    case SHOW_MODAL_TO_REMOVE_FLOWER:
      return {
        ...state,
        isShowModalToRemoveFlower: action.isShow,
        errorOnRemoveFlower: '',
        flowerToRemove: {
          flowerId: action.flowerId ? action.flowerId : null,
          name: action.name ? action.name : null,
        },
      };

    case SAVE_ERROR_TO_REMOVE_FLOWER:
      return {
        ...state,
        errorOnRemoveFlower: action.error,
      };

    case ActionTypes.fetchShelfAddEdit:
      return {
        ...state,
        shelves: state.shelves.reduce((accumulator, current, index, arr) => {
          if (index === 0) {
            accumulator[0] = true;
          }
          if (current._id === action.payload._id) {
            accumulator.push(action.payload);
            accumulator[0] = false;
          } else {
            accumulator.push(current);
          }
          if (index === arr.length - 1) {
            if (accumulator[0]) accumulator[0] = action.payload;
            else accumulator.shift();
          }
          return accumulator;
        }, [action.payload]),
      };

    case ADD_FlOWER_TO_SHELF:
      return {
        ...state,
        shelf: {
          ...state.shelf,
          flowers: [...state.shelf?.flowers, action.payload],
        },
      };

    case UPDATE_FLOWER:
      const flowerToUpdate = action.flower;
      const updatedFlowers = state.shelf.flowers.map((flower: Flower) => (flower.id === flowerToUpdate.id ? flowerToUpdate : flower));
      return {
        ...state,
        shelf: {
          ...state.shelf,
          flowers: [...updatedFlowers],
        },
      };

    case IS_FLOWER_WATERING:
      const { isFlowerWatering, flowerId } = action.payload;
      return {
        ...state,
        wateringFlowers: {
          ...state.wateringFlowers,
          [flowerId]: isFlowerWatering,
        },
      };

    case SET_WATERING_ERROR:
      const { error } = action;
      return {
        ...state,
        flowerWateringError: error,
      };

    case UploadImageActionTypes.successToUploadShelfImage:
      const shelfToUpdate = action.shelf;
      const updatedShelf = state.shelves.map((shelf: ShelfCardData) => (shelf._id === action.shelf._id ? shelfToUpdate : shelf));
      return {
        ...state,
        successMsgUploadImgShelf: action.shelf.location,
        shelves: [...updatedShelf],
      };

    case UploadImageActionTypes.errorToUploadShelfImage:
      return {
        ...state,
        errorOnUploadImgShelf: action.error,
      };

    case UploadImageActionTypes.toastSuccessUploadShelfImage:
      return {
        ...state,
        isSubmittedUploadImgShelf: action.isSubmitted,
        errorOnUploadImgShelf: '',
      };

    case UploadImageActionTypes.errorToUploadFlowerImage:
      return {
        ...state,
        errorOnUploadImageFlower: action.error,
      };

    case FETCH_VIRTUAL_SHELF:
      return {
        ...state,
        virtualShelf: action.payload,
        shelf: action.payload,
      };

    default: {
      return state;
    }
  }
}
