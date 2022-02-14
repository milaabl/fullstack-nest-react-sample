/* eslint-disable no-underscore-dangle */
import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getShelfAddEditModalState = (state: AppStateType) => state.shelfAddEditModal;

export const getAddEditSuccess = createSelector(getShelfAddEditModalState, (shelfAddEditModal) => shelfAddEditModal.success);

export const getErrorMsg = createSelector(getShelfAddEditModalState, (shelfAddEditModal) => shelfAddEditModal.errorMsg);

export const getShowModal = createSelector(getShelfAddEditModalState, (shelfAddEditModal) => shelfAddEditModal.showModal);

export const getShelfId = createSelector(getShelfAddEditModalState, (shelfAddEditModal) => shelfAddEditModal.shelfId);

const shelfByIdState = (state: AppStateType) => state.shelves.shelves.find(element => element._id === state.shelfAddEditModal.shelfId);

export const getLocation = createSelector(shelfByIdState, (shelf) => shelf?.location);

export const getDescription = createSelector(shelfByIdState, (shelf) => shelf?.description);

export const getImageShelf = createSelector(shelfByIdState, (shelf) => shelf?.picturePath);
