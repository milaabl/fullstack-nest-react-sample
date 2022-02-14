import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getShelvesState = (state: AppStateType) => state.shelves;
const getWateringFlowers = (state: AppStateType) => state.shelves.wateringFlowers;

export const getShelves = createSelector(getShelvesState, (shelves) => shelves.shelves);

export const getErrorOnShelves = createSelector(getShelvesState, (shelves) => shelves.errorMsg);

export const getShelf = createSelector(getShelvesState, (shelves) => shelves.shelf);

export const getVirtualShelf = createSelector(getShelvesState, (shelves) => shelves.virtualShelf);

export const getShelfPath = createSelector(getShelvesState, (shelves) => shelves && shelves.shelf && shelves.shelf.shelfPath);

export const getCurrentShelf = createSelector(getShelvesState, (shelves) => shelves.shelf && shelves.shelf._id);

const getFlowerIdInProps = (state: AppStateType, props: any) => props.flower.id;
export const getIsFlowerWatering = createSelector(
  [getWateringFlowers, getFlowerIdInProps],
  (wateringFlowers, flowerId) => !!wateringFlowers[flowerId],
);

export const getIsShowModalToRemoveShelf = createSelector(getShelvesState, (shelves) => shelves.isShowModalToRemoveShelf);

export const getShelfToRemove = createSelector(getShelvesState, (shelves) => shelves.shelfToRemove);

export const getIsErrorOnRemove = createSelector(getShelvesState, (shelves) => !!shelves.errorOnRemove);

export const getFlowerWateringError = createSelector(getShelvesState, (shelves) => shelves.flowerWateringError);

export const getUploadImageShelfLocation = createSelector(getShelvesState, (shelves) => shelves.successMsgUploadImgShelf);

export const getErrorMessageUploadImg = createSelector(getShelvesState, (shelves) => shelves.errorOnUploadImgShelf);

export const getSubmitUploadImgShelf = createSelector(getShelvesState, (shelves) => shelves.isSubmittedUploadImgShelf);

export const getErrorMsgUploadImgFlower = createSelector(getShelvesState, (shelves) => shelves.errorOnUploadImageFlower);

export const getIsShowModalToRemoveFlower = createSelector(getShelvesState, (shelves) => shelves.isShowModalToRemoveFlower);
export const getFlowerToRemove = createSelector(getShelvesState, (shelves) => shelves.flowerToRemove);
export const getIsErrorOnRemoveFlower = createSelector(getShelvesState, (shelves) => shelves.errorOnRemoveFlower);
