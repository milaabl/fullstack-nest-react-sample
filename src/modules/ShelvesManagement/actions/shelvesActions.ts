import { ActionTypes } from './shelvesTypes';
import { FlowerCardData, ShelfCardData } from '../interfaces';
import { Flower } from '../../../../api/src/flowers/interfaces';

export interface FetchShelvesStartAction {
  type: ActionTypes.fetchShelvesStart;
}

export interface FetchShelvesAction {
  type: ActionTypes.fetchShelvesSuccess;
  payload: ShelfCardData[];
}

export interface FetchShelvesErrorAction {
  type: ActionTypes.fetchShelvesError;
  payload: string;
}
export interface FetchShelfByIdAction {
  type: ActionTypes.fetchShelfSuccess;
  payload : ShelfCardData;
}
export interface FetchShelfAddEditType {
  type: ActionTypes.fetchShelfAddEdit;
  payload: ShelfCardData[];
}

export const INIT_SHELF = 'shelves/init-shelf';
export const initShelf = () => ({ type: INIT_SHELF });

export const fetchShelvesStart = () : FetchShelvesStartAction => ({
  type: ActionTypes.fetchShelvesStart,
});

export const fetchShelvesSuccess = (shelves: ShelfCardData[]) : FetchShelvesAction => ({
  type: ActionTypes.fetchShelvesSuccess,
  payload: shelves,
});

export const fetchShelvesError = (errorMsg: string) : FetchShelvesErrorAction => ({
  type: ActionTypes.fetchShelvesError,
  payload: errorMsg,
});

export const fetchShelfSuccess = (shelf: ShelfCardData) : FetchShelfByIdAction => ({
  type: ActionTypes.fetchShelfSuccess,
  payload: shelf,
});

export const fetchShelfAddEdit = (shelf: ShelfCardData[]): FetchShelfAddEditType => ({
  type: ActionTypes.fetchShelfAddEdit,
  payload: shelf,
});

export const SHOW_MODAL_TO_REMOVE_SHELF = 'shelves/show-modal-to-remove-shelf';
type ShowModalToRemoveShelfType = {
  type: typeof SHOW_MODAL_TO_REMOVE_SHELF;
  isShow: boolean;
  id?: string;
  location?: string;
};
export const showModalToRemoveShelf = (isShow: boolean, id?: string, location?: string): ShowModalToRemoveShelfType => ({
  type: SHOW_MODAL_TO_REMOVE_SHELF, isShow, id, location,
});

export const SAVE_ERROR_TO_REMOVE_SHELF = 'shelves/save-error-to-remove-shelf';
type SaveErrorToRemoveShelfType = {
  type: typeof SAVE_ERROR_TO_REMOVE_SHELF;
  error: null | string;
};
export const saveErrorToRemoveShelf = (error: null | string): SaveErrorToRemoveShelfType => ({
  type: SAVE_ERROR_TO_REMOVE_SHELF, error,
});

export const ADD_FlOWER_TO_SHELF = 'shelves/add-flower-to-shelf';
type AddFlowerToShelf = {
  type: typeof ADD_FlOWER_TO_SHELF;
  payload: any;
};
export const addFlowerToShelf = (payload: any): AddFlowerToShelf => ({
  type: ADD_FlOWER_TO_SHELF, payload,
});

export const UPDATE_FLOWER = 'flower/update-flower';
type UpdateFlowerType = {
  type: typeof UPDATE_FLOWER;
  flower: Flower;
};
export const updateFlower = (flower: FlowerCardData) => ({
  type: UPDATE_FLOWER,
  flower,
});

export const SHOW_MODAL_TO_REMOVE_FLOWER = 'flower/show-modal-to-remove-flower';
type ShowModalToRemoveFlowerType = {
  type: typeof SHOW_MODAL_TO_REMOVE_FLOWER;
  isShow: boolean;
  flowerId?: string;
  name?: string;
};
export const showModalToRemoveFlower = (isShow: boolean, flowerId?: string, name?: string): ShowModalToRemoveFlowerType => ({
  type: SHOW_MODAL_TO_REMOVE_FLOWER,
  isShow,
  flowerId,
  name,
});

export const SAVE_ERROR_TO_REMOVE_FLOWER = 'flower/save-error-to-remove-flower';
type SaveErrorToRemoveFlowerType = {
  type: typeof SAVE_ERROR_TO_REMOVE_FLOWER;
  error: null | string;
};
export const saveErrorToRemoveFlower = (error: string): SaveErrorToRemoveFlowerType => ({
  type: SAVE_ERROR_TO_REMOVE_FLOWER,
  error,
});

export const FETCH_VIRTUAL_SHELF = 'shelves/fetch-virtual-shelf';
type FetchVirtualShelf = {
  type: typeof FETCH_VIRTUAL_SHELF;
  payload: ShelfCardData;
};
export const fetchVirtualShelf = (payload: ShelfCardData) => ({
  type: FETCH_VIRTUAL_SHELF,
  payload,
});

export type ActionsTypes =
  FetchShelvesStartAction |
  FetchShelvesAction |
  FetchShelfByIdAction |
  FetchShelvesErrorAction |
  ShowModalToRemoveShelfType |
  SaveErrorToRemoveShelfType |
  ShowModalToRemoveFlowerType |
  SaveErrorToRemoveFlowerType |
  UpdateFlowerType |
  FetchVirtualShelf;
