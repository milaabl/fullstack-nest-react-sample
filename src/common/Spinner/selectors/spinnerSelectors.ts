import { createSelector } from 'reselect';
import { AppStateType } from '../../../reducers/rootReducer';

const spinnerState = (state: AppStateType) => state.spinner;

export const getIsLoading = createSelector(spinnerState, (spinner) => spinner.isLoading);
