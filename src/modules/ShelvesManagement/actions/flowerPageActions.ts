export enum ActionType {
  LoadingSuccess = 'flower-page/loading-success'
}

export interface Action {
  type: ActionType;
  payload: any;
}

export const flowerPageLoadingSuccess = (flowerData: any): Action => ({
  type: ActionType.LoadingSuccess,
  payload: flowerData,
});
