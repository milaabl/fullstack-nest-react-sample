export const SHELF_ADD_EDIT_MODAL_SUBMITTED = 'SHELF_ADD_EDIT_MODAL_SUBMITTED';
export const shelfAddEditModalSubmitted = () => ({
  type: SHELF_ADD_EDIT_MODAL_SUBMITTED,
  payload: {},
});

export const SHELF_ADD_EDIT_MODAL_SUCCESS = 'SHELF_ADD_EDIT_MODAL_SUCCESS';
export const shelfAddEditModalSuccess = () => ({
  type: SHELF_ADD_EDIT_MODAL_SUCCESS,
  payload: {},
});

export const SHELF_ADD_EDIT_MODAL_ERROR = 'SHELF_ADD_EDIT_MODAL_FAILURE';
export const shelfAddEditModalError = (msg: string) => ({
  type: SHELF_ADD_EDIT_MODAL_ERROR,
  payload: msg,
});

export const SHELF_ADD_EDIT_MODAL_OPEN = 'SHELF_ADD_EDIT_MODAL_OPEN';
export const shelfAddEditModalOpen = (id?: string) => ({
  type: SHELF_ADD_EDIT_MODAL_OPEN,
  payload: { id },
});

export const SHELF_ADD_EDIT_MODAL_CLOSE = 'SHELF_ADD_EDIT_MODAL_CLOSE';
export const shelfAddEditModalClose = () => ({
  type: SHELF_ADD_EDIT_MODAL_CLOSE,
  payload: {},
});
