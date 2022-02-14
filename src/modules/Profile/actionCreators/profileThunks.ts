import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../../../reducers/rootReducer';
import userProfileService, { UserProfileType } from '../../../services/userProfileService';
import { updateUserSuccess, UpdateUserType } from '../../Auth/actionCreators/loginFormActions';
import {
  ProfileActionsTypes,
  profileAvatarUpdateFailure,
  saveProfileUpdateFailure,
  saveProfileUpdateSuccess,
} from './profileActions';
import { setIsLoading, SetIsLoadingType } from '../../../common/Spinner/actionCreators/spinnerActions';
import uploadImageService from '../../../services/uploadImageService';
import { convertToMinutes } from '../../../utils/timeUtils';

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionsTypes | SetIsLoadingType | UpdateUserType>;

export function updateProfile(values: UserProfileType): ThunkType {
  return async (dispatch) => {
    try {
      const { notificationTime } = values;
      const valuesToSave = {
        ...values,
        notificationTime: convertToMinutes(notificationTime),
      };
      const updatedUser = await userProfileService.updateUserProfile(valuesToSave);
      dispatch(updateUserSuccess(updatedUser));
      dispatch(saveProfileUpdateSuccess(true));
    } catch (e) {
      const errors = e.response && e.response.data.message;
      dispatch(saveProfileUpdateFailure(errors));
    }
  };
}

export function uploadAvatar(file: Blob): ThunkType {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const result = await uploadImageService.uploadImage(file);
      const { data } = result;
      dispatch(updateUserSuccess(data));
      dispatch(setIsLoading(false));
    } catch (e) {
      dispatch(profileAvatarUpdateFailure(e.response && e.response.data && e.response.data.message));
    }
  };
}
