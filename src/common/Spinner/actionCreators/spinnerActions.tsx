export const SET_IS_LOADING = 'spinner/set-is-loading';

export type SetIsLoadingType = {
  type: typeof SET_IS_LOADING;
  isLoading: boolean;
};

export const setIsLoading = (isLoading: boolean): SetIsLoadingType => ({ type: SET_IS_LOADING, isLoading });

export type SpinnerActionsType = SetIsLoadingType;
