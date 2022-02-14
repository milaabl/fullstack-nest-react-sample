import { shelfAddEditModalSuccess, shelfAddEditModalError } from '../actions/shelfAddEditModalActions';
import { fetchShelfAddEdit } from '../actions/shelvesActions';
import { shelfAddEditModal } from '../../../services/shelfAddEditModalService';

export const shelfAddEditModalThunk = (regData: any) => async (dispatch: any) => {
  try {
    const response = await shelfAddEditModal(regData);
    dispatch(shelfAddEditModalSuccess());
    dispatch(fetchShelfAddEdit(response.data));
    return true;
  } catch ({ response, message }) {
    dispatch(shelfAddEditModalError(response ? response.data.message : message));
    return false;
  }
};
