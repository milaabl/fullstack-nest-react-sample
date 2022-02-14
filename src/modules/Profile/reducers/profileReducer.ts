import {
  SAVE_PROFILE_UPDATE_SUCCESS,
  SAVE_PROFILE_UPDATE_FAILURE,
  PROFILE_AVATAR_UPDATE_FAILURE,
} from '../actionCreators/profileActions';

const initialState = {
  isSuccess: false,
  errorsOnProfileUpdate: null,
  errorOnAvatarUpdate: null,
};

export type InitialStateType = typeof initialState;

export default function profileReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case SAVE_PROFILE_UPDATE_SUCCESS: {
      const { isSuccess } = action;
      return {
        ...state,
        isSuccess,
        errorsOnProfileUpdate: null,
        errorOnAvatarUpdate: null,
      };
    }
    case SAVE_PROFILE_UPDATE_FAILURE: {
      const { errors } = action;
      return {
        ...state,
        isSuccess: false,
        errorsOnProfileUpdate: errors,
      };
    }
    case PROFILE_AVATAR_UPDATE_FAILURE: {
      const { error } = action;
      return {
        ...state,
        isSuccess: false,
        errorOnAvatarUpdate: error,
      };
    }
    default: {
      return state;
    }
  }
}
