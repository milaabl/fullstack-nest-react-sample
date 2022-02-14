import {
  SHELF_ADD_EDIT_MODAL_SUBMITTED, SHELF_ADD_EDIT_MODAL_SUCCESS, SHELF_ADD_EDIT_MODAL_ERROR, SHELF_ADD_EDIT_MODAL_OPEN, SHELF_ADD_EDIT_MODAL_CLOSE,
} from '../actions/shelfAddEditModalActions';

const initialState = {
  success: false,
  errorMsg: '',
  showModal: false,
  shelfId: undefined,
};

export type InitialStateType = typeof initialState;

export default function shelfAddEditModalReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case SHELF_ADD_EDIT_MODAL_SUBMITTED: {
      return {
        ...state,
        success: false,
        errorMsg: '',
      };
    }
    case SHELF_ADD_EDIT_MODAL_SUCCESS: {
      return {
        ...state,
        success: true,
        errorMsg: '',
      };
    }
    case SHELF_ADD_EDIT_MODAL_ERROR: {
      return {
        ...state,
        success: false,
        errorMsg: action.payload,
      };
    }
    case SHELF_ADD_EDIT_MODAL_OPEN: {
      return {
        ...state,
        success: false,
        errorMsg: '',
        showModal: true,
        shelfId: action.payload.id,
      };
    }
    case SHELF_ADD_EDIT_MODAL_CLOSE: {
      return {
        ...state,
        showModal: false,
      };
    }
    default: {
      return state;
    }
  }
}
