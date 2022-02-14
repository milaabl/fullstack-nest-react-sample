import { createSelector } from 'reselect';
import { AppStateType } from '../reducers/rootReducer';

const getAppState = (state: AppStateType) => state.app;

export const getIsMobile = createSelector(getAppState, (app) => app.isMobile);
