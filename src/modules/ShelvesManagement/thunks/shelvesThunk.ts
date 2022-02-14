import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../../../reducers/rootReducer';
import {
  fetchShelvesSuccess,
  fetchShelvesError,
  fetchShelfSuccess,
  ActionsTypes,
  showModalToRemoveShelf,
  saveErrorToRemoveShelf,
  fetchShelvesStart,
  initShelf,
  updateFlower,
  showModalToRemoveFlower,
  saveErrorToRemoveFlower,
  fetchVirtualShelf,
} from '../actions/shelvesActions';
import { errorUploadShelfImage, successUploadShelfImage, toastSuccessUploadShelfImage, errorUploadFlowerImage } from '../actions/uploadImageActions';
import shelvesService, { MoveFlowerData } from '../../../services/shelvesService';
import uploadImageService from '../../../services/uploadImageService';
import { removeFlowerService } from '../../../services/flowerService';
import { showMoveFlowerModal, errorToMoveFlower, ActionsFlowerMoveTypes, showDropdownFlowerLocation } from '../actions/UpdateFlowerLocationActions';
import { setIsLoading, SpinnerActionsType } from '../../../common/Spinner/actionCreators/spinnerActions';

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | SpinnerActionsType | ActionsFlowerMoveTypes >;

export const shelvesThunk = () : ThunkType => async (dispatch) => {
  try {
    dispatch(fetchShelvesStart());
    const shelves = await shelvesService.getShelves();
    dispatch(fetchShelvesSuccess(shelves));
  } catch (error) {
    dispatch(fetchShelvesError(error));
  }
};

export const shelfThunk = (shelfId: string) : ThunkType => async (dispatch: Dispatch) => {
  try {
    dispatch(initShelf());
    dispatch(fetchShelvesStart());
    const shelf = await shelvesService.getShelf(shelfId);
    dispatch(fetchShelfSuccess(shelf));
  } catch (error) {
    dispatch(fetchShelvesError(error));
  }
};

export const virtualShelfThunk = () : ThunkType => async (dispatch: Dispatch) => {
  try {
    const response = await shelvesService.getVirtualShelf();
    dispatch(fetchVirtualShelf(response.data));
  } catch (error) {
    dispatch(fetchShelvesError(error));
  }
};

export function removeShelf(id: string | null): ThunkType {
  return async (dispatch) => {
    try {
      dispatch(showModalToRemoveShelf(false));
      dispatch(setIsLoading(true));
      await shelvesService.removeShelfService(id);
      dispatch(shelvesThunk());
      dispatch(virtualShelfThunk());
    } catch (e) {
      dispatch(saveErrorToRemoveShelf(e && e.message));
    }
  };
}

export function removeFlower(flowerId?: string): ThunkType {
  return async (dispatch) => {
    try {
      dispatch(showModalToRemoveFlower(false));
      dispatch(setIsLoading(true));
      const { data } = await removeFlowerService(flowerId);
      if (data) {
        dispatch(fetchShelfSuccess(data));
      } else {
        dispatch(saveErrorToRemoveFlower('Smth happen during removing the flower. Try again later.'));
      }
    } catch (e) {
      dispatch(saveErrorToRemoveFlower(e && e.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export const moveFlowerThunk = (data: MoveFlowerData) : ThunkType => async (
  dispatch: Dispatch< ActionsTypes| SpinnerActionsType | ActionsFlowerMoveTypes>,
) => {
  try {
    const { shelfFromId } = data;
    dispatch(showMoveFlowerModal(false));
    dispatch(showDropdownFlowerLocation(false));
    dispatch(setIsLoading(true));
    await shelvesService.updateFlowersShelf(data);
    dispatch<any>(shelfThunk(shelfFromId));
    dispatch<any>(shelvesThunk());
  } catch (error) {
    dispatch(errorToMoveFlower(error));
  }
};

export function uploadShelfImage(file: Blob, shelfId: string): ThunkType {
  return async (dispatch) => {
    try {
      const result = await uploadImageService.uploadShelfImage(file, shelfId);
      const { data } = result;
      dispatch<any>(successUploadShelfImage(data));
      dispatch<any>(toastSuccessUploadShelfImage(true));
    } catch (e) {
      dispatch<any>(errorUploadShelfImage(e));
    }
  };
}

export function uploadFlowerImage(file: Blob, shelfId: string | undefined, flowerId:string | undefined): ThunkType {
  return async (dispatch) => {
    try {
      const result = await uploadImageService.uploadFlowerImage(file, shelfId, flowerId);
      const { data } = result;
      dispatch<any>(updateFlower(data));
    } catch (e) {
      dispatch<any>(errorUploadFlowerImage(e));
    }
  };
}
