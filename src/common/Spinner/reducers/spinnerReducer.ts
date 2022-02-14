import { SET_IS_LOADING } from '../actionCreators/spinnerActions';
import { ActionTypes } from '../../../modules/ShelvesManagement/actions/shelvesTypes';
import { SAVE_ERROR_TO_REMOVE_SHELF } from '../../../modules/ShelvesManagement/actions/shelvesActions';
import { ActionTypes as ActionFlowerMoveTypes } from '../../../modules/ShelvesManagement/actions/UpdateFlowerLocationTypes';
import { PROFILE_AVATAR_UPDATE_FAILURE } from '../../../modules/Profile/actionCreators/profileActions';
import { ActionType } from '../../../modules/ShelvesManagement/actions/flowerPageActions';

const initialState = {
  isLoading: false,
};

export type InitialSpinnerStateType = typeof initialState;

export default function spinnerReducer(state = initialState, action: any): InitialSpinnerStateType {
  switch (action.type) {
    case SET_IS_LOADING: {
      return {
        isLoading: action.isLoading,
      };
    }
    case ActionTypes.fetchShelvesStart: {
      return {
        isLoading: true,
      };
    }
    case ActionTypes.fetchShelfSuccess:
    case ActionTypes.fetchShelvesSuccess:
    case ActionTypes.fetchShelvesError:
    case SAVE_ERROR_TO_REMOVE_SHELF:
    case ActionFlowerMoveTypes.errorToMoveFlower:
    case ActionType.LoadingSuccess:
    case PROFILE_AVATAR_UPDATE_FAILURE: {
      return {
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
