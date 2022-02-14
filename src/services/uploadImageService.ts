import httpClient from './httpClient';

const ENDPOINT_UPLOAD_FILE = '/profile/update-image';
const ENDPOINT_UPDATE_IMAGE_SHELF = '/shelves/update-image';
const ENDPOINT_UPDATE_IMAGE_FLOWER = '/flowers/update-image';

async function uploadImage(file: Blob): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.post(ENDPOINT_UPLOAD_FILE, formData);
}

async function uploadShelfImage(file: Blob, id:string): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.patch(`${ENDPOINT_UPDATE_IMAGE_SHELF}/${id}`, formData);
}

async function uploadFlowerImage(file: Blob, shelfId: string | undefined, flowerId: string | undefined): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.patch(`${ENDPOINT_UPDATE_IMAGE_FLOWER}/${shelfId}/image/${flowerId}`, formData);
}

export default {
  uploadImage,
  uploadShelfImage,
  uploadFlowerImage,
};
