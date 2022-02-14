import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const getFlowerPageState = (state: AppStateType) => state.flowerPage;

export const getFlowerData = createSelector(getFlowerPageState, (flowerPage) => flowerPage.flowerData);
