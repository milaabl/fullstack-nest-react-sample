import { combineReducers } from 'redux';

import app from './appReducer';
import login from '../modules/Auth/reducers/loginReducer';
import forgotPassword from '../modules/Auth/reducers/forgotPasswordReducer';
import profile from '../modules/Profile/reducers/profileReducer';
import resetPassword from '../modules/Auth/reducers/resetPasswordReducer';
import registration from '../modules/Registration/reducers';
import shelves from '../modules/ShelvesManagement/reducers/shelvesReducer';
import spinner from '../common/Spinner/reducers/spinnerReducer';
import shelfAddEditModal from '../modules/ShelvesManagement/reducers/shelfAddEditModalReducer';
import updateFlowerLocation from '../modules/ShelvesManagement/reducers/UpdateFlowerLocationReducer';
import flowerModal from '../modules/ShelvesManagement/reducers/flowerModalReducer';
import flowerPage from '../modules/ShelvesManagement/reducers/flowerPageReducer';

export const rootReducer = combineReducers({
  app,
  login,
  registration,
  shelves,
  forgotPassword,
  profile,
  resetPassword,
  spinner,
  shelfAddEditModal,
  updateFlowerLocation,
  flowerModal,
  flowerPage,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
