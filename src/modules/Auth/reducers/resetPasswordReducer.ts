import {
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
} from '../actionCreators/resetPasswordActions';

const initialState = {
  isSuccess: false,
  errorMsg: '',
};

export type InitialStateType = typeof initialState;

export default function resetPasswordReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        isSuccess: false,
        errorMsg: action.payload.msg,
      };
    }
    default: {
      return state;
    }
  }
}
