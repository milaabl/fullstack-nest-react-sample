import { UserType } from '../modules/Auth/helpers/loginHelper';
import httpClient from './httpClient';

export const ENDPOINT_USER_PROFILE = '/profile';

export type UserProfileType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatarPath: string | null;
  notificationTime: string;
};

export type UserProfileToUpdateType = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatarPath: string | null;
  notificationTime: number;
};

async function getUserProfile(): Promise<UserType> {
  const response = await httpClient.get(ENDPOINT_USER_PROFILE);
  return response && response.data;
}

async function updateUserProfile(user: UserProfileToUpdateType): Promise<UserType> {
  const response = await httpClient.post(ENDPOINT_USER_PROFILE, user);
  return response && response.data;
}

export default {
  getUserProfile,
  updateUserProfile,
};
