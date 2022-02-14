import { ActionType, Action } from '../actions/flowerPageActions';

const initialState = {
  flowerData: null,
};

type FlowerPageStateType = typeof initialState;

const flowerPageReducer = (state = initialState, { type, payload }: Action): FlowerPageStateType => {
  switch (type) {
    case ActionType.LoadingSuccess: {
      return {
        ...state,
        flowerData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default flowerPageReducer;
