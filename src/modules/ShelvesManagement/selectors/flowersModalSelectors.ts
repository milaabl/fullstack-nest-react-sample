import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getFlowerModalState = (state: AppStateType) => state.flowerModal;

export const getShowModal = createSelector(getFlowerModalState, (flowerModal) => flowerModal.showModal);
export const getSuccessMessage = createSelector(getFlowerModalState, (flowerModal) => flowerModal.successMessage);
export const getErrorMessage = createSelector(getFlowerModalState, (flowerModal) => flowerModal.errorMessage);
export const getFlower = createSelector(getFlowerModalState, (flowerModal) => flowerModal.flower);
