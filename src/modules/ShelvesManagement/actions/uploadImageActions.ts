import { UploadImageActionTypes } from './uploadImageTypes';
import { ShelfCardData } from '../interfaces';

export interface SuccessUploadImageShelfAction {
  type: UploadImageActionTypes.successToUploadShelfImage;
  shelf: ShelfCardData | null;
}

export interface ErorrUploadImageShelfAction {
  type: UploadImageActionTypes.errorToUploadShelfImage;
  error: null | string;
}

export interface SuccessToastUploadImgAction {
  type: UploadImageActionTypes.toastSuccessUploadShelfImage;
  isSubmitted: boolean;
}

export interface ErorrUploadImageFlowerAction {
  type: UploadImageActionTypes.errorToUploadFlowerImage;
  error: null | string;
}

export const successUploadShelfImage = (shelf: ShelfCardData | null): SuccessUploadImageShelfAction => ({
  type: UploadImageActionTypes.successToUploadShelfImage,
  shelf,
});

export const errorUploadShelfImage = (error: null | string): ErorrUploadImageShelfAction => ({
  type: UploadImageActionTypes.errorToUploadShelfImage,
  error,
});

export const toastSuccessUploadShelfImage = (isSubmitted: boolean): SuccessToastUploadImgAction => ({
  type: UploadImageActionTypes.toastSuccessUploadShelfImage,
  isSubmitted,
});

export const errorUploadFlowerImage = (error: null | string): ErorrUploadImageFlowerAction => ({
  type: UploadImageActionTypes.errorToUploadFlowerImage,
  error,
});

export type ActionsUploadImageTypes =
  SuccessUploadImageShelfAction |
  ErorrUploadImageShelfAction |
  SuccessToastUploadImgAction |
  ErorrUploadImageFlowerAction;
