import { ThunkAction } from 'redux-thunk';
import { flowerModalCreateFlowerSuccess, flowerModalError, flowerModalEditFlowerSuccess } from '../actions/flowerModalActions';
import { flowerPageLoadingSuccess } from '../actions/flowerPageActions';
import { addFlower, waterFlower, editFlower, getFlowerData as getData } from '../../../services/flowerService';
import { addFlowerToShelf, updateFlower } from '../actions/shelvesActions';
import { checkIsWateringAvailableToday } from '../components/FlowerCard/helpers/flowerCardHelper';
import { FlowerCardData } from '../interfaces';
import { AppStateType } from '../../../reducers/rootReducer';
import { isFlowerWatering, setWateringError } from '../actions/flowerWateringActions';
import { FlowerData } from '../../../../api/src/flowers/interfaces';
import { setIsLoading } from '../../../common/Spinner/actionCreators/spinnerActions';

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createFlower = (data: any) => async (dispatch: any): Promise<void> => {
  try {
    const response = await addFlower(data);
    const flower = response.data;

    dispatch(flowerModalCreateFlowerSuccess(flower));
    dispatch(addFlowerToShelf(flower));
  } catch ({ response, message }) {
    dispatch(flowerModalError(message));
  }
};

export const editFlowerHandler = (data: any) => async (dispatch: any): Promise<void> => {
  try {
    const response = await editFlower(data);
    const flower = response.data;

    dispatch(flowerModalEditFlowerSuccess(flower));
    dispatch(updateFlower(flower));
  } catch ({ response, message }) {
    dispatch(flowerModalError(message));
  }
};

export const waterFlowerHandler = (shelfId: string, flowerId: string, flower: FlowerCardData): ThunkType => {
  return async (dispatch) => {
    try {
      checkIsWateringAvailableToday(flower);
      dispatch(setWateringError(''));
      dispatch(isFlowerWatering(true, flowerId));
      const response = await waterFlower({ shelfId, flowerId });
      dispatch(updateFlower(response));
      setTimeout(() => {
        dispatch(isFlowerWatering(false, flowerId));
      }, 10000);
    } catch (e) {
      dispatch(setWateringError(e.message));
    }
  };
};

export const getFlowerData = (flowerId: string) => async (dispatch: any): Promise<any> => {
  try {
    dispatch(setIsLoading(true));
    const data: FlowerData = await getData(flowerId);
    dispatch(flowerPageLoadingSuccess(data));
  } catch ({ response, message }) {
    dispatch(setIsLoading(false));
    // handle error
  }
};
