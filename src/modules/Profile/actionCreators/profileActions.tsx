export type ProfileActionsTypes = SaveProfileUpdateSuccessType | SaveProfileUpdateFailureType | ProfileAvatarUpdateFailureType;

export const SAVE_PROFILE_UPDATE_SUCCESS = 'profile/save-profile-update-success';
export const saveProfileUpdateSuccess = (isSuccess: boolean): SaveProfileUpdateSuccessType => ({
  type: SAVE_PROFILE_UPDATE_SUCCESS,
  isSuccess,
});
type SaveProfileUpdateSuccessType = {
  type: typeof SAVE_PROFILE_UPDATE_SUCCESS;
  isSuccess: boolean;
};

export const SAVE_PROFILE_UPDATE_FAILURE = 'profile/save-profile-update-failure';
type SaveProfileFailurePayloadType = {
  error: Array<string> | null;
};
export const saveProfileUpdateFailure = (errors: SaveProfileFailurePayloadType): SaveProfileUpdateFailureType => ({
  type: SAVE_PROFILE_UPDATE_FAILURE,
  errors,
});
type SaveProfileUpdateFailureType = {
  type: typeof SAVE_PROFILE_UPDATE_FAILURE;
  errors: SaveProfileFailurePayloadType;
};

export const PROFILE_AVATAR_UPDATE_FAILURE = 'profile/save-avatar-update-failure';
export const profileAvatarUpdateFailure = (error: string): ProfileAvatarUpdateFailureType => ({
  type: PROFILE_AVATAR_UPDATE_FAILURE,
  error,
});
type ProfileAvatarUpdateFailureType = {
  type: typeof PROFILE_AVATAR_UPDATE_FAILURE;
  error: string;
};
