import {
  REGISTRATION_SUCCESS, REGISTRATION_ERROR,
} from '../actions/registrationActions';

const initialState = {
  isSent: false,
  isSuccess: false,
  errorMsg: '',
};

export type InitialStateType = typeof initialState;

export default function registrationReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        isSent: true,
        isSuccess: true,
      };
    }
    case REGISTRATION_ERROR: {
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
