import httpClient from './httpClient';
import { ShelfCardData } from '../modules/ShelvesManagement/interfaces';

const ENDPOINT_SHELVES = '/shelves';
const ENDPOINT_MOVE_FLOWER = 'moveFlower';

export interface MoveFlowerData {
  shelfFromId: string ;
  shelfToId: string;
  flowerId: string ;
}

async function getShelves(): Promise<any> {
  const response = await httpClient.get<ShelfCardData[]>(ENDPOINT_SHELVES);
  const shelves = response.data;
  return shelves;
}

async function getShelf(shelfId : string) : Promise<any> {
  const response = await httpClient.get<ShelfCardData>(`shelves/${shelfId}`);
  const shelf = response.data;
  return shelf;
}

async function removeShelfService(id: string | null): Promise<any> {
  return httpClient.delete(`${ENDPOINT_SHELVES}/${id}`);
}

async function updateFlowersShelf(data: MoveFlowerData): Promise<any> {
  return httpClient.patch(`${ENDPOINT_SHELVES}/${ENDPOINT_MOVE_FLOWER}`, data);
}

const getVirtualShelf = async (): Promise<any> => {
  return httpClient.get(`${ENDPOINT_SHELVES}/virtual`);
};

export default {
  getShelves,
  getShelf,
  removeShelfService,
  updateFlowersShelf,
  getVirtualShelf,
};
