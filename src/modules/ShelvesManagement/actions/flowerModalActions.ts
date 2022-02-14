import { FlowerCardData } from '../interfaces';

export const FLOWER_MODAL_CREATE_FLOWER_SUCCESS = 'FLOWER_MODAL_CREATE_FLOWER_SUCCESS';
export const flowerModalCreateFlowerSuccess = (flower: any) => ({
  type: FLOWER_MODAL_CREATE_FLOWER_SUCCESS,
  payload: flower,
});

export const FLOWER_MODAL_EDIT_FLOWER_SUCCESS = 'FLOWER_MODAL_EDIT_FLOWER_SUCCESS';
export const flowerModalEditFlowerSuccess = (flower: any) => ({
  type: FLOWER_MODAL_EDIT_FLOWER_SUCCESS,
  payload: flower,
});

export const FLOWER_MODAL_ERROR = 'FLOWER_MODAL_ERROR';
export const flowerModalError = (msg: string) => ({
  type: FLOWER_MODAL_ERROR,
  payload: msg,
});

export const FLOWER_MODAL_OPEN = 'FLOWER_MODAL_OPEN';
export const flowerModalOpen = (flower: FlowerCardData|null = null) => ({
  type: FLOWER_MODAL_OPEN,
  payload: flower,
});

export const FLOWER_MODAL_CLOSE = 'FLOWER_MODAL_CLOSE';
export const flowerModalClose = () => ({
  type: FLOWER_MODAL_CLOSE,
});
