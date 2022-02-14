const initialState = {
  isMobile: false,
};

export type InitialStateType = typeof initialState;

export const IS_MOBILE = 'app/is-mobile';

export const isMobile = (isMobile: boolean): IsMobileType => ({ type: IS_MOBILE, isMobile });
type IsMobileType = {
  type: typeof IS_MOBILE;
  isMobile: boolean;
};

export default function appReducer(state = initialState, action: ActionsTypes): InitialStateType {
  switch (action.type) {
    case IS_MOBILE: {
      return {
        ...state,
        isMobile: action.isMobile,
      };
    }
    default: {
      return state;
    }
  }
}

export type ActionsTypes = IsMobileType;
