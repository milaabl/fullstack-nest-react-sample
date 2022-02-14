import instance from './httpClient';

export type ShelfAddEditModalData = {
  id: string | undefined;
  location: string;
  description: string;
};

const ENDPOINT_SHELVES = '/shelves';

export async function shelfAddEditModal(data: ShelfAddEditModalData): Promise<any> {
  return data.id ? instance.patch(ENDPOINT_SHELVES, data) : instance.post(ENDPOINT_SHELVES, data);
}
