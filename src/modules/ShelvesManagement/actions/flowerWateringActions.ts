export const IS_FLOWER_WATERING = 'flower/is-flower-watering';
type IsFlowerWateringType = {
  type: typeof IS_FLOWER_WATERING;
  payload: {
    isFlowerWatering: boolean;
    flowerId: string;
  };
};
export const isFlowerWatering = (isFlowerWatering: boolean, flowerId: string) => ({
  type: IS_FLOWER_WATERING,
  payload: {
    isFlowerWatering,
    flowerId,
  },
});

export const SET_WATERING_ERROR = 'flower/set-watering-error';
type SetWateringErrorType = {
  type: typeof SET_WATERING_ERROR;
  error: string;
};
export const setWateringError = (error: string) => ({ type: SET_WATERING_ERROR, error });

export type FlowerWateringActionsTypes = IsFlowerWateringType | SetWateringErrorType;
