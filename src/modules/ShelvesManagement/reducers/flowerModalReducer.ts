import {
  FLOWER_MODAL_OPEN,
  FLOWER_MODAL_CLOSE,
  FLOWER_MODAL_CREATE_FLOWER_SUCCESS,
  FLOWER_MODAL_ERROR,
  FLOWER_MODAL_EDIT_FLOWER_SUCCESS,
} from '../actions/flowerModalActions';

const initialState = {
  errorMessage: '',
  showModal: false,
  successMessage: '',
  flower: null,
};

type InitialStateType = typeof initialState;

const flowerModalReducer = (state = initialState, action: { type: string; payload: any; }): InitialStateType => {
  switch (action.type) {
    case FLOWER_MODAL_OPEN: {
      return {
        ...state,
        errorMessage: '',
        showModal: true,
        successMessage: '',
        flower: action.payload,
      };
    }

    case FLOWER_MODAL_CLOSE: {
      return {
        ...state,
        errorMessage: '',
        showModal: false,
        successMessage: '',
        flower: null,
      };
    }

    case FLOWER_MODAL_CREATE_FLOWER_SUCCESS: {
      return {
        ...state,
        errorMessage: '',
        showModal: false,
        successMessage: `Flower '${action.payload.name}' has been created`,
        flower: null,
      };
    }

    case FLOWER_MODAL_EDIT_FLOWER_SUCCESS: {
      return {
        ...state,
        errorMessage: '',
        showModal: false,
        successMessage: `Flower '${action.payload.name}' has been updated`,
        flower: null,
      };
    }

    case FLOWER_MODAL_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
        showModal: true,
        successMessage: '',
        flower: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default flowerModalReducer;
