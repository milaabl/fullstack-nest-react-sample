import {
  FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR,
} from '../actionCreators/forgotPasswordActions';

const initialState = {
  isSent: false,
  isSuccess: false,
  errorMsg: '',
};

export type InitialStateType = typeof initialState;

export default function forgotPasswordReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isSent: true,
        isSuccess: true,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        isSent: true,
        isSuccess: false,
        errorMsg: action.payload.msg,
      };
    }
    default: {
      return state;
    }
  }
}
